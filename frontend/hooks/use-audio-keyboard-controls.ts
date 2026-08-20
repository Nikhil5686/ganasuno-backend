"use client";

import { useEffect } from "react";
import { useAudio } from "@/lib/audio/engine";

// ============================================================================
// GanaSuno Website Keyboard Shortcuts for Volume Control
// ============================================================================
//
// These shortcuts control ONLY the GanaSuno website volume (audio.volume /
// audio.muted). They do NOT capture or affect system/hardware volume keys.
//
// Shortcuts:
//   Ctrl + ArrowUp   → Increase GanaSuno website volume by 5%
//   Ctrl + ArrowDown → Decrease GanaSuno website volume by 5%
//   Ctrl + M         → Toggle GanaSuno website mute
//
// We intentionally do NOT capture:
//   - ArrowUp / ArrowDown alone (normal browser scrolling)
//   - Hardware VolumeUp / VolumeDown keys (OS-level control)
//   - Media keys (browser/OS default behavior)
//
// ============================================================================

const VOLUME_STEP = 5; // 5% per keypress

export function useAudioKeyboardControls() {
  const { state, setVolume, toggleMute } = useAudio();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Only handle shortcuts with Ctrl held
      if (!event.ctrlKey) return;
      // Ignore if other modifiers are also pressed
      if (event.altKey || event.shiftKey || event.metaKey) return;

      switch (event.key) {
        case "ArrowUp": {
          event.preventDefault(); // Prevent page scroll
          const newVol = Math.min(100, state.volume + VOLUME_STEP);
          setVolume(newVol);
          break;
        }
        case "ArrowDown": {
          event.preventDefault(); // Prevent page scroll
          const newVol = Math.max(0, state.volume - VOLUME_STEP);
          setVolume(newVol);
          break;
        }
        case "m":
        case "M": {
          event.preventDefault();
          toggleMute();
          break;
        }
        // No default — do not capture unrelated keys
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [state.volume, setVolume, toggleMute]);
}
