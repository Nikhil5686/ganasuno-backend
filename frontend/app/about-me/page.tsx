import type { Metadata } from "next";
import InnerPageLayout from "@/components/inner-page-layout";

export const metadata: Metadata = {
  title: "About Me — Nikhil Raj | GanaSuno",
  description: "Nikhil Raj — Software Engineer and creator of GanaSuno.",
};

const PROJECTS = [
  { name: "secure-connect-chat", href: "https://github.com/Nikhil5686/secure-connect-chat" },
  { name: "Medic-pro", href: "https://github.com/Nikhil5686/Medic-pro" },
  { name: "BranchIQ", href: "https://github.com/Nikhil5686/BranchIQ" },
  { name: "NikhilOS", href: "https://github.com/Nikhil5686/NikhilOS" },
  { name: "RAILGUARD-AI", href: "https://github.com/Nikhil5686/RAILGUARD-AI" },
  { name: "DAA-Assignment-5sem", href: "https://github.com/Nikhil5686/DAA-Assignment-5sem" },
];

export default function AboutMePage() {
  return (
    <InnerPageLayout>
      {/* Identity */}
      <div className="mb-12">
        <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-amber-300/80 font-medium">
          About Me
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-[0.15em] leading-tight text-stone-100">
          Nikhil Raj
        </h1>
        <p className="mt-3 text-base text-stone-400 uppercase tracking-widest font-medium">
          Software Engineer
        </p>
      </div>

      {/* Introduction */}
      <section className="mb-12 rounded-2xl border border-white/10 bg-white/5 px-6 py-6 backdrop-blur-sm">
        <p className="text-stone-300 leading-relaxed text-base sm:text-lg">
          I&apos;m a software engineer who enjoys building products, experimenting
          with technology, and turning ideas into useful experiences. GanaSuno is
          one of those projects — a simple attempt to bring the nostalgia of
          different musical eras into one place.
        </p>
      </section>

      {/* What I Build */}
      <section className="mb-12">
        <h2 className="mb-5 text-xs uppercase tracking-[0.2em] text-stone-400 font-semibold">
          What I Build
        </h2>
        <ul className="space-y-2.5">
          {[
            "Software & Web Applications",
            "AI-powered projects",
            "Developer tools and experiments",
            "Creative & product-focused projects",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 text-stone-300 text-sm leading-relaxed">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400/70" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Selected Projects */}
      <section className="mb-12">
        <h2 className="mb-5 text-xs uppercase tracking-[0.2em] text-stone-400 font-semibold">
          Selected Projects
        </h2>
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {PROJECTS.map((project) => (
            <li key={project.name}>
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-stone-300 hover:border-amber-400/30 hover:text-stone-100 hover:bg-white/8 transition-all duration-200"
              >
                <svg
                  className="w-4 h-4 text-stone-500 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                {project.name}
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Contact / Social */}
      <section>
        <h2 className="mb-5 text-xs uppercase tracking-[0.2em] text-stone-400 font-semibold">
          Get in Touch
        </h2>
        <div className="flex flex-wrap gap-3">
          <a
            href="mailto:rajn5686@gmail.com"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-5 py-2.5 text-sm text-stone-200 hover:border-amber-400/40 hover:text-white transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
            Email
          </a>
          <a
            href="https://github.com/Nikhil5686"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-5 py-2.5 text-sm text-stone-200 hover:border-amber-400/40 hover:text-white transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/nikhil-raj-4707603a3/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-5 py-2.5 text-sm text-stone-200 hover:border-amber-400/40 hover:text-white transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
            LinkedIn
          </a>
        </div>
      </section>
    </InnerPageLayout>
  );
}
