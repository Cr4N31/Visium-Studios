import StudioHeader from "../components/studio/StudioHeader";
import StudioEnvironment from "../components/studio/StudioEnvironment";
import StudioDirect from "../components/studio/StudioDirect";
import StudioProcess from "../components/studio/StudioProcess";
import StudioWork from "../components/studio/StudioWork";
import FinalCTA from "../components/home/FinalCta";

function Studio() {
  return (
    <main className="bg-black text-white">
      <StudioHeader />
      <StudioEnvironment />
      <StudioDirect />
      <StudioProcess />
      <StudioWork />
      <FinalCTA eyebrow="The next chapter starts here" />
    </main>
  );
}

export default Studio;
