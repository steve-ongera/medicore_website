import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../assets/img/logo.png";

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
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setIsDropdownOpen(false);
    document.body.classList.remove("mobile-nav-active");
  }, [window.location?.pathname]);

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
    document.body.classList.toggle("mobile-nav-active");
  };

  const closeMobileMenu = () => {
    setIsOpen(false);
    document.body.classList.remove("mobile-nav-active");
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
            <i className="bi bi-telephone me-1"></i> Call us now +254 700 000000
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="branding d-flex align-items-center">
        <div className="container position-relative d-flex align-items-center justify-content-end">
          <Link to="/" className="logo d-flex align-items-center me-auto" onClick={closeMobileMenu}>
            <img src={logo} alt="Medicore HMIS" />
          </Link>

          <nav id="navmenu" className={`navmenu ${isOpen ? "mobile-nav-active" : ""}`}>
            {/* Close Button for Mobile — the single, dedicated control for
                closing the sidebar. The hamburger toggle below hides itself
                via CSS while the sidebar is open, so there's only ever one
                close icon visible at a time. */}
            <button
              className="mobile-nav-close d-xl-none"
              onClick={closeMobileMenu}
              aria-label="Close navigation"
            >
              <i className="bi bi-x-lg"></i>
            </button>

            <ul>
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "active" : ""}`
                    }
                    onClick={closeMobileMenu}
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
                          closeMobileMenu();
                          setIsDropdownOpen(false);
                        }}
                      >
                        {link.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>

          <Link to="/appointment" className="cta-btn">
            <i className="bi bi-file-text me-1"></i> Request Quote
          </Link>

          {/* Mobile Menu Toggle Button. Always a plain hamburger icon —
              it's hidden via CSS (.mobile-nav-active .mobile-nav-toggle)
              while the sidebar is open, so it no longer needs to swap to
              an X icon itself (that job belongs solely to .mobile-nav-close). */}
          <button
            className="mobile-nav-toggle d-xl-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            <i className="bi bi-list"></i>
          </button>
        </div>
      </div>
    </header>
  );
}