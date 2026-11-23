import wordmark from "/assets/logo/vs wordmark display.svg";
import TextScramble from "../../../shared/TextScramble";
import WordmarkReveal from "./WordmarkReveal";

const variants = [];

// One source of truth for every label so mobile styling stays consistent
const labelClass =
  "font-mono text-[10px] font-[800] uppercase tracking-widest md:text-[20px] md:font-[600] lg:text-[22px] 2xl:text-[24px]";

function VisiumText() {
  const heroLabelScrambleDuration = 3200;

  return (
    <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-3 2xl:max-w-[1700px]">
      {/* Top label */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <span className={`${labelClass} whitespace-nowrap`}>
          <TextScramble duration={heroLabelScrambleDuration}>
            Brand &amp; Digital Studio
          </TextScramble>
        </span>

        {/* Desktop/tablet only */}
        <span className={`${labelClass} hidden sm:block`}>
          <TextScramble duration={heroLabelScrambleDuration}>
            Setting the visual standard
          </TextScramble>
        </span>
      </div>

      {/* Wordmark */}
      <div className="flex w-full items-center justify-center">
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
          <TextScramble duration={heroLabelScrambleDuration}>
            Setting the visual standard
          </TextScramble>
        </span>

        <span className={`${labelClass} text-left md:text-right`}>
          <TextScramble duration={heroLabelScrambleDuration}>
            Available Worldwide
          </TextScramble>
        </span>
      </div>
    </div>
  );
}

export default VisiumText;
