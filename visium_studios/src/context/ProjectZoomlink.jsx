import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const FLIGHT_MS = 620;

function ProjectZoomLink({ to, image, alt, children, className = "" }) {
  const navigate = useNavigate();
  const mediaRef = useRef(null);
  const [flight, setFlight] = useState(null);

  const handleActivate = (e) => {
    e.preventDefault();
    if (!mediaRef.current || flight) return;

    const rect = mediaRef.current.getBoundingClientRect();
    setFlight({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    });

    window.setTimeout(() => navigate(to), FLIGHT_MS);
  };

  return (
    <>
      <div
        ref={mediaRef}
        onClick={handleActivate}
        role="link"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && handleActivate(e)}
        className={`cursor-pointer ${className}`}
      >
        {children}
      </div>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {flight && (
              <motion.div
                className="fixed z-[999] overflow-hidden pointer-events-none bg-black"
                initial={{
                  top: flight.top,
                  left: flight.left,
                  width: flight.width,
                  height: flight.height,
                }}
                animate={{ top: 0, left: 0, width: "100vw", height: "100vh" }}
                transition={{
                  duration: FLIGHT_MS / 1000,
                  ease: [0.76, 0, 0.24, 1],
                }}
                style={{ position: "fixed" }}
              >
                <motion.img
                  src={image}
                  alt={alt}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.15 }}
                  transition={{
                    duration: FLIGHT_MS / 1000,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}

export default ProjectZoomLink;
