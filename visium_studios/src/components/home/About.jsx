import OurPosition from "./about/OurPosition";
import Philosophy from "./about/Philosophy";

function About() {
  return (
    <section className="px-8" data-aos="fade-up" id="work">
      <div className="flex flex-col items- gap-4 text-left">
        <p className="tracking-wide text-5xl md:text-7xl mb-16 mt-8">
          What is Visium Studios?
        </p>
      </div>
      <p
        className="font-serif text-center py-20 italic text-2xl md:text-3xl lg:text-5xl text-white/80 leading-[1.15]"
        data-aos="fade-up"
      >
        "Visium is a visual systems studio"
      </p>
      <OurPosition />
      <Philosophy />
    </section>
  );
}

export default About;
