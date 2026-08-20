"use client";

import { useState, useCallback } from "react";

const STORAGE_KEY = "ganasuno:favorites";
const STORAGE_VERSION = 1;

/** Backend-sync-ready favorite record */
export type FavoriteRecord = {
  songId: string;
  addedAt: string;
};

type FavoritesStorage = {
  version: number;
  favorites: FavoriteRecord[];
};

function normalizeStoredFavorites(raw: unknown): FavoriteRecord[] {
  if (!raw) return [];

  // Legacy format: string[]
  if (Array.isArray(raw) && raw.every((item) => typeof item === "string")) {
    const now = new Date().toISOString();
    return raw.map((songId) => ({ songId, addedAt: now }));
  }

  // Current format: { version, favorites }
  if (typeof raw === "object" && raw !== null && "favorites" in raw) {
    const stored = raw as FavoritesStorage;
    if (Array.isArray(stored.favorites)) {
      return stored.favorites.filter(
        (entry): entry is FavoriteRecord =>
          typeof entry?.songId === "string" && typeof entry?.addedAt === "string"
      );
    }
  }

  return [];
}

function readFavoritesFromStorage(): FavoriteRecord[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return normalizeStoredFavorites(JSON.parse(stored));
  } catch (err) {
    console.warn("Failed to load favorites from localStorage:", err);
    return [];
  }
}

function writeFavoritesToStorage(favorites: FavoriteRecord[]) {
  const payload: FavoritesStorage = {
    version: STORAGE_VERSION,
    favorites,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

function getInitialFavorites(): FavoriteRecord[] {
  if (typeof window === "undefined") return [];
  return readFavoritesFromStorage();
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteRecord[]>(getInitialFavorites);
  const isLoaded = typeof window !== "undefined";

  const toggleFavorite = useCallback((songId: string) => {
    if (!songId) return;

    setFavorites((prev) => {
      const exists = prev.some((entry) => entry.songId === songId);
      const next = exists
        ? prev.filter((entry) => entry.songId !== songId)
        : [...prev, { songId, addedAt: new Date().toISOString() }];

      try {
        writeFavoritesToStorage(next);
      } catch (err) {
        console.warn("Failed to save favorites to localStorage:", err);
      }

      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (songId: string | null | undefined): boolean => {
      if (!songId) return false;
      return favorites.some((entry) => entry.songId === songId);
    },
    [favorites]
  );

  /** Prepared for future backend sync — returns full records with timestamps */
  const getFavoriteRecords = useCallback(() => favorites, [favorites]);

  const favoriteIds = favorites.map((entry) => entry.songId);

  return {
    favoriteIds,
    favorites,
    isFavorite,
    toggleFavorite,
    getFavoriteRecords,
    isLoaded,
  };
}
