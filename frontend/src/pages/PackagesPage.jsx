import { useEffect, useState } from "react";
import { getPackages, getFAQs } from "../services/api.js";
import PackageCard from "../components/PackageCard.jsx";

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
        setPackages(packagesData);
        setFaqs(faqsData);
      })
      .catch((err) => isMounted && setError(err.message))
      .finally(() => isMounted && setIsLoading(false));
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <section className="page-header">
        <div className="section-container">
          <span className="eyebrow">Packages &amp; Pricing</span>
          <h1 className="page-header__title">A package for every facility size</h1>
          <p className="page-header__subtitle">
            All packages include SHA and eTIMS compliance modules. Compare
            beds, staff accounts and module coverage below.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-container">
          {isLoading && <p>Loading packages…</p>}
          {error && <p className="alert alert--error">{error}</p>}
          <div className="package-grid">
            {!isLoading && packages.map((pkg) => <PackageCard key={pkg.id} pkg={pkg} />)}
          </div>
        </div>
      </section>

      {faqs.length > 0 && (
        <section className="section section--faq">
          <div className="section-container">
            <span className="eyebrow">FAQ</span>
            <h2 className="section__title">Common questions</h2>
            <div className="faq-list">
              {faqs.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div className={`faq-item ${isOpen ? "faq-item--open" : ""}`} key={faq.id}>
                    <button
                      className="faq-item__question"
                      onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                      aria-expanded={isOpen}
                    >
                      {faq.question}
                      <span className="faq-item__icon">{isOpen ? "−" : "+"}</span>
                    </button>
                    {isOpen && <p className="faq-item__answer">{faq.answer}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
