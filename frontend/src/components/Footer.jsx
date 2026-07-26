import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPackages } from "../services/api.js";

// Fallback used only if the API call fails or returns nothing, so the
// column never renders empty.
const FALLBACK_PACKAGES = [
  { id: 1, name: "Essential", slug: "essential" },
  { id: 2, name: "Professional", slug: "professional" },
  { id: 3, name: "Advanced", slug: "advanced" },
  { id: 4, name: "Enterprise", slug: "enterprise" },
  { id: 5, name: "Prestige", slug: "prestige" },
  { id: 6, name: "International", slug: "international" },
];

// Normalize whatever the API returns into a plain array — handles a
// plain array, DRF pagination ({ results: [...] }), or a wrapped
// { data: [...] } shape, same as PackagesPage.
function normalizeListResponse(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  if (Array.isArray(data?.data)) return data.data;
  return [];
}

export default function Footer() {
  const year = new Date().getFullYear();
  const [packages, setPackages] = useState([]);

  // Pull the same package list the Packages page uses, so this column
  // always matches what's actually available instead of a hand-kept
  // duplicate list.
  useEffect(() => {
    let isMounted = true;
    getPackages()
      .then((data) => {
        if (!isMounted) return;
        const list = normalizeListResponse(data);
        setPackages(list.length > 0 ? list : FALLBACK_PACKAGES);
      })
      .catch(() => {
        if (isMounted) setPackages(FALLBACK_PACKAGES);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <footer id="footer" className="footer light-background">
      <div className="container footer-top">
        <div className="row gy-4">
          
          {/* Brand Column */}
          <div className="col-lg-4 col-md-12 footer-about">
            <Link to="/" className="logo d-flex align-items-center">
              <span className="sitename">Medicore</span>
            </Link>
            <div className="footer-contact pt-3">
              <p>
                <i className="bi bi-geo-alt me-2" style={{ color: 'var(--accent-color)' }}></i>
                Nairobi, Kenya
              </p>
              <p>
                <i className="bi bi-telephone me-2" style={{ color: 'var(--accent-color)' }}></i>
                <strong>Phone:</strong> <span>+254 757 790 687</span>
              </p>
              <p>
                <i className="bi bi-envelope me-2" style={{ color: 'var(--accent-color)' }}></i>
                <strong>Email:</strong> <span>support@medicorehmis.co.ke</span>
              </p>
            </div>
            <div className="social-links d-flex mt-4">
              <a href="#" aria-label="Twitter"><i className="bi bi-twitter-x"></i></a>
              <a href="#" aria-label="Facebook"><i className="bi bi-facebook"></i></a>
              <a href="#" aria-label="Instagram"><i className="bi bi-instagram"></i></a>
              <a href="#" aria-label="LinkedIn"><i className="bi bi-linkedin"></i></a>
              <a href="#" aria-label="YouTube"><i className="bi bi-youtube"></i></a>
            </div>
          </div>

          {/* Useful Links - Consolidated */}
          <div className="col-lg-8 col-md-12">
            <div className="row gy-4">
              <div className="col-lg-3 col-md-6 footer-links">
                <h4>Useful Links</h4>
                <ul>
                  <li><Link to="/"><i className="bi bi-chevron-right"></i> Home</Link></li>
                  <li><Link to="/about"><i className="bi bi-chevron-right"></i> About Us</Link></li>
                  <li><Link to="/services"><i className="bi bi-chevron-right"></i> Services</Link></li>
                  <li><Link to="/packages"><i className="bi bi-chevron-right"></i> Packages</Link></li>
                  <li><Link to="/contact"><i className="bi bi-chevron-right"></i> Contact</Link></li>
                  {/* Same destination as "Contact" above, so this one is a placeholder */}
                  <li><Link to="#"><i className="bi bi-chevron-right"></i> Ministry of Health</Link></li>
                </ul>
              </div>

              <div className="col-lg-3 col-md-6 footer-links">
                <h4>Services</h4>
                <ul>
                  <li><Link to="/services"><i className="bi bi-chevron-right"></i> HMIS Implementation</Link></li>
                  {/* These all shared the same "/services" link — kept the
                      first one real, the rest are placeholders until each
                      service gets its own page/anchor. */}
                  <li><Link to="#"><i className="bi bi-chevron-right"></i> SHA Integration</Link></li>
                  <li><Link to="#"><i className="bi bi-chevron-right"></i> eTIMS Compliance</Link></li>
                  <li><Link to="#"><i className="bi bi-chevron-right"></i> Training &amp; Support</Link></li>
                  <li><Link to="#"><i className="bi bi-chevron-right"></i> Data Migrations </Link></li>
                  <li><Link to="#"><i className="bi bi-chevron-right"></i> Security Auditing </Link></li>
                </ul>
              </div>

              <div className="col-lg-3 col-md-6 footer-links">
                <h4>Packages</h4>
                <ul>
                  {packages.map((pkg) => (
                    <li key={pkg.id ?? pkg.slug}>
                      <Link to={`/packages/${pkg.slug}`}>
                        <i className="bi bi-chevron-right"></i> {pkg.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-lg-3 col-md-6 footer-links">
                <h4>Quick Links</h4>
                <ul>
                  <li><Link to="/appointment"><i className="bi bi-chevron-right"></i> Book Demo</Link></li>
                  <li><Link to="/about#team"><i className="bi bi-chevron-right"></i> Our Team</Link></li>
                  <li><Link to="/case-studies"><i className="bi bi-chevron-right"></i> Case Studies</Link></li>
                  <li><Link to="/packages#faq"><i className="bi bi-chevron-right"></i> FAQ</Link></li>
                  <li><Link to="/contact"><i className="bi bi-chevron-right"></i> SHA & Etims</Link></li>
                  {/* Same destination as "SHA & Etims" above */}
                  <li><Link to="#"><i className="bi bi-chevron-right"></i> Email</Link></li>
                </ul>
              </div>
            </div>

            {/* Developer credit — sits directly below the Useful Links / Services
                columns, still inside the footer-top grid, above the copyright bar */}
            <div
              className="footer-developer mt-2 pt-2"
              style={{
                borderTop: '1px solid var(--gray-mid)',
                fontSize: '13px',
                color: 'var(--default-color)',
                opacity: 0.7,
              }}
            >
              <i className="bi bi-code-slash me-1"></i>
              This site is developed by <strong>Steve Ongera</strong>
              <span className="mx-2">|</span>
              <i className="bi bi-telephone me-1"></i>
              <a
                href="tel:+254112284093"
                style={{ color: 'var(--default-color)', textDecoration: 'none' }}
              >
                0112284093
              </a>
            </div>
          </div>

        </div>
      </div>

      <div className="container copyright text-center mt-2">
        <p>
          © <span>{year}</span> <strong className="px-1 sitename">Medicore HMIS</strong> 
          <span> - All Rights Reserved</span>
        </p>
      </div>
    </footer>
  );
}