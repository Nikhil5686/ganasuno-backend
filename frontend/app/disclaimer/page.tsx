import type { Metadata } from "next";
import InnerPageLayout from "@/components/inner-page-layout";

export const metadata: Metadata = {
  title: "Disclaimer — GanaSuno",
  description: "Disclaimer regarding third-party content and music rights on GanaSuno.",
};

export default function DisclaimerPage() {
  return (
    <InnerPageLayout>
      <div className="mb-10">
        <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-amber-300/80 font-medium">
          Legal
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-[0.15em] leading-tight text-stone-100">
          Disclaimer
        </h1>
        <p className="mt-2 text-xs text-stone-500 font-mono">
          Last updated: February 2026
        </p>
      </div>

      <div className="space-y-8 text-stone-300 leading-relaxed text-sm sm:text-base">
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-100 tracking-tight">
            1. Purpose
          </h2>
          <p>
            GanaSuno is an educational and nostalgic music discovery experience
            designed to celebrate historic musical eras. It serves as an exploration
            interface rather than a commercial streaming distributor.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-100 tracking-tight">
            2. Copyright & Ownership
          </h2>
          <p>
            All songs, recordings, artist names, trademarks, and associated media
            remain the sole property of their respective creators, record labels,
            and copyright holders. GanaSuno does not claim ownership of any
            third-party musical works.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-100 tracking-tight">
            3. Third-Party Content & Availability
          </h2>
          <p>
            Media playback and metadata are provided via standard development or
            third-party embedded streams. Availability of specific tracks may change
            without notice based on regional restrictions, provider policies, or
            rights holder requests.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-100 tracking-tight">
            4. Takedown Requests
          </h2>
          <p>
            If you are a copyright owner or authorized representative and believe
            any material on GanaSuno infringes your rights, please reach out to{" "}
            <a
              href="mailto:rajn5686@gmail.com"
              className="text-amber-300 hover:underline"
            >
              rajn5686@gmail.com
            </a>{" "}
            with details, and we will promptly address your request.
          </p>
        </section>
      </div>
    </InnerPageLayout>
  );
}
