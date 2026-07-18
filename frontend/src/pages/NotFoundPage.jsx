import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="section not-found">
      <div className="section-container not-found__inner">
        <span className="not-found__code">404</span>
        <h1 className="page-header__title">This page isn't on the chart</h1>
        <p className="page-header__subtitle">
          The page you're looking for doesn't exist or may have moved.
        </p>
        <Link to="/" className="btn btn--accent">Back to Home</Link>
      </div>
    </section>
  );
}
