import StudioHeader from "../components/studio/StudioHeader";
import TeamGrid from "../components/studio/TeamGrid";
import StudioDirect from "../components/studio/StudioDirect";

function Studio() {
  return (
    <main className="bg-black text-white">
      <StudioHeader />
      <StudioDirect />
      <TeamGrid />
    </main>
  );
}

export default Studio;
