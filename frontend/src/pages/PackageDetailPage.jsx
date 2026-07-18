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
      <main className="main">
        <section className="section">
          <div className="container text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading package...</span>
            </div>
            <p className="mt-3">Loading package…</p>
          </div>
        </section>
      </main>
    );
  }

  if (error || !pkg) {
    return (
      <main className="main">
        <section className="section">
          <div className="container text-center py-5">
            <i className="bi bi-exclamation-triangle display-1 text-warning"></i>
            <h2 className="mt-3">Package Not Found</h2>
            <p className="text-muted">{error || "The package you're looking for doesn't exist."}</p>
            <Link to="/packages" className="btn btn-buy mt-3" style={{
              background: 'var(--accent-color)',
              color: 'var(--contrast-color)',
              padding: '12px 40px',
              borderRadius: '4px',
              textDecoration: 'none',
              display: 'inline-block',
              transition: '0.3s'
            }}>
              <i className="bi bi-arrow-left me-2"></i>
              Back to Packages
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="main">
      {/* Page Title */}
      <div className="page-title">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <Link to="/packages" className="d-inline-block mb-3" style={{ color: 'var(--accent-color)' }}>
                  <i className="bi bi-arrow-left me-2"></i>
                  All Packages
                </Link>
                <span className="badge bg-primary mb-3">{pkg.tagline || 'Package'}</span>
                <h1>{pkg.name}</h1>
                <p className="mb-0">{pkg.description}</p>
              </div>
            </div>
          </div>
        </div>
        <nav className="breadcrumbs">
          <div className="container">
            <ol>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/packages">Packages</Link></li>
              <li className="current">{pkg.name}</li>
            </ol>
          </div>
        </nav>
      </div>

      {/* Package Overview */}
      <section className="section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center" data-aos="fade-up">
              {/* Price Block */}
              <div className="mb-4">
                <h2 className="display-4 fw-bold" style={{ color: 'var(--accent-color)' }}>
                  {formatPrice(pkg.price)}
                </h2>
                {pkg.price && (
                  <span className="text-muted">/ {pkg.billing_cycle}</span>
                )}
              </div>

              {/* Package Specs */}
              <div className="row justify-content-center g-3 mb-4">
                {pkg.max_beds !== null && (
                  <div className="col-auto">
                    <div className="px-4 py-2 border rounded">
                      <i className="bi bi-hospital me-2" style={{ color: 'var(--accent-color)' }}></i>
                      <strong>{pkg.max_beds || 'Unlimited'}</strong> Beds
                    </div>
                  </div>
                )}
                {pkg.max_users !== null && (
                  <div className="col-auto">
                    <div className="px-4 py-2 border rounded">
                      <i className="bi bi-people me-2" style={{ color: 'var(--accent-color)' }}></i>
                      <strong>{pkg.max_users || 'Unlimited'}</strong> Users
                    </div>
                  </div>
                )}
                <div className="col-auto">
                  <div className="px-4 py-2 border rounded">
                    <i className="bi bi-grid me-2" style={{ color: 'var(--accent-color)' }}></i>
                    <strong>{pkg.modules?.length || 0}</strong> Modules
                  </div>
                </div>
                <div className="col-auto">
                  <div className="px-4 py-2 border rounded">
                    <i className="bi bi-arrow-repeat me-2" style={{ color: 'var(--accent-color)' }}></i>
                    <strong>{pkg.billing_cycle}</strong> Billing
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <Link to="/appointment" className="btn btn-buy" style={{
                  background: 'var(--accent-color)',
                  color: 'var(--contrast-color)',
                  padding: '12px 40px',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  display: 'inline-block',
                  transition: '0.3s'
                }}>
                  <i className="bi bi-calendar-plus me-2"></i>
                  Book a Demo
                </Link>
                <Link to="/contact" className="btn btn-outline" style={{
                  padding: '12px 40px',
                  borderRadius: '4px',
                  border: '2px solid var(--accent-color)',
                  color: 'var(--accent-color)',
                  textDecoration: 'none',
                  display: 'inline-block',
                  transition: '0.3s'
                }}>
                  <i className="bi bi-chat-dots me-2"></i>
                  Talk to Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="section light-background">
        <div className="container section-title" data-aos="fade-up">
          <h2>Modules Included</h2>
          <p>Everything you need to run your facility efficiently</p>
        </div>

        <div className="container">
          {pkg.modules && pkg.modules.length > 0 ? (
            <div className="row gy-4">
              {pkg.modules.map((m, index) => (
                <div 
                  key={m.id}
                  className="col-lg-4 col-md-6"
                  data-aos="fade-up"
                  data-aos-delay={100 + (index * 50)}
                >
                  <ModuleChip module={m} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-muted">No modules listed for this package.</p>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      {pkg.features && pkg.features.length > 0 && (
        <section className="section">
          <div className="container section-title" data-aos="fade-up">
            <h2>Package Highlights</h2>
            <p>What makes this package special</p>
          </div>

          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="row gy-3">
                  {pkg.features.map((feature, index) => (
                    <div 
                      key={feature.id}
                      className="col-12"
                      data-aos="fade-up"
                      data-aos-delay={100 + (index * 50)}
                    >
                      <div className="d-flex align-items-start p-3 border rounded" style={{
                        transition: 'all 0.3s',
                        cursor: 'default'
                      }}>
                        <i className="bi bi-check-circle-fill me-3 mt-1" style={{ 
                          color: 'var(--accent-color)',
                          fontSize: '24px'
                        }}></i>
                        <div>
                          <p className="mb-0" style={{ fontSize: '16px' }}>{feature.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="call-to-action section accent-background">
        <div className="container">
          <div className="row justify-content-center" data-aos="zoom-in">
            <div className="col-xl-10">
              <div className="text-center">
                <h3 style={{ color: 'var(--contrast-color)' }}>
                  Ready to get started with {pkg.name}?
                </h3>
                <p style={{ color: 'var(--contrast-color)' }}>
                  Book a free walkthrough with our onboarding team and see how 
                  {pkg.name} can transform your facility.
                </p>
                <Link to="/appointment" className="cta-btn">
                  <i className="bi bi-calendar-plus me-2"></i>
                  Book a Demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}