# Medicore HMIS — Marketing Website

A marketing/lead-gen website for **Medicore HMIS**, a hospital management
information system aimed at the Kenyan market. Showcases HMIS **packages**
(pricing tiers) built from a catalogue of **modules** (SHA, eTIMS, Bed
Management, OP, IP Admission, Pharmacy, etc.), with contact and demo-request
lead capture.

- **Backend:** Django 5 + Django REST Framework — one core `api` app
- **Frontend:** React 18 (Vite) + React Router + Axios

---

## Project structure

```
medicore_hmis/
├── backend/
│   ├── core/                      # Django project (settings, root urls)
│   │   ├── __init__.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   └── asgi.py
│   ├── api/                       # Single core application
│   │   ├── __init__.py
│   │   ├── apps.py
│   │   ├── models.py              # Module, Package, Testimonial, FAQ, etc.
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py                # /api/... routes (DRF router)
│   │   ├── admin.py
│   │   └── management/
│   │       └── commands/
│   │           └── seed_data.py   # `python manage.py seed_data`
│   ├── manage.py
│   ├── requirements.txt
│   └── .env.example
│
├── frontend/
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   ├── .env.example
│   └── src/
│       ├── main.jsx
│       ├── App.jsx                # Routes
│       ├── services/
│       │   └── api.js             # All API endpoint calls (axios)
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── Footer.jsx
│       │   ├── PackageCard.jsx
│       │   └── ModuleChip.jsx
│       ├── pages/
│       │   ├── HomePage.jsx
│       │   ├── AboutPage.jsx
│       │   ├── PackagesPage.jsx
│       │   ├── PackageDetailPage.jsx
│       │   ├── ModulesPage.jsx
│       │   ├── ContactUsPage.jsx
│       │   ├── BookDemoPage.jsx
│       │   └── NotFoundPage.jsx
│       └── styles/
│           └── main.css           # Full design system (tokens + components)
│
└── README.md
```

---

## Data model overview (`backend/api/models.py`)

| Model             | Purpose                                                                 |
|-------------------|--------------------------------------------------------------------------|
| `ModuleCategory`  | Groups modules — Clinical, Compliance & Billing, Operations             |
| `Module`          | A single HMIS feature: SHA, eTIMS, Bed Management, OP, IP ADM, Pharmacy, Lab, Billing, Records, Reporting. Has `icon` (image) + auto `slug`. |
| `Package`         | A pricing tier (Starter / Standard / Enterprise). Has `image` + auto `slug`, price, bed/user limits. |
| `PackageModule`   | Through-model linking `Package` ↔ `Module`, with an `is_addon` flag     |
| `PackageFeature`  | Free-text bullet highlights per package                                  |
| `Testimonial`     | Client quotes with photo, rating, slug                                   |
| `FAQ`             | Question/answer pairs for the packages page                              |
| `TeamMember`      | About page team listing                                                  |
| `ContactMessage`  | General contact form submissions                                         |
| `DemoRequest`     | "Book a Demo" lead capture form                                          |
| `SiteSetting`     | Singleton — hero copy, logo, contact details, social links               |

All slugged models extend a shared `SlugModel` abstract base that
auto-generates a unique slug from `name` on save.

---

## API endpoints (`backend/api/urls.py`, mounted at `/api/`)

| Method | Endpoint                          | Description                          |
|--------|------------------------------------|---------------------------------------|
| GET    | `/api/module-categories/`          | List module categories                |
| GET    | `/api/modules/`                    | List modules (`?category=<slug>&search=`) |
| GET    | `/api/modules/{slug}/`             | Module detail                         |
| GET    | `/api/packages/`                   | List packages                         |
| GET    | `/api/packages/featured/`          | Featured packages only                |
| GET    | `/api/packages/{slug}/`            | Package detail (modules + features)   |
| GET    | `/api/testimonials/?featured=true` | List testimonials                     |
| GET    | `/api/faqs/`                       | List FAQs                             |
| GET    | `/api/team/`                       | List team members                     |
| POST   | `/api/contact/`                    | Submit contact form                   |
| POST   | `/api/book-demo/`                  | Submit demo request                   |
| GET    | `/api/site-settings/`              | Global site content                   |
| GET    | `/admin/`                          | Django admin                          |

All GET endpoints are public/read-only. `frontend/src/services/api.js`
wraps every one of these in a typed function.

---

## Getting started

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env            # adjust values as needed

python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py seed_data      # optional: loads demo packages/modules/FAQs
python manage.py runserver
```

Backend runs at `http://127.0.0.1:8000`, admin at `/admin/`.

### Frontend

```bash
cd frontend
npm install
cp .env.example .env            # VITE_API_BASE_URL=/api (proxied to backend in dev)
npm run dev
```

Frontend runs at `http://localhost:5173` — Vite proxies `/api` and `/media`
to the Django backend (see `vite.config.js`).

---

## Design system notes

- Palette: deep teal (`--color-primary: #0F5C5C`) on a cool off-white
  background, with a warm coral accent (`--color-accent: #FF6B4A`) for CTAs
  and a mint highlight for secondary emphasis.
- Type: **Space Grotesk** for display/headings, **Inter** for body copy,
  **IBM Plex Mono** for module short-codes and system tags — echoing the
  clinical/systems feel of hospital software.
- Signature element: modules are rendered as **ID-tag chips** (`ModuleChip`)
  — a mono short-code badge (`SHA`, `ETIMS`, `OP`, `IP-ADM`...) paired with
  the module name, used consistently across the homepage, Packages, Package
  Detail and Modules pages.
- All styling lives in `src/styles/main.css` using CSS custom properties and
  `clamp()`-based fluid type; components use plain `className`s.

---

## Notes / next steps

- Wire `SiteSetting.logo` / `hero_image` into the Navbar/Hero once real
  brand assets are available.
- Add JWT-protected admin/staff endpoints if a client dashboard is needed
  later (current API is public/marketing-only, no auth).
- Swap SQLite → PostgreSQL for production (settings.py has commented config).
- Configure `django-storages` (S3) for media in production if not serving
  from local disk.
