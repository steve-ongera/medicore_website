import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createAppointment } from '../services/api.js';

const AppointmentPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    facility_name: '',
    facility_type: '',
    bed_capacity: '',
    preferred_date: '',
    interested_package: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await createAppointment(formData);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        facility_name: '',
        facility_type: '',
        bed_capacity: '',
        preferred_date: '',
        interested_package: '',
        message: ''
      });
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
                <h1>Book a Demo</h1>
                <p className="mb-0">
                  See Medicore HMIS in action and get a quote tailored to your facility
                </p>
              </div>
            </div>
          </div>
        </div>
        <nav className="breadcrumbs">
          <div className="container">
            <ol>
              <li><Link to="/">Home</Link></li>
              <li className="current">Book a Demo</li>
            </ol>
          </div>
        </nav>
      </div>

      {/* Appointment / Demo Request Section */}
      <section id="appointment" className="appointment section light-background">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8" data-aos="fade-up" data-aos-delay="100">
              <form onSubmit={handleSubmit} className="php-email-form">
                {/* Contact details */}
                <div className="row">
                  <div className="col-md-4 form-group">
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
                  <div className="col-md-4 form-group mt-3 mt-md-0">
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
                  <div className="col-md-4 form-group mt-3 mt-md-0">
                    <input
                      type="tel"
                      className="form-control"
                      name="phone"
                      placeholder="Your Phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Facility details */}
                <div className="row">
                  <div className="col-md-6 form-group mt-3">
                    <input
                      type="text"
                      name="facility_name"
                      className="form-control"
                      placeholder="Facility Name"
                      value={formData.facility_name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 form-group mt-3">
                    <select
                      name="facility_type"
                      className="form-select"
                      value={formData.facility_type}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Facility Type</option>
                      <option value="Clinic">Clinic</option>
                      <option value="Nursing Home">Nursing Home</option>
                      <option value="Hospital">Hospital</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4 form-group mt-3">
                    <input
                      type="number"
                      min="1"
                      name="bed_capacity"
                      className="form-control"
                      placeholder="Bed Capacity"
                      value={formData.bed_capacity}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-4 form-group mt-3">
                    <select
                      name="interested_package"
                      className="form-select"
                      value={formData.interested_package}
                      onChange={handleChange}
                    >
                      <option value="">Package Interested In</option>
                      <option value="Essential">Essential</option>
                      <option value="Standard">Standard</option>
                      <option value="Premium">Premium</option>
                      <option value="Not sure yet">Not sure yet</option>
                    </select>
                  </div>
                  <div className="col-md-4 form-group mt-3">
                    <input
                      type="datetime-local"
                      name="preferred_date"
                      className="form-control"
                      placeholder="Preferred Demo Date"
                      value={formData.preferred_date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group mt-3">
                  <textarea
                    className="form-control"
                    name="message"
                    rows="5"
                    placeholder="Tell us about your facility's needs (Optional)"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="mt-3">
                  {isSubmitting && <div className="loading">Loading...</div>}
                  {submitStatus === 'success' && (
                    <div className="sent-message">
                      Your demo request has been sent successfully. Our team will be in touch shortly!
                    </div>
                  )}
                  {submitStatus === 'error' && (
                    <div className="error-message">
                      Something went wrong. Please try again.
                    </div>
                  )}
                  <div className="text-center">
                    <button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? 'Sending...' : 'Request Demo & Quote'}
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

export default AppointmentPage;