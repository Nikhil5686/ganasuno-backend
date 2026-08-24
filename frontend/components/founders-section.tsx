"use client";

const FOUNDERS = [
  {
    name: "Nikhil Shukla",
    role: "Founder",
    initials: "NS",
    number: "01",
    story:
      "Nikhil started GanaSuno with a simple belief — music should feel personal again. What began as an idea to bring people closer to the songs they grew up with became a vision for a space where every era could have its own atmosphere, memories, and identity.",
    github: "https://github.com/Nikhil5686",
    linkedin: "https://www.linkedin.com/in/nikhil-raj-4707603a3/",
    instagram: "https://www.instagram.com/your.nik_56/",
  },
  {
    name: "Swayam Chondigra",
    role: "Co-Founder",
    initials: "SC",
    number: "02",
    story:
      "Swayam joined that vision with a passion for technology, engineering, and product design. Together, the two turned an idea into a real experience — connecting music, nostalgia, technology, and storytelling into something people can return to whenever they want to revisit a memory.",
    github: "https://github.com/SwayamChondigra/",
    linkedin: "https://www.linkedin.com/in/swayam-chondigra/",
    instagram: "https://www.instagram.com/swayamchondigra_01/",
  },
];

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-2.03c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.33.96.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.15 1.17a10.9 10.9 0 0 1 5.74 0c2.19-1.48 3.15-1.17 3.15-1.17.62 1.57.23 2.73.11 3.02.73.8 1.18 1.82 1.18 3.07 0 4.41-2.69 5.38-5.25 5.67.41.35.78 1.04.78 2.1v3.11c0 .3.2.65.79.54A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V8.98h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.26 2.37 4.26 5.45v6.31ZM5.34 7.42a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM3.56 20.45h3.56V8.98H3.56v11.47ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function SocialButton({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-stone-500 transition-all duration-300 hover:border-amber-400/30 hover:bg-amber-400/[0.06] hover:text-amber-300"
    >
      {children}
    </a>
  );
}

export default function FoundersSection() {
  return (
    <section className="relative overflow-hidden border-t border-white/[0.07] bg-black px-5 py-28 sm:px-8 lg:py-36">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-amber-500/[0.025] blur-[140px]" />

      <div className="relative mx-auto max-w-6xl">
        {/* HEADER */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-amber-400/50" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-amber-400">
              The People Behind GanaSuno
            </span>

            <span className="h-px w-10 bg-amber-400/50" />
          </div>

          <h2 className="font-display text-4xl uppercase leading-[1.05] tracking-[0.04em] text-stone-100 sm:text-5xl lg:text-6xl">
            Two people.
            <br />
            <span className="text-stone-500">One idea.</span>
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-stone-400 sm:text-base">
            GanaSuno began with a shared belief that technology can do more than
            deliver music — it can help people reconnect with the memories
            attached to it.
          </p>
        </div>

        {/* STORY */}
        <div className="mx-auto mt-20 max-w-4xl text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-stone-600">
            How it started
          </p>

          <p className="mx-auto mt-5 max-w-3xl font-display text-2xl leading-relaxed text-stone-300 sm:text-3xl">
            "We wanted to create a place where discovering a song could feel
            like discovering a memory."
          </p>

          <div className="mx-auto mt-8 h-px w-12 bg-amber-400/50" />
        </div>

        {/* FOUNDERS */}
        <div className="mt-20 grid gap-6 lg:grid-cols-2">
          {FOUNDERS.map((founder) => (
            <article
              key={founder.name}
              className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-[#080808] transition-all duration-500 hover:-translate-y-1 hover:border-amber-400/20"
            >
              {/* Top accent */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-400/40 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="p-7 sm:p-9">
                {/* Card header */}
                <div className="flex items-start justify-between">
                  <span className="font-display text-sm tracking-[0.2em] text-stone-700">
                    {founder.number}
                  </span>

                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-400/20 bg-amber-400/[0.04] font-display text-lg tracking-wider text-amber-300">
                    {founder.initials}
                  </div>
                </div>

                <div className="mt-8">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-amber-400">
                    {founder.role}
                  </p>

                  <h3 className="mt-2 font-display text-3xl uppercase tracking-[0.04em] text-stone-100">
                    {founder.name}
                  </h3>
                </div>

                {/* Divider */}
                <div className="my-7 h-px bg-white/[0.07]" />

                {/* Bio */}
                <p className="min-h-[120px] text-sm leading-7 text-stone-400">
                  {founder.story}
                </p>

                {/* Socials */}
                <div className="mt-8 flex items-center gap-2">
                  <span className="mr-2 text-[9px] font-semibold uppercase tracking-[0.25em] text-stone-700">
                    Connect
                  </span>

                  {founder.github && (
                    <SocialButton
                      href={founder.github}
                      label={`${founder.name} GitHub`}
                    >
                      <GitHubIcon />
                    </SocialButton>
                  )}

                  {founder.linkedin && (
                    <SocialButton
                      href={founder.linkedin}
                      label={`${founder.name} LinkedIn`}
                    >
                      <LinkedInIcon />
                    </SocialButton>
                  )}

                  {founder.instagram && (
                    <SocialButton
                      href={founder.instagram}
                      label={`${founder.name} Instagram`}
                    >
                      <InstagramIcon />
                    </SocialButton>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CLOSING */}
        <div className="mx-auto mt-24 max-w-2xl text-center">
          <p className="font-display text-xl uppercase leading-relaxed tracking-[0.04em] text-stone-300 sm:text-2xl">
            Some songs don't just remind us of a time.
            <br />
            <span className="text-stone-600">They take us back there.</span>
          </p>

          <p className="mt-5 text-[9px] font-semibold uppercase tracking-[0.35em] text-stone-700">
            The idea behind GanaSuno
          </p>
        </div>
      </div>
    </section>
  );
}
