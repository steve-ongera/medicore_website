import { Link } from "react-router-dom";

function formatPrice(price) {
  if (price === null || price === undefined) return "Custom Pricing";
  const amount = Number(price).toLocaleString("en-KE", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return `KES ${amount}`;
}

export default function PackageCard({ pkg }) {
  return (
    <div className={`pricing-item ${pkg.is_featured ? 'featured' : ''}`}>
      {/* Featured Badge */}
      {pkg.is_featured && <span className="advanced">Featured</span>}
      
      {/* Package Name */}
      <h3>{pkg.name}</h3>
      
      {/* Price */}
      <h4>
        <sup>$</sup>
        {pkg.price ? pkg.price : 'Contact'}
        <span> {pkg.price ? `/ ${pkg.billing_cycle}` : ''}</span>
      </h4>
      
      {/* Features List */}
      <ul>
        <li>
          <i className="bi bi-check"></i> 
          {pkg.max_beds !== null && pkg.max_beds !== undefined 
            ? pkg.max_beds === 0 
              ? 'No bed limit' 
              : `${pkg.max_beds} Beds` 
            : 'Unlimited Beds'}
        </li>
        <li>
          <i className="bi bi-check"></i> 
          {pkg.max_users !== null && pkg.max_users !== undefined 
            ? pkg.max_users === 0 
              ? 'No user limit' 
              : `${pkg.max_users} Users` 
            : 'Unlimited Users'}
        </li>
        <li>
          <i className="bi bi-check"></i> 
          {pkg.module_count || pkg.modules?.length || 0} Modules Included
        </li>
        <li>
          <i className="bi bi-check"></i> 
          {pkg.billing_cycle === 'monthly' ? 'Monthly Billing' : 
           pkg.billing_cycle === 'annually' ? 'Annual Billing' : 
           'Custom Billing'}
        </li>
        {pkg.tagline && (
          <li>
            <i className="bi bi-info-circle"></i> 
            {pkg.tagline}
          </li>
        )}
      </ul>
      
      {/* CTA Button */}
      <div className="btn-wrap">
        <Link to={`/packages/${pkg.slug}`} className="btn-buy">
          {pkg.price ? 'Get Started' : 'Contact Us'}
        </Link>
      </div>
    </div>
  );
}