import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import FloatingActions from "./components/FloatingActions.jsx";
import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
import ShaEtimsPage from "./pages/ShaEtimsPage.jsx"; // New - replaced DepartmentsPage
import CaseStudiesPage from "./pages/CaseStudiesPage.jsx"; // New - replaced DoctorsPage
import PackagesPage from "./pages/PackagesPage.jsx";
import PackageDetailPage from "./pages/PackageDetailPage.jsx";
import PricingPage from "./pages/PricingPage.jsx";
//import GalleryPage from "./pages/GalleryPage.jsx";
import AppointmentPage from "./pages/AppointmentPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/sha-etims" element={<ShaEtimsPage />} /> {/* New route */}
          <Route path="/case-studies" element={<CaseStudiesPage />} /> {/* New route */}
          <Route path="/packages" element={<PackagesPage />} />
          <Route path="/packages/:slug" element={<PackageDetailPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          
          <Route path="/appointment" element={<AppointmentPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}