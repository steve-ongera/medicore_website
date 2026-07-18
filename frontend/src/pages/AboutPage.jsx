import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTeamMembers } from "../services/api.js";
import aboutImg from "../assets/img/about.jpg";

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

  return (
    <main className="main">
      {/* Page Title */}
      <div className="page-title">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1>About Us</h1>
                <p className="mb-0">
                  Software built alongside the facilities that use it
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
        <div className="container section-title" data-aos="fade-up">
          <h2>About Medicore HMIS</h2>
          <p>
            Medicore HMIS started with one question from a Nairobi clinic
            administrator: why does compliance software make our job harder,
            not easier? Every module since has been built to answer that.
          </p>
        </div>

        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-6 position-relative align-self-start" data-aos="fade-up" data-aos-delay="100">
              <img 
                src={aboutImg} 
                className="img-fluid rounded" 
                alt="About Medicore HMIS" 
                style={{ borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
              />
              <a 
                href="https://www.youtube.com/watch?v=Y7f98aduVJ8" 
                className="glightbox pulsating-play-btn"
                target="_blank"
                rel="noopener noreferrer"
              ></a>
            </div>
            <div className="col-lg-6 content" data-aos="fade-up" data-aos-delay="200">
              <h3>Built for Kenyan Healthcare</h3>
              <p className="fst-italic">
                Medicore HMIS is designed specifically for Kenyan healthcare facilities, 
                combining international standards with local compliance requirements.
              </p>
              <ul>
                <li>
                  <i className="bi bi-check-circle-fill"></i> 
                  <span>SHA and eTIMS compliant out of the box</span>
                </li>
                <li>
                  <i className="bi bi-check-circle-fill"></i> 
                  <span>M-Pesa Paybill and STK Push billing integration</span>
                </li>
                <li>
                  <i className="bi bi-check-circle-fill"></i> 
                  <span>Comprehensive bed management and patient records</span>
                </li>
                <li>
                  <i className="bi bi-check-circle-fill"></i> 
                  <span>Real-time reporting and analytics dashboards</span>
                </li>
              </ul>
              <p>
                From small clinics to large hospitals, Medicore HMIS scales with your needs. 
                Our platform is built by healthcare professionals who understand the unique 
                challenges of the Kenyan healthcare system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section id="values" className="features section light-background">
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
                data-aos-delay={100 + (index * 100)}
              >
                <div className="service-item position-relative h-100">
                  <div className="icon">
                    <span className="display-4 fw-bold" style={{ color: 'var(--accent-color)' }}>
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
        <section id="team" className="doctors section">
          <div className="container section-title" data-aos="fade-up">
            <h2>Our Team</h2>
            <p>The people behind Medicore HMIS</p>
          </div>

          <div className="container">
            <div className="row gy-4">
              {team.map((member, index) => (
                <div 
                  key={member.id}
                  className="col-lg-3 col-md-6 d-flex align-items-stretch" 
                  data-aos="fade-up" 
                  data-aos-delay={100 + (index * 100)}
                >
                  <div className="team-member">
                    <div className="member-img">
                      {member.photo ? (
                        <img 
                          src={member.photo} 
                          className="img-fluid" 
                          alt={member.name} 
                          style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                        />
                      ) : (
                        <div 
                          className="img-fluid d-flex align-items-center justify-content-center"
                          style={{ 
                            height: '300px', 
                            background: 'linear-gradient(135deg, var(--accent-color), var(--accent-dark))',
                            color: 'white',
                            fontSize: '80px',
                            fontWeight: 'bold'
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
    </main>
  );
}