function VideoMotion() {
  return (
    <div className="aspect-video w-full overflow-hidden md:aspect-auto md:h-screen">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="block h-full w-full object-cover"
      >
        <source src="/assets/video/final_motion.mp4" type="video/mp4" />
      </video>
    </div>
  );
}

export default VideoMotion;
