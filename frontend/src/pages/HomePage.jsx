import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getFeaturedPackages,
  getModules,
  getTestimonials,
  getSiteSettings,
} from "../services/api.js";
import PackageCard from "../components/PackageCard.jsx";
import ModuleChip from "../components/ModuleChip.jsx";

export default function HomePage() {
  const [settings, setSettings] = useState(null);
  const [packages, setPackages] = useState([]);
  const [modules, setModules] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    Promise.all([
      getSiteSettings(),
      getFeaturedPackages(),
      getModules({ is_core: true }),
      getTestimonials(true),
    ])
      .then(([settingsData, packagesData, modulesData, testimonialsData]) => {
        if (!isMounted) return;
        setSettings(settingsData);
        setPackages(packagesData);
        setModules(modulesData);
        setTestimonials(testimonialsData);
      })
      .catch((err) => isMounted && setError(err.message))
      .finally(() => isMounted && setIsLoading(false));

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <section className="hero">
        <div className="hero__inner">
          <span className="eyebrow">Built for Kenyan facilities</span>
          <h1 className="hero__headline">
            {settings?.hero_headline || "Hospital Management, Simplified for Kenya"}
          </h1>
          <p className="hero__subtext">
            {settings?.hero_subtext ||
              "SHA-ready, eTIMS-compliant HMIS software for clinics, nursing homes and hospitals — from outpatient to bed management."}
          </p>
          <div className="hero__actions">
            <Link to="/book-demo" className="btn btn--accent">Book a Demo</Link>
            <Link to="/packages" className="btn btn--ghost">View Packages</Link>
          </div>
          <div className="hero__tags">
            <span className="tag-pill">SHA CLAIMS</span>
            <span className="tag-pill">eTIMS INVOICING</span>
            <span className="tag-pill">M-PESA BILLING</span>
            <span className="tag-pill">BED MANAGEMENT</span>
          </div>
        </div>
      </section>

      {error && <p className="alert alert--error section-container">{error}</p>}

      <section className="section section--modules">
        <div className="section-container">
          <span className="eyebrow">Core modules</span>
          <h2 className="section__title">One system, every ward covered</h2>
          <p className="section__subtitle">
            Core modules ship with every Medicore HMIS package, from front-desk
            triage to statutory compliance.
          </p>
          <div className="module-grid">
            {isLoading && <p>Loading modules…</p>}
            {!isLoading && modules.map((m) => <ModuleChip key={m.id} module={m} />)}
          </div>
        </div>
      </section>

      <section className="section section--packages">
        <div className="section-container">
          <span className="eyebrow">Packages</span>
          <h2 className="section__title">Pick the tier that fits your facility</h2>
          <p className="section__subtitle">
            From single-room dispensaries to multi-branch hospital groups.
          </p>
          <div className="package-grid">
            {isLoading && <p>Loading packages…</p>}
            {!isLoading && packages.map((pkg) => <PackageCard key={pkg.id} pkg={pkg} />)}
          </div>
          <div className="section__cta">
            <Link to="/packages" className="btn btn--outline">Compare all packages</Link>
          </div>
        </div>
      </section>

      {testimonials.length > 0 && (
        <section className="section section--testimonials">
          <div className="section-container">
            <span className="eyebrow">Trusted by facilities across Kenya</span>
            <h2 className="section__title">What administrators are saying</h2>
            <div className="testimonial-grid">
              {testimonials.map((t) => (
                <blockquote key={t.id} className="testimonial-card">
                  <p className="testimonial-card__message">&ldquo;{t.message}&rdquo;</p>
                  <footer className="testimonial-card__footer">
                    <span className="testimonial-card__name">{t.client_name}</span>
                    <span className="testimonial-card__role">
                      {t.client_role}{t.organization ? `, ${t.organization}` : ""}
                    </span>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section section--cta-band">
        <div className="section-container cta-band__inner">
          <div>
            <h2 className="cta-band__title">Ready to digitize your facility?</h2>
            <p className="cta-band__subtitle">
              Book a free walkthrough with our onboarding team — most facilities
              go live within two weeks.
            </p>
          </div>
          <Link to="/book-demo" className="btn btn--accent btn--lg">Book a Demo</Link>
        </div>
      </section>
    </>
  );
}
