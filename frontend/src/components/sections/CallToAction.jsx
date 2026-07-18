import React from 'react';
import { Link } from 'react-router-dom';

const CallToAction = ({ 
  title = "In an emergency? Need help now?",
  description = "Our team is ready to assist you with any urgent healthcare management needs. Get in touch with us today.",
  buttonText = "Make an Appointment",
  buttonLink = "/appointment"
}) => {
  return (
    <section id="call-to-action" className="call-to-action section accent-background">
      <div className="container">
        <div className="row justify-content-center" data-aos="zoom-in" data-aos-delay="100">
          <div className="col-xl-10">
            <div className="text-center">
              <h3>{title}</h3>
              <p>{description}</p>
              <Link to={buttonLink} className="cta-btn">
                {buttonText}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;