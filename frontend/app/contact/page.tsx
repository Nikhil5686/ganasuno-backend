import type { Metadata } from "next";
import InnerPageLayout from "@/components/inner-page-layout";

export const metadata: Metadata = {
  title: "Contact — GanaSuno",
  description: "Get in touch with GanaSuno for feedback, suggestions or collaboration.",
};

export default function ContactPage() {
  return (
    <InnerPageLayout>
      <div className="mb-10">
        <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-amber-300/80 font-medium">
          Get in Touch
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-[0.15em] leading-tight text-stone-100">
          Contact GanaSuno
        </h1>
      </div>

      <p className="mb-10 text-stone-300 leading-relaxed text-base max-w-lg">
        For feedback, suggestions, corrections, or collaboration, feel free to
        reach out. All messages are welcome.
      </p>

      <a
        href="mailto:rajn5686@gmail.com"
        className="inline-flex items-center gap-3 rounded-full border border-amber-400/30 bg-amber-400/10 px-7 py-3.5 text-base text-amber-200 hover:bg-amber-400/20 hover:border-amber-400/60 transition-all duration-200 font-medium"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
        rajn5686@gmail.com
      </a>
    </InnerPageLayout>
  );
}
