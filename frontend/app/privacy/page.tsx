import type { Metadata } from "next";
import InnerPageLayout from "@/components/inner-page-layout";

export const metadata: Metadata = {
  title: "Privacy Policy — GanaSuno",
  description: "Privacy policy for GanaSuno music experience.",
};

export default function PrivacyPage() {
  return (
    <InnerPageLayout>
      <div className="mb-10">
        <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-amber-300/80 font-medium">
          Legal
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-[0.15em] leading-tight text-stone-100">
          Privacy Policy
        </h1>
        <p className="mt-2 text-xs text-stone-500 font-mono">
          Last updated: February 2026
        </p>
      </div>

      <div className="space-y-8 text-stone-300 leading-relaxed text-sm sm:text-base">
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-100 tracking-tight">
            1. Overview
          </h2>
          <p>
            GanaSuno is committed to respecting your privacy. This policy explains
            how we handle data in the current implementation of the website.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-100 tracking-tight">
            2. Data We Do Not Collect
          </h2>
          <p>
            Currently, GanaSuno does not require user registration or account creation.
            We do not maintain a user database, collect names or email addresses, run
            tracking cookies, or process payments.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-100 tracking-tight">
            3. Local Browser Storage
          </h2>
          <p>
            GanaSuno uses your browser&apos;s local storage (<code>localStorage</code>)
            solely to persist your favorite song selections on your local device.
            This data never leaves your browser and is not transmitted to our servers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-100 tracking-tight">
            4. Future Third-Party Providers
          </h2>
          <p>
            In future updates, GanaSuno may integrate third-party audio and media
            providers (such as YouTube or streaming APIs). When those integrations
            are added, interactions with embedded players may be subject to those
            providers&apos; respective privacy policies and terms of service. This
            section will be updated accordingly when new providers are introduced.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-100 tracking-tight">
            5. Contact
          </h2>
          <p>
            If you have questions about this privacy policy, you can reach out at{" "}
            <a
              href="mailto:rajn5686@gmail.com"
              className="text-amber-300 hover:underline"
            >
              rajn5686@gmail.com
            </a>
            .
          </p>
        </section>
      </div>
    </InnerPageLayout>
  );
}
