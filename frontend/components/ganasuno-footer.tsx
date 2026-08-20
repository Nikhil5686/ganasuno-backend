import Link from "next/link";

const FOOTER_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Articles", href: "/articles" },
];

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/Nikhil5686",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.04c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.74.08-.74 1.2.08 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.48 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.94 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.45 11.45 0 0 1 6-.01c2.3-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.48 5.93.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/nikhil-raj-4707603a3/",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V8.99h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.3ZM5.32 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM3.54 20.45H7.1V8.99H3.54v11.46ZM22.22 0H1.77C.79 0 .01.77.01 1.73v20.54C.01 23.23.79 24 1.77 24h20.45c.98 0 1.77-.77 1.77-1.73V1.73C23.99.77 23.2 0 22.22 0Z" />
      </svg>
    ),
  },
];

export default function GanasunoFooter() {
  return (
    <footer className="relative z-10 w-full border-t border-white/10 bg-black">
      <div className="mx-auto flex max-w-5xl flex-col items-center px-4 py-12 text-center">
        {/* Title */}
        <h2 className="font-display text-xl uppercase tracking-[0.25em] text-amber-300">
          GanaSuno
        </h2>

        {/* Navigation */}
        <nav className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-3">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-amber-400/90 transition-colors hover:text-amber-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Description */}
        <p className="mt-5 text-sm text-stone-500">
          A nostalgic music experience through the eras • GanaSuno Studio
        </p>

        {/* Social Links */}
        <div className="mt-6 flex items-center gap-3">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              title={social.label}
              className="
                flex h-9 w-9 items-center justify-center
                rounded-full
                border border-white/10
                bg-white/5
                text-stone-400
                backdrop-blur-md
                transition-all duration-300
                hover:border-amber-300/40
                hover:bg-amber-300/10
                hover:text-amber-300
                hover:-translate-y-0.5
              "
            >
              {social.icon}
            </a>
          ))}
        </div>

        <div className="mt-8 flex w-full flex-col items-center gap-3 border-t border-white/10 pt-5 sm:flex-row sm:justify-between">
          <p className="text-xs text-stone-600">
            © {new Date().getFullYear()} GanaSuno Studio. All rights reserved.
          </p>

          <p className="text-xs tracking-wide text-stone-500">
            Powered by <span className="text-stone-300">Nikhil</span>
            {" & "}
            <span className="text-stone-300">Swayam</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
