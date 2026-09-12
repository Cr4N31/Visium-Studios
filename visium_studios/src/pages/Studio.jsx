import StudioHeader from "../components/studio/StudioHeader";
import ClientsStrip from "../components/studio/ClientsStrip";
import TeamGrid from "../components/studio/TeamGrid";
import StudioDirect from "../components/studio/StudioDirect";

function Studio() {
  return (
    <main className="bg-black text-white">
      <StudioHeader />
      <StudioDirect />
      <ClientsStrip />
      <TeamGrid />
    </main>
  );
}

export default Studio;
