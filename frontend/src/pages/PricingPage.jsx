import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPricing } from '../services/api.js';

const PricingPage = () => {
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const data = await getPricing();
        setPackages(data);
      } catch (error) {
        // Use fallback data if API fails
        setPackages([
          {
            id: 1,
            name: "Starter",
            slug: "starter",
            price: 8500,
            billing_cycle: "monthly",
            max_beds: 0,
            max_users: 5,
            is_featured: false,
            modules: []
          },
          {
            id: 2,
            name: "Standard",
            slug: "standard",
            price: 22000,
            billing_cycle: "monthly",
            max_beds: 60,
            max_users: 25,
            is_featured: true,
            modules: []
          },
          {
            id: 3,
            name: "Enterprise",
            slug: "enterprise",
            price: null,
            billing_cycle: "one_time",
            max_beds: null,
            max_users: null,
            is_featured: false,
            modules: []
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPackages();
  }, []);

  return (
    <main className="main">
      {/* Page Title */}
      <div className="page-title">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1>Pricing</h1>
                <p className="mb-0">
                  Choose the package that fits your facility's needs
                </p>
              </div>
            </div>
          </div>
        </div>
        <nav className="breadcrumbs">
          <div className="container">
            <ol>
              <li><Link to="/">Home</Link></li>
              <li className="current">Pricing</li>
            </ol>
          </div>
        </nav>
      </div>

      {/* Pricing Section */}
      <section id="pricing" className="pricing section">
        <div className="container">
          <div className="row gy-3">
            {isLoading ? (
              <div className="text-center">Loading packages...</div>
            ) : (
              packages.map((pkg, index) => (
                <div 
                  key={pkg.id}
                  className="col-xl-3 col-lg-6" 
                  data-aos="fade-up" 
                  data-aos-delay={100 + (index * 100)}
                >
                  <div className={`pricing-item ${pkg.is_featured ? 'featured' : ''}`}>
                    {pkg.is_featured && <span className="advanced">Featured</span>}
                    <h3>{pkg.name}</h3>
                    <h4>
                      <sup>$</sup>
                      {pkg.price ? pkg.price : 'Contact'}
                      <span> {pkg.price ? `/ ${pkg.billing_cycle}` : ''}</span>
                    </h4>
                    <ul>
                      <li>
                        <i className="bi bi-check"></i> 
                        {pkg.max_beds !== null ? `${pkg.max_beds} Beds` : 'Unlimited Beds'}
                      </li>
                      <li>
                        <i className="bi bi-check"></i> 
                        {pkg.max_users !== null ? `${pkg.max_users} Users` : 'Unlimited Users'}
                      </li>
                      <li>
                        <i className="bi bi-check"></i> 
                        {pkg.modules && pkg.modules.length > 0 
                          ? `${pkg.modules.length} Modules` 
                          : 'Core Modules'}
                      </li>
                      <li>
                        <i className="bi bi-check"></i> 
                        {pkg.billing_cycle === 'monthly' ? 'Monthly Billing' : 
                         pkg.billing_cycle === 'annually' ? 'Annual Billing' : 
                         'Custom Billing'}
                      </li>
                    </ul>
                    <div className="btn-wrap">
                      <Link to={`/packages/${pkg.slug}`} className="btn-buy">
                        {pkg.price ? 'Get Started' : 'Contact Us'}
                      </Link>
                    </div>
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

export default PricingPage;