import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/departments", label: "Departments" },
  { to: "/doctors", label: "Doctors" },
  { to: "/contact", label: "Contact" },
];

const DROPDOWN_LINKS = [
  { to: "/packages", label: "All Packages" },
  { to: "/packages/starter", label: "Starter" },
  { to: "/packages/standard", label: "Standard" },
  { to: "/packages/enterprise", label: "Enterprise" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setIsDropdownOpen(false);
  }, [window.location?.pathname]);

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
    document.body.classList.toggle("mobile-nav-active");
  };

  const toggleDropdown = (e) => {
    e.preventDefault();
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header id="header" className={`header sticky-top ${isScrolled ? "scrolled" : ""}`}>
      {/* Top Bar */}
      <div className="topbar d-flex align-items-center">
        <div className="container d-flex justify-content-center justify-content-md-between">
          <div className="d-none d-md-flex align-items-center">
            <i className="bi bi-clock me-1"></i> Monday - Saturday, 8AM to 10PM
          </div>
          <div className="d-flex align-items-center">
            <i className="bi bi-phone me-1"></i> Call us now +254 700 000000
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="branding d-flex align-items-center">
        <div className="container position-relative d-flex align-items-center justify-content-end">
          <Link to="/" className="logo d-flex align-items-center me-auto" onClick={() => setIsOpen(false)}>
            <span className="navbar__brand-mark">MC</span>
            <span className="sitename">Medicore</span>
          </Link>

          <nav id="navmenu" className={`navmenu ${isOpen ? "mobile-nav-active" : ""}`}>
            <ul>
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "active" : ""}`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
              
              {/* Packages Dropdown */}
              <li className="dropdown">
                <a 
                  href="#" 
                  onClick={toggleDropdown}
                  className={isDropdownOpen ? "active" : ""}
                >
                  <span>Packages</span> 
                  <i className="bi bi-chevron-down toggle-dropdown"></i>
                </a>
                <ul className={isDropdownOpen ? "dropdown-active" : ""}>
                  {DROPDOWN_LINKS.map((link) => (
                    <li key={link.to}>
                      <NavLink
                        to={link.to}
                        onClick={() => {
                          setIsOpen(false);
                          setIsDropdownOpen(false);
                        }}
                      >
                        {link.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>

              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </NavLink>
              </li>
            </ul>
            <i 
              className="mobile-nav-toggle d-xl-none bi bi-list" 
              onClick={toggleMobileMenu}
            ></i>
          </nav>

          <Link to="/appointment" className="cta-btn">
            Make an Appointment
          </Link>
        </div>
      </div>
    </header>
  );
}