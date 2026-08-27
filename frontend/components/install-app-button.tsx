"use client";

export default function InstallAppButton() {
  return (
    <a
      href="/downloads/ganasuno.apk"
      download="GanaSuno.apk"
      className="
        group flex items-center gap-2
        rounded-full
        border border-[#e8a54b]/30
        bg-[#e8a54b]/10
        px-3 py-1.5
        text-[11px] font-medium
        text-[#f1bd70]
        backdrop-blur-xl
        transition-all duration-300
        hover:border-[#e8a54b]/60
        hover:bg-[#e8a54b]/20
        hover:shadow-[0_0_25px_rgba(232,165,75,0.15)]
        sm:px-4 sm:py-2 sm:text-xs
      "
      aria-label="Download GanaSuno Android app"
    >
      <svg
        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 3v12" />
        <path d="m7 10 5 5 5-5" />
        <path d="M5 21h14" />
      </svg>

      <span className="hidden sm:inline">Install App</span>

      <span className="sm:hidden">APK</span>
    </a>
  );
}
