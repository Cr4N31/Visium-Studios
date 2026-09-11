import clients from "../../data/clients";

function ClientsStrip() {
  return (
    <section className="px-4 md:px-10 py-20 border-t border-white/10">
      <p className="text-xs uppercase tracking-widest text-white/40 mb-10">
        Selected Clients
      </p>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-10">
        {clients.map((client) => (
          <span
            key={client}
            className="text-lg md:text-xl text-white/30 hover:text-white transition-colors duration-300 tracking-tight"
          >
            {client}
          </span>
        ))}
      </div>
    </section>
  );
}

export default ClientsStrip;
