export default function WelcomeSection() {
  return (
    <section
      id="welcome"
      className="relative z-10 mx-auto w-full max-w-5xl px-4 py-20 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-amber-300/80">
          Welcome to GanaSuno
        </p>

        <h2 className="mt-4 font-display text-3xl font-semibold tracking-wide text-stone-100 sm:text-4xl">
          Music that brings back memories.
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-stone-400 sm:text-base">
          GanaSuno is a nostalgic music experience built around the songs,
          sounds, and eras that shaped generations. Choose an era, choose a
          language, and let the music take you back.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-stone-300 backdrop-blur-md">
            Music Through The Eras
          </span>

          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-stone-300 backdrop-blur-md">
            Multiple Languages
          </span>

          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-stone-300 backdrop-blur-md">
            Pure Nostalgia
          </span>
        </div>
      </div>
    </section>
  );
}
