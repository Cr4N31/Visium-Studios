import { motion as Motion } from "framer-motion";

function StudioEnvironment() {
  return (
    <section className="px-8 pb-20 md:pb-32">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-8 flex items-end justify-between gap-6">
          <p className="text-xs uppercase tracking-[0.2em] text-white/40">
            A point of view, built together
          </p>
          <span className="hidden text-[10px] uppercase tracking-[0.18em] text-white/30 sm:block">
            Visium / The studio
          </span>
        </div>

        <Motion.figure
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden bg-white/5"
        >
          <img
            src="/assets/img/room.webp"
            alt="A calm, considered creative workspace"
            loading="lazy"
            className="block aspect-[3840/2143] w-full object-fill"
          />
          <div
            className="absolute overflow-hidden bg-black"
            style={{
              left: "34.04%",
              top: "34.20%",
              width: "31.80%",
              height: "31.83%",
            }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              aria-label="Visium motion work playing on the studio screen"
              className="block h-full w-full object-cover"
            >
              <source src="/assets/video/final_motion.mp4" type="video/mp4" />
            </video>
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-1 pb-[2%] pt-[8%] text-[clamp(4px,0.8vw,11px)] uppercase tracking-[0.14em] text-white/80">
              Space to think / room to make
            </span>
          </div>
          <figcaption className="absolute inset-x-0 bottom-0 flex flex-col gap-3 bg-gradient-to-t from-black/80 via-black/30 to-transparent px-5 pb-5 pt-20 sm:flex-row sm:items-end sm:justify-between sm:px-8 sm:pb-8">
            <span className="max-w-2xl text-xl leading-tight tracking-[-0.03em] text-white sm:text-2xl md:text-4xl">
              Good work comes from looking at the same problem from different
              angles.
            </span>
          </figcaption>
        </Motion.figure>

        <div className="mt-8 grid gap-8 border-b border-white/15 pb-8 md:grid-cols-[1fr_0.7fr] md:gap-16">
          <h2 className="max-w-3xl text-2xl font-normal leading-tight tracking-[-0.04em] md:text-4xl">
            A studio shaped around the work, not the org chart.
          </h2>
          <p className="max-w-lg text-sm leading-relaxed text-white/50 md:justify-self-end md:text-base">
            We bring the right mix of thinkers and makers around each brief.
            Perspectives stay close, decisions stay connected, and the work can
            move from a clear idea to a considered expression without losing
            its thread.
          </p>
        </div>
      </div>
    </section>
  );
}

export default StudioEnvironment;
