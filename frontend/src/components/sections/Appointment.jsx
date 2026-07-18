import React, { useState } from 'react';
import { createAppointment } from '../../services/api.js';

const Appointment = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    department: '',
    doctor: '',
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
      // Call your API to create appointment
      // await createAppointment(formData);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        department: '',
        doctor: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="appointment" className="appointment section light-background">
      <div className="container section-title" data-aos="fade-up">
        <h2>MAKE AN APPOINTMENT</h2>
        <p>Book a consultation with our healthcare professionals</p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <form onSubmit={handleSubmit} className="php-email-form">
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
          <div className="row">
            <div className="col-md-4 form-group mt-3">
              <input 
                type="datetime-local" 
                name="date" 
                className="form-control" 
                placeholder="Appointment Date" 
                value={formData.date}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="col-md-4 form-group mt-3">
              <select 
                name="department" 
                className="form-select" 
                value={formData.department}
                onChange={handleChange}
                required
              >
                <option value="">Select Department</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Neurology">Neurology</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Ophthalmology">Ophthalmology</option>
              </select>
            </div>
            <div className="col-md-4 form-group mt-3">
              <select 
                name="doctor" 
                className="form-select" 
                value={formData.doctor}
                onChange={handleChange}
                required
              >
                <option value="">Select Doctor</option>
                <option value="Dr. Walter White">Dr. Walter White</option>
                <option value="Dr. Sarah Jhonson">Dr. Sarah Jhonson</option>
                <option value="Dr. William Anderson">Dr. William Anderson</option>
              </select>
            </div>
          </div>

          <div className="form-group mt-3">
            <textarea 
              className="form-control" 
              name="message" 
              rows="5" 
              placeholder="Message (Optional)"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>
          
          <div className="mt-3">
            {isSubmitting && <div className="loading">Loading...</div>}
            {submitStatus === 'success' && (
              <div className="sent-message">Your appointment request has been sent successfully. Thank you!</div>
            )}
            {submitStatus === 'error' && (
              <div className="error-message">Something went wrong. Please try again.</div>
            )}
            <div className="text-center">
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Make an Appointment'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Appointment;