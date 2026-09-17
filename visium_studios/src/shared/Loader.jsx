function Loader({ visible = true }) {
  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-[#050505] transition-all duration-700 ease-out ${
        visible
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
      aria-live="polite"
      aria-busy={visible}
    >
      <div className="relative flex flex-col items-center gap-6">
        <div className="visium-loader-shell">
          <img
            src="/assets/logo/Logo Icon - White.png"
            alt="Visium Studios"
            className="visium-loader-logo"
          />
        </div>

        <div className="visium-loader-bar" aria-hidden="true">
          <span className="visium-loader-bar-fill" />
        </div>
      </div>
    </div>
  );
}

export default Loader;
