import type { Metadata } from "next";
import InnerPageLayout from "@/components/inner-page-layout";
import { ERAS } from "@/data/eras";

function eraYearRange(id: string): string {
  const startYear = parseInt(id, 10);
  return `${startYear}–${startYear + 9}`;
}

export const metadata: Metadata = {
  title: "About GanaSuno — Music Time Machine",
  description:
    "Discover GanaSuno, a nostalgic music experience created by Swayam Chondigra and Nikhil Shukla that lets listeners explore songs through different musical eras.",
};

export default function AboutPage() {
  return (
    <InnerPageLayout>
      {/* Hero */}
      <div className="mb-12">
        <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-amber-300/80 font-medium">
          About
        </p>

        <h1 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-[0.15em] leading-tight text-stone-100">
          GanaSuno
        </h1>

        <p className="mt-4 max-w-xl text-lg leading-relaxed text-stone-300">
          A nostalgic music time machine that lets you experience the sounds,
          memories, and atmosphere of different generations.
        </p>
      </div>

      {/* What is GanaSuno */}
      <section className="mb-14 space-y-4 text-stone-300 leading-relaxed">
        <h2 className="text-xl font-semibold text-stone-100">
          What is GanaSuno?
        </h2>

        <p>
          GanaSuno is a music discovery experience built around nostalgia.
          Instead of organizing music only by artists, genres, or popularity,
          GanaSuno lets listeners explore songs through the eras that shaped
          generations.
        </p>

        <p>
          Every decade carries its own identity — the instruments, production
          styles, cultural moments, and emotions that make a song instantly
          recognizable. GanaSuno transforms those memories into an immersive
          listening journey.
        </p>

        <p>
          The name combines <em>Gana</em> (song/music) and <em>Suno</em>{" "}
          (listen) — meaning simply: <strong>listen to music.</strong>
        </p>
      </section>

      {/* Vision */}
      <section className="mb-14 space-y-4 text-stone-300 leading-relaxed">
        <h2 className="text-xl font-semibold text-stone-100">Our Vision</h2>

        <p>
          Modern music platforms are built around recommendations, trends, and
          algorithms. GanaSuno takes a more emotional approach — helping people
          reconnect with the songs that represent memories, places, and moments
          of their lives.
        </p>

        <p>
          The goal is to create a digital space where every era feels alive,
          from vintage melodies and cassette memories to modern streaming
          experiences.
        </p>
      </section>

      {/* Eras */}
      <section className="mb-14">
        <h2 className="mb-6 text-xl font-semibold text-stone-100">
          Explore The Eras
        </h2>

        <ul className="space-y-3">
          {ERAS.map((era) => (
            <li
              key={era.id}
              className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 backdrop-blur-sm"
            >
              <span className="w-20 shrink-0 font-display text-lg font-bold uppercase tracking-widest text-amber-300/90">
                {era.title}
              </span>

              <span className="text-sm font-mono text-stone-400">
                {eraYearRange(era.id)}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* How it works */}
      <section className="mb-14 space-y-4 text-stone-300 leading-relaxed">
        <h2 className="text-xl font-semibold text-stone-100">
          How GanaSuno Works
        </h2>

        <p>
          GanaSuno combines curated music collections, era-based experiences,
          immersive visuals, and modern web technology to create a unique way of
          discovering songs.
        </p>

        <p>
          Each era is designed to feel like stepping into a different musical
          world — bringing together the sounds and atmosphere that defined that
          period.
        </p>
      </section>

      {/* Creators */}
      <section className="mb-14 space-y-5 text-stone-300 leading-relaxed">
        <h2 className="text-xl font-semibold text-stone-100">Created By</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-stone-100">
              Swayam Chondigra
            </h3>

            <p className="mt-2 text-sm text-stone-400">
              Co-creator of GanaSuno, responsible for the development,
              technology, and product vision behind the platform.
            </p>

            <a
              href="https://github.com/SwayamChondigra/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm text-amber-300 hover:text-amber-200"
            >
              GitHub →
            </a>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-stone-100">
              Nikhil Shukla
            </h3>

            <p className="mt-2 text-sm text-stone-400">
              Co-creator of GanaSuno, contributing to the ideas, development,
              and growth of the platform.
            </p>

            <a
              href="https://github.com/Nikhil5686"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm text-amber-300 hover:text-amber-200"
            >
              GitHub →
            </a>
          </div>
        </div>
      </section>

      {/* Future */}
      <section className="space-y-4 text-stone-300 leading-relaxed">
        <h2 className="text-xl font-semibold text-stone-100">
          The Journey Ahead
        </h2>

        <p>
          GanaSuno is an evolving project. The experience will continue to
          expand with more songs, richer era environments, and new ways to
          rediscover music.
        </p>

        <p>
          Our mission is simple: preserve the emotions behind music and make
          every generation's soundtrack easier to experience.
        </p>
      </section>
    </InnerPageLayout>
  );
}
