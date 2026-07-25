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

      {/* SHA Section — image left, content right */}
      <section className="features section">
        <div className="container">
          <div className="row gy-4 align-items-center">
            <div className="col-lg-6" data-aos="fade-up">
              <div className="features-image">
                <img
                  src="https://nairobileo.co.ke/storage/uploads/2025/09/IMG_20250917_090520-1758089149.jpg"
                  alt="SHA claim compliance"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
              <h3>Automatic SHA Compliance</h3>
              <p>
                Medicore HMIS is built to handle the complexities of SHA
                (Social Health Authority) requirements. Our system automatically
                updates when regulations change, ensuring your facility never
                falls out of compliance.
              </p>

              <div className="icon-box d-flex">
                
                <div>
                  <h4>Claim Automation</h4>
                  <p>Automatic SHA claim generation, submission, and real-time eligibility verification.</p>
                </div>
              </div>

              <div className="icon-box d-flex">
                
                <div>
                  <h4>Live Tracking</h4>
                  <p>Automated claim tracking, reconciliation, and a built-in compliance dashboard.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* eTIMS Section — content left, image right */}
      <section className="features section light-background">
        <div className="container">
          <div className="row gy-4 align-items-center">
            <div className="col-lg-6 order-lg-2" data-aos="fade-up">
              <div className="features-image">
                <img
                  src="https://creativekigen.com/wp-content/uploads/2024/04/eTims-registration-in-kenya.jpg"
                  alt="eTIMS tax invoicing integration"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="col-lg-6 order-lg-1" data-aos="fade-up" data-aos-delay="100">
              <h3>eTIMS Integration</h3>
              <p>
                Our platform seamlessly integrates with eTIMS (Electronic Tax
                Invoice Management System) to handle all your tax compliance
                needs automatically.
              </p>

              <div className="icon-box d-flex">
               
                <div>
                  <h4>Invoice Automation</h4>
                  <p>Automatic eTIMS invoice generation with real-time tax validation.</p>
                </div>
              </div>

              <div className="icon-box d-flex">
              
                <div>
                  <h4>Secure Reporting</h4>
                  <p>Automated reporting to KRA with secure digital signature and authentication.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Callout — card style instead of border-left box */}
      <section className="section">
        <div className="container" data-aos="fade-up">
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <div className="compliance-callout">
                <div className="callout-icon">
                  <i className="bi bi-patch-check-fill"></i>
                </div>
                <h3>Why Compliance Matters</h3>
                <p>
                  With SHA and eTIMS regulations constantly evolving, facilities
                  that fail to stay compliant risk penalties, delayed reimbursements,
                  and operational disruptions. Medicore HMIS removes this burden
                  by automating compliance so you can focus on patient care.
                </p>
                <Link to="/appointment" className="cta-btn">
                  <i className="bi bi-calendar-check me-1"></i> Book a Demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      
    </main>
  );
}