export type EraId = "1970s" | "1980s" | "1990s" | "2000s" | "2010s" | "2020s";

export interface Era {
  id: EraId;
  label: string;
  startYear: number;
  endYear: number;
  artwork: string;
}

export const ERAS: readonly Era[] = [
  {
    id: "1970s",
    label: "1970's",
    startYear: 1970,
    endYear: 1979,
    artwork: "/eras/1970s.mp4",
  },
  {
    id: "1980s",
    label: "1980's",
    startYear: 1980,
    endYear: 1989,
    artwork: "/eras/1980s.mp4",
  },
  {
    id: "1990s",
    label: "1990's",
    startYear: 1990,
    endYear: 1999,
    artwork: "/eras/1990s.mp4",
  },
  {
    id: "2000s",
    label: "2000's",
    startYear: 2000,
    endYear: 2009,
    artwork: "/eras/2000s.mp4",
  },
  {
    id: "2010s",
    label: "2010's",
    startYear: 2010,
    endYear: 2019,
    artwork: "/eras/2010s.mp4",
  },
  {
    id: "2020s",
    label: "2020's",
    startYear: 2020,
    endYear: 2029,
    artwork: "/eras/2020s.mp4",
  },
] as const;

export const DEFAULT_ERA_ID: EraId = "1990s";

export function getEraById(id: string): Era | undefined {
  return ERAS.find((era) => era.id === id);
}

export function isValidEraId(id: string): id is EraId {
  return ERAS.some((era) => era.id === id);
}
