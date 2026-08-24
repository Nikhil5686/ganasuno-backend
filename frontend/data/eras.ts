import type { CSSProperties } from "react";
import type { LanguageEraId, Song } from "@/types/music";

export type EraThemeConfig = {
  accentColor: string;
  glassStyle: string | CSSProperties;
  backgroundStyle: string | CSSProperties;
};

export type EraAmbientSoundConfig = {
  enabled: boolean;
  url: string;
  volume: number;
};

export type EraQuoteConfig = {
  primary: string;
  alternates?: string[];
  dynamic?: string[];
};

export type EraWorldObject = {
  name: string;
  label: string;
  action: string;
};

export type EraWorldConfig = {
  background: string;
  scene: string;
  worldLabel?: string;
  ambientSound: EraAmbientSoundConfig;
  character: string;
  characterIcon?: string;
  quotes: EraQuoteConfig;
  objects: EraWorldObject[];
};

export type EraMusicConfig = {
  songs: Song[];
};

export type EraInteractionConfig = {
  button: string;
  action: string;
};

const EMPTY_AMBIENT: EraAmbientSoundConfig = {
  enabled: false,
  url: "",
  volume: 0,
};

const EMPTY_QUOTES: EraQuoteConfig = {
  primary: "",
  alternates: [],
};

const EMPTY_WORLD: Omit<EraWorldConfig, "background"> = {
  scene: "",
  ambientSound: EMPTY_AMBIENT,
  character: "",
  quotes: EMPTY_QUOTES,
  objects: [],
};

export type EraConfig = {
  id: LanguageEraId;
  language?: string;
  title: string;
  description: string;
  default: boolean;
  theme: EraThemeConfig;
  world: EraWorldConfig;
  music: EraMusicConfig;
  interaction: EraInteractionConfig;
};

export const ERAS: EraConfig[] = [
  // 1970s
  {
    id: "1970s",
    title: "1970's",
    description: "Disco grooves, soulful ballads, and classic rock anthems",
    default: false,

    theme: {
      accentColor: "#f97316",
      glassStyle: "",
      backgroundStyle: "",
    },

    world: {
      background: "/eras/1970s.png",
      scene: "Retro disco room with vinyl records and warm lights",
      worldLabel: "1970's Retro Era",

      ambientSound: EMPTY_AMBIENT,

      character: "Vinyl Dada",
      characterIcon: "🎵",

      quotes: {
        primary: "विनाइल की आवाज़ में एक अलग ही जादू था...",
      },

      objects: [
        {
          name: "vinyl",
          label: "Play Vinyl",
          action: "vinyl",
        },
      ],
    },

    music: {
      songs: [],
    },

    interaction: {
      button: "🎵 Spin Vinyl",
      action: "spin-vinyl",
    },
  },
  // 1980s
  {
    id: "1980s",
    title: "1980's",
    description: "Synth sounds, disco energy, and unforgettable melodies",

    default: false,

    theme: {
      accentColor: "#c084fc",
      glassStyle: "",
      backgroundStyle: "",
    },

    world: {
      background: "/eras/1980s.png",

      scene:
        "Colorful 1980s Indian music room with cassette decks, neon lights and vintage posters",

      worldLabel: "1980's Retro Era",

      ambientSound: EMPTY_AMBIENT,

      character: "Cassette Bhaiya",
      characterIcon: "📼",

      quotes: {
        primary: "उस दौर के गाने आज भी दिल में वैसे ही बजते हैं...",
      },

      objects: [
        {
          name: "cassette",
          label: "Play Cassette",
          action: "play-cassette",
        },
        {
          name: "radio",
          label: "Tune Radio",
          action: "tune",
        },
      ],
    },

    music: {
      songs: [],
    },

    interaction: {
      button: "📼 Play Cassette",
      action: "play-cassette",
    },
  },

  // 1990s
  {
    id: "1990s",
    title: "1990's",
    description: "Golden era of nostalgic melodies",
    default: true,

    theme: {
      accentColor: "#e8a54b",

      glassStyle: {
        background: "rgba(36,24,14,0.52)",
        borderColor: "rgba(232,165,75,0.28)",
        backdropFilter: "blur(20px) saturate(120%)",
        WebkitBackdropFilter: "blur(20px) saturate(120%)",
      },

      backgroundStyle: {
        background:
          "linear-gradient(180deg, rgba(80,45,20,0.32) 0%, rgba(20,12,8,0.58) 100%)",
      },
    },

    world: {
      background: "/eras/1990s/background.png",

      scene:
        "1990s Indian living room with old TV, cassette player and warm lights",

      worldLabel: "1990's Bollywood Era",

      ambientSound: {
        enabled: true,
        url: "",
        volume: 0.25,
      },

      character: "Radio Uncle",
      characterIcon: "📻",

      quotes: {
        primary: "अरे बेटा, ये गाना तो पूरा मोहल्ला सुनता था...",

        alternates: [
          "उस जमाने में गाने सिर्फ सुने नहीं जाते थे, महसूस किए जाते थे.",
          "कैसेट रिवाइंड करके, फिर से वही धुन... वही यादें।",
        ],
      },

      objects: [
        {
          name: "cassette",
          label: "Play Cassette",
          action: "rewind",
        },
        {
          name: "radio",
          label: "Tune Radio",
          action: "tune",
        },
        {
          name: "television",
          label: "Switch Channel",
          action: "channel",
        },
      ],
    },

    music: {
      songs: [],
    },

    interaction: {
      button: "📻 Turn On Radio",
      action: "toggle-radio",
    },
  },

  // 2000s
  {
    id: "2000s",
    title: "2000's",
    description: "The digital revolution of music",

    default: false,

    theme: {
      accentColor: "#38bdf8",
      glassStyle: "",
      backgroundStyle: "",
    },

    world: {
      background: "/eras/2000s.png",

      scene: "Early 2000s bedroom with computer, CDs and Nokia phones",

      worldLabel: "2000's Digital Revolution",

      ambientSound: EMPTY_AMBIENT,

      character: "Cyber Cafe Bhaiya",
      characterIcon: "💿",

      quotes: {
        primary: "Beta ek minute, internet connect ho raha hai...",

        alternates: [
          "Ringtone aur CD collections ka zamana tha.",
          "Ek gaana download karna bhi ek adventure hota tha.",
        ],
      },

      objects: [
        {
          name: "computer",
          label: "Open Internet",
          action: "browse",
        },
        {
          name: "cd",
          label: "Play CD",
          action: "play-cd",
        },
        {
          name: "phone",
          label: "Check Nokia",
          action: "nokia",
        },
      ],
    },

    music: {
      songs: [],
    },

    interaction: {
      button: "💿 Enter Digital Era",
      action: "open-digital-world",
    },
  },

  // 2010s
  {
    id: "2010s",
    title: "2010's",
    description: "Streaming-era favorites",

    default: false,

    theme: {
      accentColor: "#34d399",
      glassStyle: "",
      backgroundStyle: "",
    },

    world: {
      background: "/eras/2010s.png",

      scene: "Early smartphone era with headphones and online music",

      worldLabel: "2010's Streaming Era",

      ambientSound: EMPTY_AMBIENT,

      character: "Playlist Friend",
      characterIcon: "🎧",

      quotes: {
        primary: "Ek playlist aur hazaar memories...",
      },

      objects: [
        {
          name: "phone",
          label: "Open Playlist",
          action: "playlist",
        },
        {
          name: "headphones",
          label: "Wear Headphones",
          action: "listen",
        },
      ],
    },

    music: {
      songs: [],
    },

    interaction: {
      button: "🎧 Open Playlist",
      action: "open-playlist",
    },
  },

  // 2020s
  {
    id: "2020s",
    title: "2020's",
    description: "Contemporary nostalgia and music of today",

    default: false,

    theme: {
      accentColor: "#fb7185",
      glassStyle: "",
      backgroundStyle: "",
    },

    world: {
      background: "/eras/2020s.png",

      scene: "Modern digital music era",

      worldLabel: "2020's Modern Era",

      ambientSound: EMPTY_AMBIENT,

      character: "Digital DJ",
      characterIcon: "🎧",

      quotes: {
        primary: "हर generation की अपनी soundtrack होती है.",
      },

      objects: [
        {
          name: "phone",
          label: "Discover Music",
          action: "discover",
        },
      ],
    },

    music: {
      songs: [],
    },

    interaction: {
      button: "🎧 Explore Music",
      action: "explore",
    },
  },
  // Bhojpuri Old
  {
    id: "old",
    language: "Bhojpuri",
    title: "Old",
    description: "Classic Bhojpuri songs and timeless memories",
    default: false,

    theme: {
      accentColor: "#d4a574",
      glassStyle: {
        background: "rgba(36,24,14,0.52)",
        borderColor: "rgba(212,165,116,0.28)",
        backdropFilter: "blur(20px) saturate(120%)",
        WebkitBackdropFilter: "blur(20px) saturate(120%)",
      },
      backgroundStyle: {
        background:
          "linear-gradient(180deg, rgba(80,45,20,0.32) 0%, rgba(20,12,8,0.58) 100%)",
      },
    },

    world: {
      background: "/eras/1990s/background.png",
      scene: "Classic Bhojpuri music room with cassette player and warm lights",
      worldLabel: "Bhojpuri Old Era",
      ambientSound: EMPTY_AMBIENT,

      character: "Bhojpuri Radio Uncle",
      characterIcon: "📻",

      quotes: {
        primary: "पुराने भोजपुरी गानों में एक अलग ही मिट्टी की खुशबू थी...",
        alternates: [
          "कुछ गाने पुराने होते हैं, लेकिन उनकी यादें कभी पुरानी नहीं होतीं.",
          "वो दौर जब भोजपुरी गाने हर गली और हर घर में बजते थे.",
        ],
      },

      objects: [
        {
          name: "radio",
          label: "Tune Radio",
          action: "tune",
        },
        {
          name: "cassette",
          label: "Play Cassette",
          action: "rewind",
        },
      ],
    },

    music: {
      songs: [],
    },

    interaction: {
      button: "📻 Tune Bhojpuri Radio",
      action: "toggle-radio",
    },
  },

  // Bhojpuri New
  {
    id: "new",
    language: "Bhojpuri",
    title: "New",
    description: "Modern Bhojpuri hits and contemporary favorites",
    default: false,

    theme: {
      accentColor: "#fb7185",
      glassStyle: {
        background: "rgba(35,18,24,0.52)",
        borderColor: "rgba(251,113,133,0.28)",
        backdropFilter: "blur(20px) saturate(120%)",
        WebkitBackdropFilter: "blur(20px) saturate(120%)",
      },
      backgroundStyle: {
        background:
          "linear-gradient(180deg, rgba(90,25,40,0.28) 0%, rgba(20,8,12,0.58) 100%)",
      },
    },

    world: {
      background: "/eras/2020s.png",
      scene:
        "Modern Bhojpuri music world with digital playlists and headphones",
      worldLabel: "Bhojpuri New Era",
      ambientSound: EMPTY_AMBIENT,

      character: "Bhojpuri DJ",
      characterIcon: "🎧",

      quotes: {
        primary: "नए दौर की धुन, लेकिन भोजपुरी का वही अंदाज़...",
        alternates: [
          "नई generation, नई धुनें, वही Bhojpuri vibe.",
          "हर दौर की अपनी आवाज़ होती है.",
        ],
      },

      objects: [
        {
          name: "phone",
          label: "Discover Music",
          action: "discover",
        },
        {
          name: "headphones",
          label: "Listen",
          action: "listen",
        },
      ],
    },

    music: {
      songs: [],
    },

    interaction: {
      button: "🎧 Explore Bhojpuri",
      action: "explore",
    },
  },

  // Haryanvi Old
  {
    id: "old",
    language: "Haryanvi",
    title: "Old",
    description: "Classic Haryanvi memories",
    default: false,

    theme: {
      accentColor: "#e8a54b",
      glassStyle: "",
      backgroundStyle: "",
    },

    world: {
      background: "/eras/haryanvi-old.png",
      scene: "Old Haryanvi music era",
      worldLabel: "Haryanvi Old Era",
      ambientSound: EMPTY_AMBIENT,
      character: "Haryanvi Radio Uncle",
      characterIcon: "📻",
      quotes: {
        primary: "पुराने हरियाणवी गानों में देसी मिट्टी की खुशबू थी...",
        alternates: [
          "वो पुराने दिन, वो पुराने गाने... आज भी दिल में बसे हैं।",
          "रेडियो और कैसेट के जमाने की अपनी अलग यादें थीं।",
        ],
      },
      objects: [],
    },

    music: {
      songs: [],
    },

    interaction: {
      button: "📻 Tune Haryanvi Radio",
      action: "tune-radio",
    },
  },

  // Haryanvi Old
  {
    id: "new",
    language: "Haryanvi",
    title: "New",
    description: "Modern Haryanvi hits",
    default: false,

    theme: {
      accentColor: "#38bdf8",
      glassStyle: "",
      backgroundStyle: "",
    },

    world: {
      background: "/eras/haryanvi-new.png",
      scene: "Modern Haryanvi music era",
      worldLabel: "Haryanvi New Era",
      ambientSound: EMPTY_AMBIENT,
      character: "Haryanvi DJ",
      characterIcon: "🎧",
      quotes: {
        primary: "नई बीट्स, लेकिन हरियाणवी अंदाज़ वही...",
        alternates: [
          "आज के गाने, नई आवाज़ और वही देसी रंग।",
          "हरियाणवी म्यूजिक का नया दौर शुरू हो चुका है।",
        ],
      },
      objects: [],
    },

    music: {
      songs: [],
    },

    interaction: {
      button: "🎧 Explore Haryanvi",
      action: "explore-haryanvi",
    },
  },
  // Gujarati Old
  {
    id: "old",
    language: "Gujarati",
    title: "Old",
    description: "Classic Gujarati songs, folk melodies, and timeless memories",
    default: false,

    theme: {
      accentColor: "#d4a574",
      glassStyle: {
        background: "rgba(36,24,14,0.52)",
        borderColor: "rgba(212,165,116,0.28)",
        backdropFilter: "blur(20px) saturate(120%)",
        WebkitBackdropFilter: "blur(20px) saturate(120%)",
      },
      backgroundStyle: {
        background:
          "linear-gradient(180deg, rgba(80,45,20,0.32) 0%, rgba(20,12,8,0.58) 100%)",
      },
    },

    world: {
      background: "/eras/1990s/background.png",
      scene:
        "Classic Gujarati music room with a vintage radio, cassette player, wooden furniture and warm nostalgic lights",
      worldLabel: "Gujarati Old Era",
      ambientSound: EMPTY_AMBIENT,

      character: "Gujarati Radio Uncle",
      characterIcon: "📻",

      quotes: {
        primary: "જૂના ગુજરાતી ગીતોમાં એક અલગ જ માટીની સુગંધ અને યાદો હતી...",
        alternates: [
          "કેટલાક ગીતો જૂના થાય છે, પરંતુ તેમની યાદો ક્યારેય જૂની થતી નથી.",
          "રેડિયો, કેસેટ અને ગુજરાતી લોકસંગીતનો એ જમાનાનો અલગ જ આનંદ હતો.",
          "જૂની ધૂન વાગે એટલે જૂની યાદો આપોઆપ પાછી આવી જાય.",
        ],
      },

      objects: [
        {
          name: "radio",
          label: "Tune Radio",
          action: "tune",
        },
        {
          name: "cassette",
          label: "Play Cassette",
          action: "rewind",
        },
      ],
    },

    music: {
      songs: [],
    },

    interaction: {
      button: "📻 Tune Gujarati Radio",
      action: "toggle-radio",
    },
  },

  // Gujarati New
  {
    id: "new",
    language: "Gujarati",
    title: "New",
    description:
      "Modern Gujarati hits, folk-pop, Garba, and contemporary favorites",
    default: false,

    theme: {
      accentColor: "#fb7185",
      glassStyle: {
        background: "rgba(35,18,24,0.52)",
        borderColor: "rgba(251,113,133,0.28)",
        backdropFilter: "blur(20px) saturate(120%)",
        WebkitBackdropFilter: "blur(20px) saturate(120%)",
      },
      backgroundStyle: {
        background:
          "linear-gradient(180deg, rgba(90,25,40,0.28) 0%, rgba(20,8,12,0.58) 100%)",
      },
    },

    world: {
      background: "/eras/2020s.png",
      scene:
        "Modern Gujarati music world with digital playlists, headphones, colorful lights and contemporary Gujarati culture",
      worldLabel: "Gujarati New Era",
      ambientSound: EMPTY_AMBIENT,

      character: "Gujarati DJ",
      characterIcon: "🎧",

      quotes: {
        primary: "નવી બીટ્સ, નવી ધૂન... પણ ગુજરાતી મ્યુઝિકનો અંદાજ એ જ.",
        alternates: [
          "આજના ગુજરાતી ગીતોમાં પરંપરા અને modern vibe બંને સાથે મળે છે.",
          "નવી generation, નવી ધૂન અને એ જ ગુજરાતી રંગ.",
          "ગુજરાતી મ્યુઝિકનો નવો યુગ શરૂ થઈ ગયો છે.",
        ],
      },

      objects: [
        {
          name: "phone",
          label: "Discover Music",
          action: "discover",
        },
        {
          name: "headphones",
          label: "Listen",
          action: "listen",
        },
      ],
    },

    music: {
      songs: [],
    },

    interaction: {
      button: "🎧 Explore Gujarati",
      action: "explore-gujarati",
    },
  },

  // Punjabi Old
  {
    id: "old",
    language: "Punjabi",
    title: "Old",
    description: "Classic Punjabi songs, folk melodies, and timeless memories",
    default: false,

    theme: {
      accentColor: "#e8a54b",
      glassStyle: {
        background: "rgba(36,24,14,0.52)",
        borderColor: "rgba(232,165,75,0.28)",
        backdropFilter: "blur(20px) saturate(120%)",
        WebkitBackdropFilter: "blur(20px) saturate(120%)",
      },
      backgroundStyle: {
        background:
          "linear-gradient(180deg, rgba(80,45,20,0.32) 0%, rgba(20,12,8,0.58) 100%)",
      },
    },

    world: {
      background: "/eras/1990s/background.png",
      scene:
        "Classic Punjabi music room with vintage radio, cassette player, wooden furniture and warm nostalgic lights",
      worldLabel: "Punjabi Old Era",
      ambientSound: EMPTY_AMBIENT,

      character: "Punjabi Radio Uncle",
      characterIcon: "📻",

      quotes: {
        primary: "ਪੁਰਾਣੇ ਪੰਜਾਬੀ ਗੀਤਾਂ ਵਿੱਚ ਮਿੱਟੀ ਦੀ ਆਪਣੀ ਹੀ ਖੁਸ਼ਬੂ ਸੀ...",
        alternates: [
          "ਪੁਰਾਣੇ ਗੀਤ ਸੁਣਦੇ ਹੀ ਪੁਰਾਣੀਆਂ ਯਾਦਾਂ ਆਪਣੇ ਆਪ ਵਾਪਸ ਆ ਜਾਂਦੀਆਂ ਨੇ।",
          "ਰੇਡੀਓ, ਕੈਸੇਟ ਤੇ ਪੰਜਾਬੀ ਲੋਕ-ਸੰਗੀਤ ਦਾ ਉਹ ਦੌਰ ਹੀ ਵੱਖਰਾ ਸੀ।",
          "ਕੁਝ ਧੁਨਾਂ ਪੁਰਾਣੀਆਂ ਹੁੰਦੀਆਂ ਨੇ, ਪਰ ਉਹਨਾਂ ਦੀਆਂ ਯਾਦਾਂ ਕਦੇ ਪੁਰਾਣੀਆਂ ਨਹੀਂ ਹੁੰਦੀਆਂ।",
        ],
      },

      objects: [
        {
          name: "radio",
          label: "Tune Radio",
          action: "tune",
        },
        {
          name: "cassette",
          label: "Play Cassette",
          action: "rewind",
        },
      ],
    },

    music: {
      songs: [],
    },

    interaction: {
      button: "📻 Tune Punjabi Radio",
      action: "toggle-radio",
    },
  },

  // Punjabi New
  {
    id: "new",
    language: "Punjabi",
    title: "New",
    description: "Modern Punjabi hits and contemporary favorites",
    default: false,

    theme: {
      accentColor: "#38bdf8",
      glassStyle: {
        background: "rgba(18,28,35,0.52)",
        borderColor: "rgba(56,189,248,0.28)",
        backdropFilter: "blur(20px) saturate(120%)",
        WebkitBackdropFilter: "blur(20px) saturate(120%)",
      },
      backgroundStyle: {
        background:
          "linear-gradient(180deg, rgba(20,60,80,0.28) 0%, rgba(5,12,18,0.58) 100%)",
      },
    },

    world: {
      background: "/eras/2020s.png",
      scene:
        "Modern Punjabi music world with digital playlists, headphones, neon lights and contemporary Punjabi culture",
      worldLabel: "Punjabi New Era",
      ambientSound: EMPTY_AMBIENT,

      character: "Punjabi DJ",
      characterIcon: "🎧",

      quotes: {
        primary: "ਨਵੀਆਂ ਬੀਟਾਂ, ਨਵੀਂ ਧੁਨ... ਪਰ ਪੰਜਾਬੀ ਅੰਦਾਜ਼ ਉਹੀ।",
        alternates: [
          "ਨਵੀਂ generation, ਨਵੀਆਂ ਧੁਨਾਂ ਤੇ ਉਹੀ ਪੰਜਾਬੀ vibe।",
          "ਅੱਜ ਦੇ ਗੀਤਾਂ ਵਿੱਚ ਪੰਜਾਬੀ ਰੰਗ ਤੇ modern sound ਦੋਵੇਂ ਮਿਲਦੇ ਨੇ।",
          "ਪੰਜਾਬੀ ਮਿਊਜ਼ਿਕ ਦਾ ਨਵਾਂ ਦੌਰ, ਨਵੀਆਂ ਆਵਾਜ਼ਾਂ ਤੇ ਨਵੀਆਂ ਯਾਦਾਂ।",
        ],
      },

      objects: [
        {
          name: "phone",
          label: "Discover Music",
          action: "discover",
        },
        {
          name: "headphones",
          label: "Listen",
          action: "listen",
        },
      ],
    },

    music: {
      songs: [],
    },

    interaction: {
      button: "🎧 Explore Punjabi",
      action: "explore-punjabi",
    },
  },
];

export const DEFAULT_ERA_ID: LanguageEraId =
  ERAS.find((era) => era.default)?.id ?? "1990s";

export function getEraById(
  id: string,
  language?: string,
): EraConfig | undefined {
  if (language && (id === "old" || id === "new")) {
    return ERAS.find((era) => era.id === id && era.language === language);
  }

  return ERAS.find((era) => era.id === id);
}

export function getDefaultEra(): EraConfig {
  return getEraById(DEFAULT_ERA_ID) ?? ERAS[0];
}

export function isValidEraId(id: string): id is LanguageEraId {
  return ERAS.some((era) => era.id === id);
}
