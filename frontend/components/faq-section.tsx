"use client";

import { useState } from "react";

const FAQS = [
  {
    question: "What is GanaSuno?",
    answer:
      "GanaSuno is a nostalgic music experience that lets you explore songs through different eras and languages.",
  },
  {
    question: "How do I explore different eras?",
    answer:
      "Use the era selector above the music player. Hindi currently supports the full era timeline, while other languages may have specific catalog availability.",
  },
  {
    question: "Which languages are available?",
    answer:
      "GanaSuno is being built to support Hindi, English, Bhojpuri, Gujarati, Haryanvi and Punjabi music. Catalog availability can differ between languages.",
  },
  {
    question: "Why are some eras unavailable for certain languages?",
    answer:
      "Different languages currently use different curated playlists. Some catalogs are available as a single playlist, while others are organized across specific eras.",
  },
  {
    question: "Where does the music come from?",
    answer:
      "GanaSuno uses music playback sources from supported providers. The current catalog uses YouTube playlists for playback.",
  },
  {
    question: "Can I suggest songs or playlists?",
    answer:
      "Yes. As GanaSuno grows, suggestions can help expand and improve the catalog across eras and languages.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section
      id="faq"
      className="relative z-10 mx-auto w-full max-w-5xl px-4 py-20 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-amber-300/80">
            Frequently Asked Questions
          </p>

          <h2 className="mt-4 font-display text-3xl font-semibold tracking-wide text-stone-100 sm:text-4xl">
            Questions, answered.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-stone-500">
            Everything you need to know about exploring music on GanaSuno.
          </p>
        </div>

        <div className="mt-10 space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-amber-300/20 bg-white/[0.055]"
                    : "border-white/10 bg-white/[0.025]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                >
                  <span className="text-sm font-medium text-stone-200">
                    {faq.question}
                  </span>

                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 text-stone-400 transition-all duration-300 ${
                      isOpen
                        ? "rotate-45 border-amber-300/30 text-amber-300"
                        : ""
                    }`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      aria-hidden="true"
                    >
                      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>

                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-6 text-stone-500">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
