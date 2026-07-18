import axios from "axios";

// In dev, Vite proxies /api to the Django backend (see vite.config.js).
// In production, set VITE_API_BASE_URL to the deployed API origin.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Normalizes DRF's paginated { count, next, previous, results } shape
// down to a plain array, so pages don't each re-implement this check.
function toArray(response) {
  const data = response.data;
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.results)) return data.results;
  return [];
}

client.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.detail ||
      error.response?.statusText ||
      error.message ||
      "Something went wrong. Please try again.";
    return Promise.reject(new Error(message));
  }
);

// ---------------------------------------------------------------------
// Module categories
// ---------------------------------------------------------------------
export const getModuleCategories = () =>
  client.get("/module-categories/").then(toArray);

// ---------------------------------------------------------------------
// Modules
// ---------------------------------------------------------------------
export const getModules = (params = {}) =>
  client.get("/modules/", { params }).then(toArray);

export const getModuleBySlug = (slug) =>
  client.get(`/modules/${slug}/`).then((res) => res.data);

// ---------------------------------------------------------------------
// Packages
// ---------------------------------------------------------------------
export const getPackages = () => client.get("/packages/").then(toArray);

export const getFeaturedPackages = () =>
  client.get("/packages/featured/").then((res) => res.data);

export const getPackageBySlug = (slug) =>
  client.get(`/packages/${slug}/`).then((res) => res.data);

// ---------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------
export const getTestimonials = (featuredOnly = false) =>
  client
    .get("/testimonials/", { params: featuredOnly ? { featured: "true" } : {} })
    .then(toArray);

// ---------------------------------------------------------------------
// FAQs
// ---------------------------------------------------------------------
export const getFAQs = () => client.get("/faqs/").then(toArray);

// ---------------------------------------------------------------------
// Team (Doctors)
// ---------------------------------------------------------------------
export const getTeamMembers = () => client.get("/team/").then(toArray);

// NEW: Alias for getTeamMembers to match Medicio theme naming
export const getDoctors = () => client.get("/team/").then(toArray);

// ---------------------------------------------------------------------
// Departments (from your API or we can use static data)
// ---------------------------------------------------------------------
export const getDepartments = () => 
  client.get("/departments/").then(toArray).catch(() => {
    // If endpoint doesn't exist, return static data
    return [
      {
        id: 1,
        name: "Cardiology",
        description: "Comprehensive heart care services",
        details: "State-of-the-art cardiac care with advanced diagnostics.",
        image: "/assets/img/departments-1.jpg"
      },
      {
        id: 2,
        name: "Neurology",
        description: "Specialized care for neurological disorders",
        details: "Expert diagnosis and treatment for neurological conditions.",
        image: "/assets/img/departments-2.jpg"
      },
      // Add more as needed
    ];
  });

// ---------------------------------------------------------------------
// Gallery
// ---------------------------------------------------------------------
export const getGalleryImages = () => 
  client.get("/gallery/").then(toArray).catch(() => {
    // If endpoint doesn't exist, return static data
    return [
      { id: 1, image: "/assets/img/gallery/gallery-1.jpg", title: "Facility 1" },
      { id: 2, image: "/assets/img/gallery/gallery-2.jpg", title: "Facility 2" },
      // Add more as needed
    ];
  });

// ---------------------------------------------------------------------
// Contact form
// ---------------------------------------------------------------------
export const submitContactMessage = (payload) =>
  client.post("/contact/", payload).then((res) => res.data);

// NEW: Alias for submitContactMessage to match Medicio theme naming
export const submitContactForm = (payload) =>
  client.post("/contact/", payload).then((res) => res.data);

// ---------------------------------------------------------------------
// Book a demo / Appointment
// ---------------------------------------------------------------------
export const submitDemoRequest = (payload) =>
  client.post("/book-demo/", payload).then((res) => res.data);

// NEW: Appointment booking
export const createAppointment = (payload) =>
  client.post("/appointments/", payload).then((res) => res.data);

// NEW: Alias for submitDemoRequest to match Appointment section
export const submitAppointment = (payload) =>
  client.post("/appointments/", payload).then((res) => res.data);

// ---------------------------------------------------------------------
// Site settings (logo, hero copy, contact details)
// ---------------------------------------------------------------------
export const getSiteSettings = () =>
  client.get("/site-settings/").then((res) => res.data);

// ---------------------------------------------------------------------
// NEW: Statistics / Counters
// ---------------------------------------------------------------------
export const getStats = () => 
  client.get("/stats/").then(toArray).catch(() => {
    // If endpoint doesn't exist, return default stats
    return [
      { icon: "fas fa-user-md", value: 25, label: "Doctors" },
      { icon: "far fa-hospital", value: 15, label: "Departments" },
      { icon: "fas fa-flask", value: 8, label: "Research Labs" },
      { icon: "fas fa-award", value: 150, label: "Awards" }
    ];
  });

// ---------------------------------------------------------------------
// NEW: Features (static or from API)
// ---------------------------------------------------------------------
export const getFeatures = () => 
  client.get("/features/").then(toArray).catch(() => {
    // If endpoint doesn't exist, return default features
    return [
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
  });

// ---------------------------------------------------------------------
// NEW: Services (you already have getModules, but adding alias)
// ---------------------------------------------------------------------
export const getServices = getModules;

// ---------------------------------------------------------------------
// NEW: Pricing (you already have getPackages, but adding alias)
// ---------------------------------------------------------------------
export const getPricing = getPackages;

export default client;