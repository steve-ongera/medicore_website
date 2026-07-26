import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSiteSettings, getPackages } from "../services/api.js";

import Hero from "../components/sections/Hero.jsx";

// Images — swap these paths for whatever you actually have in
// src/assets/img/. Any photo of a Kenyan clinic/hospital, a screenshot
// of the dashboard, or your team works fine here.
import aboutImg from "../assets/img/about.jpg";
import ctaBg from "../assets/img/cta-bg.webp";
import dashboardImg from "../assets/img/dashboard-preview.jpg";

// HMIS product screenshots for the "ward by ward" carousel below.
// Add real screenshots at these paths (or point these imports at your
// own files) — dashboardImg above is reused as the first/hero shot.
import screenshotPatients from "../assets/img/screenshots/patient-records.png";
import screenshotBilling from "../assets/img/screenshots/Screenshot 2026-07-07 185400.png";
import screenshotPharmacy from "../assets/img/screenshots/Screenshot 2026-07-16 144916.png";
import screenshotAppointments from "../assets/img/screenshots/Screenshot 2026-07-16 145040.png";
import screenshotReports from "../assets/img/screenshots/Screenshot 2026-07-16 145306.png";

const SITE_URL = "https://medicorehmis.co.ke";

const CORE_FEATURES = [
  {
    icon: "fa-solid fa-hand-holding-medical",
    title: "SHA Integration",
    description:
      "Submit claims directly to the Social Health Authority with real-time validation — no manual re-keying, fewer rejected claims.",
  },
  {
    icon: "fa-solid fa-suitcase-medical",
    title: "eTIMS Compliance",
    description:
      "Every invoice is KRA eTIMS-compliant out of the box, so your facility stays on the right side of tax law automatically.",
  },
  {
    icon: "fa-solid fa-bed-pulse",
    title: "Bed Management",
    description:
      "Live bed occupancy across every ward and wing, so admissions and transfers stop relying on whiteboards and phone calls.",
  },
  {
    icon: "fa-solid fa-file-waveform",
    title: "Patient Records",
    description:
      "Fast, searchable digital records shared across departments — from outpatient triage to discharge summaries.",
  },
  {
    icon: "fa-solid fa-pills",
    title: "Pharmacy & Inventory",
    description:
      "Track stock levels, expiries, and dispensing in real time, with low-stock alerts before you run out.",
  },
  {
    icon: "fa-solid fa-file-invoice-dollar",
    title: "Billing & Insurance",
    description:
      "Handle cash, insurance, and SHA billing from one screen, with automatic reconciliation against claims submitted.",
  },
];

const TRUST_STATS = [
  { icon: "bi bi-hospital", value: "40+", label: "Facilities across Kenya" },
  { icon: "bi bi-shield-check", value: "SHA & eTIMS", label: "Compliant by default" },
  { icon: "bi bi-headset", value: "Local", label: "Nairobi-based support team" },
  { icon: "bi bi-clock", value: "24/7", label: "System uptime monitoring" },
];

// --- Testimonials (moving marquee strip) ---
const TESTIMONIALS = [
  {
    name: "Grace Wambui",
    role: "Hospital Administrator",
    facility: "Riverside Medical Centre, Nakuru",
    quote:
      "Our SHA claim rejections dropped within the first month. The billing team finally trusts what's on the screen.",
    rating: 5,
  },
  {
    name: "Dr. Kevin Otieno",
    role: "Medical Director",
    facility: "Amani Nursing Home, Kisumu",
    quote:
      "Bed occupancy used to live on a whiteboard. Now every ward head sees the same live picture, all day.",
    rating: 5,
  },
  {
    name: "Faith Chebet",
    role: "Finance Officer",
    facility: "Highland Clinic, Eldoret",
    quote:
      "eTIMS invoicing just works. No plugins, no workarounds — every receipt is compliant the moment it's cut.",
    rating: 5,
  },
  {
    name: "Samuel Mwangi",
    role: "Pharmacy In-Charge",
    facility: "Coast View Hospital, Mombasa",
    quote:
      "Low-stock alerts have genuinely stopped us running out of critical drugs. That alone paid for the system.",
    rating: 4,
  },
  {
    name: "Dr. Amina Yusuf",
    role: "Head of Nursing",
    facility: "Nyeri County Medical Centre",
    quote:
      "Nursing notes and discharge summaries move with the patient across departments. Handovers are so much faster.",
    rating: 5,
  },
  {
    name: "Peter Kamau",
    role: "IT Manager",
    facility: "Thika Family Hospital",
    quote:
      "Rollout took days, not months. Support actually understands SHA and KRA requirements, which is rare.",
    rating: 5,
  },
  {
    name: "Lucy Njeri",
    role: "Front Office Lead",
    facility: "Machakos Level 4 Hospital",
    quote:
      "Queue management alone cut our patient waiting complaints by half. Reception finally feels in control.",
    rating: 4,
  },
  {
    name: "Dr. Brian Kiptoo",
    role: "Chief Executive Officer",
    facility: "Rift Valley Referral Centre",
    quote:
      "The executive dashboard gives me occupancy, billing, and claims status without chasing a single department head.",
    rating: 5,
  },
];

// --- Product screenshots for the single-image carousel / lightbox ---
const SCREENSHOTS = [
  {
    src: dashboardImg,
    alt: "Medicore HMIS executive dashboard",
    caption: "Executive Dashboard",
  },
  {
    src: screenshotPatients,
    alt: "Medicore HMIS patient records screen",
    caption: "Patient Records & EMR",
  },
  {
    src: screenshotBilling,
    alt: "Medicore HMIS billing and invoicing screen",
    caption: "Billing & Invoicing",
  },
  {
    src: screenshotPharmacy,
    alt: "Medicore HMIS pharmacy and inventory screen",
    caption: "Pharmacy & Inventory",
  },
  {
    src: screenshotAppointments,
    alt: "Medicore HMIS appointments and queue screen",
    caption: "Appointments & Queue",
  },
  {
    src: screenshotReports,
    alt: "Medicore HMIS reports and analytics screen",
    caption: "Reports & Analytics",
  },
];

function initialsOf(name) {
  return name
    .split(" ")
    .filter((part) => part[0] === part[0]?.toUpperCase() && part !== "Dr.")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/**
 * Normalize whatever the API returns into a plain array of packages.
 * Handles:
 *  - a plain array: [ {...}, {...} ]
 *  - DRF pagination: { count, next, previous, results: [...] }
 *  - a single wrapped object: { data: [...] } (just in case)
 *  - anything unexpected -> [] so .map() never blows up
 */
function normalizePackagesResponse(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.results)) return data.results;
  if (Array.isArray(data?.data)) return data.data;
  return [];
}

/**
 * Normalize a single package's module list into an array of plain
 * strings, regardless of whether the API sends strings or
 * PackageModule objects like { id, name, display_order }.
 */
function normalizeModules(modules) {
  if (!Array.isArray(modules)) return [];
  return modules.map((mod) => (typeof mod === "string" ? mod : mod?.name)).filter(Boolean);
}

/**
 * Read a value from the first matching key present on the object.
 * Lets the UI stay in sync whether the API/serializer uses the
 * homepage's original naming (setup, sla, featured, badge) or the
 * Django model's naming (price, monthly_sla, is_featured, badge_text).
 */
function pick(obj, keys, fallback = "") {
  for (const key of keys) {
    if (obj?.[key] !== undefined && obj?.[key] !== null && obj?.[key] !== "") {
      return obj[key];
    }
  }
  return fallback;
}

export default function HomePage() {
  const [settings, setSettings] = useState(null);
  const [packages, setPackages] = useState([]);
  const [isLoadingPackages, setIsLoadingPackages] = useState(true);

  // Single index drives both the inline carousel and the lightbox —
  // whichever screenshot is "active" is what both show.
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;

    // Fetch site settings
    getSiteSettings()
      .then((data) => isMounted && setSettings(data))
      .catch(() => {});

    // Fetch packages for pricing section
    getPackages()
      .then((data) => {
        if (!isMounted) return;
        setPackages(normalizePackagesResponse(data));
      })
      .catch(() => {
        if (isMounted) setPackages([]);
      })
      .finally(() => isMounted && setIsLoadingPackages(false));

    return () => {
      isMounted = false;
    };
  }, []);

  // --- SEO: title, meta description, canonical, Open Graph, and a
  // SoftwareApplication schema so search engines understand this is a
  // Kenyan HMIS product page, not just a generic homepage. ---
  useEffect(() => {
    const title = "Medicore HMIS | Hospital Management Software for Kenya";
    const description =
      "Medicore HMIS is SHA-ready, eTIMS-compliant hospital management software built for clinics, nursing homes and hospitals across Kenya. Manage patients, beds, billing and pharmacy in one system.";

    document.title = title;

    const setMeta = (attr, key, content) => {
      let tag = document.querySelector(`meta[${attr}="${key}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attr, key);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    setMeta("name", "description", description);
    setMeta("name", "keywords", "HMIS Kenya, hospital management system Kenya, SHA integration software, eTIMS compliant billing, clinic software Kenya, hospital software Nairobi");
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:url", SITE_URL);
    setMeta("name", "twitter:card", "summary_large_image");

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", SITE_URL);

    let schema = document.getElementById("homepage-schema");
    if (!schema) {
      schema = document.createElement("script");
      schema.type = "application/ld+json";
      schema.id = "homepage-schema";
      document.head.appendChild(schema);
    }
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Medicore HMIS",
      applicationCategory: "Hospital Management System",
      operatingSystem: "Web",
      description,
      areaServed: "Kenya",
      provider: {
        "@type": "Organization",
        name: "Medicore HMIS",
        url: SITE_URL,
      },
    });
  }, []);

  // --- Carousel / lightbox controls ---
  // nextScreenshot/prevScreenshot move the shared active index, so they
  // work identically whether called from the inline carousel arrows or
  // from the lightbox modal's arrows/keyboard.
  const nextScreenshot = () =>
    setActiveIndex((i) => (i + 1) % SCREENSHOTS.length);
  const prevScreenshot = () =>
    setActiveIndex((i) => (i - 1 + SCREENSHOTS.length) % SCREENSHOTS.length);

  const openLightbox = (index) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  };
  const closeLightbox = () => setLightboxOpen(false);

  useEffect(() => {
    if (!lightboxOpen) return undefined;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextScreenshot();
      if (e.key === "ArrowLeft") prevScreenshot();
    };

    window.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [lightboxOpen]);

  const heroData = {
    headline: settings?.hero_headline || "Hospital Management Simplified Kenya",
    subtext:
      settings?.hero_subtext ||
      "SHA-ready, eTIMS-compliant HMIS software for clinics, nursing homes and hospitals across Kenya — from outpatient to bed management.",
    supportPhone: settings?.support_phone || "+254 757 790 687",
    supportEmail: settings?.support_email || "support@medicorehmis.co.ke",
  };

  const activeShot = SCREENSHOTS[activeIndex];
  const safePackages = Array.isArray(packages) ? packages : [];

  return (
    <>
      {/* Hero Section — untouched, carousel-based */}
      <Hero settings={heroData} />

      {/* Trust strip: quick proof points right under the fold - UPDATED WITH CLEAN CARDS */}
      <section id="trust-strip" className="stats section light-background">
        <div className="container">
          <div className="row gy-4">
            {TRUST_STATS.map((stat) => (
              <div className="col-lg-3 col-md-6" key={stat.label}>
                <div className="stats-card">
                  <div className="stats-card-icon">
                    <i className={stat.icon}></i>
                  </div>
                  <div className="stats-card-content">
                    <span className="stats-value">{stat.value}</span>
                    <p className="stats-label">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Medicore: the sales pitch, paired with a product image */}
      <section id="why-medicore" className="about section">
        <div className="container">
          <div className="row gy-4 align-items-center">
            <div className="col-lg-6 order-1 order-lg-2">
              <img
                src={aboutImg}
                alt="Medicore HMIS dashboard used by hospital staff in Kenya"
                className="img-fluid rounded-4"
                loading="lazy"
              />
            </div>
            <div className="col-lg-6 order-2 order-lg-1 content">
              <h3>Built for how Kenyan hospitals actually run</h3>
              <p>
                Medicore HMIS was designed from the ground up for the Kenyan
                healthcare system — not adapted from a foreign template.
                That means SHA claims, eTIMS invoicing and local reporting
                requirements work the way regulators expect, without
                workarounds or plugins.
              </p>
              <ul>
                <li>
                  <i className="bi bi-check-circle"></i>
                  <span>Deploy in days, not months — no lengthy IT rollout.</span>
                </li>
                <li>
                  <i className="bi bi-check-circle"></i>
                  <span>One system for outpatient, inpatient, pharmacy and billing.</span>
                </li>
                <li>
                  <i className="bi bi-check-circle"></i>
                  <span>Local support team that understands SHA and KRA requirements.</span>
                </li>
              </ul>
              <p className="mb-0">
                <Link to="/about" className="btn-get-started">
                  Learn more about Medicore
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core features grid */}
      <section id="core-features" className="services section light-background">
        <div className="container section-title">
          <h2>Everything your facility needs, in one platform</h2>
          <p>
            From the front desk to the pharmacy shelf, Medicore keeps every
            department working from the same real-time data.
          </p>
        </div>
        <div className="container">
          <div className="row gy-4">
            {CORE_FEATURES.map((feature) => (
              <div className="col-lg-4 col-md-6" key={feature.title}>
                <div className="service-item">
                  <div className="icon">
                    <i className={feature.icon}></i>
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product showcase — single-image carousel with prev/next arrows.
          Click the image to zoom into the full lightbox. */}
      <section id="product-preview" className="features section">
        <div className="container">
          <div className="row gy-4 align-items-center">
            <div className="col-lg-6">
              <div className="screenshot-carousel">
                <button
                  type="button"
                  className="carousel-nav carousel-nav-prev"
                  onClick={prevScreenshot}
                  aria-label="Previous screenshot"
                >
                  <i className="bi bi-chevron-left"></i>
                </button>

                <button
                  type="button"
                  className="carousel-main"
                  onClick={() => openLightbox(activeIndex)}
                  aria-label={`View ${activeShot.caption} full size`}
                >
                  <img src={activeShot.src} alt={activeShot.alt} loading="lazy" />
                  <span className="carousel-zoom-hint">
                    <i className="bi bi-zoom-in"></i>
                  </span>
                  <span className="carousel-caption">
                    {activeShot.caption}
                    <span className="carousel-counter">
                      {activeIndex + 1} / {SCREENSHOTS.length}
                    </span>
                  </span>
                </button>

                <button
                  type="button"
                  className="carousel-nav carousel-nav-next"
                  onClick={nextScreenshot}
                  aria-label="Next screenshot"
                >
                  <i className="bi bi-chevron-right"></i>
                </button>

                <div className="carousel-dots">
                  {SCREENSHOTS.map((shot, index) => (
                    <button
                      type="button"
                      key={shot.caption}
                      className={`carousel-dot${index === activeIndex ? " active" : ""}`}
                      onClick={() => setActiveIndex(index)}
                      aria-label={`Go to ${shot.caption}`}
                      aria-current={index === activeIndex}
                    ></button>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <h3>See exactly what's happening, ward by ward</h3>
              <p>
                Administrators get a live view of occupancy, admissions and
                billing status — no more chasing department heads for
                end-of-day reports. Use the arrows to step through the
                product, or click the image to view it full size.
              </p>
              <div className="icon-box">
                
                <div>
                  <h4>
                    <span>Real-time reporting</span>
                  </h4>
                  <p>Export SHA and management reports in a few clicks.</p>
                </div>
              </div>
              <div className="icon-box">
               
                <div>
                  <h4>
                    <span>Data you can trust</span>
                  </h4>
                  <p>Role-based access keeps patient data secure by department.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials — continuous moving strip (pauses on hover) */}
      <section id="testimonials" className="testimonials-marquee section">
        <div className="container section-title">
          <h2>Trusted by facilities across Kenya</h2>
          <p>
            Hear from the administrators, clinicians and finance teams
            running Medicore HMIS every day.
          </p>
        </div>
        <div className="marquee-wrapper">
          <div className="marquee-track">
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
              <div className="testimonial-card" key={`${t.name}-${i}`}>
                <i className="bi bi-quote quote-icon"></i>
                <p className="testimonial-quote">{t.quote}</p>
                <div className="testimonial-rating">
                  {Array.from({ length: 5 }).map((_, starIdx) => (
                    <i
                      key={starIdx}
                      className={
                        starIdx < t.rating ? "bi bi-star-fill" : "bi bi-star"
                      }
                    ></i>
                  ))}
                </div>
                <div className="testimonial-author">
                  <div className="avatar-initials" aria-hidden="true">
                    {initialsOf(t.name)}
                  </div>
                  <div>
                    <h4>{t.name}</h4>
                    <span>
                      {t.role} · {t.facility}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing — packages fetched from the API */}
      <section id="pricing" className="pricing section light-background">
        <div className="container section-title">
          <h2>Packages built around your facility size</h2>
          <p>
            From single-outpatient clinics to teaching &amp; referral
            hospitals — pick the tier that matches your bed capacity today,
            and grow into the next one later.
          </p>
        </div>
        <div className="container">
          {isLoadingPackages ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading packages...</span>
              </div>
              <p className="mt-3">Loading packages…</p>
            </div>
          ) : safePackages.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted">No packages available at the moment.</p>
            </div>
          ) : (
            <div className="row gy-4">
              {safePackages.map((pkg) => {
                const isFeatured = pick(pkg, ["featured", "is_featured"], false);
                const badge = pick(pkg, ["badge", "badge_text"]);
                const pricePrefix = pick(pkg, ["price_prefix", "setupPrefix"]);
                const price = pick(pkg, ["price", "setup"]);
                const slaPrefix = pick(pkg, ["monthly_sla_prefix", "sla_prefix", "slaPrefix"]);
                const sla = pick(pkg, ["monthly_sla", "sla"]);
                const modulesLabel = pick(pkg, ["modules_label", "modulesLabel"], "All Included Modules");
                const modules = normalizeModules(pkg.modules);

                return (
                  <div className="col-lg-4 col-md-6" key={pkg.id ?? pkg.slug ?? pkg.name}>
                    <div className={`pricing-item h-100${isFeatured ? " featured" : ""}`}>
                      {badge && <span className="advanced">{badge}</span>}
                      <h3>{pkg.name}</h3>
                      <p className="pricing-subtitle">{pkg.tagline}</p>
                      <h4>
                        <sup>KES</sup>
                        {pricePrefix}
                        {price}
                        <span> setup</span>
                      </h4>
                      <p className="pricing-sla">
                        + KES {slaPrefix}
                        {sla}/mo SLA
                      </p>
                      <p className="pricing-modules-label">
                        {modulesLabel}
                        <span className="pricing-scroll-hint">scroll for more</span>
                      </p>
                      <ul>
                        {modules.map((mod) => (
                          <li key={mod}>
                            <i className="bi bi-check-circle"></i>
                            {mod}
                          </li>
                        ))}
                      </ul>
                      <div className="btn-wrap">
                        <Link to="/contact" className="btn-buy">
                          Talk to Sales
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Final call to action, with background image */}
      <section
        id="get-started"
        className="call-to-action section dark-background"
        style={{
          backgroundImage: `linear-gradient(rgba(26,26,26,0.75), rgba(26,26,26,0.75)), url(${ctaBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container text-center">
          <h3>Ready to modernize your facility?</h3>
          <p>
            Book a free walkthrough and see how Medicore HMIS fits your
            hospital, clinic or nursing home — no obligation, no pressure.
          </p>
          <Link to="/appointment" className="cta-btn">
            Book a Demo
          </Link>
          <Link to="/contact" className="cta-btn">
            Talk to Sales
          </Link>
        </div>
      </section>

      {/* Screenshot lightbox — click the carousel image to open, arrows/keys to move */}
      {lightboxOpen && (
        <div
          className="screenshot-lightbox"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Screenshot preview"
        >
          <button
            type="button"
            className="lightbox-close"
            onClick={closeLightbox}
            aria-label="Close preview"
          >
            <i className="bi bi-x-lg"></i>
          </button>

          <button
            type="button"
            className="lightbox-nav lightbox-prev"
            onClick={(e) => {
              e.stopPropagation();
              prevScreenshot();
            }}
            aria-label="Previous screenshot"
          >
            <i className="bi bi-chevron-left"></i>
          </button>

          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={activeShot.src} alt={activeShot.alt} />
            <p className="lightbox-caption">
              {activeShot.caption}
              <span>
                {activeIndex + 1} / {SCREENSHOTS.length}
              </span>
            </p>
          </div>

          <button
            type="button"
            className="lightbox-nav lightbox-next"
            onClick={(e) => {
              e.stopPropagation();
              nextScreenshot();
            }}
            aria-label="Next screenshot"
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      )}
    </>
  );
}