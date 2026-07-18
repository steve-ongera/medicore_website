import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDepartments } from '../services/api.js';
import dept1 from '../assets/img/departments-1.jpg';
import dept2 from '../assets/img/departments-2.jpg';
import dept3 from '../assets/img/departments-3.jpg';
import dept4 from '../assets/img/departments-4.jpg';
import dept5 from '../assets/img/departments-5.jpg';

const DepartmentsPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [departments, setDepartments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const defaultImages = [dept1, dept2, dept3, dept4, dept5];

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await getDepartments();
        setDepartments(data);
      } catch (error) {
        // Use fallback data if API fails
        setDepartments([
          {
            id: 1,
            name: "Cardiology",
            description: "Comprehensive heart care services including diagnostics, treatment, and rehabilitation.",
            details: "Our cardiology department offers state-of-the-art cardiac care with advanced diagnostic tools and treatment options.",
            image: dept1
          },
          {
            id: 2,
            name: "Neurology",
            description: "Specialized care for neurological disorders and conditions.",
            details: "Our neurology team provides expert diagnosis and treatment for all neurological conditions.",
            image: dept2
          },
          {
            id: 3,
            name: "Hepatology",
            description: "Liver and digestive system specialist care.",
            details: "Comprehensive liver disease management and digestive health services.",
            image: dept3
          },
          {
            id: 4,
            name: "Pediatrics",
            description: "Specialized healthcare for children and adolescents.",
            details: "Child-friendly medical care with expert pediatricians and modern facilities.",
            image: dept4
          },
          {
            id: 5,
            name: "Ophthalmology",
            description: "Eye care services from routine checkups to complex surgeries.",
            details: "Complete eye care services with advanced diagnostic and surgical capabilities.",
            image: dept5
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDepartments();
  }, []);

  return (
    <main className="main">
      {/* Page Title */}
      <div className="page-title">
        <div className="heading">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-lg-8">
                <h1>Departments</h1>
                <p className="mb-0">
                  Specialized departments offering comprehensive healthcare services
                </p>
              </div>
            </div>
          </div>
        </div>
        <nav className="breadcrumbs">
          <div className="container">
            <ol>
              <li><Link to="/">Home</Link></li>
              <li className="current">Departments</li>
            </ol>
          </div>
        </nav>
      </div>

      {/* Tabs Section */}
      <section id="tabs" className="tabs section">
        <div className="container">
          {isLoading ? (
            <div className="text-center">Loading departments...</div>
          ) : (
            <div className="row">
              <div className="col-lg-3">
                <ul className="nav nav-tabs flex-column">
                  {departments.map((dept, index) => (
                    <li key={dept.id} className="nav-item">
                      <a 
                        className={`nav-link ${index === activeTab ? 'active show' : ''}`}
                        onClick={() => setActiveTab(index)}
                        style={{ cursor: 'pointer' }}
                      >
                        {dept.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-lg-9 mt-4 mt-lg-0">
                <div className="tab-content">
                  {departments.map((dept, index) => (
                    <div 
                      key={dept.id}
                      className={`tab-pane ${index === activeTab ? 'active show' : ''}`}
                    >
                      <div className="row">
                        <div className="col-lg-8 details order-2 order-lg-1">
                          <h3>{dept.name}</h3>
                          <p className="fst-italic">{dept.description}</p>
                          <p>{dept.details}</p>
                        </div>
                        <div className="col-lg-4 text-center order-1 order-lg-2">
                          <img 
                            src={dept.image || defaultImages[index % defaultImages.length]} 
                            alt={dept.name} 
                            className="img-fluid" 
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default DepartmentsPage;