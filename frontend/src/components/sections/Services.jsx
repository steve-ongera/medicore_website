import React from 'react';
import { Link } from 'react-router-dom';

const Services = ({ modules = [], isLoading = false }) => {
  const serviceIcons = [
    "fas fa-heartbeat",
    "fas fa-pills",
    "fas fa-hospital-user",
    "fas fa-dna",
    "fas fa-wheelchair",
    "fas fa-notes-medical"
  ];

  return (
    <section id="services" className="services section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Services</h2>
        <p>Comprehensive HMIS modules for every aspect of healthcare management</p>
      </div>

      <div className="container">
        <div className="row gy-4">
          {isLoading ? (
            <div className="text-center">Loading services...</div>
          ) : (
            modules.map((module, index) => (
              <div 
                key={module.id}
                className="col-lg-4 col-md-6" 
                data-aos="fade-up" 
                data-aos-delay={100 + (index * 100)}
              >
                <div className="service-item position-relative">
                  <div className="icon">
                    <i className={serviceIcons[index % serviceIcons.length]}></i>
                  </div>
                  <Link to={`/services/${module.slug}`} className="stretched-link">
                    <h3>{module.name}</h3>
                  </Link>
                  <p>{module.short_description}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Services;