import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getFeaturedPackages,
  getModules,
  getTestimonials,
  getSiteSettings,
} from "../services/api.js";

// Import section components (we'll create these)
import Hero from "../components/sections/Hero.jsx";
import FeaturedServices from "../components/sections/FeaturedServices.jsx";
import CallToAction from "../components/sections/CallToAction.jsx";
import About from "../components/sections/About.jsx";
import Stats from "../components/sections/Stats.jsx";
import Features from "../components/sections/Features.jsx";
import Services from "../components/sections/Services.jsx";
import Appointment from "../components/sections/Appointment.jsx";
import Departments from "../components/sections/Departments.jsx";
import Testimonials from "../components/sections/Testimonials.jsx";
import Doctors from "../components/sections/Doctors.jsx";
import Gallery from "../components/sections/Gallery.jsx";
import Pricing from "../components/sections/Pricing.jsx";
import FAQ from "../components/sections/FAQ.jsx";
import Contact from "../components/sections/Contact.jsx";

export default function HomePage() {
  const [settings, setSettings] = useState(null);
  const [packages, setPackages] = useState([]);
  const [modules, setModules] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    Promise.all([
      getSiteSettings(),
      getFeaturedPackages(),
      getModules({ is_core: true }),
      getTestimonials(true),
    ])
      .then(([settingsData, packagesData, modulesData, testimonialsData]) => {
        if (!isMounted) return;
        setSettings(settingsData);
        setPackages(packagesData);
        setModules(modulesData);
        setTestimonials(testimonialsData);
      })
      .catch((err) => isMounted && setError(err.message))
      .finally(() => isMounted && setIsLoading(false));

    return () => {
      isMounted = false;
    };
  }, []);

  // Prepare data for sections
  const heroData = {
    headline: settings?.hero_headline || "Hospital Management, Simplified for Kenya",
    subtext: settings?.hero_subtext || "SHA-ready, eTIMS-compliant HMIS software for clinics, nursing homes and hospitals across Kenya — from outpatient to bed management.",
    supportPhone: settings?.support_phone || "+254 700 000000",
    supportEmail: settings?.support_email || "support@medicorehmis.co.ke"
  };

  const statsData = [
    { icon: "fas fa-user-md", value: 25, label: "Doctors" },
    { icon: "far fa-hospital", value: 15, label: "Departments" },
    { icon: "fas fa-flask", value: 8, label: "Research Labs" },
    { icon: "fas fa-award", value: 150, label: "Awards" }
  ];

  const featuresData = [
    {
      icon: "fa-solid fa-hand-holding-medical",
      title: "SHA Integration",
      description: "Direct claims submission to the Social Health Authority with real-time validation."
    },
    {
      icon: "fa-solid fa-suitcase-medical",
      title: "eTIMS Compliance",
      description: "KRA-compliant electronic tax invoicing on every bill generated."
    },
    {
      icon: "fa-solid fa-staff-snake",
      title: "Bed Management",
      description: "Live bed occupancy tracking across wards and wings."
    },
    {
      icon: "fa-solid fa-lungs",
      title: "Patient Records",
      description: "Digital patient records with fast search and retrieval."
    }
  ];

  return (
    <>
      {/* Hero Section - Carousel-based */}
      <Hero settings={heroData} />

      {/* Featured Services Section */}
      <FeaturedServices />

      {/* Call To Action Section */}
      <CallToAction 
        title="In an emergency? Need help now?"
        description="Our team is ready to assist you with any urgent healthcare management needs. Get in touch with us today."
        buttonText="Make an Appointment"
        buttonLink="/appointment"
      />

      {/* About Section */}
      <About />

      {/* Stats Section */}
      <Stats stats={statsData} />

      {/* Features Section */}
      <Features features={featuresData} />

      {/* Services Section */}
      <Services modules={modules} isLoading={isLoading} />

      {/* Appointment Section */}
      <Appointment />

      {/* Departments Section */}
      <Departments />

      {/* Testimonials Section */}
      <Testimonials testimonials={testimonials} isLoading={isLoading} />

      {/* Doctors Section */}
      <Doctors />

      {/* Gallery Section */}
      <Gallery />

      {/* Pricing Section */}
      <Pricing packages={packages} isLoading={isLoading} />

      {/* FAQ Section */}
      <FAQ />

      {/* Contact Section */}
      <Contact settings={settings} />
    </>
  );
}