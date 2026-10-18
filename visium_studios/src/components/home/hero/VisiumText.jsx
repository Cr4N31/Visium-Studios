import wordmark from "/assets/logo/vs wordmark display.svg";
import TextScramble from "../../../shared/TextScramble";
import WordmarkReveal from "./WordmarkReveal";

// Add your alternate wordmark renders here, in the order they should cycle.
// Each image must have the SAME aspect ratio as the wordmark svg so the letters line up.
// import inflated from "/assets/reveal/inflated.png";
// import glossy from "/assets/reveal/glossy.png";
// import chrome from "/assets/reveal/chrome.png";
// const variants = [inflated, glossy, chrome];
const variants = []; // empty = inverted wordmark fallback

function VisiumText() {
  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex items-center justify-between  font-mono text-[10px] uppercase tracking-widest sm:text-[1.5rem] font-[600]">
        <span>
          <TextScramble>Brand &amp; Digital Studio</TextScramble>
        </span>
        <span>
          <TextScramble>Setting the visual standard</TextScramble>
        </span>
      </div>

      <div className="flex justify-center items-center">
        <WordmarkReveal
          src={wordmark}
          variants={variants}
          blobColor="#0B0B0B"
          className="w-[100vw]"
        />
      </div>

      <p className="text-right  text-[10px]">
        <span className="font-mono uppercase tracking-widest text-xs md:text-[1.5rem] font-[600]">
          <TextScramble>Available Worldwide</TextScramble>
        </span>
      </p>
    </div>
  );
}

export default VisiumText;
