import StudioHeader from "../components/studio/StudioHeader";
import ClientsStrip from "../components/studio/ClientsStrip";
import TeamGrid from "../components/studio/TeamGrid";

function Studio() {
  return (
    <main className="bg-black text-white">
      <StudioHeader />
      <ClientsStrip />
      <TeamGrid />
    </main>
  );
}

export default Studio;
