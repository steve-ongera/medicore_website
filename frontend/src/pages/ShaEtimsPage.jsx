import useSEO from "../hooks/useSEO.js";
import { Link } from "react-router-dom";

export default function ShaEtimsPage() {
  useSEO({
    title: "SHA & eTIMS Compliance",
    description: "Medicore HMIS ensures 100% SHA and eTIMS compliance for Kenyan healthcare facilities. Stay updated with changing regulations automatically.",
    keywords: "SHA compliance, eTIMS integration, Kenya health compliance, hospital management system SHA",
    path: "/sha-etims",
  });

  return (
    <main className="main">
      {/* Page Title */}
      <div className="page-title">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1>SHA & eTIMS Compliance</h1>
                <p className="mb-0">
                  Stay compliant with Kenya's healthcare regulations automatically
                </p>
              </div>
            </div>
          </div>
        </div>
        <nav className="breadcrumbs">
          <div className="container">
            <ol>
              <li><Link to="/">Home</Link></li>
              <li className="current">SHA & eTIMS</li>
            </ol>
          </div>
        </nav>
      </div>

      {/* Compliance Content */}
      <section className="section">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-6" data-aos="fade-up">
              <h2>Automatic SHA Compliance</h2>
              <p>
                Medicore HMIS is built to handle the complexities of SHA 
                (Social Health Authority) requirements. Our system automatically 
                updates when regulations change, ensuring your facility never 
                falls out of compliance.
              </p>
              <ul className="list-unstyled mt-4">
                <li className="d-flex align-items-start mb-3">
                  <i className="bi bi-check-circle-fill me-2" style={{ color: "var(--accent-color)", fontSize: "20px" }}></i>
                  <span>Automatic SHA claim generation and submission</span>
                </li>
                <li className="d-flex align-items-start mb-3">
                  <i className="bi bi-check-circle-fill me-2" style={{ color: "var(--accent-color)", fontSize: "20px" }}></i>
                  <span>Real-time eligibility verification</span>
                </li>
                <li className="d-flex align-items-start mb-3">
                  <i className="bi bi-check-circle-fill me-2" style={{ color: "var(--accent-color)", fontSize: "20px" }}></i>
                  <span>Automated claim tracking and reconciliation</span>
                </li>
                <li className="d-flex align-items-start mb-3">
                  <i className="bi bi-check-circle-fill me-2" style={{ color: "var(--accent-color)", fontSize: "20px" }}></i>
                  <span>Built-in compliance dashboard</span>
                </li>
              </ul>
            </div>
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
              <h2>eTIMS Integration</h2>
              <p>
                Our platform seamlessly integrates with eTIMS (Electronic Tax 
                Invoice Management System) to handle all your tax compliance 
                needs automatically.
              </p>
              <ul className="list-unstyled mt-4">
                <li className="d-flex align-items-start mb-3">
                  <i className="bi bi-check-circle-fill me-2" style={{ color: "var(--accent-color)", fontSize: "20px" }}></i>
                  <span>Automatic eTIMS invoice generation</span>
                </li>
                <li className="d-flex align-items-start mb-3">
                  <i className="bi bi-check-circle-fill me-2" style={{ color: "var(--accent-color)", fontSize: "20px" }}></i>
                  <span>Real-time tax validation</span>
                </li>
                <li className="d-flex align-items-start mb-3">
                  <i className="bi bi-check-circle-fill me-2" style={{ color: "var(--accent-color)", fontSize: "20px" }}></i>
                  <span>Automated reporting to KRA</span>
                </li>
                <li className="d-flex align-items-start mb-3">
                  <i className="bi bi-check-circle-fill me-2" style={{ color: "var(--accent-color)", fontSize: "20px" }}></i>
                  <span>Secure digital signature and authentication</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="row mt-5" data-aos="fade-up">
            <div className="col-12">
              <div className="p-4" style={{ background: "var(--surface-color)", borderRadius: "12px", borderLeft: "4px solid var(--accent-color)" }}>
                <h3 className="mb-3">Why Compliance Matters</h3>
                <p>
                  With SHA and eTIMS regulations constantly evolving, facilities 
                  that fail to stay compliant risk penalties, delayed reimbursements, 
                  and operational disruptions. Medicore HMIS removes this burden 
                  by automating compliance so you can focus on patient care.
                </p>
                <Link to="/appointment" className="cta-btn" style={{ marginTop: "20px", display: "inline-block" }}>
                  <i className="bi bi-calendar-check me-1"></i> Book a Demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats section light-background">
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-3 col-md-6" data-aos="fade-up">
              <div className="stats-item d-flex align-items-center w-100 h-100">
                <i className="fas fa-file-shield"></i>
                <div>
                  <span>100%</span>
                  <p>SHA Compliant Claims</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="100">
              <div className="stats-item d-flex align-items-center w-100 h-100">
                <i className="fas fa-check-circle"></i>
                <div>
                  <span>99.9%</span>
                  <p>eTIMS Accuracy Rate</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="200">
              <div className="stats-item d-flex align-items-center w-100 h-100">
                <i className="fas fa-clock"></i>
                <div>
                  <span>24/7</span>
                  <p>Compliance Monitoring</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="300">
              <div className="stats-item d-flex align-items-center w-100 h-100">
                <i className="fas fa-hospital"></i>
                <div>
                  <span>40+</span>
                  <p>Facilities Compliant</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}