import HeroText from "../components/hero/HeroText"
import hero_video from '../../public/assets/video/hero.mp4'

function Hero() {
  return (
    <main className="relative flex justify-center md:justify-start items-center h-screen px-12 overflow-hidden">
      
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={hero_video} type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Content */}
      <div className="relative z-20">
        <HeroText />
      </div>

    </main>
  )
}
export default Hero