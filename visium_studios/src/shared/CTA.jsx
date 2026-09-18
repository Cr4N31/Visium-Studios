import img from "/assets/logo/visiumSingleLogoBlack.png";

function CTA({ inverted = false }) {
  return (
    <a
      href="/contact"
      className={`
        group
        fixed bottom-6 right-6 z-[100]
        flex items-center gap-2
        rounded-2xl ${inverted ? "bg-black" : "bg-white"}
        px-4 py-4
        shadow-lg
        transition-all duration-300 ease-out
        hover:px-5
      `}
    >
      <img
        src={img}
        className={`w-6 transition-[filter] duration-700 ease-in-out${
          inverted ? " invert" : ""
        }`}
        alt=""
      />

      <span
        className={`
          max-w-0 overflow-hidden font-semibold whitespace-nowrap
          ${inverted ? "text-white" : "text-black"}
          opacity-0
          transition-all duration-300 ease-out
          group-hover:max-w-[150px]
          group-hover:opacity-100
        `}
      >
        Start a project →
      </span>
    </a>
  );
}

export default CTA;
