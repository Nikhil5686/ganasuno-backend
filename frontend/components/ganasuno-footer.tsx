import Link from "next/link";

const FOOTER_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Articles", href: "/articles" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Disclaimer", href: "/disclaimer" },
];

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M18.244 2H21.5l-7.11 8.13L22.75 22h-6.55l-5.13-6.7L5.21 22H1.95l7.6-8.69L1.5 2h6.72l4.64 6.12L18.244 2Zm-1.15 17.97h1.81L7.27 3.9H5.33l11.764 16.07Z" />
    </svg>
  );
}

export default function GanasunoFooter() {
  return (
    <footer className="border-t border-white/[0.07] bg-[#050505]">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        {/* Compact footer */}
        <div className="flex flex-col items-center py-12 text-center sm:py-14">
          {/* Brand */}
          <Link
            href="/"
            className="mt-3 font-display text-xl font-semibold uppercase tracking-[0.3em] text-amber-400 transition-colors duration-300 hover:text-amber-300 sm:text-2xl"
          >
            GANASUNO
          </Link>

          <p className="mt-3 max-w-sm text-xs leading-5 text-stone-500">
            A nostalgic music experience through the eras that shaped
            generations.
          </p>

          {/* Navigation */}
          <nav aria-label="Footer navigation" className="mt-7">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:gap-x-8">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[10px] font-medium uppercase tracking-[0.13em] text-stone-500 transition-colors duration-300 hover:text-amber-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Socials */}
          <div className="mt-7 flex items-center justify-center gap-2.5">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/ganasuno.studio/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GanaSuno on Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-stone-500 transition-all duration-300 hover:border-amber-400/30 hover:bg-amber-400/[0.05] hover:text-amber-300"
            >
              <InstagramIcon />
            </a>

            {/* X */}
            <a
              href="https://x.com/ganasuno"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GanaSuno on X"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-stone-500 transition-all duration-300 hover:border-amber-400/30 hover:bg-amber-400/[0.05] hover:text-amber-300"
            >
              <XIcon />
            </a>
          </div>

          {/* Accent */}
          <div className="mt-7 flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-white/10" />
            <span className="h-1 w-1 rounded-full bg-amber-400/70" />
            <span className="h-px w-8 bg-white/10" />
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/[0.07] py-5 text-center">
          <p className="text-[9px] uppercase tracking-[0.16em] text-stone-600">
            © 2026 GanaSuno Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
