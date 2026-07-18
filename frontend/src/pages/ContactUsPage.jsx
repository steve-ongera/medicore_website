import { useState } from "react";
import { submitContactMessage } from "../services/api.js";

const INITIAL_FORM = {
  full_name: "",
  email: "",
  phone: "",
  organization: "",
  subject: "",
  message: "",
};

export default function ContactUsPage() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");
    try {
      await submitContactMessage(form);
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
          <span className="eyebrow">Contact Us</span>
          <h1 className="page-header__title">Talk to the Medicore team</h1>
          <p className="page-header__subtitle">
            Questions about pricing, modules or SHA/eTIMS compliance? Send us
            a message and our team will respond within one business day.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section-container contact-layout">
          <form className="form-card" onSubmit={handleSubmit}>
            <div className="form-row">
              <label className="form-field">
                <span>Full name</span>
                <input
                  className="input"
                  type="text"
                  name="full_name"
                  required
                  value={form.full_name}
                  onChange={handleChange}
                />
              </label>
              <label className="form-field">
                <span>Email</span>
                <input
                  className="input"
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className="form-row">
              <label className="form-field">
                <span>Phone</span>
                <input
                  className="input"
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                />
              </label>
              <label className="form-field">
                <span>Organization</span>
                <input
                  className="input"
                  type="text"
                  name="organization"
                  value={form.organization}
                  onChange={handleChange}
                />
              </label>
            </div>

            <label className="form-field">
              <span>Subject</span>
              <input
                className="input"
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
              />
            </label>

            <label className="form-field">
              <span>Message</span>
              <textarea
                className="input textarea"
                name="message"
                rows="5"
                required
                value={form.message}
                onChange={handleChange}
              />
            </label>

            <button type="submit" className="btn btn--accent" disabled={status === "submitting"}>
              {status === "submitting" ? "Sending…" : "Send Message"}
            </button>

            {status === "success" && (
              <p className="alert alert--success">
                Thanks — your message has been sent. We'll be in touch soon.
              </p>
            )}
            {status === "error" && <p className="alert alert--error">{errorMessage}</p>}
          </form>

          <aside className="contact-aside">
            <h3>Reach us directly</h3>
            <ul className="contact-aside__list">
              <li>
                <strong>Email</strong>
                <a href="mailto:support@medicorehmis.co.ke">support@medicorehmis.co.ke</a>
              </li>
              <li>
                <strong>Phone</strong>
                <a href="tel:+254700000000">+254 700 000000</a>
              </li>
              <li>
                <strong>Office</strong>
                Nairobi, Kenya
              </li>
            </ul>
          </aside>
        </div>
      </section>
    </>
  );
}
