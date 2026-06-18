import OurPosition from "../components/about/OurPosition"
import Philosophy from "../components/about/Philosophy"
function About(){
    return(
        <section className="px-8" data-aos="fade-up" id='about'>
            <h2 className="font-bold tracking-wide text-3xl my-8"><span className="text-5xl font-light italic tracking-wider leading-tight">01</span><br/> Who We Are: Core Identity</h2>
            <OurPosition/>
            <Philosophy/>
        </section>
    )
}

export default About