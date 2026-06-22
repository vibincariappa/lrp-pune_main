# Pune Metro LRP Portal - Source Code Structure & Key Files

This document provides a comprehensive map of the directory layout and details the core files driving the **Pune Metro Livelihood Restoration Plan (LRP) Team Portal**.

---

## 1. Directory Layout

The project follows a modular **client-server monorepo structure** divided into a React SPA frontend and an Express REST API backend.

```text
lrp-pune-bf/
├── backend/                       # Express Node.js Server & DB
│   ├── prisma/                    # ORM Schema & Migrations
│   │   ├── migrations/            # Auto-generated database migration scripts
│   │   └── schema.prisma          # Prisma Database Entity definitions
│   ├── src/                       # Main source folder
│   │   ├── config/                # Centralized configurations (DB pool, permissions, caching, rate limiters)
│   │   ├── controllers/           # HTTP Request handlers
│   │   ├── middleware/            # Security gateway interceptors (JWT validation, RBAC checking)
│   │   ├── routes/                # Endpoint routing maps
│   │   ├── services/              # Business logic (Gemini API integration, PDF parsing, DB queries)
│   │   ├── storage/               # File uploads disk storage configurations
│   │   ├── utils/                 # Auxiliary helper tools (JWT signs)
│   │   ├── validators/            # Request body validators
│   │   └── vaidators/             # (Duplicate/Legacy) Zod schemas
│   ├── server.js                  # Entry point for startup & graceful shutdowns
│   └── package.json               # Backend dependency definitions
│
├── frontend/                      # React 19 SPA (Vite)
│   ├── src/                       # Source folder
│   │   ├── components/            # Shared visual components (Charts, 3D canvases, counters)
│   │   │   └── public/            # Public widgets
│   │   ├── hooks/                 # React Query wrapper hooks
│   │   ├── lib/                   # Utilities (Client RBAC utilities)
│   │   ├── pages/                 # Full view layouts (Landing, Pillar, Login, Admin dashboards)
│   │   │   ├── admin/             # Restricted views
│   │   │   ├── pillars/           # Individual pillar views (1 to 6)
│   │   │   └── public/            # Public views
│   │   ├── routes/                # Client router configuration & protected shields
│   │   ├── service/               # HTTP client instances & API routes
│   │   ├── store/                 # Global client state (Zustand session store)
│   │   ├── App.jsx                # Layout orchestrator
│   │   ├── index.css              # Styling definitions
│   │   └── main.jsx               # SPA mounting entrypoint
│   └── package.json               # Frontend dependency definitions
│
├── TECH_STACK.md                  # Detailed breakdown of modules, frameworks & tools
├── API_DOCUMENTATION.md           # API endpoints reference specification
└── package.json                   # Monorepo command runner script definitions
```

---

## 2. Key Architecture Files

Below are the most critical files driving the core security, business rules, persistence, and navigation behaviors:

### A. Frontend Layer

#### 1. [AppRoutes.jsx](file:///c:/Users/dellb/Desktop/LRP-PUNE-BF/frontend/src/routes/AppRoutes.jsx)
- **Role:** Central routing controller.
- **Details:** Maps routes (such as public landing page `/`, dynamic `/pillars/:id` paths, and restricted admin folders `/team/*`) using `<BrowserRouter>`. Restricts administration paths via dynamic `<ProtectedRoute>` wrappers.

#### 2. [PillarPage.jsx](file:///c:/Users/dellb/Desktop/LRP-PUNE-BF/frontend/src/pages/pillars/PillarPage.jsx)
- **Role:** Pillar sub-page router/dispatcher.
- **Details:** Reads path parameters (`:id`) and dynamically renders the matching view component (`PillarPage1` through `PillarPage6`). Includes fallback handlers to redirect invalid indexes back to `/`.

#### 3. [HomePage.jsx](file:///c:/Users/dellb/Desktop/LRP-PUNE-BF/frontend/src/pages/public/HomePage.jsx)
- **Role:** Portal landing view.
- **Details:** Displays aggregated metrics, stories of impact, performance charts, and maps. Retrieves data using `useDashboard` hooks and supports inline smooth-scrolling.

#### 4. [authStore.js](file:///c:/Users/dellb/Desktop/LRP-PUNE-BF/frontend/src/store/authStore.js)
- **Role:** Session state manager.
- **Details:** Uses Zustand to coordinate authenticated staff states. Includes zero persistent token storage (safeguarding session keys against client-side XSS retrieval).

---

### B. Backend Layer

#### 1. [server.js](file:///c:/Users/dellb/Desktop/LRP-PUNE-BF/backend/server.js)
- **Role:** Server lifecycle manager.
- **Details:** Performs database connection checks before opening ports. Binds event listeners to capture terminate signals (`SIGINT`/`SIGTERM`) to trigger graceful database pool shutdowns.

#### 2. [db.js](file:///c:/Users/dellb/Desktop/LRP-PUNE-BF/backend/src/config/db.js)
- **Role:** Database client wrapper.
- **Details:** Configures a resilient PostgreSQL client pool. Provides automatic reconnection retries (up to 5 attempts) and detailed query/error logging.

#### 3. [schema.prisma](file:///c:/Users/dellb/Desktop/LRP-PUNE-BF/backend/prisma/schema.prisma)
- **Role:** Database Entity-Relationship definition.
- **Details:** Models key database schemas including:
  - `Admin`: User profiles and passwords.
  - `LoginAudit`: Staff authentication logs.
  - `PillarData`: LRP metrics data.
  - `UploadLog`: File upload state logs.

#### 4. [pdfServices.js](file:///c:/Users/dellb/Desktop/LRP-PUNE-BF/backend/src/services/pdfServices.js)
- **Role:** PDF text parsing engine.
- **Details:** Reads file buffers from the system, wraps them as `Uint8Array` data, and invokes the `PDFParse` parser class to extract raw document contents.

#### 5. [aiService.js](file:///c:/Users/dellb/Desktop/LRP-PUNE-BF/backend/src/services/aiService.js)
- **Role:** Google Gemini SDK integration.
- **Details:** Instantiates the official `GoogleGenAI` model client (`gemini-2.5-flash`). Translates parsed PDF strings into structured JSON metrics (conforming to predefined array schemas).

#### 6. [permissions.js](file:///c:/Users/dellb/Desktop/LRP-PUNE-BF/backend/src/config/permissions.js)
- **Role:** Authorization matrix definition.
- **Details:** Configures permissions (like `UPLOAD_FILES` or `UPDATE_METRICS`) for different user roles (`SUPER_ADMIN`, `ADMIN1`, `ADMIN2`, `DEVELOPER`) and provides validation helpers.
