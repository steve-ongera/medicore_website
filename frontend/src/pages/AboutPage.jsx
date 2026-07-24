import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getTeamMembers } from "../services/api.js";
import useSEO from "../hooks/useSEO.js";
import aboutImg from "../assets/img/about2.jpg";

const VALUES = [
  {
    code: "01",
    title: "Compliance-first",
    text: "SHA and eTIMS requirements change fast. We ship updates the moment regulations shift, so facilities stay compliant automatically.",
  },
  {
    code: "02",
    title: "Built for local workflows",
    text: "From bed boards to M-Pesa till reconciliation, every screen is designed around how Kenyan facilities actually operate.",
  },
  {
    code: "03",
    title: "Support that answers",
    text: "Real onboarding, real training, and a support line staffed by people who understand hospital operations.",
  },
];

const PROOF_STATS = [
  { icon: "fas fa-hospital", value: "40+", label: "Facilities running on Medicore" },
  { icon: "fas fa-file-shield", value: "100%", label: "SHA & eTIMS compliant claims" },
  { icon: "fas fa-headset", value: "Nairobi", label: "Based local support team" },
  { icon: "fas fa-clock", value: "24/7", label: "System uptime monitoring" },
];

// Inline styles for the new decorative bits, kept local to this page
// rather than added to the shared stylesheet.
const styles = {
  imageWrap: {
    position: "relative",
  },
  // Removed accentBackdrop style object
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
                {/* Removed the accentBackdrop div */}
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
              <h2 style={{ marginBottom: "16px" }}>Built for Kenyan Healthcare</h2>
              <p>
                Medicore HMIS started with one question from a Nairobi clinic
                administrator: why does compliance software make our job
                harder, not easier? Every module since has been built to
                answer that — not adapted from a foreign template, but
                designed around SHA, eTIMS and the way Kenyan facilities
                actually operate day to day.
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
                <li className="d-flex align-items-start mb-2">
                  <i className="bi bi-check-circle-fill me-2 mt-1" style={{ color: "var(--accent-color)" }}></i>
                  <span>Real-time reporting and analytics dashboards</span>
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

      {/* Values Section */}
      <section id="values" className="features section">
        <div className="container section-title" data-aos="fade-up">
          <h2>Our Values</h2>
          <p>The principles that guide everything we do</p>
        </div>

        <div className="container">
          <div className="row gy-4">
            {VALUES.map((value, index) => (
              <div
                key={value.code}
                className="col-lg-4 col-md-6"
                data-aos="fade-up"
                data-aos-delay={100 + index * 100}
              >
                <div className="service-item position-relative h-100">
                  <div className="icon">
                    <span className="display-4 fw-bold" style={{ color: "var(--accent-color)" }}>
                      {value.code}
                    </span>
                  </div>
                  <h3>{value.title}</h3>
                  <p>{value.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
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
                  <div className="team-member">
                    <div className="member-img">
                      {member.photo ? (
                        <img
                          src={member.photo}
                          className="img-fluid"
                          alt={member.name}
                          loading="lazy"
                          style={{ width: "100%", height: "300px", objectFit: "cover" }}
                        />
                      ) : (
                        <div
                          className="img-fluid d-flex align-items-center justify-content-center"
                          style={{
                            height: "300px",
                            background: "linear-gradient(135deg, var(--accent-color), var(--accent-dark))",
                            color: "white",
                            fontSize: "80px",
                            fontWeight: "bold",
                          }}
                        >
                          {member.name?.charAt(0)}
                        </div>
                      )}
                      <div className="social">
                        {member.linkedin_url && (
                          <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer">
                            <i className="bi bi-linkedin"></i>
                          </a>
                        )}
                        {member.twitter_url && (
                          <a href={member.twitter_url} target="_blank" rel="noopener noreferrer">
                            <i className="bi bi-twitter-x"></i>
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="member-info">
                      <h4>{member.name}</h4>
                      <span>{member.role}</span>
                      {member.bio && <p className="mt-2 small">{member.bio}</p>}
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