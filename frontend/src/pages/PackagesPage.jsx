import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

  const toggleFaq = (id) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

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
          ) : (
            <div className="row gy-4">
              {packages.map((pkg, index) => (
                <div 
                  key={pkg.id}
                  className="col-xl-3 col-lg-6" 
                  data-aos="fade-up" 
                  data-aos-delay={100 + (index * 100)}
                >
                  <PackageCard pkg={pkg} />
                </div>
              ))}
            </div>
          )}

          {/* Compare Packages CTA */}
          {!isLoading && packages.length > 0 && (
            <div className="text-center mt-5" data-aos="fade-up">
              <p className="text-muted mb-3">
                Need a custom package for your facility?
              </p>
              <Link to="/contact" className="btn btn-buy" style={{
                background: 'var(--accent-color)',
                color: 'var(--contrast-color)',
                padding: '12px 40px',
                borderRadius: '4px',
                textDecoration: 'none',
                display: 'inline-block',
                transition: '0.3s'
              }}>
                <i className="bi bi-envelope me-2"></i>
                Contact Us for Custom Quote
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      {faqs.length > 0 && (
        <section id="faq" className="faq section light-background">
          <div className="container section-title" data-aos="fade-up">
            <h2>Frequently Asked Questions</h2>
            <p>Common questions about our packages and services</p>
          </div>

          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10" data-aos="fade-up" data-aos-delay="100">
                <div className="faq-container">
                  {faqs.map((faq, index) => {
                    const isOpen = openFaqId === faq.id;
                    return (
                      <div 
                        key={faq.id}
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