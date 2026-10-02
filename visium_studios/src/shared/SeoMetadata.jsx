import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getInsight } from "../data/insights";
import { DEFAULT_SEO, ROUTE_SEO } from "../data/seo";

function upsertMeta(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.append(element);
  }
  element.setAttribute("content", content);
}

function upsertCanonical(url) {
  let element = document.head.querySelector('link[rel="canonical"]');
  if (!element) {
    element = document.createElement("link");
    element.rel = "canonical";
    document.head.append(element);
  }
  element.href = url;
}

function upsertSchema(data) {
  let element = document.head.querySelector("script[data-seo-schema]");
  if (!element) {
    element = document.createElement("script");
    element.type = "application/ld+json";
    element.dataset.seoSchema = "true";
    document.head.append(element);
  }
  element.textContent = JSON.stringify(data);
}

function SeoMetadata() {
  const { pathname } = useLocation();

  useEffect(() => {
    const articleMatch = pathname.match(/^\/insights\/([^/]+)\/?$/);
    const slug = articleMatch ? decodeURIComponent(articleMatch[1]) : null;
    const article = slug ? getInsight(slug) : null;
    const page = article
      ? {
          title: `${article.title} | Visium Studios`,
          description: article.excerpt,
          image: article.image,
        }
      : (ROUTE_SEO[pathname.replace(/\/$/, "") || "/"] ?? DEFAULT_SEO);
    const canonicalUrl = new URL(pathname, window.location.origin).href;
    const imageUrl = new URL(
      page.image ?? "/assets/logo/visiumSingleLogoBlack.png",
      window.location.origin,
    ).href;

    document.title = page.title;
    upsertMeta("name", "description", page.description);
    upsertMeta("name", "robots", "index, follow");
    upsertMeta("property", "og:type", article ? "article" : "website");
    upsertMeta("property", "og:site_name", "Visium Studios");
    upsertMeta("property", "og:title", page.title);
    upsertMeta("property", "og:description", page.description);
    upsertMeta("property", "og:url", canonicalUrl);
    upsertMeta("property", "og:image", imageUrl);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", page.title);
    upsertMeta("name", "twitter:description", page.description);
    upsertMeta("name", "twitter:image", imageUrl);
    upsertCanonical(canonicalUrl);

    const organization = {
      "@type": "Organization",
      name: "Visium Studios",
      url: window.location.origin,
      logo: new URL(
        "/assets/logo/visiumSingleLogoBlack.png",
        window.location.origin,
      ).href,
      description: DEFAULT_SEO.description,
    };
    const schemas = [
      {
        "@type": "WebSite",
        name: "Visium Studios",
        url: window.location.origin,
      },
      organization,
    ];

    if (article) {
      schemas.push({
        "@type": "BlogPosting",
        headline: article.title,
        description: article.excerpt,
        image: imageUrl,
        datePublished: article.date,
        author: { "@type": "Organization", name: article.author },
        publisher: organization,
        mainEntityOfPage: canonicalUrl,
      });
    }

    upsertSchema({ "@context": "https://schema.org", "@graph": schemas });
  }, [pathname]);

  return null;
}

export default SeoMetadata;
