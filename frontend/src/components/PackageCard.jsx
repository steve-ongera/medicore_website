import { Link } from "react-router-dom";

function formatAmount(price) {
  if (price === null || price === undefined) return null;
  return Number(price).toLocaleString("en-KE", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

function billingLabel(cycle) {
  if (cycle === "monthly") return "mo";
  if (cycle === "annually") return "yr";
  return cycle;
}

export default function PackageCard({ pkg }) {
  const hasPrice = pkg.price !== null && pkg.price !== undefined;

  const bedsLabel =
    pkg.max_beds !== null && pkg.max_beds !== undefined
      ? pkg.max_beds === 0
        ? "No bed limit"
        : `${pkg.max_beds} Beds`
      : "Unlimited Beds";

  const usersLabel =
    pkg.max_users !== null && pkg.max_users !== undefined
      ? pkg.max_users === 0
        ? "No user limit"
        : `${pkg.max_users} Users`
      : "Unlimited Users";

  const modulesCount = pkg.module_count || pkg.modules?.length || 0;

  const billingCycleLabel =
    pkg.billing_cycle === "monthly"
      ? "Monthly Billing"
      : pkg.billing_cycle === "annually"
      ? "Annual Billing"
      : "Custom Billing";

  // Prefer the real module names when the API supplies them, so this
  // reads the same as the homepage's package cards. Falls back to the
  // summary stats above when only a count is available.
  const moduleNames = Array.isArray(pkg.modules)
    ? pkg.modules
        .map((m) => (typeof m === "string" ? m : m?.name || m?.title))
        .filter(Boolean)
    : [];

  return (
    <div className={`pricing-item h-100${pkg.is_featured ? " featured" : ""}`}>
      {pkg.is_featured && <span className="advanced">Most Popular</span>}

      <h3>{pkg.name}</h3>

      {pkg.tagline && <p className="pricing-subtitle">{pkg.tagline}</p>}

      <h4>
        {hasPrice ? (
          <>
            <sup>KES</sup>
            {formatAmount(pkg.price)}
            <span> /{billingLabel(pkg.billing_cycle)}</span>
          </>
        ) : (
          "Custom Pricing"
        )}
      </h4>

      {!hasPrice && <p className="pricing-sla">Talk to sales for a tailored quote</p>}

      <p className="pricing-modules-label">
        What's Included
        <span className="pricing-scroll-hint">scroll for more</span>
      </p>

      <ul>
        <li>
          <i className="bi bi-check-circle"></i>
          {bedsLabel}
        </li>
        <li>
          <i className="bi bi-check-circle"></i>
          {usersLabel}
        </li>
        <li>
          <i className="bi bi-check-circle"></i>
          {modulesCount} Modules Included
        </li>
        <li>
          <i className="bi bi-check-circle"></i>
          {billingCycleLabel}
        </li>
        {moduleNames.map((name) => (
          <li key={name}>
            <i className="bi bi-check-circle"></i>
            {name}
          </li>
        ))}
      </ul>

      <div className="btn-wrap">
        <Link to={`/packages/${pkg.slug}`} className="btn-buy">
          {hasPrice ? "Get Started" : "Contact Us"}
        </Link>
      </div>
    </div>
  );
}