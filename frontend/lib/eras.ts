import {
  DEFAULT_ERA_ID,
  ERAS,
  getDefaultEra,
  getEraById,
  isValidEraId,
  type EraConfig,
  type EraThemeConfig,
  type EraWorldConfig,
  type EraAmbientSoundConfig,
  type EraQuoteConfig,
  type EraWorldObject,
  type EraMusicConfig,
  type EraInteractionConfig,
} from "@/data/eras";

import type { LanguageEraId } from "@/types/music";

export {
  ERAS,
  DEFAULT_ERA_ID,
  getEraById,
  getDefaultEra,
  isValidEraId,
  type EraConfig,
  type EraThemeConfig,
  type EraWorldConfig,
  type EraAmbientSoundConfig,
  type EraQuoteConfig,
  type EraWorldObject,
  type EraMusicConfig,
  type EraInteractionConfig,
};

export const SELECTED_ERA_STORAGE_KEY = "ganasuno:selected-era";

export function getStoredEraId(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return localStorage.getItem(SELECTED_ERA_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function storeSelectedEraId(eraId: string): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(SELECTED_ERA_STORAGE_KEY, eraId);
  } catch {
    // Ignore storage failures (private browsing, quota exceeded, etc.)
  }
}

export function getInitialEraId(): LanguageEraId {
  const stored = getStoredEraId();

  if (stored && isValidEraId(stored)) {
    return stored;
  }

  return DEFAULT_ERA_ID;
}
