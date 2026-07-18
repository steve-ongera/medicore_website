import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="main">
      {/* Page Title */}
      <div className="page-title">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1>404 - Page Not Found</h1>
                <p className="mb-0">
                  Oops! The page you're looking for doesn't exist.
                </p>
              </div>
            </div>
          </div>
        </div>
        <nav className="breadcrumbs">
          <div className="container">
            <ol>
              <li><Link to="/">Home</Link></li>
              <li className="current">404</li>
            </ol>
          </div>
        </nav>
      </div>

      {/* 404 Section */}
      <section id="not-found" className="section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center" data-aos="fade-up">
              {/* Large 404 Number */}
              <div className="display-1 fw-bold" style={{ 
                fontSize: '120px', 
                color: 'var(--accent-color)',
                lineHeight: '1',
                marginBottom: '30px'
              }}>
                404
              </div>

              {/* Error Message */}
              <h2 className="mb-3" style={{ fontSize: '32px', fontWeight: '700' }}>
                This page isn't on the chart
              </h2>
              
              <p className="mb-4" style={{ fontSize: '18px', color: 'var(--default-color)' }}>
                The page you're looking for doesn't exist or may have moved to another location.
              </p>

              {/* Action Buttons */}
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <Link to="/" className="btn btn-buy" style={{ 
                  background: 'var(--accent-color)',
                  color: 'var(--contrast-color)',
                  padding: '12px 40px',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  display: 'inline-block',
                  transition: '0.3s'
                }}>
                  <i className="bi bi-house me-2"></i>
                  Back to Home
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
                  <i className="bi bi-envelope me-2"></i>
                  Contact Support
                </Link>
              </div>

              {/* Helpful Links */}
              <div className="mt-5 pt-4 border-top">
                <p className="mb-3" style={{ color: 'var(--default-color)' }}>
                  <i className="bi bi-info-circle me-2"></i>
                  You might find these pages helpful:
                </p>
                <div className="d-flex justify-content-center gap-3 flex-wrap">
                  <Link to="/packages" style={{ color: 'var(--accent-color)' }}>Packages</Link>
                  <span>|</span>
                  <Link to="/services" style={{ color: 'var(--accent-color)' }}>Services</Link>
                  <span>|</span>
                  <Link to="/about" style={{ color: 'var(--accent-color)' }}>About Us</Link>
                  <span>|</span>
                  <Link to="/contact" style={{ color: 'var(--accent-color)' }}>Contact</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}