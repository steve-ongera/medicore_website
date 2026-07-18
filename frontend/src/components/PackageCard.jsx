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
    <article className={`package-card ${pkg.is_featured ? "package-card--featured" : ""}`}>
      {pkg.is_featured && <span className="package-card__badge">Most Popular</span>}
      <h3 className="package-card__name">{pkg.name}</h3>
      <p className="package-card__tagline">{pkg.tagline}</p>

      <div className="package-card__price">
        <span className="package-card__price-value">{formatPrice(pkg.price)}</span>
        {pkg.price ? <span className="package-card__price-cycle">/{pkg.billing_cycle}</span> : null}
      </div>

      <ul className="package-card__meta">
        <li>{pkg.max_beds ? `${pkg.max_beds} beds` : "Unlimited beds"}</li>
        <li>{pkg.max_users ? `${pkg.max_users} staff accounts` : "Unlimited staff accounts"}</li>
        <li>{pkg.module_count} modules included</li>
      </ul>

      <Link to={`/packages/${pkg.slug}`} className="btn btn--outline package-card__cta">
        View Details
      </Link>
    </article>
  );
}
