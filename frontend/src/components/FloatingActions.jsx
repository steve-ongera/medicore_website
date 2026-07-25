// src/components/FloatingActions.jsx
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const WHATSAPP_NUMBER = "254112284093";

const PAGE_MESSAGES = {
  "/": "Hi Medicore HMIS! I'm exploring hospital management software for my facility and would like more information.",
  "/about": "Hi, I just read about Medicore HMIS and would like to know more about your company and team.",
  "/services": "Hi, I'd like more details on the services Medicore HMIS offers for hospitals and clinics.",
  "/sha-etims": "Hi, I'm interested in how Medicore HMIS handles SHA and eTIMS compliance for my facility.",
  "/case-studies": "Hi, I read through your case studies and would like to discuss a similar setup for my facility.",
  "/packages": "Hi, I'm comparing your Medicore HMIS packages and would like help choosing the right one.",
  "/pricing": "Hi, I'd like clarification on Medicore HMIS pricing for my facility.",
  "/gallery": "Hi, I saw your gallery and would like to learn more about Medicore HMIS.",
  "/appointment": "Hi, I'd like to book a demo/appointment to see Medicore HMIS in action.",
  "/contact": "Hi, I have a question about Medicore HMIS and would like to get in touch.",
};

function getMessage(pathname, slug) {
  if (pathname.startsWith("/packages/") && slug) {
    const packageName = slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    return `Hi, I'm interested in the "${packageName}" package on Medicore HMIS. Could you share more details and pricing?`;
  }
  return (
    PAGE_MESSAGES[pathname] ||
    "Hi Medicore HMIS! I'd like to know more about your hospital management system."
  );
}

// ── Floating WhatsApp Button ────────────────────────────────────
function WhatsAppButton({ message }) {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  return (
    <>
      <style>{`
        .mc-whatsapp-float {
          position: fixed;
          bottom: 6rem;
          right: 2rem;
          width: 56px;
          height: 56px;
          background: #25D366;
          color: white;
          border: none;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.6rem;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          z-index: 999;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          animation: mc-wa-pulse 2s infinite;
        }
        .mc-whatsapp-float:hover {
          transform: scale(1.1);
          background: #128C7E;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
        }
        .mc-whatsapp-float:active { transform: scale(0.95); }

        @keyframes mc-wa-pulse {
          0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.4); }
          70% { box-shadow: 0 0 0 15px rgba(37, 211, 102, 0); }
          100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
        }

        .mc-whatsapp-float::before {
          content: 'Chat with us on WhatsApp';
          position: absolute;
          right: 70px;
          background: #1f2937;
          color: white;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 0.75rem;
          font-weight: 500;
          white-space: nowrap;
          opacity: 0;
          visibility: hidden;
          transition: all 0.2s ease;
          pointer-events: none;
          font-family: system-ui, -apple-system, sans-serif;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .mc-whatsapp-float:hover::before {
          opacity: 1;
          visibility: visible;
          transform: translateX(-8px);
        }

        @media (max-width: 768px) {
          .mc-whatsapp-float { bottom: 5rem; right: 1rem; width: 48px; height: 48px; font-size: 1.4rem; }
          .mc-whatsapp-float::before { display: none; }
        }
      `}</style>
      
    <a href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mc-whatsapp-float"
        aria-label="Chat with us on WhatsApp"
      >
        <i className="bi bi-whatsapp"></i>
      </a>
    </>
  );
}

// ── Floating Back-to-Top Button ─────────────────────────────────
function BackToTopButton({ isTallPage }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setScrolled(window.scrollY > 300);
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const visible = isTallPage && scrolled;

  return (
    <>
      <style>{`
        .mc-back-to-top {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          width: 48px;
          height: 48px;
          background: var(--color-primary, #0B1C36);
          color: var(--color-accent, #C8A45A);
          border: none;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          z-index: 1000;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          backdrop-filter: blur(4px);
        }
        .mc-back-to-top.visible { opacity: 1; visibility: visible; }
        .mc-back-to-top:hover {
          background: var(--color-accent, #C8A45A);
          color: var(--color-primary, #0B1C36);
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
        }
        .mc-back-to-top:active { transform: translateY(0); }

        .mc-back-to-top::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(200, 164, 90, 0.3);
          transform: translate(-50%, -50%);
          transition: width 0.4s, height 0.4s;
        }
        .mc-back-to-top:active::before { width: 100%; height: 100%; }

        @media (max-width: 768px) {
          .mc-back-to-top { bottom: 1.25rem; right: 1.25rem; width: 42px; height: 42px; font-size: 1rem; }
        }
      `}</style>
      <button
        className={`mc-back-to-top ${visible ? "visible" : ""}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <i className="bi bi-arrow-up-short" style={{ fontSize: "1.75rem", fontWeight: "bold" }} />
      </button>
    </>
  );
}

// ── Combined export ──────────────────────────────────────────────
export default function FloatingActions() {
  const location = useLocation();
  const params = useParams();
  const [isTallPage, setIsTallPage] = useState(false);

  useEffect(() => {
    const checkPageHeight = () => {
      setIsTallPage(document.documentElement.scrollHeight > window.innerHeight * 1.5);
    };
    checkPageHeight();
    window.addEventListener("resize", checkPageHeight);
    const timeout = setTimeout(checkPageHeight, 300);
    return () => {
      window.removeEventListener("resize", checkPageHeight);
      clearTimeout(timeout);
    };
  }, [location.pathname]);

  const message = getMessage(location.pathname, params.slug);

  return (
    <>
      <BackToTopButton isTallPage={isTallPage} />
      <WhatsAppButton message={message} />
    </>
  );
}