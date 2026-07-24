import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getServices } from '../services/api.js';
import useSEO from '../hooks/useSEO.js';

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        setServices(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchServices();
  }, []);

  const serviceIcons = [
    "fas fa-heartbeat",
    "fas fa-pills",
    "fas fa-hospital-user",
    "fas fa-dna",
    "fas fa-wheelchair",
    "fas fa-notes-medical",
    "fas fa-stethoscope",
    "fas fa-ambulance"
  ];

  // Only build the ItemList schema once services have actually loaded,
  // so we don't publish an empty list to search engines during fetch.
  const schema = useMemo(() => {
    if (isLoading || services.length === 0) return undefined;
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Medicore HMIS Services",
      itemListElement: services.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Service",
          name: service.name,
          description: service.short_description,
          url: `https://medicorehmis.co.ke/services/${service.slug}`,
          provider: {
            "@type": "Organization",
            name: "Medicore HMIS",
          },
          areaServed: "Kenya",
        },
      })),
    };
  }, [services, isLoading]);

  useSEO({
    title: "Our Services",
    description:
      "Explore Medicore HMIS modules — from patient records and bed management to SHA claims and eTIMS-compliant billing — built for hospitals and clinics in Kenya.",
    keywords: "HMIS services Kenya, hospital management modules, SHA claims software, eTIMS billing software, clinic management system Kenya",
    path: "/services",
    schema,
  });

  return (
    <main className="main">
      {/* Page Title */}
      <div className="page-title">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1>Our Services</h1>
                <p className="mb-0">
                  Comprehensive HMIS modules designed to streamline every aspect of healthcare management
                </p>
              </div>
            </div>
          </div>
        </div>
        <nav className="breadcrumbs">
          <div className="container">
            <ol>
              <li><Link to="/">Home</Link></li>
              <li className="current">Services</li>
            </ol>
          </div>
        </nav>
      </div>

      {/* Services Section */}
      <section id="services" className="services section">
        <div className="container">
          <div className="row gy-4">
            {isLoading ? (
              <div className="text-center">Loading services...</div>
            ) : error ? (
              <div className="text-center text-danger">{error}</div>
            ) : (
              services.map((service, index) => (
                <div 
                  key={service.id}
                  className="col-lg-4 col-md-6" 
                  data-aos="fade-up" 
                  data-aos-delay={100 + (index * 100)}
                >
                  <div className="service-item position-relative">
                    <div className="icon">
                      <i className={serviceIcons[index % serviceIcons.length]}></i>
                    </div>
                    <Link to={`/services/${service.slug}`} className="stretched-link">
                      <h3>{service.name}</h3>
                    </Link>
                    <p>{service.short_description}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServicesPage;