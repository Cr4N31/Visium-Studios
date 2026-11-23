import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { serviceList } from "../data/serviceList";
import TextScramble from "../shared/TextScramble";

function ServiceDetail() {
  const { slug } = useParams();
  const service = serviceList.find((item) => item.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) return <Navigate to="/" replace />;

  return (
    <main className="bg-[#F4F4F1] text-black">
      <article className="mx-auto max-w-[1100px] px-6 pb-20 pt-28 sm:px-10 md:px-12 md:pb-28 md:pt-36">
        <Link
          to="/#services"
          className="mb-10 inline-flex text-[10px] uppercase tracking-[0.2em] text-black/55 transition-colors hover:text-black"
        >
          Back to services
        </Link>

        <div className="overflow-hidden rounded-xl bg-white/5">
          <img
            src={service.image}
            alt={service.title}
            className="aspect-[16/10] w-full object-cover md:aspect-[16/9]"
          />
        </div>

        <div className="mt-10 max-w-3xl md:mt-14">
          <h1 className=" font-normal leading-[0.95] tracking-[-0.05em]">
            <span className="text-5xl">{service.title}</span>
          </h1>

          <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-black/55 md:text-xs">
            {service.note}
          </p>

          <div className="mt-10 space-y-6 text-base leading-relaxed text-black/70 md:text-lg">
            {(service.details || [service.description]).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </article>
    </main>
  );
}

export default ServiceDetail;
