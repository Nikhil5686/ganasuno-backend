import type { Metadata } from "next";
import InnerPageLayout from "@/components/inner-page-layout";

export const metadata: Metadata = {
  title: "Articles — GanaSuno",
  description: "Stories about music, memory, and the eras that shaped us. Coming soon.",
};

export default function ArticlesPage() {
  return (
    <InnerPageLayout>
      <div className="mb-10">
        <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-amber-300/80 font-medium">
          Articles
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-[0.15em] leading-tight text-stone-100">
          Stories
        </h1>
      </div>

      {/* Coming Soon State */}
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5">
          <svg
            className="w-7 h-7 text-stone-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
            />
          </svg>
        </div>
        <p className="text-base text-stone-400 leading-relaxed max-w-sm">
          Stories about music, memories and the eras that shaped us are coming soon.
        </p>
      </div>
    </InnerPageLayout>
  );
}
