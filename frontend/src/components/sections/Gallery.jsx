import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import gallery1 from '../../assets/img/gallery/gallery-1.jpg';
import gallery2 from '../../assets/img/gallery/gallery-2.jpg';
import gallery3 from '../../assets/img/gallery/gallery-3.jpg';
import gallery4 from '../../assets/img/gallery/gallery-4.jpg';
import gallery5 from '../../assets/img/gallery/gallery-5.jpg';
import gallery6 from '../../assets/img/gallery/gallery-6.jpg';
import gallery7 from '../../assets/img/gallery/gallery-7.jpg';
import gallery8 from '../../assets/img/gallery/gallery-8.jpg';

const Gallery = () => {
  const images = [
    gallery1, gallery2, gallery3, gallery4,
    gallery5, gallery6, gallery7, gallery8
  ];

  return (
    <section id="gallery" className="gallery section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Gallery</h2>
        <p>Take a look inside our facilities and operations</p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <Swiper
          modules={[Pagination, Autoplay]}
          loop={true}
          speed={600}
          autoplay={{ delay: 5000 }}
          centeredSlides={true}
          pagination={{ 
            el: '.swiper-pagination',
            clickable: true,
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active'
          }}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 0 },
            768: { slidesPerView: 3, spaceBetween: 20 },
            1200: { slidesPerView: 5, spaceBetween: 20 }
          }}
          className="swiper init-swiper"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={image} className="img-fluid" alt={`Gallery ${index + 1}`} />
            </SwiperSlide>
          ))}
          <div className="swiper-pagination"></div>
        </Swiper>
      </div>
    </section>
  );
};

export default Gallery;