import React, { useState } from 'react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "Is Medicore HMIS compliant with SHA claim submission?",
      answer: "Yes. All packages except custom Enterprise add-ons ship with direct SHA claims integration out of the box."
    },
    {
      question: "Do you support M-Pesa payments?",
      answer: "Yes, Standard and Enterprise packages include M-Pesa Paybill/STK Push billing integration."
    },
    {
      question: "Can I upgrade my package later?",
      answer: "Yes, you can upgrade at any time and we'll migrate your existing data at no extra cost."
    },
    {
      question: "Is my patient data secure?",
      answer: "All data is encrypted in transit and at rest, with daily automatic backups on every plan."
    },
    {
      question: "How long does implementation take?",
      answer: "Most facilities go live within two weeks. Our team provides full onboarding and training support."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="faq section light-background">
      <div className="container section-title" data-aos="fade-up">
        <h2>Frequently Asked Questions</h2>
        <p>Find answers to common questions about Medicore HMIS</p>
      </div>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10" data-aos="fade-up" data-aos-delay="100">
            <div className="faq-container">
              {faqs.map((faq, index) => (
                <div 
                  key={index}
                  className={`faq-item ${activeIndex === index ? 'faq-active' : ''}`}
                >
                  <h3 onClick={() => toggleFAQ(index)}>
                    <span className="num">{String(index + 1).padStart(2, '0')}.</span> 
                    {faq.question}
                  </h3>
                  <div className="faq-content">
                    <p>{faq.answer}</p>
                  </div>
                  <i 
                    className={`faq-toggle bi ${activeIndex === index ? 'bi-chevron-down' : 'bi-chevron-right'}`}
                    onClick={() => toggleFAQ(index)}
                  ></i>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;