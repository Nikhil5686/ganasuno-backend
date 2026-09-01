import type { Metadata } from "next";
import InnerPageLayout from "@/components/inner-page-layout";

export const metadata: Metadata = {
  title: "GanaSuno Founders — Nikhil Shukla & Swayam Chondigra",
  description:
    "Meet Nikhil Shukla, Founder of GanaSuno, and Swayam Chondigra, Co-founder of GanaSuno.",
};

export default function FoundersPage() {
  return (
    <InnerPageLayout>
      <div className="mb-12">
        <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-amber-300/80 font-medium">
          The People Behind GanaSuno
        </p>

        <h1 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-[0.15em] leading-tight text-stone-100">
          GanaSuno Founders
        </h1>

        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-stone-300">
          GanaSuno is built around a simple idea — making it easier to
          rediscover Indian music across languages, regions, memories, and eras.
        </p>
      </div>

      <section className="mb-14 grid gap-5 sm:grid-cols-2">
        {/* Founder */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80">
            Founder
          </p>

          <h2 className="mt-3 text-2xl font-semibold text-stone-100">
            Nikhil Shukla
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-stone-400">
            Nikhil Shukla is the Founder of GanaSuno, contributing to the
            platform&apos;s direction, development, and growth.
          </p>

          <a
            href="https://github.com/Nikhil5686"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-block text-sm text-amber-300 hover:text-amber-200"
          >
            GitHub →
          </a>
        </div>

        {/* Co-founder */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <p className="text-xs uppercase tracking-[0.25em] text-amber-300/80">
            Co-founder
          </p>

          <h2 className="mt-3 text-2xl font-semibold text-stone-100">
            Swayam Chondigra
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-stone-400">
            Swayam Chondigra is the Co-founder of GanaSuno, responsible for
            technology, development, and product experience.
          </p>

          <a
            href="https://github.com/SwayamChondigra"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-block text-sm text-amber-300 hover:text-amber-200"
          >
            GitHub →
          </a>
        </div>
      </section>

      <section className="space-y-4 text-stone-300 leading-relaxed">
        <h2 className="text-xl font-semibold text-stone-100">About GanaSuno</h2>

        <p>
          GanaSuno is an Indian music discovery and curation platform focused on
          music across languages, regions, nostalgia, and different eras.
        </p>

        <p>
          The platform aims to make discovering music feel more personal by
          connecting listeners with the sounds and memories associated with
          different generations.
        </p>
      </section>
    </InnerPageLayout>
  );
}
