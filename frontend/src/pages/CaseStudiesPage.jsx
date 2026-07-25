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

      {/* Case Studies Grid */}
      <section className="section">
        <div className="container">
          <div className="row gy-4">
            {CASE_STUDIES.map((study, index) => (
              <div key={study.id} className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="card h-100" style={{ border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", borderRadius: "12px", overflow: "hidden" }}>
                  <div style={{ height: "200px", background: "linear-gradient(135deg, var(--accent-color), var(--accent-dark))", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "48px" }}>
                    <i className="fas fa-hospital"></i>
                  </div>
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between mb-2">
                      <span style={{ fontSize: "12px", color: "var(--accent-color)", fontWeight: "600", textTransform: "uppercase", letterSpacing: "1px" }}>
                        {study.type}
                      </span>
                      <span style={{ fontSize: "12px", color: "#6c757d" }}>
                        {study.size}
                      </span>
                    </div>
                    <h3 style={{ fontSize: "18px", marginBottom: "8px" }}>{study.title}</h3>
                    <p style={{ fontSize: "14px", color: "#6c757d", marginBottom: "12px" }}>
                      <i className="bi bi-building me-1"></i> {study.facility}
                    </p>
                    <p style={{ fontSize: "14px", lineHeight: "1.6", marginBottom: "16px" }}>
                      {study.description}
                    </p>
                    <div style={{ marginBottom: "16px" }}>
                      <p style={{ fontSize: "13px", fontWeight: "600", marginBottom: "6px" }}>Key Results:</p>
                      <ul style={{ fontSize: "13px", paddingLeft: "20px", margin: 0 }}>
                        {study.results.map((result, idx) => (
                          <li key={idx}>{result}</li>
                        ))}
                      </ul>
                    </div>
                    <Link to="/appointment" style={{ fontSize: "14px", fontWeight: "600", color: "var(--accent-color)", textDecoration: "none" }}>
                      Read Full Story <i className="bi bi-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial / CTA Section */}
      <section className="section light-background">
        <div className="container">
          <div className="row justify-content-center" data-aos="fade-up">
            <div className="col-lg-10">
              <div className="text-center p-4" style={{ background: "var(--surface-color)", borderRadius: "12px" }}>
                <i className="bi bi-quote" style={{ fontSize: "48px", color: "var(--accent-color)", opacity: "0.5" }}></i>
                <blockquote className="mb-4" style={{ fontSize: "20px", fontStyle: "italic" }}>
                  "Medicore HMIS transformed our operations. We're now fully SHA and eTIMS compliant, 
                  and our staff can focus more on patients instead of paperwork."
                </blockquote>
                <p style={{ fontWeight: "600" }}>— Dr. Sarah Wanjiru, Nairobi Family Health Center</p>
                <Link to="/appointment" className="cta-btn" style={{ marginTop: "20px", display: "inline-block" }}>
                  <i className="bi bi-calendar-check me-1"></i> Book a Demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
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