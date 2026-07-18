import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getGalleryImages } from '../services/api.js';
import gallery1 from '../assets/img/gallery/gallery-1.jpg';
import gallery2 from '../assets/img/gallery/gallery-2.jpg';
import gallery3 from '../assets/img/gallery/gallery-3.jpg';
import gallery4 from '../assets/img/gallery/gallery-4.jpg';
import gallery5 from '../assets/img/gallery/gallery-5.jpg';
import gallery6 from '../assets/img/gallery/gallery-6.jpg';
import gallery7 from '../assets/img/gallery/gallery-7.jpg';
import gallery8 from '../assets/img/gallery/gallery-8.jpg';

const GalleryPage = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const defaultImages = [
    gallery1, gallery2, gallery3, gallery4,
    gallery5, gallery6, gallery7, gallery8
  ];

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const data = await getGalleryImages();
        setImages(data);
      } catch (error) {
        // Use fallback data
        setImages(defaultImages.map((img, index) => ({
          id: index + 1,
          image: img,
          title: `Gallery ${index + 1}`
        })));
      } finally {
        setIsLoading(false);
      }
    };
    fetchGallery();
  }, []);

  return (
    <main className="main">
      {/* Page Title */}
      <div className="page-title">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1>Gallery</h1>
                <p className="mb-0">
                  Take a look inside our facilities and operations
                </p>
              </div>
            </div>
          </div>
        </div>
        <nav className="breadcrumbs">
          <div className="container">
            <ol>
              <li><Link to="/">Home</Link></li>
              <li className="current">Gallery</li>
            </ol>
          </div>
        </nav>
      </div>

      {/* Gallery Section */}
      <section id="gallery" className="gallery section">
        <div className="container">
          {isLoading ? (
            <div className="text-center">Loading gallery...</div>
          ) : (
            <div className="row gy-4">
              {images.map((item, index) => (
                <div 
                  key={item.id || index}
                  className="col-lg-3 col-md-4 col-sm-6" 
                  data-aos="fade-up" 
                  data-aos-delay={100 + (index * 100)}
                >
                  <div className="gallery-item">
                    <img 
                      src={item.image || defaultImages[index % defaultImages.length]} 
                      alt={item.title || `Gallery ${index + 1}`} 
                      className="img-fluid rounded"
                      style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                    />
                    {item.title && (
                      <div className="gallery-caption mt-2 text-center">
                        <p className="small">{item.title}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default GalleryPage;