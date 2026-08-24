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
const STATE_PATH = path.join(__dirname, "playlist-state-punjabi-new.json");
const SONGS_PATH = path.join(__dirname, "songs-punjabi-new.json");
const songs = require(SONGS_PATH);

const oauth2Client = new google.auth.OAuth2(
  process.env.YOUTUBE_CLIENT_ID,
  process.env.YOUTUBE_CLIENT_SECRET,
  REDIRECT_URI,
);

const SCOPES = ["https://www.googleapis.com/auth/youtube"];
const PLAYLIST_TITLE = "GanaSuno — Punjabi New";
const PLAYLIST_DESCRIPTION = "GanaSuno Punjabi New catalog — curated Punjabi music.";
const PLAYLIST_PRIVACY = "public";

const PENALTY_WORDS = [
  "remix", "dj", "slowed", "reverb", "slowed + reverb",
  "cover", "unplugged", "karaoke", "instrumental", "lofi", "lo-fi",
  "mashup", "nightcore", "bass boosted", "8d", "reaction",
  "status", "shorts", "short",
];

const POSITIVE_CHANNEL_WORDS = [
  "saregama", "t-series", "zee music", "tips", "studio sangeeta",
  "ishtar", "venus", "rajshri", "ishu music", "wave music",
];

function normalizeText(text) {
  return String(text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\\u0300-\\u036f]/g, "")
    .replace(/[^\\p{L}\\p{N}\\s]/gu, " ")
    .replace(/\\s+/g, " ")
    .trim();
}

function tokenize(text) {
  return normalizeText(text).split(" ").filter((word) => word.length > 1);
}

function tokenMatchScore(target, candidate) {
  const targetTokens = tokenize(target);
  const candidateTokens = tokenize(candidate);
  if (!targetTokens.length) return 0;
  return targetTokens.filter((token) => candidateTokens.includes(token)).length / targetTokens.length;
}

function containsPenaltyWord(text) {
  const normalized = normalizeText(text);
  return PENALTY_WORDS.some((word) => normalized.includes(normalizeText(word)));
}

function channelQuality(channelName) {
  const normalized = normalizeText(channelName);
  return POSITIVE_CHANNEL_WORDS.some((word) =>
    normalized.includes(normalizeText(word))
  ) ? 10 : 0;
}

function parseDuration(duration) {
  const match = String(duration || "").match(/PT(?:(\\d+)H)?(?:(\\d+)M)?(?:(\\d+)S)?/);
  if (!match) return 0;
  return Number(match[1] || 0) * 3600 +
    Number(match[2] || 0) * 60 +
    Number(match[3] || 0);
}

function scoreResult(song, result, details) {
  const title = result.snippet.title || "";
  let score = tokenMatchScore(song.title, title) * 45;
  score += tokenMatchScore(song.artist, title) * 25;
  score += channelQuality(result.snippet.channelTitle || "");

  const views = Number(details?.statistics?.viewCount || 0);
  if (views >= 1e9) score += 10;
  else if (views >= 1e8) score += 9;
  else if (views >= 1e7) score += 8;
  else if (views >= 1e6) score += 6;
  else if (views >= 1e5) score += 4;
  else if (views >= 1e4) score += 2;

  if (containsPenaltyWord(title)) score -= 25;

  const seconds = parseDuration(details?.contentDetails?.duration);
  if (seconds > 0 && seconds < 90) score -= 20;
  else if (seconds >= 150) score += 5;

  return Math.max(0, Math.min(100, Math.round(score)));
}

function formatDuration(duration) {
  const seconds = parseDuration(duration);
  if (!seconds) return "Unknown";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return h
    ? `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
    : `${m}:${String(s).padStart(2, "0")}`;
}

function formatViews(viewCount) {
  const views = Number(viewCount || 0);
  if (views >= 1e9) return `${(views / 1e9).toFixed(1)}B`;
  if (views >= 1e6) return `${(views / 1e6).toFixed(1)}M`;
  if (views >= 1e3) return `${(views / 1e3).toFixed(1)}K`;
  return views.toLocaleString("en-IN");
}

function openBrowser(url) {
  const command =
    process.platform === "win32" ? `start "" "${url}"` :
    process.platform === "darwin" ? `open "${url}"` :
    `xdg-open "${url}"`;
  exec(command);
}

function saveTokens(tokens) {
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2), "utf8");
}

function loadTokens() {
  if (!fs.existsSync(TOKEN_PATH)) return null;
  try { return JSON.parse(fs.readFileSync(TOKEN_PATH, "utf8")); }
  catch { return null; }
}

function loadPlaylistState() {
  if (!fs.existsSync(STATE_PATH)) return null;
  try { return JSON.parse(fs.readFileSync(STATE_PATH, "utf8")); }
  catch { return null; }
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
          res.writeHead(404); res.end("Not found"); return;
        }
        const error = url.searchParams.get("error");
        if (error) {
          res.writeHead(400); res.end(`Authorization failed: ${error}`);
          server.close(); reject(new Error(error)); return;
        }
        const code = url.searchParams.get("code");
        if (!code) {
          res.writeHead(400); res.end("No authorization code received."); return;
        }
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);
        saveTokens(tokens);
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("<h1>✅ YouTube Authorization Successful</h1><p>You can close this tab.</p>");
        server.close();
        resolve(oauth2Client);
      } catch (error) {
        res.writeHead(500); res.end("Authentication failed.");
        server.close(); reject(error);
      }
    });

    server.listen(PORT, "127.0.0.1", () => {
      const authUrl = oauth2Client.generateAuthUrl({
        access_type: "offline",
        prompt: "consent",
        scope: SCOPES,
      });
      openBrowser(authUrl);
    });
  });
}

async function createPlaylist(youtube) {
  const response = await youtube.playlists.insert({
    part: ["snippet", "status"],
    requestBody: {
      snippet: {
        title: PLAYLIST_TITLE,
        description: PLAYLIST_DESCRIPTION,
      },
      status: { privacyStatus: PLAYLIST_PRIVACY },
    },
  });
  console.log(`✅ Playlist created: ${response.data.id}`);
  return response.data.id;
}

async function searchSong(youtube, song) {
  const query = `${song.title} ${song.artist} Punjabi`;
  console.log(`\\n🔎 Searching: ${query}`);

  const response = await youtube.search.list({
    part: ["snippet"],
    q: query,
    type: ["video"],
    maxResults: 5,
    order: "relevance",
  });

  const results = response.data.items || [];
  if (!results.length) return null;

  const videoIds = results.map((r) => r.id?.videoId).filter(Boolean);
  const detailsResponse = await youtube.videos.list({
    part: ["contentDetails", "statistics"],
    id: videoIds,
  });

  const detailsMap = new Map(
    (detailsResponse.data.items || []).map((video) => [video.id, video])
  );

  const scored = results.map((result) => {
    const details = detailsMap.get(result.id.videoId);
    return {
      ...result,
      _details: details,
      _score: scoreResult(song, result, details),
    };
  }).sort((a, b) => b._score - a._score);

  console.log("\\n🎵 YouTube candidates:");
  scored.forEach((r, i) => {
    console.log(`${i + 1}. ${r.snippet.title}`);
    console.log(`   Match Score: ${r._score}%`);
    console.log(`   Channel: ${r.snippet.channelTitle}`);
    console.log(`   Duration: ${formatDuration(r._details?.contentDetails?.duration)}`);
    console.log(`   Views: ${formatViews(r._details?.statistics?.viewCount)}`);
    console.log(`   ID: ${r.id.videoId}`);
    console.log(`   URL: https://www.youtube.com/watch?v=${r.id.videoId}`);
  });

  return scored;
}

function askForSelection(results, song, index, total) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  return new Promise((resolve) => {
    const recommended = results[0];
    console.log(`\\n[${index + 1}/${total}] 🎵 ${song.title} — ${song.artist}`);
    console.log(`🥇 Recommended: ${recommended.snippet.title}`);
    console.log(`   Score: ${recommended._score}%`);
    console.log("Y = Add recommended | N = Choose another | S = Skip | Q = Quit");

    rl.question("Your choice: ", (answer) => {
      const choice = answer.trim().toLowerCase();

      if (choice === "y" || choice === "") {
        rl.close();
        resolve({ action: "add", result: recommended });
        return;
      }

      if (choice === "s") {
        rl.close();
        resolve({ action: "skip" });
        return;
      }

      if (choice === "q") {
        rl.close();
        resolve({ action: "quit" });
        return;
      }

      if (choice === "n") {
        rl.question(`Choose result (1-${results.length}), or 0 to skip: `, (value) => {
          const selection = Number(value);
          rl.close();

          if (selection === 0) return resolve({ action: "skip" });
          if (!Number.isInteger(selection) || selection < 1 || selection > results.length) {
            return resolve({ action: "skip" });
          }

          resolve({ action: "add", result: results[selection - 1] });
        });
        return;
      }

      rl.close();
      resolve({ action: "skip" });
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

    const exists = (response.data.items || []).some(
      (item) => item.snippet?.resourceId?.videoId === videoId
    );

    if (exists) return true;
    nextPageToken = response.data.nextPageToken;
  } while (nextPageToken);

  return false;
}

async function addVideoToPlaylist(youtube, playlistId, videoId) {
  if (await isVideoAlreadyInPlaylist(youtube, playlistId, videoId)) {
    console.log("⚠️ Video already exists. Skipping.");
    return false;
  }

  await youtube.playlistItems.insert({
    part: ["snippet"],
    requestBody: {
      snippet: {
        playlistId,
        resourceId: { kind: "youtube#video", videoId },
      },
    },
  });

  console.log("✅ Added to playlist.");
  return true;
}

async function main() {
  console.log(`🎵 GanaSuno YouTube Playlist Manager — ${PLAYLIST_TITLE}`);
  console.log(`📚 Songs in catalog: ${songs.length}`);

  try {
    const auth = await authenticate();
    const youtube = google.youtube({ version: "v3", auth });

    let state = loadPlaylistState();

    if (!state || !state.playlistId) {
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
    } else {
      console.log(`♻️ Resuming ${state.playlistTitle}`);
      console.log(`🆔 Playlist ID: ${state.playlistId}`);
      console.log(`▶️ Next song: ${state.nextSongIndex + 1}/${songs.length}`);
    }

    if (state.completed) {
      console.log(`✅ Catalog already completed: ${state.playlistId}`);
      return;
    }

    for (let index = state.nextSongIndex; index < songs.length; index++) {
      const song = songs[index];
      const results = await searchSong(youtube, song);

      if (!results) {
        state.skippedSongs.push({ index, ...song, reason: "No search results" });
        state.nextSongIndex = index + 1;
        savePlaylistState(state);
        continue;
      }

      const decision = await askForSelection(results, song, index, songs.length);

      if (decision.action === "quit") {
        savePlaylistState(state);
        console.log(`🛑 Stopped. Resume from song ${index + 1}.`);
        return;
      }

      if (decision.action === "skip") {
        state.skippedSongs.push({ index, ...song, reason: "User skipped" });
        state.nextSongIndex = index + 1;
        savePlaylistState(state);
        continue;
      }

      const videoId = decision.result.id.videoId;
      const added = await addVideoToPlaylist(state.youtube, state.playlistId, videoId).catch(() =>
        addVideoToPlaylist(youtube, state.playlistId, videoId)
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

    state.completed = true;
    state.nextSongIndex = songs.length;
    savePlaylistState(state);

    console.log(`🎉 ${PLAYLIST_TITLE} COMPLETE`);
    console.log(`Playlist ID: ${state.playlistId}`);
    console.log(`Added: ${state.addedSongs.length}`);
    console.log(`Skipped: ${state.skippedSongs.length}`);
  } catch (error) {
    console.error("❌ Error:", error.response?.data || error.message);
    console.log("💾 Previous progress remains saved.");
  }
}

main();
