import { useEffect, useState } from "react";
import { getPackages, submitDemoRequest } from "../services/api.js";

const INITIAL_FORM = {
  full_name: "",
  email: "",
  phone: "",
  facility_name: "",
  facility_type: "",
  package: "",
  preferred_date: "",
  notes: "",
};

export default function BookDemoPage() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [packages, setPackages] = useState([]);
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;
    getPackages()
      .then((data) => isMounted && setPackages(data))
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");
    try {
      await submitDemoRequest({ ...form, package: form.package || null });
      setStatus("success");
      setForm(INITIAL_FORM);
    } catch (err) {
      setStatus("error");
      setErrorMessage(err.message);
    }
  };

  return (
    <>
      <section className="page-header">
        <div className="section-container">
          <span className="eyebrow">Book a Demo</span>
          <h1 className="page-header__title">See Medicore HMIS on your workflow</h1>
          <p className="page-header__subtitle">
            A 30-minute walkthrough tailored to your facility — outpatient,
            bed management, SHA claims and billing.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-container">
          <form className="form-card form-card--wide" onSubmit={handleSubmit}>
            <div className="form-row">
              <label className="form-field">
                <span>Full name</span>
                <input className="input" type="text" name="full_name" required value={form.full_name} onChange={handleChange} />
              </label>
              <label className="form-field">
                <span>Email</span>
                <input className="input" type="email" name="email" required value={form.email} onChange={handleChange} />
              </label>
            </div>

            <div className="form-row">
              <label className="form-field">
                <span>Phone</span>
                <input className="input" type="tel" name="phone" required value={form.phone} onChange={handleChange} />
              </label>
              <label className="form-field">
                <span>Facility name</span>
                <input className="input" type="text" name="facility_name" required value={form.facility_name} onChange={handleChange} />
              </label>
            </div>

            <div className="form-row">
              <label className="form-field">
                <span>Facility type</span>
                <input
                  className="input"
                  type="text"
                  name="facility_type"
                  placeholder="e.g. Hospital, Clinic, Nursing Home"
                  value={form.facility_type}
                  onChange={handleChange}
                />
              </label>
              <label className="form-field">
                <span>Package of interest</span>
                <select className="input" name="package" value={form.package} onChange={handleChange}>
                  <option value="">Not sure yet</option>
                  {packages.map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </label>
            </div>

            <label className="form-field">
              <span>Preferred date</span>
              <input className="input" type="date" name="preferred_date" value={form.preferred_date} onChange={handleChange} />
            </label>

            <label className="form-field">
              <span>Anything specific you'd like covered?</span>
              <textarea className="input textarea" name="notes" rows="4" value={form.notes} onChange={handleChange} />
            </label>

            <button type="submit" className="btn btn--accent" disabled={status === "submitting"}>
              {status === "submitting" ? "Booking…" : "Book a Demo"}
            </button>

            {status === "success" && (
              <p className="alert alert--success">
                Request received — our team will reach out to confirm your slot.
              </p>
            )}
            {status === "error" && <p className="alert alert--error">{errorMessage}</p>}
          </form>
        </div>
      </section>
    </>
  );
}
