import wordmark from "/assets/logo/vs wordmark display.svg";
import TextScramble from "../../../shared/TextScramble";

function VisiumText() {
  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest sm:text-lg">
        <span>
          <TextScramble>Brand &amp; Digital Studio</TextScramble>
        </span>
        <span>
          <TextScramble>Setting the visual standard</TextScramble>
        </span>
      </div>
      <div className="flex justify-center items-center">
        <img src={wordmark} className="w-[100vw]" />
      </div>

      <p className="text-right font-mono text-[10px] uppercase tracking-widest sm:text-lg">
        <TextScramble>Available Worldwide</TextScramble>
      </p>
    </div>
  );
}

export default VisiumText;
