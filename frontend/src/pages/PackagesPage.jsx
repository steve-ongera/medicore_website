import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getPackages, getFAQs } from "../services/api.js";
import useSEO from "../hooks/useSEO.js";

// Normalize whatever the API returns into a plain array. Handles a
// plain array, DRF pagination ({ results: [...] }), or a wrapped
// { data: [...] } shape — falls back to [] otherwise so .map() never
// throws.
function normalizeListResponse(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  if (Array.isArray(data?.data)) return data.data;
  return [];
}

// Normalize a package's module list into an array of plain strings,
// regardless of whether the API sends strings or PackageModule
// objects like { id, name, display_order }.
function normalizeModules(modules) {
  if (!Array.isArray(modules)) return [];
  return modules.map((mod) => (typeof mod === "string" ? mod : mod?.name)).filter(Boolean);
}

// Read a value from the first matching key present on the object, so
// the UI works whether the serializer uses "setup"/"sla"/"featured"
// naming or the Django model's "price"/"monthly_sla"/"is_featured".
function pick(obj, keys, fallback = "") {
  for (const key of keys) {
    if (obj?.[key] !== undefined && obj?.[key] !== null && obj?.[key] !== "") {
      return obj[key];
    }
  }
  return fallback;
}

// Hardcoded FAQs as fallback
const FALLBACK_FAQS = [
  {
    id: 1,
    question: "What is Medicore HMIS?",
    answer: "Medicore HMIS is a comprehensive hospital management information system designed specifically for Kenyan healthcare facilities. It helps clinics, nursing homes, and hospitals manage patient records, billing, SHA claims, eTIMS compliance, and more in one integrated platform."
  },
  {
    id: 2,
    question: "Is Medicore HMIS compliant with SHA and eTIMS?",
    answer: "Yes! Medicore HMIS is fully compliant with both SHA (Social Health Authority) requirements and KRA eTIMS regulations. All packages include built-in compliance modules, so your facility stays up to date with regulatory changes."
  },
  {
    id: 3,
    question: "How long does it take to implement Medicore HMIS?",
    answer: "Most facilities can be up and running within days, not months. Our team provides training and support to ensure a smooth transition. The timeline depends on your facility size and specific requirements."
  },
  {
    id: 4,
    question: "Can I integrate Medicore HMIS with M-Pesa?",
    answer: "Absolutely! Medicore HMIS includes M-Pesa Paybill and STK Push integration, making it easy for patients to pay bills and for your facility to reconcile payments automatically."
  },
  {
    id: 5,
    question: "What happens if I need more beds or users?",
    answer: "You can easily upgrade to a higher package as your facility grows. All packages are designed to scale with your needs, from small clinics to large referral hospitals."
  },
  {
    id: 6,
    question: "Do you offer training and support?",
    answer: "Yes, we provide comprehensive training for your staff and ongoing support. Our team is based in Nairobi and understands the unique challenges of the Kenyan healthcare system."
  }
];

export default function PackagesPage() {
  const [packages, setPackages] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openFaqId, setOpenFaqId] = useState(null);

  useEffect(() => {
    let isMounted = true;
    Promise.all([getPackages(), getFAQs()])
      .then(([packagesData, faqsData]) => {
        if (!isMounted) return;

        // Debug: Log the actual data received
        console.log('Packages data received:', packagesData);
        console.log('FAQs data received:', faqsData);

        // Unwrap plain arrays, DRF pagination ({ results: [...] }),
        // or { data: [...] } — whichever shape the API sends back.
        const packagesArray = normalizeListResponse(packagesData);
        let faqsArray = normalizeListResponse(faqsData);

        // If no FAQs from API, use fallback hardcoded FAQs
        if (faqsArray.length === 0) {
          console.log('No FAQs from API, using fallback FAQs');
          faqsArray = FALLBACK_FAQS;
        }

        console.log('Packages array length:', packagesArray.length);
        console.log('FAQs array length:', faqsArray.length);

        setPackages(packagesArray);
        setFaqs(faqsArray);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
        if (isMounted) {
          setError(err.message);
          setPackages([]);
          // Use fallback FAQs on error
          setFaqs(FALLBACK_FAQS);
        }
      })
      .finally(() => isMounted && setIsLoading(false));
    return () => {
      isMounted = false;
    };
  }, []);

  const safePackages = Array.isArray(packages) ? packages : [];
  const safeFaqs = Array.isArray(faqs) ? faqs : [];

  const toggleFaq = (id) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  // Builds an ItemList/Offer schema for the packages and an FAQPage
  // schema from the loaded FAQs, combined under @graph. FAQPage schema
  // is what makes the accordion questions eligible for rich results.
  // Only published once both have actually loaded.
  const schema = useMemo(() => {
    if (isLoading) return undefined;

    const graph = [];

    if (safePackages.length > 0) {
      graph.push({
        "@type": "ItemList",
        name: "Medicore HMIS Packages",
        itemListElement: safePackages.map((pkg, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Product",
            name: pkg.name,
            description: pkg.tagline || undefined,
            offers: {
              "@type": "Offer",
              price: pick(pkg, ["price", "setup"]) || undefined,
              priceCurrency: "KES",
              url: `https://medicorehmis.co.ke/packages/${pkg.slug}`,
            },
          },
        })),
      });
    }

    if (safeFaqs.length > 0) {
      graph.push({
        "@type": "FAQPage",
        mainEntity: safeFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      });
    }

    if (graph.length === 0) return undefined;

    return { "@context": "https://schema.org", "@graph": graph };
  }, [safePackages, safeFaqs, isLoading]);

  useSEO({
    title: "Packages & Pricing",
    description:
      "Compare Medicore HMIS packages for clinics, nursing homes and hospitals in Kenya. Every package includes SHA and eTIMS compliance modules.",
    keywords: "HMIS pricing Kenya, hospital software packages, clinic management system pricing, SHA eTIMS software cost",
    path: "/packages",
    schema,
  });

  return (
    <main className="main">
      {/* Page Title */}
      <div className="page-title">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1>Packages &amp; Pricing</h1>
                <p className="mb-0">
                  A package for every facility size. All packages include SHA 
                  and eTIMS compliance modules.
                </p>
              </div>
            </div>
          </div>
        </div>
        <nav className="breadcrumbs">
          <div className="container">
            <ol>
              <li><Link to="/">Home</Link></li>
              <li className="current">Packages</li>
            </ol>
          </div>
        </nav>
      </div>

      {/* Packages Section */}
      <section id="packages" className="pricing section">
        <div className="container section-title" data-aos="fade-up">
          <h2>Choose Your Package</h2>
          <p>
            Compare beds, staff accounts and module coverage below. 
            All packages include SHA and eTIMS compliance modules.
          </p>
        </div>

        <div className="container">
          {isLoading ? (
            <div className="text-center py-5" data-aos="fade-up">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading packages...</span>
              </div>
              <p className="mt-3">Loading packages…</p>
            </div>
          ) : error ? (
            <div className="alert alert-danger text-center" role="alert">
              <i className="bi bi-exclamation-triangle me-2"></i>
              {error}
            </div>
          ) : safePackages.length === 0 ? (
            <div className="text-center py-5" data-aos="fade-up">
              <p className="text-muted">No packages available at the moment.</p>
              <p className="text-muted small mt-2">
                Check the console (F12) for debug information about the API response.
              </p>
            </div>
          ) : (
            <div className="row gy-4">
              {safePackages.map((pkg, index) => {
                const isFeatured = pick(pkg, ["featured", "is_featured"], false);
                const badge = pick(pkg, ["badge", "badge_text"]);
                const pricePrefix = pick(pkg, ["price_prefix", "setupPrefix"]);
                const price = pick(pkg, ["price", "setup"]);
                const slaPrefix = pick(pkg, ["monthly_sla_prefix", "sla_prefix", "slaPrefix"]);
                const sla = pick(pkg, ["monthly_sla", "sla"]);
                const modulesLabel = pick(pkg, ["modules_label", "modulesLabel"], "All Included Modules");
                const modules = normalizeModules(pkg.modules);

                return (
                  <div
                    key={pkg.id ?? pkg.slug ?? index}
                    className="col-lg-4 col-md-6"
                    data-aos="fade-up"
                    data-aos-delay={100 + (index * 100)}
                  >
                    <div className={`pricing-item h-100${isFeatured ? " featured" : ""}`}>
                      {badge && <span className="advanced">{badge}</span>}
                      <h3>{pkg.name}</h3>
                      <p className="pricing-subtitle">{pkg.tagline || pkg.subtitle}</p>
                      <h4>
                        <sup>KES</sup>
                        {pricePrefix}
                        {price}
                        <span> setup</span>
                      </h4>
                      <p className="pricing-sla">
                        + KES {slaPrefix}
                        {sla}/mo SLA
                      </p>
                      <p className="pricing-modules-label">
                        {modulesLabel}
                        <span className="pricing-scroll-hint">scroll for more</span>
                      </p>
                      <ul>
                        {modules.map((mod) => (
                          <li key={mod}>
                            <i className="bi bi-check-circle"></i>
                            {mod}
                          </li>
                        ))}
                      </ul>
                      <div className="btn-wrap">
                        <Link to={`/packages/${pkg.slug}`} className="btn-buy" style={{ 
                          background: "var(--accent-color)",
                          color: "var(--contrast-color)",
                          display: "inline-block",
                          padding: "10px 40px",
                          borderRadius: "30px",
                          fontSize: "14px",
                          fontWeight: 600,
                          fontFamily: "var(--heading-font)",
                          transition: "all 0.3s ease",
                          boxShadow: "0 4px 15px rgba(63, 187, 192, 0.3)",
                        }}>
                          <i className="bi bi-eye me-2"></i>
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Compare Packages CTA */}
          {!isLoading && safePackages.length > 0 && (
            <div className="text-center mt-5" data-aos="fade-up">
              <p className="text-muted mb-3">
                Need a custom package for your facility?
              </p>
              <Link to="/contact" className="btn-buy" style={{
                display: 'inline-block',
                padding: '12px 40px',
                borderRadius: '30px',
              }}>
                <i className="bi bi-envelope me-2"></i>
                Contact Us for Custom Quote
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      {safeFaqs.length > 0 && (
        <section id="faq" className="faq section light-background">
          <div className="container section-title" data-aos="fade-up">
            <h2>Frequently Asked Questions</h2>
            <p>Common questions about our packages and services</p>
          </div>

          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10" data-aos="fade-up" data-aos-delay="100">
                <div className="faq-container">
                  {safeFaqs.map((faq, index) => {
                    const isOpen = openFaqId === faq.id;
                    return (
                      <div 
                        key={faq.id ?? index}
                        className={`faq-item ${isOpen ? 'faq-active' : ''}`}
                      >
                        <h3 onClick={() => toggleFaq(faq.id)}>
                          <span className="num">{String(index + 1).padStart(2, '0')}.</span> 
                          {faq.question}
                        </h3>
                        <div className="faq-content">
                          <p>{faq.answer}</p>
                        </div>
                        <i 
                          className={`faq-toggle bi ${isOpen ? 'bi-chevron-down' : 'bi-chevron-right'}`}
                          onClick={() => toggleFaq(faq.id)}
                        ></i>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}