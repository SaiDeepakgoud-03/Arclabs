# ARC LABS Website — Component-Based React App

## Folder Structure

```
arclabs-app/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx                    ← Entry point (imports global CSS)
    ├── App.jsx                     ← React Router — all routes here
    │
    ├── styles/                     ← ALL CSS files (one per page/component)
    │   ├── global.css              ← Design tokens, resets, shared animations
    │   ├── Navbar.css
    │   ├── Footer.css
    │   ├── Home.css
    │   ├── Programs.css            ← Extract from ProgramsPage.jsx
    │   ├── Products.css            ← Extract from ProductsPage.jsx
    │   ├── LabPackages.css         ← Extract from LabPackagesPage.jsx
    │   ├── CSRPartners.css         ← Extract from CSRPartnersPage.jsx
    │   └── Certification.css
    │
    ├── data/
    │   └── constants.js            ← All shared data: technologies, states, etc.
    │
    ├── utils/
    │   └── helpers.js              ← Pure functions: cert ID, pincode, dates
    │
    ├── components/                 ← Reusable components
    │   ├── Navbar.jsx
    │   ├── Footer.jsx
    │   ├── CertificateCard.jsx     ← Printable certificate display
    │   ├── VerifyPanel.jsx         ← Certificate ID lookup
    │   └── RegisterPanel.jsx       ← 3-step registration form
    │
    └── pages/                      ← One file per route
        ├── Home.jsx
        ├── Programs.jsx
        ├── Products.jsx
        ├── LabPackages.jsx
        ├── CSRPartners.jsx
        └── Certification.jsx
```

## Quick Start

```bash
cd arclabs-app
npm install
npm run dev
# App opens at http://localhost:3000
```

## Routes

| URL            | Page           |
|----------------|----------------|
| `/`            | Home           |
| `/programs`    | Programs       |
| `/products`    | Products       |
| `/lab-packages`| Lab Packages   |
| `/csr-partners`| CSR Partners   |
| `/verify`      | Certification  |

## How to Add Programs / Products / CSR Pages

Each of those 3 pages has its full content in the original files:
- `arclabs-website/ProgramsPage.jsx`
- `arclabs-website/ProductsPage.jsx`
- `arclabs-website/LabPackagesPage.jsx`
- `arclabs-website/CSRPartnersPage.jsx`

**Steps to migrate each:**

1. Open the old file (e.g. `ProductsPage.jsx`)
2. Find the `const css = \`...\`` string at the top
3. Paste that CSS content into a new file: `src/styles/Products.css`
4. In the page file (`src/pages/Products.jsx`):
   - Remove the `const css = ...` variable
   - Remove the `<style>{css}</style>` line
   - Add at top: `import "../styles/Products.css";`
   - Copy all the sub-functions and the main export from the old file
5. Remove any `<style>` or inline css injection

## Key Design Tokens (global.css)

```css
--teal:   #00E8D4   /* primary accent */
--lime:   #7DFF6B   /* success, verified */
--gold:   #FFD166   /* warnings, CSR */
--violet: #A855F7   /* institution type */
--rose:   #FF5C87   /* errors, required */
--amber:  #FFA843   /* basic performance */
--fog:    #7878A0   /* secondary text */
--mist:   #AAABCC   /* tertiary text */
```

## Certification System

- **Register**: 3-step form → generates `ARC` + 4 random chars (e.g. `ARC7K9P`)
- **Verify**: Lookup by certificate ID → renders full digital certificate
- **Storage**: `localStorage` (`arclabs_certs`) — persists across sessions
- **Pincode**: Auto-fetches city/state from India Post API with local map fallback
- **Demo IDs**: `ARC4F2K`, `ARC7K9P`, `ARCM3XQ`
