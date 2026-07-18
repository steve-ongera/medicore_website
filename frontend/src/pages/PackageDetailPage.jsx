import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPackageBySlug } from "../services/api.js";
import ModuleChip from "../components/ModuleChip.jsx";

function formatPrice(price) {
  if (price === null || price === undefined) return "Custom Pricing";
  return `KES ${Number(price).toLocaleString("en-KE")}`;
}

export default function PackageDetailPage() {
  const { slug } = useParams();
  const [pkg, setPkg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    getPackageBySlug(slug)
      .then((data) => isMounted && setPkg(data))
      .catch((err) => isMounted && setError(err.message))
      .finally(() => isMounted && setIsLoading(false));
    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (isLoading) {
    return (
      <section className="section section-container">
        <p>Loading package…</p>
      </section>
    );
  }

  if (error || !pkg) {
    return (
      <section className="section section-container">
        <p className="alert alert--error">{error || "Package not found."}</p>
        <Link to="/packages" className="btn btn--outline">Back to packages</Link>
      </section>
    );
  }

  return (
    <>
      <section className="page-header page-header--package">
        <div className="section-container">
          <Link to="/packages" className="back-link">&larr; All packages</Link>
          <span className="eyebrow">{pkg.tagline}</span>
          <h1 className="page-header__title">{pkg.name}</h1>
          <p className="page-header__subtitle">{pkg.description}</p>

          <div className="package-detail__price-block">
            <span className="package-detail__price">{formatPrice(pkg.price)}</span>
            {pkg.price && <span className="package-detail__cycle">/ {pkg.billing_cycle}</span>}
          </div>

          <div className="hero__actions">
            <Link to="/book-demo" className="btn btn--accent">Book a Demo</Link>
            <Link to="/contact" className="btn btn--ghost">Talk to Sales</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-container">
          <div className="package-detail__grid">
            <div>
              <h2 className="section__title section__title--sm">Modules included</h2>
              <div className="module-grid">
                {pkg.modules.map((m) => (
                  <ModuleChip key={m.id} module={m} />
                ))}
              </div>
            </div>

            {pkg.features?.length > 0 && (
              <div>
                <h2 className="section__title section__title--sm">Highlights</h2>
                <ul className="feature-list">
                  {pkg.features.map((f) => (
                    <li key={f.id} className="feature-list__item">{f.text}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
