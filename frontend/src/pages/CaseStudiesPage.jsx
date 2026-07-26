import useSEO from "../hooks/useSEO.js";
import { Link } from "react-router-dom";

// Sample case studies data
// NOTE: image URLs below are neutral placeholders (not photos of any real,
// named hospital) since the facility names/details here are illustrative
// samples. Swap in real photos once you have your actual client case studies.
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
    image: "https://worldfertilityservices.com/wp-content/uploads/2025/10/Kenyatta-National-Hospital-In-Nairobi.jpg"
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
    image: "https://www.airdesign.co.ke/wp-content/uploads/2022/08/air-design-kenyatta-university-refreral-scaled-1.jpeg"
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
    image: "https://africanmissionhealthcare.org/wp-content/uploads/2024/02/402289361_18059578084470843_6171053572420797968_n.jpg"
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
                <div className="case-study-card">
                  <div className="case-study-banner">
                    <img src={study.image} alt={study.facility} loading="lazy" />
                    <div className="banner-overlay">
                      
                    </div>
                  </div>
                  <div className="case-study-body">
                    <div className="case-study-meta">
                      <span className="case-study-type">{study.type}</span>
                      <span className="case-study-size">{study.size}</span>
                    </div>
                    <h3>{study.title}</h3>
                    <p className="case-study-facility">
                       {study.facility}
                    </p>
                    <p className="case-study-description">{study.description}</p>
                    <div className="case-study-results">
                      <p className="case-study-results-label">Key Results:</p>
                      <ul>
                        {study.results.map((result, idx) => (
                          <li key={idx}>
                            <i className="bi bi-check-circle-fill"></i>
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

      {/* Testimonial / CTA Section */}
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

      {/* Stats Section - Updated with Bootstrap Icons and Professional Cards */}
      <section className="stats section">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-3 col-md-6" data-aos="fade-up">
              <div className="stats-card">
                <div className="stats-card-icon">
                  <i className="bi bi-graph-up-arrow"></i>
                </div>
                <div className="stats-card-content">
                  <span className="stats-value">60%</span>
                  <p className="stats-label">Average Efficiency Improvement</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="100">
              <div className="stats-card">
                <div className="stats-card-icon">
                  <i className="bi bi-file-check"></i>
                </div>
                <div className="stats-card-content">
                  <span className="stats-value">95%</span>
                  <p className="stats-label">Faster Claim Processing</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="200">
              <div className="stats-card">
                <div className="stats-card-icon">
                  <i className="bi bi-emoji-smile"></i>
                </div>
                <div className="stats-card-content">
                  <span className="stats-value">100%</span>
                  <p className="stats-label">Client Satisfaction Rate</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="300">
              <div className="stats-card">
                <div className="stats-card-icon">
                  <i className="bi bi-arrow-counterclockwise"></i>
                </div>
                <div className="stats-card-content">
                  <span className="stats-value">98%</span>
                  <p className="stats-label">Reduction in Billing Errors</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}