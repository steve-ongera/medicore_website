import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

// Import hero images
import hero1 from '../../assets/img/hero-carousel/hero-carousel-1.jpg';
import hero2 from '../../assets/img/hero-carousel/hero-carousel-2.jpg';
import hero3 from '../../assets/img/hero-carousel/hero-carousel-3.jpg';

const Hero = ({ settings }) => {
  const slides = [
    {
      id: 1,
      image: hero1,
      title: settings?.headline || "Welcome to Medicore HMIS",
      description: settings?.subtext || "Hospital Management, Simplified for Kenya. SHA-ready, eTIMS-compliant HMIS software for clinics, nursing homes and hospitals across Kenya."
    },
    {
      id: 2,
      image: hero2,
      title: "Streamline Your Healthcare Operations",
      description: "From outpatient to bed management, our comprehensive HMIS solution helps you deliver better patient care while staying compliant with Kenyan regulations."
    },
    {
      id: 3,
      image: hero3,
      title: "Ready for SHA & eTIMS Integration",
      description: "Direct claims submission to Social Health Authority and KRA-compliant electronic tax invoicing on every bill. Stay ahead with Medicore HMIS."
    }
  ];

  // Debug: confirms whether Vite actually resolved these imports to real URLs.
  // If any of these log as `undefined`, the import path/filename/case is wrong.
  // If they log a real string but the slide is still blank, it's a CSS/height
  // issue further down the carousel-inner / hero-carousel chain, not the image.
  useEffect(() => {
    console.log('Hero images loaded:', { hero1, hero2, hero3 });
  }, []);

  return (
    <section id="hero" className="hero section" style={{ minHeight: '70vh' }}>
      <div
        id="hero-carousel"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        data-bs-interval="5000"
        style={{ height: '70vh' }}
      >
        <div className="carousel-inner" style={{ height: '70vh' }}>
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`carousel-item ${index === 0 ? 'active' : ''}`}
              style={{
                backgroundColor: '#0d3b66', // visible fallback if the image 404s
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '70vh',
                width: '100%',
              }}
            >
              <div className="container" data-aos="fade-up" data-aos-delay={100 + (index * 100)}>
                <h2>{slide.title}</h2>
                <p>{slide.description}</p>
                <div className="d-flex justify-content-center gap-3 flex-wrap">
                  <Link to="/about" className="btn-get-started">
                    Read More
                  </Link>
                  <Link to="/appointment" className="btn-get-started btn-get-started--secondary">
                    Book Appointment
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Controls */}
        <a
          className="carousel-control-prev"
          href="#hero-carousel"
          role="button"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon bi bi-chevron-left" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </a>

        <a
          className="carousel-control-next"
          href="#hero-carousel"
          role="button"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon bi bi-chevron-right" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </a>

        <ol className="carousel-indicators">
          {slides.map((_, index) => (
            <li
              key={index}
              data-bs-target="#hero-carousel"
              data-bs-slide-to={index}
              className={index === 0 ? 'active' : ''}
              aria-label={`Slide ${index + 1}`}
            ></li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Hero;