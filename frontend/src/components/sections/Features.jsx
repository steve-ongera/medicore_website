import React from 'react';
import featuresImg from '../../assets/img/features.jpg';

const Features = ({ features = [] }) => {
  const defaultFeatures = [
    {
      icon: "fa-solid fa-hand-holding-medical",
      title: "SHA Integration",
      description: "Direct claims submission to the Social Health Authority with real-time validation."
    },
    {
      icon: "fa-solid fa-suitcase-medical",
      title: "eTIMS Compliance",
      description: "KRA-compliant electronic tax invoicing on every bill generated."
    },
    {
      icon: "fa-solid fa-staff-snake",
      title: "Bed Management",
      description: "Live bed occupancy tracking across wards and wings."
    },
    {
      icon: "fa-solid fa-lungs",
      title: "Patient Records",
      description: "Digital patient records with fast search and retrieval."
    }
  ];

  const displayFeatures = features.length > 0 ? features : defaultFeatures;

  return (
    <section id="features" className="features section">
      <div className="container">
        <div className="row justify-content-around gy-4">
          <div className="features-image col-lg-6" data-aos="fade-up" data-aos-delay="100">
            <img src={featuresImg} alt="Features" />
          </div>

          <div className="col-lg-5 d-flex flex-column justify-content-center" data-aos="fade-up" data-aos-delay="200">
            <h3>Enim quis est voluptatibus aliquid consequatur fugiat</h3>
            <p>Esse voluptas cumque vel exercitationem. Reiciendis est hic accusamus. Non ipsam et sed minima temporibus laudantium.</p>

            {displayFeatures.map((feature, index) => (
              <div 
                key={index}
                className="icon-box d-flex position-relative" 
                data-aos="fade-up" 
                data-aos-delay={300 + (index * 100)}
              >
                <i className={`${feature.icon} flex-shrink-0`}></i>
                <div>
                  <h4><a href="#" className="stretched-link">{feature.title}</a></h4>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;