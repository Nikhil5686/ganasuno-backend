require("dotenv").config();

const http = require("http");
const fs = require("fs");
const path = require("path");
const readline = require("readline");
const { google } = require("googleapis");
const { exec } = require("child_process");

const PORT = 3000;
const REDIRECT_URI = `http://127.0.0.1:${PORT}/oauth2callback`;

const TOKEN_PATH = path.join(__dirname, "token.json");
const STATE_PATH = path.join(__dirname, "playlist-state-haryanvi-new.json");

const SONGS_PATH = path.join(__dirname, "songs-haryanvi-new.json");

const songs = require(SONGS_PATH);

const oauth2Client = new google.auth.OAuth2(
  process.env.YOUTUBE_CLIENT_ID,
  process.env.YOUTUBE_CLIENT_SECRET,
  REDIRECT_URI,
);

const SCOPES = ["https://www.googleapis.com/auth/youtube"];

const PLAYLIST_TITLE = "GanaSuno — Haryanvi New";

const PLAYLIST_DESCRIPTION =
  "GanaSuno Haryanvi New catalog — curated Haryanvi music.";

const PLAYLIST_PRIVACY = "public";

const PENALTY_WORDS = [
  "remix",
  "dj",
  "slowed",
  "reverb",
  "slowed + reverb",
  "cover",
  "unplugged",
  "karaoke",
  "instrumental",
  "lofi",
  "lo-fi",
  "mashup",
  "nightcore",
  "bass boosted",
  "8d",
  "reaction",
  "status",
  "shorts",
  "short",
];

const POSITIVE_CHANNEL_WORDS = [
  "wave music",
  "ishtar",
  "saregama",
  "t-series",
  "tips",
  "zee music",
  "sonotek",
  "speed records",
  "venus",
  "rajshri",
];

function formatUploadAge(publishedAt) {
  const published = new Date(publishedAt);
  const now = new Date();

  const seconds = Math.floor((now - published) / 1000);

  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30.44);
  const years = Math.floor(days / 365.25);

  if (years > 0) {
    return `${years} year${years === 1 ? "" : "s"} ago`;
  }

  if (months > 0) {
    return `${months} month${months === 1 ? "" : "s"} ago`;
  }

  if (days > 0) {
    return `${days} day${days === 1 ? "" : "s"} ago`;
  }

  if (hours > 0) {
    return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  }

  if (minutes > 0) {
    return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  }

  return "Recently uploaded";
}

function formatDate(publishedAt) {
  return new Date(publishedAt).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatDuration(duration) {
  if (!duration) {
    return "Unknown";
  }

  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);

  if (!match) {
    return "Unknown";
  }

  const hours = Number(match[1] || 0);
  const minutes = Number(match[2] || 0);
  const seconds = Number(match[3] || 0);

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(
      2,
      "0",
    )}:${String(seconds).padStart(2, "0")}`;
  }

  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function formatViews(viewCount) {
  const views = Number(viewCount || 0);

  if (views >= 1_000_000_000) {
    return `${(views / 1_000_000_000).toFixed(1)}B`;
  }

  if (views >= 1_000_000) {
    return `${(views / 1_000_000).toFixed(1)}M`;
  }

  if (views >= 1_000) {
    return `${(views / 1_000).toFixed(1)}K`;
  }

  return views.toLocaleString("en-IN");
}

function normalizeText(text) {
  return String(text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(text) {
  return normalizeText(text)
    .split(" ")
    .filter((word) => word.length > 1);
}

function tokenMatchScore(target, candidate) {
  const targetTokens = tokenize(target);

  const candidateTokens = tokenize(candidate);

  if (targetTokens.length === 0) {
    return 0;
  }

  let matched = 0;

  for (const token of targetTokens) {
    if (candidateTokens.includes(token)) {
      matched++;
    }
  }

  return matched / targetTokens.length;
}

function containsPenaltyWord(text) {
  const normalized = normalizeText(text);

  return PENALTY_WORDS.some((word) => normalized.includes(normalizeText(word)));
}

function channelQuality(channelName) {
  const normalized = normalizeText(channelName);

  return POSITIVE_CHANNEL_WORDS.some((word) =>
    normalized.includes(normalizeText(word)),
  )
    ? 10
    : 0;
}

function scoreResult(song, result, details) {
  const title = result.snippet.title || "";

  const channel = result.snippet.channelTitle || "";

  let score = tokenMatchScore(song.title, title) * 45;

  score += tokenMatchScore(song.artist, title) * 25;

  score += channelQuality(channel);

  const views = Number(details?.statistics?.viewCount || 0);

  if (views >= 1_000_000_000) {
    score += 10;
  } else if (views >= 100_000_000) {
    score += 9;
  } else if (views >= 10_000_000) {
    score += 8;
  } else if (views >= 1_000_000) {
    score += 6;
  } else if (views >= 100_000) {
    score += 4;
  } else if (views >= 10_000) {
    score += 2;
  }

  if (containsPenaltyWord(title)) {
    score -= 25;
  }

  const duration = details?.contentDetails?.duration;

  if (duration) {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);

    if (match) {
      const hours = Number(match[1] || 0);

      const minutes = Number(match[2] || 0);

      const seconds = Number(match[3] || 0);

      const totalSeconds = hours * 3600 + minutes * 60 + seconds;

      if (totalSeconds < 90) {
        score -= 20;
      } else if (totalSeconds >= 150) {
        score += 5;
      }
    }
  }

  return Math.max(0, Math.min(100, Math.round(score)));
}

function openBrowser(url) {
  const command =
    process.platform === "win32"
      ? `start "" "${url}"`
      : process.platform === "darwin"
        ? `open "${url}"`
        : `xdg-open "${url}"`;

  exec(command);
}

function saveTokens(tokens) {
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2), "utf8");
}

function loadTokens() {
  if (!fs.existsSync(TOKEN_PATH)) {
    return null;
  }

  try {
    return JSON.parse(fs.readFileSync(TOKEN_PATH, "utf8"));
  } catch {
    return null;
  }
}

function loadPlaylistState() {
  if (!fs.existsSync(STATE_PATH)) {
    return null;
  }

  try {
    return JSON.parse(fs.readFileSync(STATE_PATH, "utf8"));
  } catch {
    return null;
  }
}

function savePlaylistState(state) {
  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), "utf8");
}

async function authenticate() {
  const savedTokens = loadTokens();

  if (savedTokens) {
    oauth2Client.setCredentials(savedTokens);

    console.log("🔑 Using saved YouTube authorization.");

    return oauth2Client;
  }

  return new Promise((resolve, reject) => {
    const server = http.createServer(async (req, res) => {
      try {
        const url = new URL(req.url, REDIRECT_URI);

        if (url.pathname !== "/oauth2callback") {
          res.writeHead(404);
          res.end("Not found");
          return;
        }

        const error = url.searchParams.get("error");

        if (error) {
          res.writeHead(400);

          res.end(`Authorization failed: ${error}`);

          server.close();

          reject(new Error(error));

          return;
        }

        const code = url.searchParams.get("code");

        if (!code) {
          res.writeHead(400);

          res.end("No authorization code received.");

          return;
        }

        const { tokens } = await oauth2Client.getToken(code);

        oauth2Client.setCredentials(tokens);

        saveTokens(tokens);

        res.writeHead(200, {
          "Content-Type": "text/html",
        });

        res.end(`
                <h1>✅ YouTube Authorization Successful</h1>
                <p>You can close this tab.</p>
              `);

        server.close();

        resolve(oauth2Client);
      } catch (error) {
        console.error(error);

        res.writeHead(500);

        res.end("Authentication failed.");

        server.close();

        reject(error);
      }
    });

    server.listen(PORT, "127.0.0.1", () => {
      const authUrl = oauth2Client.generateAuthUrl({
        access_type: "offline",
        prompt: "consent",
        scope: SCOPES,
      });

      console.log("\n🔐 Google authorization required.");

      openBrowser(authUrl);
    });
  });
}

async function createPlaylist(youtube) {
  console.log(`\n📁 Creating playlist: ${PLAYLIST_TITLE}`);

  const response = await youtube.playlists.insert({
    part: ["snippet", "status"],

    requestBody: {
      snippet: {
        title: PLAYLIST_TITLE,
        description: PLAYLIST_DESCRIPTION,
      },

      status: {
        privacyStatus: PLAYLIST_PRIVACY,
      },
    },
  });

  const playlist = response.data;

  console.log(`✅ Playlist created: ${playlist.snippet.title}`);

  console.log(`Playlist ID: ${playlist.id}`);

  return playlist.id;
}

async function searchSong(youtube, song) {
  const query = `${song.title} ${song.artist} Haryanvi`;

  console.log("\n========================================");

  console.log(`🔎 Searching: ${query}`);

  console.log("========================================");

  const response = await youtube.search.list({
    part: ["snippet"],
    q: query,
    type: ["video"],
    maxResults: 5,
    order: "relevance",
  });

  const results = response.data.items || [];

  if (results.length === 0) {
    console.log("❌ No results found.");

    return null;
  }

  const videoIds = results.map((result) => result.id?.videoId).filter(Boolean);

  let videoDetails = [];

  if (videoIds.length > 0) {
    const detailsResponse = await youtube.videos.list({
      part: ["contentDetails", "statistics"],

      id: videoIds,
    });

    videoDetails = detailsResponse.data.items || [];
  }

  const detailsMap = new Map(videoDetails.map((video) => [video.id, video]));

  const scoredResults = results.map((result) => {
    const videoId = result.id.videoId;

    const details = detailsMap.get(videoId);

    return {
      ...result,
      _score: scoreResult(song, result, details),
      _details: details,
    };
  });

  scoredResults.sort((a, b) => b._score - a._score);

  console.log("\n🎵 YouTube candidates:\n");

  scoredResults.forEach((result, index) => {
    const videoId = result.id.videoId;

    const details = result._details;

    const publishedAt = result.snippet.publishedAt;

    console.log(`${index + 1}. ${result.snippet.title}`);

    console.log(`   Match Score: ${result._score}%`);

    console.log(`   Channel: ${result.snippet.channelTitle}`);

    console.log(`   Uploaded: ${formatUploadAge(publishedAt)}`);

    console.log(`   Published: ${formatDate(publishedAt)}`);

    console.log(
      `   Duration: ${formatDuration(details?.contentDetails?.duration)}`,
    );

    console.log(`   Views: ${formatViews(details?.statistics?.viewCount)}`);

    console.log(`   ID: ${videoId}`);

    console.log(`   URL: https://www.youtube.com/watch?v=${videoId}`);

    console.log("");
  });

  return scoredResults;
}

function askForSelection(results, song, index, total) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    const recommended = results[0];

    console.log("\n----------------------------------------");

    console.log(`[${index + 1}/${total}] 🎵 ${song.title} — ${song.artist}`);

    console.log(`🥇 Recommended: ${recommended.snippet.title}`);

    console.log(`   Score: ${recommended._score}%`);

    console.log("\nY = Add recommended");

    console.log("N = Choose another result");

    console.log("S = Skip this song");

    console.log("Q = Quit and resume later");

    rl.question("\nYour choice: ", (answer) => {
      const choice = answer.trim().toLowerCase();

      if (choice === "y" || choice === "") {
        rl.close();

        resolve({
          action: "add",
          result: recommended,
        });

        return;
      }

      if (choice === "s") {
        rl.close();

        resolve({
          action: "skip",
          result: null,
        });

        return;
      }

      if (choice === "q") {
        rl.close();

        resolve({
          action: "quit",
          result: null,
        });

        return;
      }

      if (choice === "n") {
        rl.question(
          `Choose result (1-${results.length}), or 0 to skip: `,
          (selectionAnswer) => {
            const selection = Number(selectionAnswer);

            rl.close();

            if (selection === 0) {
              resolve({
                action: "skip",
                result: null,
              });

              return;
            }

            if (
              !Number.isInteger(selection) ||
              selection < 1 ||
              selection > results.length
            ) {
              console.log("⚠️ Invalid selection. Skipping.");

              resolve({
                action: "skip",
                result: null,
              });

              return;
            }

            resolve({
              action: "add",
              result: results[selection - 1],
            });
          },
        );

        return;
      }

      rl.close();

      console.log("⚠️ Invalid choice. Skipping.");

      resolve({
        action: "skip",
        result: null,
      });
    });
  });
}

async function isVideoAlreadyInPlaylist(youtube, playlistId, videoId) {
  let nextPageToken;

  do {
    const response = await youtube.playlistItems.list({
      part: ["snippet"],
      playlistId,
      maxResults: 50,
      pageToken: nextPageToken,
    });

    const items = response.data.items || [];

    const exists = items.some(
      (item) => item.snippet?.resourceId?.videoId === videoId,
    );

    if (exists) {
      return true;
    }

    nextPageToken = response.data.nextPageToken;
  } while (nextPageToken);

  return false;
}

async function addVideoToPlaylist(youtube, playlistId, videoId) {
  const alreadyExists = await isVideoAlreadyInPlaylist(
    youtube,
    playlistId,
    videoId,
  );

  if (alreadyExists) {
    console.log("⚠️ Video already exists in playlist. Skipping.");

    return false;
  }

  await youtube.playlistItems.insert({
    part: ["snippet"],

    requestBody: {
      snippet: {
        playlistId,

        resourceId: {
          kind: "youtube#video",
          videoId,
        },
      },
    },
  });

  console.log("✅ Added to playlist.");

  return true;
}

async function main() {
  console.log("");

  console.log("🎵 GanaSuno YouTube Playlist Manager — NEW");

  console.log("===========================================");

  console.log(`📚 Songs in catalog: ${songs.length}`);

  try {
    const auth = await authenticate();

    const youtube = google.youtube({
      version: "v3",
      auth,
    });

    const channelResponse = await youtube.channels.list({
      part: ["snippet"],
      mine: true,
    });

    const channel = channelResponse.data.items?.[0];

    if (channel) {
      console.log(`\n📺 YouTube channel: ${channel.snippet.title}`);
    }

    let state = loadPlaylistState();

if (!state || !state.playlistId) {
  if (state && !state.playlistId) {
    console.log("\n⚠️ Existing playlist state has no valid playlist ID.");
    console.log("🆕 Creating a new Haryanvi New playlist...");
  } else {
    console.log("\n🆕 No New playlist state found.");
    console.log("🆕 Creating Haryanvi New playlist...");
  }

  const playlistId = await createPlaylist(youtube);

  state = {
    playlistId,
    playlistTitle: PLAYLIST_TITLE,
    nextSongIndex: state?.nextSongIndex ?? 0,
    addedSongs: state?.addedSongs ?? [],
    skippedSongs: state?.skippedSongs ?? [],
    completed: false,
  };

  savePlaylistState(state);

  console.log("\n💾 New playlist state saved.");
  console.log(`🆔 Playlist ID: ${playlistId}`);
} else {
  console.log("\n♻️ Existing New playlist state found.");

  console.log(`📁 Playlist: ${state.playlistTitle}`);

  console.log(`🆔 Playlist ID: ${state.playlistId}`);

  console.log(
    `▶️ Next song: ${state.nextSongIndex + 1}/${songs.length}`,
  );
}

    if (state.completed) {
      console.log("\n✅ This catalog is already completed.");

      console.log(
        `Playlist URL: https://www.youtube.com/playlist?list=${state.playlistId}`,
      );

      return;
    }

    for (let index = state.nextSongIndex; index < songs.length; index++) {
      const song = songs[index];

      console.log("\n\n########################################");

      console.log(`📀 SONG ${index + 1}/${songs.length}`);

      console.log(`🎵 ${song.title}`);

      console.log(`👤 ${song.artist}`);

      console.log(`📅 ${song.year}`);

      console.log("########################################");

      const results = await searchSong(youtube, song);

      if (!results) {
        console.log("⚠️ No YouTube result found. Marking as skipped.");

        state.skippedSongs.push({
          index,
          ...song,
          reason: "No search results",
        });

        state.nextSongIndex = index + 1;

        savePlaylistState(state);

        continue;
      }

      const decision = await askForSelection(
        results,
        song,
        index,
        songs.length,
      );

      if (decision.action === "quit") {
        console.log("\n🛑 Stopping importer.");

        console.log("💾 Progress has been saved.");

        console.log(`▶️ Resume from song ${index + 1} next time.`);

        savePlaylistState(state);

        return;
      }

      if (decision.action === "skip") {
        console.log("⏭️ Song skipped.");

        state.skippedSongs.push({
          index,
          ...song,
          reason: "User skipped",
        });

        state.nextSongIndex = index + 1;

        savePlaylistState(state);

        continue;
      }

      if (decision.action === "add") {
        const videoId = decision.result.id.videoId;

        const added = await addVideoToPlaylist(
          youtube,
          state.playlistId,
          videoId,
        );

        state.addedSongs.push({
          index,
          ...song,
          videoId,
          youtubeTitle: decision.result.snippet.title,
          channel: decision.result.snippet.channelTitle,
          matchScore: decision.result._score,
          added,
        });

        state.nextSongIndex = index + 1;

        savePlaylistState(state);

        console.log(`💾 Progress saved: ${index + 1}/${songs.length}`);
      }
    }

    state.completed = true;

    state.nextSongIndex = songs.length;

    savePlaylistState(state);

    console.log("\n\n===========================================");

    console.log("🎉 HARYANVI NEW CATALOG COMPLETE");

    console.log("===========================================");

    console.log(`\nTotal songs: ${songs.length}`);

    console.log(`Added: ${state.addedSongs.length}`);

    console.log(`Skipped: ${state.skippedSongs.length}`);

    console.log(
      `\nPlaylist URL: https://www.youtube.com/playlist?list=${state.playlistId}`,
    );
  } catch (error) {
    console.error("\n❌ Error:");

    console.error(error.response?.data || error.message);

    console.log("\n💾 Previous progress remains saved.");
  }
}

main();
