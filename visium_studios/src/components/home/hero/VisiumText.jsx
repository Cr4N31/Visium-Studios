import wordmark from "/assets/logo/vs wordmark display.svg";
import TextScramble from "../../../shared/TextScramble";
import WordmarkReveal from "./WordmarkReveal";

const variants = [];

function VisiumText() {
  return (
    <div className="flex w-full flex-col gap-3">
      {/* Top label */}
      <div className="flex flex-col gap-2 font-mono text-[10px] font-[600] uppercase tracking-widest sm:flex-row sm:items-center sm:justify-between">
        <span className="whitespace-nowrap">
          <TextScramble>Brand &amp; Digital Studio</TextScramble>
        </span>

        <span className="hidden sm:block">
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
      <div className="flex flex-col gap-2">
        <p className="md:text-right text-left text-[10px]">
          <span className="font-mono text-xs font-[600] uppercase tracking-widest">
            <TextScramble>Available Worldwide</TextScramble>
          </span>
        </p>

        {/* Mobile-only second label */}
        <p className="text-left font-mono text-[10px] font-[600] uppercase tracking-widest sm:hidden">
          <TextScramble>Setting the visual standard</TextScramble>
        </p>
      </div>
    </div>
  );
}

export default VisiumText;
