import type { CSSProperties } from "react";
import type { EraThemeConfig } from "@/data/eras";

export function resolveThemeStyle(
  style: string | CSSProperties | undefined
): CSSProperties | undefined {
  if (!style || typeof style === "string") {
    return undefined;
  }
  return style;
}

export function getEraBackgroundOverlay(
  theme: EraThemeConfig
): CSSProperties | undefined {
  return resolveThemeStyle(theme.backgroundStyle);
}

export function getEraGlassStyle(
  theme: EraThemeConfig
): CSSProperties | undefined {
  return resolveThemeStyle(theme.glassStyle);
}
