import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSiteSettings } from "../services/api.js";

import Hero from "../components/sections/Hero.jsx";

// Images — swap these paths for whatever you actually have in
// src/assets/img/. Any photo of a Kenyan clinic/hospital, a screenshot
// of the dashboard, or your team works fine here.
import aboutImg from "../assets/img/about.jpg";
import ctaBg from "../assets/img/cta-bg.webp";
import dashboardImg from "../assets/img/dashboard-preview.jpg";

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
  { icon: "fas fa-hospital", value: "40+", label: "Facilities across Kenya" },
  { icon: "fas fa-file-shield", value: "SHA & eTIMS", label: "Compliant by default" },
  { icon: "fas fa-headset", value: "Local", label: "Nairobi-based support team" },
  { icon: "fas fa-clock", value: "24/7", label: "System uptime monitoring" },
];

export default function HomePage() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    let isMounted = true;
    getSiteSettings()
      .then((data) => isMounted && setSettings(data))
      .catch(() => {});
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

  const heroData = {
    headline: settings?.hero_headline || "Hospital Management, Simplified for Kenya",
    subtext:
      settings?.hero_subtext ||
      "SHA-ready, eTIMS-compliant HMIS software for clinics, nursing homes and hospitals across Kenya — from outpatient to bed management.",
    supportPhone: settings?.support_phone || "+254 700 000000",
    supportEmail: settings?.support_email || "support@medicorehmis.co.ke",
  };

  return (
    <>
      {/* Hero Section — untouched, carousel-based */}
      <Hero settings={heroData} />

      {/* Trust strip: quick proof points right under the fold */}
      <section id="trust-strip" className="stats section light-background">
        <div className="container">
          <div className="row gy-4">
            {TRUST_STATS.map((stat) => (
              <div className="col-lg-3 col-md-6" key={stat.label}>
                <div className="stats-item d-flex align-items-center w-100 h-100">
                  <i className={stat.icon}></i>
                  <div>
                    <span>{stat.value}</span>
                    <p>{stat.label}</p>
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

      {/* Product showcase / screenshot strip */}
      <section id="product-preview" className="features section">
        <div className="container">
          <div className="row gy-4 align-items-center">
            <div className="col-lg-6">
              <div className="features-image">
                <img
                  src={dashboardImg}
                  alt="Medicore HMIS bed occupancy and patient dashboard"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <h3>See exactly what's happening, ward by ward</h3>
              <p>
                Administrators get a live view of occupancy, admissions and
                billing status — no more chasing department heads for
                end-of-day reports.
              </p>
              <div className="icon-box">
                <i className="bi bi-graph-up-arrow"></i>
                <div>
                  <h4>
                    <span>Real-time reporting</span>
                  </h4>
                  <p>Export SHA and management reports in a few clicks.</p>
                </div>
              </div>
              <div className="icon-box">
                <i className="bi bi-shield-check"></i>
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
    </>
  );
}