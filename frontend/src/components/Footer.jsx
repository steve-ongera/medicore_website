import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="footer" className="footer light-background">
      <div className="container footer-top">
        <div className="row gy-4">
          
          {/* Brand Column */}
          <div className="col-lg-4 col-md-6 footer-about">
            <Link to="/" className="logo d-flex align-items-center">
              <span className="sitename">Medicore</span>
            </Link>
            <div className="footer-contact pt-3">
              <p>Nairobi, Kenya</p>
              <p>Kenya</p>
              <p className="mt-3">
                <strong>Phone:</strong> <span>+254 700 000000</span>
              </p>
              <p>
                <strong>Email:</strong> <span>support@medicorehmis.co.ke</span>
              </p>
            </div>
            <div className="social-links d-flex mt-4">
              <a href="#"><i className="bi bi-twitter-x"></i></a>
              <a href="#"><i className="bi bi-facebook"></i></a>
              <a href="#"><i className="bi bi-instagram"></i></a>
              <a href="#"><i className="bi bi-linkedin"></i></a>
            </div>
          </div>

          {/* Useful Links */}
          <div className="col-lg-2 col-md-3 footer-links">
            <h4>Useful Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/packages">Packages</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Our Services */}
          <div className="col-lg-2 col-md-3 footer-links">
            <h4>Our Services</h4>
            <ul>
              <li><Link to="/services">HMIS Implementation</Link></li>
              <li><Link to="/services">SHA Integration</Link></li>
              <li><Link to="/services">eTIMS Compliance</Link></li>
              <li><Link to="/services">Training & Support</Link></li>
              <li><Link to="/services">Data Migration</Link></li>
            </ul>
          </div>

          {/* Packages */}
          <div className="col-lg-2 col-md-3 footer-links">
            <h4>Packages</h4>
            <ul>
              <li><Link to="/packages/starter">Starter</Link></li>
              <li><Link to="/packages/standard">Standard</Link></li>
              <li><Link to="/packages/enterprise">Enterprise</Link></li>
              <li><Link to="/packages">All Packages</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-3 footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/appointment">Book Appointment</Link></li>
              <li><Link to="/doctors">Our Team</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
            </ul>
          </div>

        </div>
      </div>

      <div className="container copyright text-center mt-4">
        <p>
          © <span>Copyright</span> <strong className="px-1 sitename">Medicore HMIS</strong> 
          <span>All Rights Reserved</span>
        </p>
        <div className="credits">
           Empowering Kenyan Healthcare Through Digital Innovation
        </div>
      </div>
    </footer>
  );
}