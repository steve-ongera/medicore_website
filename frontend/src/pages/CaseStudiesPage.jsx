import useSEO from "../hooks/useSEO.js";
import { Link } from "react-router-dom";

// Sample case studies data
const CASE_STUDIES = [
  {
    id: 1,
    title: "Nairobi Clinic Streamlines Operations with Medicore HMIS",
    facility: "Nairobi Family Health Center",
    type: "Clinic",
    size: "15 beds",
    results: [
      "Reduced patient wait time by 60%",
      "Increased SHA claim approval rate to 98%",
      "Automated 90% of billing processes",
      "Saved 10+ hours per week on administration"
    ],
    description: "A 15-bed clinic in Nairobi was struggling with manual patient records and SHA claim submissions. Medicore HMIS automated their entire workflow, reducing errors and accelerating reimbursements.",
    image: "/assets/img/case-study-1.jpg"
  },
  {
    id: 2,
    title: "Nursing Home Achieves 100% eTIMS Compliance",
    facility: "Eldoret Elderly Care Home",
    type: "Nursing Home",
    size: "40 beds",
    results: [
      "100% eTIMS compliance achieved",
      "Revenue increased by 35% through faster claims",
      "Staff productivity improved by 50%",
      "Digital records accessible instantly"
    ],
    description: "Eldoret Elderly Care Home needed to modernize their operations and achieve eTIMS compliance. Medicore HMIS provided a complete solution that automated tax invoicing and improved financial management.",
    image: "/assets/img/case-study-2.jpg"
  },
  {
    id: 3,
    title: "Referral Hospital Modernizes Patient Management",
    facility: "Mombasa Regional Hospital",
    type: "Hospital",
    size: "120 beds",
    results: [
      "Integrated all departments on one platform",
      "Reduced billing errors by 85%",
      "Improved patient satisfaction scores by 45%",
      "Streamlined SHA claim processing"
    ],
    description: "Mombasa Regional Hospital faced challenges with fragmented systems across departments. Medicore HMIS unified their operations with an integrated platform that improved efficiency and patient care.",
    image: "/assets/img/case-study-3.jpg"
  }
];

export default function CaseStudiesPage() {
  useSEO({
    title: "Case Studies - Healthcare Success Stories",
    description: "See how Kenyan healthcare facilities are transforming their operations with Medicore HMIS. Real results from clinics, nursing homes, and hospitals.",
    keywords: "HMIS case studies, healthcare success stories, hospital management software results, SHA compliance success",
    path: "/case-studies",
  });

  return (
    <main className="main">
      {/* Page Title */}
      <div className="page-title">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1>Case Studies</h1>
                <p className="mb-0">
                  Real success stories from healthcare facilities using Medicore HMIS
                </p>
              </div>
            </div>
          </div>
        </div>
        <nav className="breadcrumbs">
          <div className="container">
            <ol>
              <li><Link to="/">Home</Link></li>
              <li className="current">Case Studies</li>
            </ol>
          </div>
        </nav>
      </div>

      {/* Case Studies Grid — cards now use the shared .case-study-card
          classes (same surface/shadow/radius tokens as .pricing-item
          and .service-item) instead of one-off inline styles. */}
      <section className="section">
        <div className="container">
          <div className="row gy-4">
            {CASE_STUDIES.map((study, index) => (
              <div key={study.id} className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="case-study-card">
                  <div className="case-study-banner">
                    <i className="fas fa-hospital"></i>
                  </div>
                  <div className="case-study-body">
                    <div className="case-study-meta">
                      <span className="case-study-type">{study.type}</span>
                      <span className="case-study-size">{study.size}</span>
                    </div>
                    <h3>{study.title}</h3>
                    <p className="case-study-facility">
                      <i className="bi bi-building"></i> {study.facility}
                    </p>
                    <p className="case-study-description">{study.description}</p>
                    <div className="case-study-results">
                      <p className="case-study-results-label">Key Results:</p>
                      <ul>
                        {study.results.map((result, idx) => (
                          <li key={idx}>
                            <i className="bi bi-check-circle"></i>
                            {result}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link to="/appointment" className="case-study-link">
                      Read Full Story <i className="bi bi-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial / CTA Section — reuses the site's surface/shadow
          card look and the shared .btn-buy pill instead of a one-off
          transparent cta-btn that only reads correctly on dark
          backgrounds. */}
      <section className="section light-background">
        <div className="container">
          <div className="row justify-content-center" data-aos="fade-up">
            <div className="col-lg-10">
              <div className="case-study-quote">
                <i className="bi bi-quote quote-icon"></i>
                <blockquote>
                  "Medicore HMIS transformed our operations. We're now fully SHA and eTIMS compliant,
                  and our staff can focus more on patients instead of paperwork."
                </blockquote>
                <p className="case-study-author">— Dr. Sarah Wanjiru, Nairobi Family Health Center</p>
                <Link to="/appointment" className="btn-buy mt-4 d-inline-block">
                  <i className="bi bi-calendar-check me-1"></i> Book a Demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section — unchanged: already matches the homepage's
          trust-strip .stats-item markup and icon prefix exactly. */}
      <section className="stats section">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-3 col-md-6" data-aos="fade-up">
              <div className="stats-item d-flex align-items-center w-100 h-100">
                <i className="fas fa-chart-line"></i>
                <div>
                  <span>60%</span>
                  <p>Average Efficiency Improvement</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="100">
              <div className="stats-item d-flex align-items-center w-100 h-100">
                <i className="fas fa-file-invoice"></i>
                <div>
                  <span>95%</span>
                  <p>Faster Claim Processing</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="200">
              <div className="stats-item d-flex align-items-center w-100 h-100">
                <i className="fas fa-smile"></i>
                <div>
                  <span>100%</span>
                  <p>Client Satisfaction Rate</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="300">
              <div className="stats-item d-flex align-items-center w-100 h-100">
                <i className="fas fa-undo"></i>
                <div>
                  <span>98%</span>
                  <p>Reduction in Billing Errors</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}