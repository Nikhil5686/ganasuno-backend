import type { Era, EraSongsResponse, EraId } from "@/types/music";
import { ERAS, DEFAULT_ERA_ID, getDefaultEra, getEraById } from "@/data/eras";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export async function fetchEras(): Promise<Era[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/eras`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch eras (status: ${res.status})`);
    }

    const data = await res.json();
    return (
      data.eras ??
      ERAS.map((era) => ({
        id: era.id,
        label: era.title,
        artwork: era.world.background,
        image: era.world.background,
      }))
    );
  } catch (err) {
    console.warn("Backend API unavailable for eras, using local config:", err);
    return ERAS.map((era) => ({
      id: era.id,
      label: era.title,
      artwork: era.world.background,
      image: era.world.background,
    }));
  }
}

export async function fetchSongsByEra(
  eraId: string = DEFAULT_ERA_ID,
  language?: string,
): Promise<EraSongsResponse> {
  try {
    const params = new URLSearchParams();

    params.set("era", eraId);

    if (language) {
      params.set("language", language);
    }

    const res = await fetch(`${API_BASE_URL}/songs?${params.toString()}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch songs for era ${eraId} (status: ${res.status})`,
      );
    }

    const data: EraSongsResponse = await res.json();

    return data;
  } catch (err) {
    console.warn(
      `Backend API unavailable for era "${eraId}" and language "${language ?? "default"}":`,
      err,
    );

    const eraInfo = getEraById(eraId) ?? getDefaultEra();
    const startYear = parseInt(eraInfo.id, 10);

    return {
      era: {
        id: eraInfo.id as EraId,
        label: eraInfo.title,
        startYear,
        endYear: startYear + 9,
        artwork: eraInfo.world.background,
      },
      songs: [],
      total: 0,
    };
  }
}

export async function fetchPlaybackSource(songId: string) {
  const res = await fetch(`${API_BASE_URL}/songs/${songId}/playback`, {
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch playback source");
  }

  return res.json();
}
