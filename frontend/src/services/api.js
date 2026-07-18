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
// Team
// ---------------------------------------------------------------------
export const getTeamMembers = () => client.get("/team/").then(toArray);

// ---------------------------------------------------------------------
// Contact form
// ---------------------------------------------------------------------
export const submitContactMessage = (payload) =>
  client.post("/contact/", payload).then((res) => res.data);

// ---------------------------------------------------------------------
// Book a demo
// ---------------------------------------------------------------------
export const submitDemoRequest = (payload) =>
  client.post("/book-demo/", payload).then((res) => res.data);

// ---------------------------------------------------------------------
// Site settings (logo, hero copy, contact details)
// ---------------------------------------------------------------------
export const getSiteSettings = () =>
  client.get("/site-settings/").then((res) => res.data);

export default client;
