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
    "Learn about GanaSuno — a nostalgic music experience organized around the eras that shaped generations of listeners.",
};

export default function AboutPage() {
  return (
    <InnerPageLayout>
      {/* Heading */}
      <div className="mb-12">
        <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-amber-300/80 font-medium">
          About
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-[0.15em] leading-tight text-stone-100">
          GanaSuno
        </h1>
        <p className="mt-4 text-lg text-stone-300 leading-relaxed max-w-xl">
          A nostalgic music experience organized around the eras that shaped generations of listeners.
        </p>
      </div>

      {/* What is GanaSuno */}
      <section className="mb-14 space-y-4 text-stone-300 leading-relaxed">
        <h2 className="text-xl font-semibold text-stone-100 tracking-tight">
          What is GanaSuno?
        </h2>
        <p>
          GanaSuno is a personal music discovery project built around the idea
          that music is one of the most powerful carriers of memory. Different
          eras of music carry distinct atmospheres, emotions, and cultural
          fingerprints. GanaSuno is an attempt to create a focused listening
          experience organized around those eras rather than around genres,
          charts, or algorithms.
        </p>
        <p>
          The name combines <em>Gana</em> (song/music in several South Asian
          languages) and <em>Suno</em> (listen) — simply: listen to music.
        </p>
      </section>

      {/* Why Eras */}
      <section className="mb-14 space-y-4 text-stone-300 leading-relaxed">
        <h2 className="text-xl font-semibold text-stone-100 tracking-tight">
          Why organized around eras?
        </h2>
        <p>
          Most music services organize their catalogs by genre, artist, or
          popularity. GanaSuno takes a different approach: organizing music by
          the decade it was created in. Each era has a distinct sonic identity —
          a combination of the production style, instruments, cultural moment,
          and collective memory that makes it instantly recognizable.
        </p>
        <p>
          The goal is not to rank or compare eras, but to let you step into one
          and explore the music that defined it — the iconic tracks, the
          deeply beloved songs, and the hidden gems that still carry that
          unmistakable atmosphere.
        </p>
      </section>

      {/* The Seven Eras */}
      <section className="mb-14">
        <h2 className="mb-6 text-xl font-semibold text-stone-100 tracking-tight">
          The Seven Eras
        </h2>
        <ul className="space-y-3">
          {ERAS.map((era) => (
            <li
              key={era.id}
              className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 backdrop-blur-sm"
            >
              <span className="font-display text-lg font-bold text-amber-300/90 uppercase tracking-widest w-20 shrink-0">
                {era.title}
              </span>
              <span className="text-stone-400 text-sm font-mono">{eraYearRange(era.id)}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Nostalgia Discovery */}
      <section className="space-y-4 text-stone-300 leading-relaxed">
        <h2 className="text-xl font-semibold text-stone-100 tracking-tight">
          Discovering music through nostalgia
        </h2>
        <p>
          GanaSuno uses a nostalgia-first approach to surface music. Rather than
          sorting by raw streaming counts or release dates alone, it considers a
          combination of how strongly a song is associated with its era, its
          historical significance, and its broader cultural resonance — giving
          deeply beloved but sometimes overlooked tracks a fair place alongside
          the mainstream hits.
        </p>
        <p>
          The project is ongoing. The catalog will be curated and expanded over
          time as verified era-appropriate music is added.
        </p>
      </section>
    </InnerPageLayout>
  );
}
