import { useEffect } from "react";

const SITE_URL = "https://medicorehmis.co.ke";
const SITE_NAME = "Medicore HMIS";

/**
 * Sets document title, meta description/keywords, Open Graph tags,
 * canonical link, and (optionally) a JSON-LD schema block for the
 * current page. No extra dependency (react-helmet etc.) required —
 * swap this out for Helmet later if the project adopts it.
 *
 * @param {Object} params
 * @param {string} params.title - Page title, shown as "{title} | Medicore HMIS"
 * @param {string} params.description - Meta description (~150-160 chars)
 * @param {string} [params.keywords] - Comma-separated keywords
 * @param {string} [params.path] - Path for canonical/og:url, e.g. "/about"
 * @param {Object} [params.schema] - JSON-LD object, or omit for none
 */
export default function useSEO({ title, description, keywords, path = "/", schema }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    document.title = fullTitle;

    const setMeta = (attr, key, content) => {
      if (!content) return;
      let tag = document.querySelector(`meta[${attr}="${key}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attr, key);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    setMeta("name", "description", description);
    setMeta("name", "keywords", keywords);
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:url", `${SITE_URL}${path}`);
    setMeta("name", "twitter:card", "summary_large_image");

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `${SITE_URL}${path}`);

    // Each page owns exactly one schema block, identified by this id,
    // so navigating between pages replaces rather than stacks schemas.
    let schemaTag = document.getElementById("page-schema");
    if (schema) {
      if (!schemaTag) {
        schemaTag = document.createElement("script");
        schemaTag.type = "application/ld+json";
        schemaTag.id = "page-schema";
        document.head.appendChild(schemaTag);
      }
      schemaTag.textContent = JSON.stringify(schema);
    } else if (schemaTag) {
      schemaTag.remove();
    }
  }, [title, description, keywords, path, schema]);
}