import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import PackagesPage from "./pages/PackagesPage.jsx";
import PackageDetailPage from "./pages/PackageDetailPage.jsx";
import ModulesPage from "./pages/ModulesPage.jsx";
import ContactUsPage from "./pages/ContactUsPage.jsx";
import BookDemoPage from "./pages/BookDemoPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/packages" element={<PackagesPage />} />
          <Route path="/packages/:slug" element={<PackageDetailPage />} />
          <Route path="/modules" element={<ModulesPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/book-demo" element={<BookDemoPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
