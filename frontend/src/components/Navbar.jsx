import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../assets/img/logo.png";
import { getPackages } from "../services/api.js";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/sha-etims", label: "SHA & eTIMS" }, // Replaced "Departments"
  { to: "/case-studies", label: "Case Studies" }, // Replaced "Doctors"
  { to: "/contact", label: "Contact" },
];

// Fallback used only if the API call fails or returns nothing, so the
// dropdown never renders empty.
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

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fetch the same package list the Packages page uses, so the
  // dropdown always matches what's actually available — no more
  // hand-maintained duplicate list to keep in sync.
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
            <i className="bi bi-telephone me-1"></i> Call us now +254 757 790 687
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
            {/* Close Button for Mobile — rendered ONLY while the sidebar is
                actually open (isOpen === true), not just hidden with CSS.
                Combined with the toggle button below (rendered only when
                !isOpen), this guarantees the close icon and hamburger can
                never both be on screen — or both be absent — at once. */}
            {isOpen && (
              <button
                className="mobile-nav-close d-xl-none"
                onClick={closeMobileMenu}
                aria-label="Close navigation"
              >
                <i className="bi bi-x-lg"></i>
              </button>
            )}

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

              {/* Packages Dropdown — populated from the API */}
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
                  <li>
                    <NavLink
                      to="/packages"
                      onClick={() => {
                        closeMobileMenu();
                        setIsDropdownOpen(false);
                      }}
                    >
                      All Packages
                    </NavLink>
                  </li>
                  {packages.map((pkg) => (
                    <li key={pkg.id ?? pkg.slug}>
                      <NavLink
                        to={`/packages/${pkg.slug}`}
                        onClick={() => {
                          closeMobileMenu();
                          setIsDropdownOpen(false);
                        }}
                      >
                        {pkg.name}
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

          {/* Mobile Menu Toggle Button. Rendered ONLY when the sidebar is
              closed — not just hidden with CSS. This guarantees the
              hamburger and the .mobile-nav-close button can never both be
              on screen at once, regardless of any class-sync timing. */}
          {!isOpen && (
            <button
              className="mobile-nav-toggle d-xl-none"
              onClick={toggleMobileMenu}
              aria-label="Open navigation menu"
              aria-expanded={isOpen}
            >
              <i className="bi bi-list"></i>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}