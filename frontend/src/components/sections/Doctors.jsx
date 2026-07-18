import React from 'react';
import doctor1 from '../../assets/img/doctors/doctors-1.jpg';
import doctor2 from '../../assets/img/doctors/doctors-2.jpg';
import doctor3 from '../../assets/img/doctors/doctors-3.jpg';
import doctor4 from '../../assets/img/doctors/doctors-4.jpg';

const Doctors = () => {
  const doctors = [
    {
      name: "Walter White",
      role: "Chief Medical Officer",
      image: doctor1,
      social: { twitter: "#", facebook: "#", instagram: "#", linkedin: "#" }
    },
    {
      name: "Sarah Jhonson",
      role: "Anesthesiologist",
      image: doctor2,
      social: { twitter: "#", facebook: "#", instagram: "#", linkedin: "#" }
    },
    {
      name: "William Anderson",
      role: "Cardiology",
      image: doctor3,
      social: { twitter: "#", facebook: "#", instagram: "#", linkedin: "#" }
    },
    {
      name: "Amanda Jepson",
      role: "Neurosurgeon",
      image: doctor4,
      social: { twitter: "#", facebook: "#", instagram: "#", linkedin: "#" }
    }
  ];

  return (
    <section id="doctors" className="doctors section light-background">
      <div className="container section-title" data-aos="fade-up">
        <h2>Doctors</h2>
        <p>Meet our team of experienced healthcare professionals</p>
      </div>

      <div className="container">
        <div className="row gy-4">
          {doctors.map((doctor, index) => (
            <div 
              key={index}
              className="col-lg-3 col-md-6 d-flex align-items-stretch" 
              data-aos="fade-up" 
              data-aos-delay={100 + (index * 100)}
            >
              <div className="team-member">
                <div className="member-img">
                  <img src={doctor.image} className="img-fluid" alt={doctor.name} />
                  <div className="social">
                    <a href={doctor.social.twitter}><i className="bi bi-twitter-x"></i></a>
                    <a href={doctor.social.facebook}><i className="bi bi-facebook"></i></a>
                    <a href={doctor.social.instagram}><i className="bi bi-instagram"></i></a>
                    <a href={doctor.social.linkedin}><i className="bi bi-linkedin"></i></a>
                  </div>
                </div>
                <div className="member-info">
                  <h4>{doctor.name}</h4>
                  <span>{doctor.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Doctors;