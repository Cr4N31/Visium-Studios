function VideoMotion() {
  return (
    <div className="w-full h-full overflow-hidden bg-transparent">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="block rounded-lg h-full w-full object-cover"
      >
        <source src="/assets/video/final_motion.mp4" type="video/mp4" />
      </video>
    </div>
  );
}

export default VideoMotion;
