import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand-col">
          <div className="footer__brand">
            <span className="navbar__brand-mark">MC</span>
            <span className="navbar__brand-name">
              Medicore <span className="navbar__brand-suffix">HMIS</span>
            </span>
          </div>
          <p className="footer__tagline">
            SHA-ready, eTIMS-compliant hospital management software built for
            clinics, nursing homes and hospitals across Kenya.
          </p>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Product</h4>
          <ul className="footer__list">
            <li><Link to="/packages">Packages &amp; Pricing</Link></li>
            <li><Link to="/modules">Modules</Link></li>
            <li><Link to="/book-demo">Book a Demo</Link></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Company</h4>
          <ul className="footer__list">
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Get in touch</h4>
          <ul className="footer__list">
            <li><a href="mailto:support@medicorehmis.co.ke">support@medicorehmis.co.ke</a></li>
            <li><a href="tel:+254700000000">+254 700 000000</a></li>
            <li>Nairobi, Kenya</li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <span>&copy; {year} Medicore HMIS. All rights reserved.</span>
        <span className="footer__system-tag">SHA · eTIMS · M-PESA READY</span>
      </div>
    </footer>
  );
}
