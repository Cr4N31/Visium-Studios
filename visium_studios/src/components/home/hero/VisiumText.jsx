import wordmark from "/assets/logo/vs wordmark display.svg";
import TextScramble from "../../../shared/TextScramble";

function VisiumText() {
  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest sm:text-3xl font-semibold">
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

      <p className="text-right  text-[10px]">
        <span className="font-mono uppercase tracking-widest font-semibold sm:text-3xl">
          <TextScramble>Available Worldwide</TextScramble>
        </span>
      </p>
    </div>
  );
}

export default VisiumText;
