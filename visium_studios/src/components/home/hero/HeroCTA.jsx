function HeroCTA() {
  return (
    <section className="w-full shrink-0 overflow-hidden rounded-xl text-black md:w-[340px]">
      <div className="flex h-60 overflow-hidden rounded-xl border border-2 border-[#ffff] md:h-full">
        <div className="flex min-w-0 flex-1 flex-col justify-between bg-white p-5 sm:p-7">
          <div>
            <h2 className="text-xl uppercase leading-[1.05] tracking-wide sm:text-2xl">
              <span className="font-bold">
                Start
                <br />A project
              </span>
            </h2>
            <p className="mt-2 text-sm leading-tight text-black/65 sm:text-base">
              Let&apos;s book &amp; talk with our manager.
            </p>
          </div>
          <a
            href="/call-page"
            className="flex h-10  items-center justify-center rounded-md bg-[#fff] uppercase tracking-wide transition-colors hover:bg-black hover:text-white"
          >
            <span className="font-mono font-semibold text-base">Book call</span>
          </a>
        </div>
        <div className="relative w-[30%] shrink-0 overflow-hidden border-l border-l-[#fff] bg-neutral-200">
          <img
            className="h-full w-full object-cover object-top"
            src="/assets/img/first.png"
            alt="Jace Kayode"
          />
          <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-2 pb-3 pt-8 text-center text-[10px] font-semibold uppercase tracking-wider text-white">
            Jace K.
          </span>
        </div>
      </div>
    </section>
  );
}
export default HeroCTA;
