function VideoMotion() {
  return (
    <div className="h-[42svh] w-full overflow-hidden md:h-[55vh]">
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
