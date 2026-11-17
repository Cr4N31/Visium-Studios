import wordmark from "/assets/logo/vs wordmark display.svg";
import TextScramble from "../../../shared/TextScramble";
import WordmarkReveal from "./WordmarkReveal";

const variants = [];

// One source of truth for every label so mobile styling stays consistent
const labelClass =
  "font-mono text-[10px] md:text-[20px] font-[800] md:font-[600] uppercase tracking-widest";

function VisiumText() {
  return (
    <div className="flex w-full flex-col gap-3">
      {/* Top label */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <span className={`${labelClass} whitespace-nowrap`}>
          <TextScramble>Brand &amp; Digital Studio</TextScramble>
        </span>

        {/* Desktop/tablet only */}
        <span className={`${labelClass} hidden sm:block`}>
          <TextScramble>Setting the visual standard</TextScramble>
        </span>
      </div>

      {/* Wordmark */}
      <div className="flex items-center justify-center">
        <WordmarkReveal
          src={wordmark}
          variants={variants}
          blobColor="#0B0B0B"
          className="w-full"
        />
      </div>

      {/* Bottom labels */}
      <div className="flex flex-col gap-2 md:items-end">
        {/* Mobile only: sits above "Available Worldwide" */}
        <span className={`${labelClass} text-left sm:hidden`}>
          <TextScramble>Setting the visual standard</TextScramble>
        </span>

        <span className={`${labelClass} text-left md:text-right`}>
          <TextScramble>Available Worldwide</TextScramble>
        </span>
      </div>
    </div>
  );
}

export default VisiumText;
