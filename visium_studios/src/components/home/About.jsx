import OurPosition from "./about/OurPosition";
import Philosophy from "./about/Philosophy";

function About() {
  return (
    <section className="px-4 sm:px-6 md:px-8" data-aos="fade-up" id="work">
      <OurPosition />
      <Philosophy />
    </section>
  );
}

export default About;
