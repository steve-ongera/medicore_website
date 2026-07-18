import React from 'react';

const FeaturedServices = () => {
  const services = [
    {
      icon: "fas fa-heartbeat",
      title: "SHA Integration",
      description: "Direct claims submission to the Social Health Authority with real-time validation and tracking."
    },
    {
      icon: "fas fa-pills",
      title: "Pharmacy Management",
      description: "Drug dispensing, stock levels and prescription tracking across your facility."
    },
    {
      icon: "fas fa-thermometer",
      title: "Patient Records",
      description: "Digital patient records with fast search, retrieval and secure storage."
    },
    {
      icon: "fas fa-dna",
      title: "Laboratory",
      description: "Lab test orders, sample tracking and results delivery integrated with patient records."
    }
  ];

  return (
    <section id="featured-services" className="featured-services section">
      <div className="container">
        <div className="row gy-4">
          {services.map((service, index) => (
            <div 
              key={index}
              className="col-xl-3 col-md-6 d-flex" 
              data-aos="fade-up" 
              data-aos-delay={100 + (index * 100)}
            >
              <div className="service-item position-relative">
                <div className="icon">
                  <i className={service.icon}></i>
                </div>
                <h4>
                  <a href="#" className="stretched-link">
                    {service.title}
                  </a>
                </h4>
                <p>{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;