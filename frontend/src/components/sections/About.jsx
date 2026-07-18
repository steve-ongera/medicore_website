import React from 'react';
import aboutImg from '../../assets/img/about.jpg';

const About = () => {
  return (
    <section id="about" className="about section">
      <div className="container section-title" data-aos="fade-up">
        <h2>About Us<br /></h2>
        <p>Your trusted partner in healthcare management across Kenya</p>
      </div>

      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-6 position-relative align-self-start" data-aos="fade-up" data-aos-delay="100">
            <img src={aboutImg} className="img-fluid" alt="About Medicore HMIS" />
            <a 
              href="https://www.youtube.com/watch?v=Y7f98aduVJ8" 
              className="glightbox pulsating-play-btn"
              target="_blank"
              rel="noopener noreferrer"
            ></a>
          </div>
          <div className="col-lg-6 content" data-aos="fade-up" data-aos-delay="200">
            <h3>Voluptatem dignissimos provident quasi corporis voluptates sit assumenda.</h3>
            <p className="fst-italic">
              Medicore HMIS is designed specifically for Kenyan healthcare facilities, 
              combining international standards with local compliance requirements.
            </p>
            <ul>
              <li>
                <i className="bi bi-check2-all"></i> 
                <span>SHA and eTIMS compliant out of the box</span>
              </li>
              <li>
                <i className="bi bi-check2-all"></i> 
                <span>M-Pesa Paybill and STK Push billing integration</span>
              </li>
              <li>
                <i className="bi bi-check2-all"></i> 
                <span>Comprehensive bed management and patient records</span>
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
  );
};

export default About;