"use client";

import { useState } from "react";
import SupportModal from "./support-modal";

export default function SupportButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="
    fixed
    top-4
    right-3
    z-40
    flex
    items-center
    gap-1.5
    rounded-full
    border
    border-amber-400/30
    bg-black/70
    px-3
    py-2
    text-[11px]
    text-amber-300
    backdrop-blur-xl
    shadow-xl
    transition-all
    hover:bg-black
    sm:top-6
    sm:right-6
    sm:gap-2
    sm:px-5
    sm:py-3
    sm:text-sm
  "
      >
        <span className="text-sm sm:text-base">❤️</span>
        <span>Support</span>
      </button>

      <SupportModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
