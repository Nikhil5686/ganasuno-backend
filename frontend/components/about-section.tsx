export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative z-10 border-y border-white/10 bg-black/25"
    >
      <div className="mx-auto w-full max-w-5xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          {/* Heading */}
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-amber-300/80">
              About GanaSuno
            </p>

            <h2 className="mt-4 font-display text-3xl font-semibold tracking-wide text-stone-100 sm:text-4xl">
              Every era has a sound.
            </h2>

            <div className="mt-5 h-px w-16 bg-amber-300/50" />
          </div>

          {/* Content */}
          <div className="space-y-5 text-sm leading-7 text-stone-400 sm:text-base">
            <p>
              GanaSuno is designed to make discovering nostalgic music feel
              personal and effortless. Instead of searching through endless
              catalogs, you can explore music through the eras that defined it.
            </p>

            <p>
              From the timeless melodies of the 1970s and 1980s to the sounds of
              the 1990s, 2000s and beyond, GanaSuno brings different generations
              of music into one experience.
            </p>

            <p>
              Our catalog is organized around eras and languages so that every
              listener can find something familiar — or discover something they
              missed.
            </p>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {/* ==================================================
              CARD 01
          ================================================== */}

          <div
            className="
              group
              rounded-2xl
              border border-white/10
              bg-white/[0.035]
              p-6
              backdrop-blur-md
              transition-all duration-300
              hover:-translate-y-1
              hover:border-amber-300/50
              hover:bg-amber-300/[0.03]
              hover:shadow-[0_0_30px_rgba(245,158,11,0.12)]
            "
          >
            <div
              className="
                text-2xl
                text-amber-300
                transition-all duration-300
                group-hover:text-amber-200
                group-hover:drop-shadow-[0_0_10px_rgba(245,158,11,0.35)]
              "
            >
              01
            </div>

            <h3
              className="
                mt-4
                text-sm
                font-semibold
                uppercase
                tracking-[0.15em]
                text-stone-200
                transition-colors duration-300
                group-hover:text-white
              "
            >
              Explore Eras
            </h3>

            <p className="mt-3 text-xs leading-6 text-stone-500">
              Travel through different generations of music and discover the
              sound of each era.
            </p>
          </div>

          {/* ==================================================
              CARD 02
          ================================================== */}

          <div
            className="
              group
              rounded-2xl
              border border-white/10
              bg-white/[0.035]
              p-6
              backdrop-blur-md
              transition-all duration-300
              hover:-translate-y-1
              hover:border-amber-300/50
              hover:bg-amber-300/[0.03]
              hover:shadow-[0_0_30px_rgba(245,158,11,0.12)]
            "
          >
            <div
              className="
                text-2xl
                text-amber-300
                transition-all duration-300
                group-hover:text-amber-200
                group-hover:drop-shadow-[0_0_10px_rgba(245,158,11,0.35)]
              "
            >
              02
            </div>

            <h3
              className="
                mt-4
                text-sm
                font-semibold
                uppercase
                tracking-[0.15em]
                text-stone-200
                transition-colors duration-300
                group-hover:text-white
              "
            >
              Choose Language
            </h3>

            <p className="mt-3 text-xs leading-6 text-stone-500">
              Explore music across different Indian languages and discover
              familiar voices and melodies.
            </p>
          </div>

          {/* ==================================================
              CARD 03
          ================================================== */}

          <div
            className="
              group
              rounded-2xl
              border border-white/10
              bg-white/[0.035]
              p-6
              backdrop-blur-md
              transition-all duration-300
              hover:-translate-y-1
              hover:border-amber-300/50
              hover:bg-amber-300/[0.03]
              hover:shadow-[0_0_30px_rgba(245,158,11,0.12)]
            "
          >
            <div
              className="
                text-2xl
                text-amber-300
                transition-all duration-300
                group-hover:text-amber-200
                group-hover:drop-shadow-[0_0_10px_rgba(245,158,11,0.35)]
              "
            >
              03
            </div>

            <h3
              className="
                mt-4
                text-sm
                font-semibold
                uppercase
                tracking-[0.15em]
                text-stone-200
                transition-colors duration-300
                group-hover:text-white
              "
            >
              Relive Memories
            </h3>

            <p className="mt-3 text-xs leading-6 text-stone-500">
              Put on a song, settle in, and let a familiar melody bring back a
              moment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
