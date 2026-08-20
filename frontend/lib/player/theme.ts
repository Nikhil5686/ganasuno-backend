import type { CSSProperties } from "react";
import type { EraId } from "@/types/music";
import { getDefaultEra, getEraById } from "@/data/eras";

/**
 * Future-ready player theme configuration.
 * Era themes will eventually drive accent color, glass styling,
 * ambient sounds, and character interactions.
 */
export type PlayerThemeConfig = {
  accentColor: string;
  glassStyle?: CSSProperties;
  ambientSound?: string | null;
  era?: EraId;
};

function resolveGlassStyle(
  glassStyle: string | CSSProperties | undefined
): CSSProperties | undefined {
  if (!glassStyle || typeof glassStyle === "string") {
    return undefined;
  }
  return glassStyle;
}

function eraToPlayerTheme(eraId: EraId): PlayerThemeConfig {
  const era = getEraById(eraId) ?? getDefaultEra();

  return {
    accentColor: era.theme.accentColor,
    glassStyle: resolveGlassStyle(era.theme.glassStyle),
    ambientSound:
      era.world.ambientSound.enabled && era.world.ambientSound.url
        ? era.world.ambientSound.url
        : null,
    era: era.id,
  };
}

export const DEFAULT_PLAYER_THEME: PlayerThemeConfig = eraToPlayerTheme(
  getDefaultEra().id
);

export function getPlayerThemeForEra(eraId: EraId): PlayerThemeConfig {
  return eraToPlayerTheme(eraId);
}
