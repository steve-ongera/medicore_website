import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

const Testimonials = ({ testimonials = [], isLoading = false }) => {
  const defaultTestimonials = [
    {
      id: 1,
      client_name: "Dr. Wanjiru Kamau",
      client_role: "Medical Director",
      organization: "South B Medical Centre, Nairobi",
      message: "Medicore cut our SHA claim rejection rate dramatically and our front desk queues moved so much faster.",
      rating: 5
    },
    {
      id: 2,
      client_name: "James Otieno",
      client_role: "Hospital Administrator",
      organization: "Riverside Nursing Home, Kisumu",
      message: "Bed management alone saved us hours every shift change. Support has been excellent.",
      rating: 5
    },
    {
      id: 3,
      client_name: "Faith Chebet",
      client_role: "Finance Officer",
      organization: "Uasin Gishu Health Centre, Eldoret",
      message: "eTIMS compliance used to be a headache. Now every invoice goes out correctly the first time.",
      rating: 4
    }
  ];

  const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials;

  return (
    <section id="testimonials" className="testimonials section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Testimonials</h2>
        <p>What healthcare professionals say about Medicore HMIS</p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        {isLoading ? (
          <div className="text-center">Loading testimonials...</div>
        ) : (
          <Swiper
            modules={[Pagination, Autoplay]}
            loop={true}
            speed={600}
            autoplay={{ delay: 5000 }}
            pagination={{ 
              el: '.swiper-pagination',
              clickable: true,
              bulletClass: 'swiper-pagination-bullet',
              bulletActiveClass: 'swiper-pagination-bullet-active'
            }}
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 40 },
              1200: { slidesPerView: 3, spaceBetween: 20 }
            }}
            className="swiper init-swiper"
          >
            {displayTestimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="testimonial-item">
                  <p>
                    <i className="bi bi-quote quote-icon-left"></i>
                    <span>{testimonial.message}</span>
                    <i className="bi bi-quote quote-icon-right"></i>
                  </p>
                  <img 
                    src={`https://ui-avatars.com/api/?name=${testimonial.client_name}&background=3fbbc0&color=fff&size=90`} 
                    className="testimonial-img" 
                    alt={testimonial.client_name}
                  />
                  <h3>{testimonial.client_name}</h3>
                  <h4>{testimonial.client_role}{testimonial.organization ? `, ${testimonial.organization}` : ''}</h4>
                </div>
              </SwiperSlide>
            ))}
            <div className="swiper-pagination"></div>
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default Testimonials;