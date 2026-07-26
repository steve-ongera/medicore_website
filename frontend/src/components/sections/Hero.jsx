import React from 'react';
import { Link } from 'react-router-dom';

// Import hero images
import hero1 from '../../assets/img/hero-carousel/hero-carousel-1.jpg';
import hero2 from '../../assets/img/hero-carousel/hero-carousel-2.jpg';
import hero3 from '../../assets/img/hero-carousel/hero-carousel-3.jpg';

const Hero = ({ settings }) => {
  // NOTE: every title is 4 words and every description is 21 words,
  // matching the reference slide ("Streamline Your Healthcare Operations")
  // so the three slides read as a uniform set.
  const slides = [
    {
      id: 1,
      image: hero1,
      title: settings?.headline || "Welcome to Medicore HMIS",
      description:
        settings?.subtext ||
        "Hospital Management, Simplified Kenya"
    },
    {
      id: 2,
      image: hero2,
      title: "Streamline Your Healthcare Operations",
      description:
        "From outpatient to bed management, our comprehensive HMIS solution helps you deliver better patient care while staying compliant with Kenyan regulations."
    },
    {
      id: 3,
      image: hero3,
      title: "SHA and eTIMS Integration",
      description:
        "Submit claims directly to the Social Health Authority and generate KRA-compliant electronic tax invoices automatically on every bill you create today."
    }
  ];

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
              style={{ height: '70vh', width: '100%' }}
            >
              {/* Separate layer for the photo. The CSS animates this with a
                  slow continuous zoom (Ken Burns effect) whenever this slide
                  is active — kept apart from .container so the text card
                  doesn't scale along with the image. */}
              <div
                className="hero-bg"
                style={{
                  backgroundColor: '#0d3b66', // visible fallback if the image 404s
                  backgroundImage: `url(${slide.image})`,
                }}
              ></div>

              <div className="container">
                <h2>{slide.title}</h2>
                <p>{slide.description}</p>
                <div className="d-flex justify-content-center gap-3 flex-wrap">
                  <Link to="/about" className="btn-get-started">
                    About Us
                  </Link>
                  <Link to="/appointment" className="btn-get-started btn-get-started--secondary">
                    Book Demo
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

        {/* Indicators: Bootstrap 5 markup uses <button>, not <li>.
            Using <li> inside an <ol> with no matching CSS rule left the
            browser's default decimal list styling in place, which is why
            "1 2 3" was showing up over the hero. */}
        <div className="carousel-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#hero-carousel"
              data-bs-slide-to={index}
              className={index === 0 ? 'active' : ''}
              aria-current={index === 0 ? 'true' : undefined}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;