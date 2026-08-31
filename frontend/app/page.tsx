"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import MusicPlayer from "@/components/music-player";
import EraSelector from "@/components/era-selector";
import GanasunoFooter from "@/components/ganasuno-footer";

import AboutSection from "@/components/about-section";
import FoundersSection from "@/components/founders-section";
import FAQSection from "@/components/faq-section";

import NostalgiaCard from "@/components/era-world/nostalgia-card";
import EraInteraction from "@/components/era-world/era-interaction";
import EraBackground from "@/components/era-world/era-background";

import {
  DEFAULT_ERA_ID,
  ERAS,
  getDefaultEra,
  getEraById,
  isValidEraId,
  storeSelectedEraId,
} from "@/lib/eras";

import type { LanguageEraId, Song } from "@/types/music";

import { fetchSongsByEra } from "@/lib/api";

import { useAudioKeyboardControls } from "@/hooks/use-audio-keyboard-controls";
import { useOnlineCount } from "@/hooks/use-online-count";
import { useEraWorld } from "@/hooks/use-era-world";

import { getPlayerThemeForEra } from "@/lib/player/theme";

import {
  getEraBackgroundOverlay,
  getEraGlassStyle,
} from "@/lib/era-world/theme-utils";

import InstallAppButton from "@/components/install-app-button";

const ERA_TRANSITION_MS = 800;

const LANGUAGES = [
  "Hindi",
  "English",
  "Bhojpuri",
  "Gujarati",
  "Haryanvi",
  "Punjabi",
] as const;

/*
 * Language → available eras
 *
 * Hindi:
 *   All eras
 *
 * Bhojpuri:
 *   1990s + 2010s only
 *
 * Other languages:
 *   Single playlist, therefore no era switching.
 */
const LANGUAGE_ERA_RULES: Record<string, LanguageEraId[] | "all"> = {
  Hindi: ["1970s", "1980s", "1990s", "2000s", "2010s", "2020s"],

  English: ["old", "new"],
  Bhojpuri: ["old", "new"],
  Gujarati: ["old", "new"],
  Haryanvi: ["old", "new"],
  Punjabi: ["old", "new"],
};

function shuffleSongs<T>(songs: T[]): T[] {
  const shuffled = [...songs];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

export default function Home() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "GanaSuno",
      url: "https://ganasuno.studio",
      description: "Relive Indian music through every era with GanaSuno.",
    },
    {
      "@context": "https://schema.org",
      "@type": "MusicGroup",
      name: "GanaSuno",
      url: "https://ganasuno.studio",
      genre: ["Indian Music", "Bollywood", "Retro Music", "Hindi Songs"],
      description:
        "A nostalgic music platform that lets listeners explore Indian songs across different eras.",
    },
  ];

  // ============================================================
  // ERA
  // ============================================================

  const [selectedEraId, setSelectedEraId] =
    useState<LanguageEraId>(DEFAULT_ERA_ID);

  // ============================================================
  // LANGUAGE
  // ============================================================

  const [selectedLanguage, setSelectedLanguage] = useState<string>("Hindi");

  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  // ============================================================
  // SONG QUEUE
  // ============================================================

  const [eraQueue, setEraQueue] = useState<Song[]>([]);

  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const [isLoadingSongs, setIsLoadingSongs] = useState(true);

  // ============================================================
  // ONLINE USERS
  // ============================================================

  const onlineCount = useOnlineCount();

  // ============================================================
  // ERA TRANSITION
  // ============================================================

  const [previousEraId, setPreviousEraId] = useState<string | null>(null);

  const [isTransitioning, setIsTransitioning] = useState(false);

  const clearPreviousTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  // ============================================================
  // KEYBOARD AUDIO CONTROLS
  // ============================================================

  useAudioKeyboardControls();

  // ============================================================
  // SELECTED ERA
  // ============================================================

  const selectedEra = useMemo(() => {
    return getEraById(selectedEraId, selectedLanguage) ?? getDefaultEra();
  }, [selectedEraId, selectedLanguage]);

  // ============================================================
  // ERA AVAILABILITY
  // ============================================================

  const availableEraIds = useMemo<LanguageEraId[]>(() => {
    const rule = LANGUAGE_ERA_RULES[selectedLanguage];

    if (!rule) {
      return [];
    }

    return rule === "all" ? ERAS.map((era) => era.id) : rule;
  }, [selectedLanguage]);

  const availableEras = useMemo(() => {
    return ERAS.filter((era) => availableEraIds.includes(era.id));
  }, [availableEraIds]);

  const isEraEnabledForLanguage = (eraId: LanguageEraId): boolean => {
    return availableEraIds.includes(eraId);
  };

  // ============================================================
  // PLAYER THEME
  // ============================================================

  const playerTheme = useMemo(
    () => getPlayerThemeForEra(selectedEraId),
    [selectedEraId],
  );

  // ============================================================
  // ERA BACKGROUND
  // ============================================================

  const backgroundOverlay = useMemo(
    () => getEraBackgroundOverlay(selectedEra.theme),
    [selectedEra.theme],
  );

  // ============================================================
  // ERA GLASS
  // ============================================================

  const eraGlassStyle = useMemo(
    () => getEraGlassStyle(selectedEra.theme),
    [selectedEra.theme],
  );

  // ============================================================
  // ERA WORLD
  // ============================================================

  const {
    currentQuote,
    isInteractionActive,
    activeObjectAction,
    handleInteraction,
    hasWorldContent,
    hasInteraction,
  } = useEraWorld(selectedEra);

  // ============================================================
  // PREVIOUS ERA
  // ============================================================

  const previousEra = useMemo(() => {
    if (!previousEraId) {
      return null;
    }

    return getEraById(previousEraId) ?? null;
  }, [previousEraId]);

  // ============================================================
  // LOAD SONGS
  // ============================================================

  useEffect(() => {
    let cancelled = false;

    setIsLoadingSongs(true);

    void fetchSongsByEra(selectedEraId, selectedLanguage)
      .then((response) => {
        if (cancelled) {
          return;
        }

        const songs = response.songs ?? [];

        const shuffledSongs = shuffleSongs(songs);

        setEraQueue(shuffledSongs);
        setCurrentSongIndex(0);
        const firstSong = shuffledSongs[0];

        if (firstSong) {
          console.log("First song ready:", firstSong.title);
        }
        setIsLoadingSongs(false);
      })
      .catch((error) => {
        if (cancelled) {
          return;
        }

        console.warn(
          `Error loading ${selectedLanguage} songs for ${selectedEraId}:`,
          error,
        );

        setEraQueue([]);
        setCurrentSongIndex(0);
        setIsLoadingSongs(false);
      });

    return () => {
      cancelled = true;
    };
  }, [selectedEraId, selectedLanguage]);

  // ============================================================
  // CLEANUP TRANSITION TIMER
  // ============================================================

  useEffect(() => {
    return () => {
      if (clearPreviousTimerRef.current) {
        clearTimeout(clearPreviousTimerRef.current);
      }
    };
  }, []);
  // ============================================================
  // ERA SELECT
  // ============================================================

  const handleEraSelect = (eraId: string) => {
    if (eraId === selectedEraId || !isValidEraId(eraId)) {
      return;
    }

    if (!isEraEnabledForLanguage(eraId)) {
      return;
    }

    setPreviousEraId(selectedEraId);

    setSelectedEraId(eraId);

    storeSelectedEraId(eraId);

    setCurrentSongIndex(0);

    setIsLoadingSongs(true);

    setIsTransitioning(true);

    setTimeout(() => {
      setIsTransitioning(false);
    }, ERA_TRANSITION_MS);

    if (clearPreviousTimerRef.current) {
      clearTimeout(clearPreviousTimerRef.current);
    }

    clearPreviousTimerRef.current = setTimeout(() => {
      setPreviousEraId(null);
    }, ERA_TRANSITION_MS + 100);
  };

  // ============================================================
  // LANGUAGE CHANGE
  // ============================================================

  const handleLanguageChange = (language: string) => {
    if (language === selectedLanguage) {
      return;
    }

    setSelectedLanguage(language);

    setCurrentSongIndex(0);

    setIsLoadingSongs(true);

    const rule = LANGUAGE_ERA_RULES[language];

    if (!rule || rule.length === 0) {
      return;
    }

    const availableIds = rule === "all" ? ERAS.map((era) => era.id) : rule;

    if (availableIds.includes(selectedEraId)) {
      return;
    }

    const nextEra = availableIds[0];

    setPreviousEraId(selectedEraId);

    setSelectedEraId(nextEra);

    storeSelectedEraId(nextEra);

    setIsTransitioning(true);

    setTimeout(() => {
      setIsTransitioning(false);
    }, ERA_TRANSITION_MS);

    if (clearPreviousTimerRef.current) {
      clearTimeout(clearPreviousTimerRef.current);
    }

    clearPreviousTimerRef.current = setTimeout(() => {
      setPreviousEraId(null);
    }, ERA_TRANSITION_MS + 100);
  };

  // ============================================================
  // CURRENT SONG
  // ============================================================

  const currentSong = eraQueue[currentSongIndex] ?? null;

  // ============================================================
  // PREVIOUS SONG
  // ============================================================

  const handlePreviousSong = useCallback(() => {
    if (eraQueue.length === 0) {
      return;
    }

    setCurrentSongIndex((previousIndex) =>
      previousIndex > 0 ? previousIndex - 1 : eraQueue.length - 1,
    );
  }, [eraQueue.length]);

  // ============================================================
  // NEXT SONG
  // ============================================================

  const handleNextSong = useCallback(() => {
    if (eraQueue.length === 0) {
      return;
    }

    setCurrentSongIndex((previousIndex) =>
      previousIndex < eraQueue.length - 1 ? previousIndex + 1 : 0,
    );
  }, [eraQueue.length]);

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <main className="relative bg-black text-stone-100">
        {/* ======================================================
            HERO
        ====================================================== */}

        <section className="relative min-h-screen overflow-hidden">
          {/* ====================================================
              ERA VIDEO BACKGROUND
          ==================================================== */}

          <EraBackground
            selectedEra={selectedEra}
            previousEra={previousEra}
            isTransitioning={isTransitioning}
            overlayStyle={backgroundOverlay}
            activeObjectAction={activeObjectAction}
          />

          {/* ====================================================
              ONLINE USERS
              
              IMPORTANT:
              This is positioned relative to the full hero,
              NOT the max-width content container.
          ==================================================== */}

          <div className="pointer-events-none absolute left-4 top-4 z-30 sm:left-6 sm:top-6">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-3 py-1.5 text-[10px] font-medium tracking-wide text-stone-200/90 shadow-lg backdrop-blur-xl">
              {/* Online pulse */}

              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />

                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>

              <span>{onlineCount} Online</span>
            </div>
          </div>

          {/* ====================================================
              SUPPORT BUTTON
              
              Keep your existing support button here if it is
              already implemented elsewhere.
          ==================================================== */}

          {/* ====================================================
              HERO CONTENT
              
              justify-between pushes the player toward the
              lower portion of the hero.
          ==================================================== */}

          <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-between px-4 pb-10 pt-8 sm:px-6 sm:pb-12 sm:pt-12">
            {/* ==================================================
                HEADER
            ================================================== */}

            <header className="flex w-full flex-col items-center gap-5 text-center sm:gap-7">
              
              {/* ==================================================
                  LANGUAGE SELECTOR
              ================================================== */}

              <div className="relative z-30 flex items-center justify-center gap-2">
                <div className="relative">
                  {/* LANGUAGE BUTTON */}

                  <button
                    type="button"
                    onClick={() => setIsLanguageOpen((previous) => !previous)}
                    aria-haspopup="listbox"
                    aria-expanded={isLanguageOpen}
                    className={`
                        group flex items-center gap-1.5 sm:gap-2.5
                        rounded-full
                        border
                        px-3 py-1.5 sm:px-4 sm:py-2
                        text-[11px] sm:text-xs
                        font-medium
                        tracking-wide
                        backdrop-blur-xl
                        transition-all duration-300
                      ${
                        isLanguageOpen
                          ? "border-[#e8a54b]/70 bg-[#e8a54b]/15 shadow-[0_0_25px_rgba(232,165,75,0.18)]"
                          : "border-white/15 bg-black/25 hover:border-[#e8a54b]/50 hover:bg-black/40"
                      }
                    `}
                  >
                    {/* LANGUAGE ICON */}

                    <span
                      className={`
                        flex h-6 w-6
                        items-center justify-center
                        rounded-full
                        border
                        transition-all duration-300
                        ${
                          isLanguageOpen
                            ? "border-[#e8a54b]/50 bg-[#e8a54b]/15 text-[#f1bd70]"
                            : "border-white/10 bg-white/5 text-stone-300 group-hover:border-[#e8a54b]/40 group-hover:text-[#f1bd70]"
                        }
                      `}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-3.5 w-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        aria-hidden="true"
                      >
                        <circle cx="12" cy="12" r="9" />

                        <path d="M3 12h18" />

                        <path d="M12 3c2.5 2.5 3.5 5.5 3.5 9S14.5 18.5 12 21" />

                        <path d="M12 3c-2.5 2.5-3.5 5.5-3.5 9S9.5 18.5 12 21" />
                      </svg>
                    </span>

                    {/* LANGUAGE */}

                    <span className="flex items-center gap-2">
                      <span className="hidden text-[9px] font-medium uppercase tracking-[0.18em] text-stone-400 sm:inline">
                        Language
                      </span>

                      <span className="min-w-0 text-left text-stone-100">
                        {selectedLanguage}
                      </span>
                    </span>

                    {/* CHEVRON */}

                    <svg
                      viewBox="0 0 24 24"
                      className={`
                        h-3.5 w-3.5
                        text-stone-400
                        transition-transform duration-300
                        ${isLanguageOpen ? "rotate-180 text-[#f1bd70]" : ""}
                      `}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path
                        d="m6 9 6 6 6-6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  {/* ==================================================
                      LANGUAGE DROPDOWN
                  ================================================== */}

                  {isLanguageOpen && (
                    <div
                      role="listbox"
                      aria-label="Select language"
                      className="
                        absolute
                        left-1/2
                        top-[calc(100%+10px)]
                        w-52
                        -translate-x-1/2
                        overflow-hidden
                        rounded-2xl
                        border
                        border-white/10
                        bg-[#0b0b0b]/90
                        p-1.5
                        shadow-[0_20px_60px_rgba(0,0,0,0.55)]
                        backdrop-blur-2xl
                        animate-in
                        fade-in
                        slide-in-from-top-2
                        duration-200
                      "
                    >
                      {/* DROPDOWN HEADER */}

                      <div className="px-3 pb-2 pt-2">
                        <p className="text-[9px] font-medium uppercase tracking-[0.25em] text-stone-500">
                          Choose Language
                        </p>
                      </div>

                      {/* LANGUAGES */}

                      <div className="space-y-0.5">
                        {LANGUAGES.map((language) => {
                          const isSelected = selectedLanguage === language;

                          return (
                            <button
                              key={language}
                              type="button"
                              role="option"
                              aria-selected={isSelected}
                              onClick={() => {
                                handleLanguageChange(language);

                                setIsLanguageOpen(false);
                              }}
                              className={`
                                  group flex w-full
                                  items-center
                                  justify-between
                                  rounded-xl
                                  px-3 py-2.5
                                  text-left
                                  text-xs
                                  transition-all duration-200
                                  ${
                                    isSelected
                                      ? "bg-[#e8a54b]/15 text-[#f1bd70]"
                                      : "text-stone-300 hover:bg-white/5 hover:text-white"
                                  }
                                `}
                            >
                              <span className="flex items-center gap-2.5">
                                <span
                                  className={`
                                      h-1.5 w-1.5
                                      rounded-full
                                      transition-all
                                      ${
                                        isSelected
                                          ? "bg-[#e8a54b] shadow-[0_0_8px_rgba(232,165,75,0.8)]"
                                          : "bg-stone-600 group-hover:bg-stone-400"
                                      }
                                    `}
                                />

                                {language}
                              </span>

                              {isSelected && (
                                <svg
                                  viewBox="0 0 24 24"
                                  className="hidden h-3.5 w-3.5 sm:block text-[#e8a54b]"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  aria-hidden="true"
                                >
                                  <path
                                    d="m5 12 4 4L19 6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
                  <InstallAppButton />
              
              </div>


              {/* ==================================================
                  BRANDING
              ================================================== */}

              <div className="flex flex-col items-center gap-1.5 sm:gap-2">
                <h1 className="select-none font-display text-[clamp(2.75rem,8vw,5.5rem)] font-bold uppercase leading-none tracking-[0.2em] text-[#faf6f0] drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
                  GanaSuno
                </h1>

                <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-stone-300/80 sm:text-xs">
                  Music Through The Eras
                </p>
              </div>

              {/* ==================================================
                  ERA SELECTOR
              ================================================== */}

              <div className="w-full max-w-3xl">
                <EraSelector
                  eras={availableEras}
                  selectedEraId={selectedEraId}
                  onSelectEra={handleEraSelect}
                />
              </div>

              {/* ==================================================
                  NOSTALGIA CARD
              ================================================== */}

              {hasWorldContent && (
                <div className="flex w-full max-w-md flex-col items-center gap-2.5 sm:gap-3">
                  <NostalgiaCard
                    eraLabel={selectedEra.world.worldLabel}
                    character={selectedEra.world.character}
                    characterIcon={selectedEra.world.characterIcon}
                    quote={currentQuote}
                    accentColor={selectedEra.theme.accentColor}
                    glassStyle={eraGlassStyle}
                    isActive={isInteractionActive}
                  />

                  {hasInteraction && (
                    <EraInteraction
                      label={selectedEra.interaction.button}
                      accentColor={selectedEra.theme.accentColor}
                      isActive={isInteractionActive}
                      onInteract={() => void handleInteraction()}
                    />
                  )}
                </div>
              )}
            </header>

            {/* ====================================================
                PLAYER
            ==================================================== */}

            <section className="mx-auto flex w-full max-w-[500px] flex-col items-center gap-3 sm:gap-4">
              {/* ACTIVE ERA */}

              <div className="flex items-center gap-2">
                <span
                  key={`${selectedEra.id}-${selectedLanguage}`}
                  className="fade-in rounded-full border border-white/10 bg-black/20 px-3.5 py-1 text-[11px] font-medium uppercase tracking-[0.3em] text-stone-200/90 backdrop-blur-md sm:text-xs"
                >
                  {selectedLanguage} · {selectedEra.title}
                </span>

                {isLoadingSongs && (
                  <span className="animate-pulse font-mono text-[10px] tracking-wider text-stone-400/80 sm:text-xs">
                    Curating...
                  </span>
                )}
              </div>

              {/* MUSIC PLAYER */}

              <div className="w-full">
                {!isLoadingSongs && eraQueue.length === 0 ? (
                  <div className="frosted-player w-full rounded-2xl p-6 text-center text-stone-300 sm:rounded-3xl">
                    <p className="text-sm font-medium">
                      Music for{" "}
                      <span className="text-white">{selectedLanguage}</span> in
                      the{" "}
                      <span className="text-white">{selectedEra.title}</span> is
                      being curated.
                    </p>
                  </div>
                ) : (
                  <MusicPlayer
                    song={currentSong}
                    eraQueue={eraQueue}
                    hasSongs={eraQueue.length > 0}
                    isLoading={isLoadingSongs}
                    onPrevious={handlePreviousSong}
                    onNext={handleNextSong}
                    eraArtwork={selectedEra.world.background}
                    themeConfig={playerTheme}
                  />
                )}
              </div>
            </section>
          </div>
        </section>

        {/* ========================================================
            NORMAL PAGE SECTIONS
        ======================================================== */}

        <AboutSection />

        <FoundersSection />

        <FAQSection />
      </main>

      {/* ==========================================================
          FOOTER
      ========================================================== */}

      <GanasunoFooter />
    </>
  );
}
