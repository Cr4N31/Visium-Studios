import { useRef, useState } from "react";

function VideoMotion() {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  return (
    <div
      className="relative w-full h-full overflow-hidden bg-transparent"
      data-aos="fade-up"
    >
      <video
        ref={videoRef}
        autoPlay
        muted={muted}
        loop
        playsInline
        className="block rounded-lg h-full w-full object-cover"
      >
        <source src="/assets/video/final_motion.mp4" type="video/mp4" />
      </video>

      <button
        type="button"
        onClick={toggleSound}
        aria-pressed={!muted}
        aria-label={muted ? "Turn sound on" : "Turn sound off"}
        className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full bg-black/70 px-4 py-2 text-xs font-medium uppercase tracking-[0.08em] text-white backdrop-blur-sm transition-colors hover:bg-black/85"
      >
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            muted ? "bg-white/50" : "bg-red-500"
          }`}
        />
        {muted ? "Sound off" : "Sound on"}
      </button>
    </div>
  );
}

export default VideoMotion;
