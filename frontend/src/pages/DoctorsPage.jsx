import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDoctors } from '../services/api.js';
import doctor1 from '../assets/img/doctors/doctors-1.jpg';
import doctor2 from '../assets/img/doctors/doctors-2.jpg';
import doctor3 from '../assets/img/doctors/doctors-3.jpg';
import doctor4 from '../assets/img/doctors/doctors-4.jpg';

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const defaultImages = [doctor1, doctor2, doctor3, doctor4];

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await getDoctors();
        setDoctors(data);
      } catch (error) {
        // Use fallback data if API fails
        setDoctors([
          {
            id: 1,
            name: "Dr. Walter White",
            role: "Chief Medical Officer",
            bio: "Expert in internal medicine with over 20 years of experience.",
            image: doctor1,
            social: { twitter: "#", facebook: "#", instagram: "#", linkedin: "#" }
          },
          {
            id: 2,
            name: "Dr. Sarah Jhonson",
            role: "Anesthesiologist",
            bio: "Specialized in pain management and surgical anesthesia.",
            image: doctor2,
            social: { twitter: "#", facebook: "#", instagram: "#", linkedin: "#" }
          },
          {
            id: 3,
            name: "Dr. William Anderson",
            role: "Cardiology",
            bio: "Leading cardiologist with expertise in interventional procedures.",
            image: doctor3,
            social: { twitter: "#", facebook: "#", instagram: "#", linkedin: "#" }
          },
          {
            id: 4,
            name: "Dr. Amanda Jepson",
            role: "Neurosurgeon",
            bio: "Specialized in complex neurological surgeries and treatments.",
            image: doctor4,
            social: { twitter: "#", facebook: "#", instagram: "#", linkedin: "#" }
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <main className="main">
      {/* Page Title */}
      <div className="page-title">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1>Our Doctors</h1>
                <p className="mb-0">
                  Meet our team of experienced healthcare professionals
                </p>
              </div>
            </div>
          </div>
        </div>
        <nav className="breadcrumbs">
          <div className="container">
            <ol>
              <li><Link to="/">Home</Link></li>
              <li className="current">Doctors</li>
            </ol>
          </div>
        </nav>
      </div>

      {/* Doctors Section */}
      <section id="doctors" className="doctors section light-background">
        <div className="container">
          <div className="row gy-4">
            {isLoading ? (
              <div className="text-center">Loading doctors...</div>
            ) : (
              doctors.map((doctor, index) => (
                <div 
                  key={doctor.id}
                  className="col-lg-3 col-md-6 d-flex align-items-stretch" 
                  data-aos="fade-up" 
                  data-aos-delay={100 + (index * 100)}
                >
                  <div className="team-member">
                    <div className="member-img">
                      <img 
                        src={doctor.image || defaultImages[index % defaultImages.length]} 
                        className="img-fluid" 
                        alt={doctor.name} 
                      />
                      <div className="social">
                        <a href={doctor.social?.twitter || "#"}><i className="bi bi-twitter-x"></i></a>
                        <a href={doctor.social?.facebook || "#"}><i className="bi bi-facebook"></i></a>
                        <a href={doctor.social?.instagram || "#"}><i className="bi bi-instagram"></i></a>
                        <a href={doctor.social?.linkedin || "#"}><i className="bi bi-linkedin"></i></a>
                      </div>
                    </div>
                    <div className="member-info">
                      <h4>{doctor.name}</h4>
                      <span>{doctor.role}</span>
                      {doctor.bio && <p className="mt-2 small">{doctor.bio}</p>}
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

export default DoctorsPage;