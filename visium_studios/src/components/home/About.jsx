import OurPosition from "./about/OurPosition";
import Philosophy from "./about/Philosophy";

function About() {
  return (
    <section className="px-4 sm:px-6 md:px-8" data-aos="fade-up" id="work">
      <div className="flex flex-col items- gap-4 text-left">
        <p className="tracking-wide text-5xl md:text-7xl mb-16 mt-8">
          What is Visium Studios?
        </p>
      </div>
      <OurPosition />
      <Philosophy />
    </section>
  );
}

export default About;
