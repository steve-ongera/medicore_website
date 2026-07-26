import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

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
                   <li><Link to="/contact"><i className="bi bi-chevron-right"></i> Ministry of Health</Link></li>
                </ul>
              </div>

              <div className="col-lg-3 col-md-6 footer-links">
                <h4>Services</h4>
                <ul>
                  <li><Link to="/services"><i className="bi bi-chevron-right"></i> HMIS Implementation</Link></li>
                  <li><Link to="/services"><i className="bi bi-chevron-right"></i> SHA Integration</Link></li>
                  <li><Link to="/services"><i className="bi bi-chevron-right"></i> eTIMS Compliance</Link></li>
                  <li><Link to="/services"><i className="bi bi-chevron-right"></i> Training &amp; Support</Link></li>
                  <li><Link to="/services"><i className="bi bi-chevron-right"></i> Data Migrations </Link></li>
                  <li><Link to="/services"><i className="bi bi-chevron-right"></i> Security Auditing </Link></li>
                </ul>
              </div>

              <div className="col-lg-3 col-md-6 footer-links">
                <h4>Packages</h4>
                <ul>
                  <li><Link to="/packages"><i className="bi bi-chevron-right"></i> Essential</Link></li>
                  <li><Link to="/packages"><i className="bi bi-chevron-right"></i> Professional</Link></li>
                  <li><Link to="/packages"><i className="bi bi-chevron-right"></i> Advanced</Link></li>
                  <li><Link to="/packages"><i className="bi bi-chevron-right"></i> Enterprise</Link></li>
                  <li><Link to="/packages"><i className="bi bi-chevron-right"></i> Prestige</Link></li>
                  <li><Link to="/packages"><i className="bi bi-chevron-right"></i> International</Link></li>
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
                  <li><Link to="/contact"><i className="bi bi-chevron-right"></i> Email</Link></li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="container copyright text-center mt-4">
        <p>
          © <span>{year}</span> <strong className="px-1 sitename">Medicore HMIS</strong> 
          <span> - All Rights Reserved</span>
        </p>
        <div className="credits">
          <i className="bi bi-heart-fill me-1" style={{ color: 'var(--accent-color)', fontSize: '12px' }}></i>
          Empowering Kenyan Healthcare Through Digital Innovation
          <i className="bi bi-heart-fill ms-1" style={{ color: 'var(--accent-color)', fontSize: '12px' }}></i>
        </div>
        <div className="developer-credit mt-2" style={{ fontSize: '13px', color: 'var(--default-color)', opacity: 0.6 }}>
          <i className="bi bi-code-slash me-1"></i>
          Developed  by  Steve Ongera
          <span className="mx-1">|</span>
          <i className="bi bi-telephone me-1"></i>
          <a href="tel:+254112284093" style={{ color: 'var(--default-color)', textDecoration: 'none' }}>
            0112284093
          </a>
        </div>
      </div>
    </footer>
  );
}