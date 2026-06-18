import Personality from '../components/brand/Personality'
import Tone from '../components/brand/Tone'
function Brand() {
  return (
    <section className="px-8" data-aos="fade-up" id='brand'>
      <h2 className="font-bold tracking-wide text-3xl my-8">
        <span className="text-5xl font-light italic tracking-wider leading-tight">02</span><br/>
        Brand Personality & Tone
      </h2>
      <p className="text-sm text-gray-500 leading-relaxed max-w-xl mb-10">
        To maintain an elite presence, our communication and corporate behavior mirror our design
        philosophy: minimal, intellectual and uncompromisingly precise.
      </p>
      <Personality/>
      <Tone/>
    </section>
  )
}
export default Brand