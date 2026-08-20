import Link from "next/link";
import GanasunoFooter from "@/components/ganasuno-footer";

export default function InnerPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="min-h-screen bg-[#080706] text-stone-100">
        {/* Top Nav */}
        <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
            <Link
              href="/"
              className="font-display text-base font-bold uppercase tracking-[0.2em] text-stone-100 hover:text-amber-200 transition-colors"
            >
              GanaSuno
            </Link>
            <Link
              href="/"
              className="text-xs text-stone-400 hover:text-stone-200 transition-colors uppercase tracking-wider"
            >
              ← Back
            </Link>
          </div>
        </nav>

        {/* Page Content */}
        <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
          {children}
        </main>
      </div>
      <GanasunoFooter />
    </>
  );
}
