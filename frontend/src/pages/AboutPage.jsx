import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getTeamMembers } from "../services/api.js";
import useSEO from "../hooks/useSEO.js";
import aboutImg from "../assets/img/about.jpg";

const PROBLEMS_SOLVED = [
  {
    icon: "bi bi-file-earmark-x",
    problem: "The Problem",
    title: "Paper trails delay SHA reimbursement",
    text: "Manual claim forms and disconnected records mean rejected or delayed SHA claims — cash flow suffers while paperwork gets sorted out.",
  },
  {
    icon: "bi bi-diagram-3",
    problem: "The Problem",
    title: "Departments don't talk to each other",
    text: "Billing, admissions, pharmacy, and records living in separate systems (or notebooks) means duplicated work and data that never quite matches.",
  },
  {
    icon: "bi bi-cash-coin",
    problem: "The Problem",
    title: "Regulations change faster than software",
    text: "SHA and eTIMS requirements shift, and generic or outdated systems leave facilities scrambling to stay compliant — or exposed to penalties.",
  },
];

// TODO: replace phone/email placeholders with real contact details.
const CORE_TEAM = [
  {
    id: "core-1",
    name: "Steve Ongera",
    role: "Managing Director",
    initials: "SO",
    phone: "+254 700 000 001",
    email: "steve@medicorehmis.co.ke",
  },
  {
    id: "core-2",
    name: "Team Member",
    role: "Backend Developer",
    initials: "BD",
    phone: "",
    email: "dev@medicorehmis.co.ke",
  },
  {
    id: "core-3",
    name: "Team Member",
    role: "Sales Agent",
    initials: "SA",
    phone: "+254 700 000 003",
    email: "sales@medicorehmis.co.ke",
  },
  {
    id: "core-4",
    name: "Team Member",
    role: "Client Support Lead",
    initials: "CS",
    phone: "+254 700 000 004",
    email: "support@medicorehmis.co.ke",
  },
];

// Updated stats with Bootstrap icons
const PROOF_STATS = [
  { icon: "bi bi-building", value: "40+", label: "Facilities running on Medicore" },
  { icon: "bi bi-shield-check", value: "100%", label: "SHA & eTIMS compliant claims" },
  { icon: "bi bi-geo-alt", value: "Nairobi", label: "Based local support team" },
  { icon: "bi bi-clock", value: "24/7", label: "System uptime monitoring" },
];

// TODO: replace with your real founding story, milestones, and dates.
const HISTORY_TIMELINE = [
  {
    year: "2022",
    title: "The idea",
    text: "Founded after seeing firsthand how much time clinics lost to manual SHA paperwork and disconnected billing systems.",
  },
  {
    year: "2023",
    title: "First facilities onboarded",
    text: "Launched with a handful of clinics and nursing homes across Nairobi, refining the platform around real day-to-day workflows.",
  },
  {
    year: "2024",
    title: "eTIMS integration shipped",
    text: "Added full eTIMS tax invoicing support as KRA requirements rolled out, keeping every facility on Medicore automatically compliant.",
  },
  {
    year: "Today",
    title: "40+ facilities nationwide",
    text: "From small clinics to referral hospitals, Medicore now supports facilities across multiple counties with local, responsive support.",
  },
];

// TODO: adjust to reflect your actual product modules/offerings.
const WHAT_WE_OFFER = [
  { icon: "bi bi-file-earmark-medical", title: "Patient Records", text: "Digital records, OP/IP admissions, and full patient history in one place." },
  { icon: "bi bi-shield-check", title: "SHA & eTIMS", text: "Built-in compliance for claims and tax invoicing, updated as regulations change." },
  { icon: "bi bi-hospital", title: "Bed Management", text: "Real-time bed availability across wards, admissions, and discharges." },
  { icon: "bi bi-wallet2", title: "M-Pesa Billing", text: "Paybill and STK Push integration for fast, reconciled patient billing." },
];

const styles = {
  imageWrap: {
    position: "relative",
  },
  aboutImage: {
    position: "relative",
    zIndex: 1,
    width: "100%",
    borderRadius: "16px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
    display: "block",
  },
  floatingBadge: {
    position: "absolute",
    zIndex: 2,
    left: "-24px",
    bottom: "-24px",
    background: "var(--surface-color)",
    borderRadius: "14px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    padding: "18px 22px",
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },
  floatingBadgeIcon: {
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    background: "var(--accent-color)",
    color: "var(--contrast-color)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    flexShrink: 0,
  },
  pullQuote: {
    borderLeft: "4px solid var(--accent-color)",
    paddingLeft: "20px",
    margin: "24px 0",
    fontSize: "19px",
    fontStyle: "italic",
    color: "var(--heading-color)",
  },
  btnPrimary: {
    background: "var(--accent-color)",
    color: "var(--contrast-color)",
    padding: "12px 34px",
    borderRadius: "30px",
    textDecoration: "none",
    display: "inline-block",
    fontWeight: 600,
    boxShadow: "0 4px 15px rgba(63, 187, 192, 0.3)",
  },
  btnOutline: {
    padding: "12px 34px",
    borderRadius: "30px",
    border: "2px solid var(--accent-color)",
    color: "var(--accent-color)",
    textDecoration: "none",
    display: "inline-block",
    fontWeight: 600,
  },
};

export default function AboutPage() {
  const [team, setTeam] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getTeamMembers()
      .then((data) => isMounted && setTeam(data))
      .catch(() => {})
      .finally(() => isMounted && setIsLoading(false));
    return () => {
      isMounted = false;
    };
  }, []);

  const schema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "About Medicore HMIS",
      description:
        "Medicore HMIS builds SHA-ready, eTIMS-compliant hospital management software for clinics, nursing homes and hospitals across Kenya.",
      mainEntity: {
        "@type": "Organization",
        name: "Medicore HMIS",
        url: "https://medicorehmis.co.ke",
        areaServed: "Kenya",
      },
    }),
    []
  );

  useSEO({
    title: "About Us",
    description:
      "Medicore HMIS is built for Kenyan healthcare facilities — SHA and eTIMS compliant, M-Pesa billing, bed management and patient records in one platform.",
    keywords: "about Medicore HMIS, HMIS Kenya company, hospital software Kenya team, SHA compliant software company",
    path: "/about",
    schema,
  });

  return (
    <main className="main">
      {/* Page Title */}
      <div className="page-title">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1>About Medicore</h1>
                <p className="mb-0">
                  The hospital management platform built for how Kenya actually works
                </p>
              </div>
            </div>
          </div>
        </div>
        <nav className="breadcrumbs">
          <div className="container">
            <ol>
              <li><Link to="/">Home</Link></li>
              <li className="current">About</li>
            </ol>
          </div>
        </nav>
      </div>

      {/* About Section */}
      <section id="about" className="about section">
        <div className="container">
          <div className="row gy-5 align-items-center">
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
              <div style={styles.imageWrap}>
                <img
                  src={aboutImg}
                  alt="Medicore HMIS dashboard in use at a Kenyan healthcare facility"
                  loading="lazy"
                  style={styles.aboutImage}
                />
                <div style={styles.floatingBadge}>
                  <span style={styles.floatingBadgeIcon}>
                    <i className="fas fa-hospital"></i>
                  </span>
                  <div>
                    <div className="fw-bold" style={{ fontSize: "20px", lineHeight: 1 }}>
                      40+
                    </div>
                    <div className="text-muted" style={{ fontSize: "13px" }}>
                      Facilities on Medicore
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 content" data-aos="fade-up" data-aos-delay="200">
              <h2 style={{ marginBottom: "14px" }}>Built for Kenyan Healthcare</h2>
              <p>
                Medicore HMIS began with a simple question: why should compliance make healthcare harder? Built for Kenyan facilities, it is designed around SHA, eTIMS, and real hospital workflows.
              </p>

              <blockquote style={styles.pullQuote}>
                "Every facility — from a 10-bed clinic to a referral
                hospital — deserves software that just works."
              </blockquote>

              <ul className="list-unstyled">
                <li className="d-flex align-items-start mb-2">
                  <i className="bi bi-check-circle-fill me-2 mt-1" style={{ color: "var(--accent-color)" }}></i>
                  <span>SHA and eTIMS compliant out of the box</span>
                </li>
                <li className="d-flex align-items-start mb-2">
                  <i className="bi bi-check-circle-fill me-2 mt-1" style={{ color: "var(--accent-color)" }}></i>
                  <span>M-Pesa Paybill and STK Push billing integration</span>
                </li>
                <li className="d-flex align-items-start mb-2">
                  <i className="bi bi-check-circle-fill me-2 mt-1" style={{ color: "var(--accent-color)" }}></i>
                  <span>Comprehensive bed management and patient records</span>
                </li>
               
              </ul>

              <div className="d-flex gap-3 flex-wrap mt-4">
                <Link to="/packages" style={styles.btnPrimary}>
                  See Pricing
                </Link>
                <Link to="/appointment" style={styles.btnOutline}>
                  Book a Demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proof / Credibility Stats */}
      <section id="proof" className="stats section light-background">
        <div className="container">
          <div className="row gy-4">
            {PROOF_STATS.map((stat) => (
              <div className="col-lg-3 col-md-6" key={stat.label} data-aos="fade-up">
                <div className="stats-item d-flex align-items-center w-100 h-100">
                  <i className={`${stat.icon} stats-icon`}></i>
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

      {/* History Section — who we are, milestones, what we offer */}
      <section id="history" className="history-section section">
        <div className="container section-title" data-aos="fade-up">
          <h2>Our Story</h2>
          <p>Who we are and how Medicore came to be</p>
        </div>

        <div className="container">
          <div className="history-intro" data-aos="fade-up">
            <p>
              Medicore HMIS started with a small team frustrated by watching hospitals
              lose hours to paperwork that software should have handled years ago. What
              began as a tool for a handful of Nairobi clinics has grown into a platform
              trusted by 40+ facilities across Kenya — from independent clinics and
              nursing homes to multi-department referral hospitals.
            </p>
          </div>

          <div className="history-timeline">
            {HISTORY_TIMELINE.map((item, index) => (
              <div
                className="history-item"
                key={item.year}
                data-aos="fade-up"
                data-aos-delay={100 + index * 100}
              >
                <span className="history-dot"></span>
                <div className="history-year">{item.year}</div>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="container mt-5">
          <div className="section-title" data-aos="fade-up">
            <h2>What We Offer</h2>
            <p>Everything a facility needs, in one platform</p>
          </div>
          <div className="row gy-4">
            {WHAT_WE_OFFER.map((offer, index) => (
              <div
                className="col-lg-3 col-md-6"
                key={offer.title}
                data-aos="fade-up"
                data-aos-delay={100 + index * 100}
              >
                <div className="history-offer-card">
                  <i className={offer.icon}></i>
                  <h4>{offer.title}</h4>
                  <p>{offer.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem / Solution Section */}
      <section id="values" className="features section light-background">
        <div className="container section-title" data-aos="fade-up">
          <h2>Why Hospitals Choose Medicore</h2>
          <p>The real problems facilities face — and how we solve them</p>
        </div>

        <div className="container">
          <div className="row gy-4">
            {PROBLEMS_SOLVED.map((item, index) => (
              <div
                key={item.title}
                className="col-lg-4 col-md-6"
                data-aos="fade-up"
                data-aos-delay={100 + index * 100}
              >
                <div className="problem-solution-item h-100">
                  <div className="ps-icon">
                    <i className={item.icon}></i>
                  </div>
                  <p className="ps-problem">{item.problem}</p>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Team Section */}
      <section id="core-team" className="doctors section">
        <div className="container section-title" data-aos="fade-up">
          <h2>Meet the Team</h2>
          <p>Dedicated professionals committed to transforming healthcare in Kenya</p>
        </div>

        <div className="container">
          <div className="row gy-4 justify-content-center">
            {CORE_TEAM.map((member, index) => (
              <div
                key={member.id}
                className="col-lg-3 col-md-6 d-flex align-items-stretch"
                data-aos="fade-up"
                data-aos-delay={100 + index * 100}
              >
                <div className="team-member professional-card">
                  <div className="member-img professional-avatar">
                    <div className="avatar-circle">
                      {member.initials}
                    </div>
                    <div className="member-status">
                      <span className="status-dot active"></span>
                      Available
                    </div>
                  </div>
                  <div className="member-info professional-info">
                    <h4>{member.name}</h4>
                    <span className="member-role">{member.role}</span>
                    <div className="member-divider"></div>
                    <div className="member-contact professional-contact">
                      {member.phone && (
                        <a href={`tel:${member.phone.replace(/\s+/g, "")}`} className="contact-link">
                          <i className="bi bi-telephone-fill"></i>
                          <span>{member.phone}</span>
                        </a>
                      )}
                      {member.email && (
                        <a href={`mailto:${member.email}`} className="contact-link">
                          <i className="bi bi-envelope-fill"></i>
                          <span>{member.email}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wider Team Section (from CMS, if populated) */}
      {!isLoading && team.length > 0 && (
        <section id="team" className="doctors section light-background">
          <div className="container section-title" data-aos="fade-up">
            <h2>Our Team</h2>
            <p>
              Built and supported by people who've run hospital IT in Kenya —
              not an offshore team guessing at requirements.
            </p>
          </div>

          <div className="container">
            <div className="row gy-4">
              {team.map((member, index) => (
                <div
                  key={member.id}
                  className="col-lg-3 col-md-6 d-flex align-items-stretch"
                  data-aos="fade-up"
                  data-aos-delay={100 + index * 100}
                >
                  <div className="team-member professional-card">
                    <div className="member-img professional-avatar">
                      {member.photo ? (
                        <img
                          src={member.photo}
                          className="img-fluid"
                          alt={member.name}
                          loading="lazy"
                          style={{ width: "100%", height: "300px", objectFit: "cover" }}
                        />
                      ) : (
                        <div className="avatar-circle large">
                          {member.name?.charAt(0)}
                        </div>
                      )}
                      {member.photo && (
                        <div className="member-status">
                          <span className="status-dot active"></span>
                          Active
                        </div>
                      )}
                    </div>
                    <div className="member-info professional-info">
                      <h4>{member.name}</h4>
                      <span className="member-role">{member.role}</span>
                      {member.bio && <p className="member-bio">{member.bio}</p>}
                      <div className="member-divider"></div>
                      <div className="social professional-social">
                        {member.linkedin_url && (
                          <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer" className="social-link">
                            <i className="bi bi-linkedin"></i>
                          </a>
                        )}
                        {member.twitter_url && (
                          <a href={member.twitter_url} target="_blank" rel="noopener noreferrer" className="social-link">
                            <i className="bi bi-twitter-x"></i>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Closing CTA */}
      <section className="call-to-action section accent-background">
        <div className="container">
          <div className="row justify-content-center" data-aos="zoom-in">
            <div className="col-xl-10">
              <div className="text-center">
                <h3 style={{ color: "var(--contrast-color)" }}>
                  See Medicore running in a facility like yours
                </h3>
                <p style={{ color: "var(--contrast-color)" }}>
                  Book a free walkthrough with our onboarding team — no
                  obligation, no pressure, just a look at how it fits your
                  workflow.
                </p>
                <Link to="/appointment" className="cta-btn">
                  <i className="bi bi-calendar-plus me-2"></i>
                  Book a Demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}