"use client";

type EraObjectLayerProps = {
  activeObjectAction?: string | null;
};

export default function EraObjectLayer({
  activeObjectAction,
}: EraObjectLayerProps) {
  if (!activeObjectAction) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
      {activeObjectAction === "tune" && (
        <div className="animate-pulse text-6xl">📻</div>
      )}

      {activeObjectAction === "rewind" && (
        <div className="animate-spin text-6xl">📼</div>
      )}

      {activeObjectAction === "browse" && (
        <div className="animate-pulse text-6xl">💻</div>
      )}

      {activeObjectAction === "play-cd" && (
        <div className="animate-spin text-6xl">💿</div>
      )}

      {activeObjectAction === "playlist" && (
        <div className="animate-pulse text-6xl">🎧</div>
      )}
    </div>
  );
}
