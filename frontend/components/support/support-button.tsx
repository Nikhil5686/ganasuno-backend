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
        top-6
        right-6
        z-40
        flex
        items-center
        gap-2
        rounded-full
        border
        border-amber-400/30
        bg-black/70
        px-5
        py-3
        text-sm
        text-amber-300
        backdrop-blur-xl
        shadow-xl
        hover:bg-black
        "
      >
        ❤️ Support
      </button>

      <SupportModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
