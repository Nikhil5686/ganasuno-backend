import type { Metadata } from "next";
import InnerPageLayout from "@/components/inner-page-layout";

export const metadata: Metadata = {
  title: "Terms of Use — GanaSuno",
  description: "Terms of Use for GanaSuno music experience.",
};

export default function TermsPage() {
  return (
    <InnerPageLayout>
      <div className="mb-10">
        <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-amber-300/80 font-medium">
          Legal
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-[0.15em] leading-tight text-stone-100">
          Terms of Use
        </h1>
        <p className="mt-2 text-xs text-stone-500 font-mono">
          Last updated: February 2026
        </p>
      </div>

      <div className="space-y-8 text-stone-300 leading-relaxed text-sm sm:text-base">
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-100 tracking-tight">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing and using GanaSuno, you agree to comply with and be bound
            by these Terms of Use. If you do not agree to these terms, please do
            not use the service.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-100 tracking-tight">
            2. Acceptable Use
          </h2>
          <p>
            GanaSuno is provided for personal, non-commercial entertainment and
            educational exploration of musical eras. You agree not to attempt to
            disrupt the website, exploit vulnerabilities, or scrape services in an
            abusive manner.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-100 tracking-tight">
            3. Intellectual Property & Third-Party Content
          </h2>
          <p>
            The GanaSuno application design, user interface, brand assets, and code
            are protected by intellectual property laws. Music metadata, titles,
            artists, and audio streams referenced on the platform belong to their
            respective copyright holders and rights owners.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-100 tracking-tight">
            4. Service Availability & Changes
          </h2>
          <p>
            GanaSuno is an evolving project. We reserve the right to modify,
            suspend, or discontinue features or the entire service at any time
            without prior notice.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-stone-100 tracking-tight">
            5. Limitation of Liability
          </h2>
          <p>
            GanaSuno is provided on an &ldquo;as is&rdquo; and &ldquo;as
            available&rdquo; basis without warranties of any kind. To the fullest
            extent permitted by law, GanaSuno and its developers disclaim any
            liability for damages arising out of your use of the website.
          </p>
        </section>
      </div>
    </InnerPageLayout>
  );
}
