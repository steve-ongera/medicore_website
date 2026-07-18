import React from 'react';
import { Link } from 'react-router-dom';

const Pricing = ({ packages = [], isLoading = false }) => {
  return (
    <section id="pricing" className="pricing section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Pricing</h2>
        <p>Choose the package that fits your facility's needs</p>
      </div>

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
  );
};

export default Pricing;