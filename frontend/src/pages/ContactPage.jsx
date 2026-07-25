import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { submitContactMessage, getSiteSettings } from '../services/api.js';
import useSEO from '../hooks/useSEO.js';

const ContactPage = () => {
  const [settings, setSettings] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getSiteSettings();
        setSettings(data);
      } catch (error) {
        console.error('Error fetching site settings:', error);
      }
    };
    fetchSettings();
  }, []);

  const schema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Contact Medicore HMIS",
      mainEntity: {
        "@type": "Organization",
        name: "Medicore HMIS",
        url: "https://medicorehmis.co.ke",
        contactPoint: {
          "@type": "ContactPoint",
          telephone: settings?.support_phone || "+254 700 000000",
          email: settings?.support_email || "support@medicorehmis.co.ke",
          contactType: "customer support",
          areaServed: "KE",
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: settings?.address || "Nairobi",
          addressCountry: "KE",
        },
      },
    }),
    [settings]
  );

  useSEO({
    title: "Contact Us",
    description:
      "Get in touch with Medicore HMIS for a demo, support, or sales questions. Based in Nairobi, serving hospitals and clinics across Kenya.",
    keywords: "contact Medicore HMIS, HMIS Kenya support, hospital software demo Kenya, Nairobi HMIS company",
    path: "/contact",
    schema,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await submitContactMessage(formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="main">
      {/* Page Title */}
      <div className="page-title">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1>Contact Us</h1>
                <p className="mb-0">
                  Get in touch with us for any inquiries or support
                </p>
              </div>
            </div>
          </div>
        </div>
        <nav className="breadcrumbs">
          <div className="container">
            <ol>
              <li><Link to="/">Home</Link></li>
              <li className="current">Contact</li>
            </ol>
          </div>
        </nav>
      </div>

      {/* Contact Section — the embedded Google Map never actually
          rendered anything useful (placeholder pin, no real address),
          so it's dropped in favor of a clean 3-column info bar above
          a centered form. */}
      <section id="contact" className="contact section">
        <div className="container section-title" data-aos="fade-up">
          <h2>Contact</h2>
          <p>We'd love to hear from you</p>
        </div>

        <div className="container">
          {/* Info bar */}
          <div className="row gy-4 mb-5" data-aos="fade-up" data-aos-delay="100">
            <div className="col-lg-4 col-md-6">
              <div className="info-item d-flex flex-column justify-content-center align-items-center h-100">
                <i className="bi bi-geo-alt"></i>
                <h3>Address</h3>
                <p>{settings?.address || 'Nairobi, Kenya'}</p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="info-item d-flex flex-column justify-content-center align-items-center h-100">
                <i className="bi bi-telephone"></i>
                <h3>Call Us</h3>
                <p>{settings?.support_phone || '+254 700 000000'}</p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="info-item d-flex flex-column justify-content-center align-items-center h-100">
                <i className="bi bi-envelope"></i>
                <h3>Email Us</h3>
                <p>{settings?.support_email || 'support@medicorehmis.co.ke'}</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <form onSubmit={handleSubmit} className="php-email-form" data-aos="fade-up" data-aos-delay="200">
                <div className="row gy-4">
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-12">
                    <input
                      type="text"
                      className="form-control"
                      name="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-12">
                    <textarea
                      className="form-control"
                      name="message"
                      rows="5"
                      placeholder="Message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <div className="col-md-12 text-center">
                    {isSubmitting && (
                      <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
                        <div className="spinner-border spinner-border-sm text-primary" role="status">
                          <span className="visually-hidden">Sending...</span>
                        </div>
                        <span>Sending your message…</span>
                      </div>
                    )}
                    {submitStatus === 'success' && (
                      <div className="alert alert-success text-center" role="alert">
                        <i className="bi bi-check-circle me-2"></i>
                        Your message has been sent. Thank you!
                      </div>
                    )}
                    {submitStatus === 'error' && (
                      <div className="alert alert-danger text-center" role="alert">
                        <i className="bi bi-exclamation-triangle me-2"></i>
                        Something went wrong. Please try again.
                      </div>
                    )}
                    <button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;