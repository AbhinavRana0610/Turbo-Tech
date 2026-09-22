# Turbotech — website

Front-end for **Turbotech by Nirmal Industries**, built from the company brochure.
React + Vite, no backend.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle in dist/
npm run preview  # serve the built bundle
```

`dist/` is a static folder — it can be hosted on Netlify, Vercel, Cloudflare Pages,
GitHub Pages or any normal web server.

> **One host setting:** this is a single-page app, so the server must serve
> `index.html` for unknown paths, otherwise `/products/imc` 404s on refresh.
> Netlify: add `/*  /index.html  200` to `public/_redirects`. Vercel/Cloudflare do
> it by default. Apache/Nginx: add the usual SPA rewrite.

## Pages

| Route | Page |
| --- | --- |
| `/` | Home — 3D hero, shade swatches, product grid, process, industries |
| `/products` | All 10 products, filterable by category (`?c=colourants` etc.) |
| `/products/:slug` | Product pages — PU Pigments, Release Agents, IMC, EVA Compound, PVC Compound, Solvents (`/products/mcl` etc. jump to their card on the Solvents page) |
| `/about` | About Nirmal Industries |
| `/contact` | Enquiry form, phone/WhatsApp/email, map |

## Where the content lives

Everything the site says about products and the company is in one file:

**`src/data/products.js`** — the 10 products, 5 categories, the industries list and
the company block (address, phones, email, GSTIN). Edit there and every page,
the footer and the contact dropdown update together.

**`src/data/productPages.js`** — the full copy of the six product pages, word for word
from the product-page content doc (one tab per product). `src/pages/ProductPage.jsx`
only decides layout and animation; change wording in the data file.

## The 3D slipper

`src/three/Slipper.jsx` builds the sole in code — an extruded foot-shaped outline,
an inset footbed and a strap swept along a curve. Nothing is downloaded at
runtime, so the hero never waits on a model file.

As the visitor scrolls, the sole blends through the pigment palette
(white → cyan → blue → magenta → green → violet), which is the brochure line
*"Everything is white before it's coloured"* made literal.

It drops to a lower-quality setting on small screens, low-core devices, and when
the visitor has "reduce motion" turned on.

## Brand

Colours are sampled from the logo and defined once in `src/styles/index.css`:

| Token | Value |
| --- | --- |
| `cyan-brand` | `#00bffe` |
| `blue-brand` | `#0072ce` |
| `blue-deep` | `#004da5` |
| `magenta` | `#fc0065` |
| `navy-ink` | `#020a1c` (page background) |

Type: **Sora** for headings, **Inter** for body.

## Responsive

Every page is checked from **300px to 2560px**:

```bash
npm run dev                          # in one terminal
node scripts/responsive-check.mjs    # in another
```

It loads all five routes at ten widths and fails if anything overflows
horizontally, naming the element that caused it. `scripts/shots.mjs` captures
screenshots at chosen widths. Both drive the installed Chrome via
`puppeteer-core` — no browser download.

## Notes for whoever maintains this

- **Contact form has no backend.** It validates in the browser, then opens the
  visitor's mail app or WhatsApp with the enquiry pre-filled. To capture
  submissions instead, point it at Formspree/Web3Forms or your own endpoint —
  the handler is `submit()` in `src/pages/Contact.jsx`.
- **Spellings were corrected** against the print brochure (`HARDNER` → `HARDENER`,
  `miosture` → `moisture`, `cushing` → `cushioning`, `elesticity` → `elasticity`,
  `resistence` → `resistance`, `coatins` → `coatings`).
- **MCL, Hardener, DMF, Mould Cleaner and BC** are named but not described in the
  brochure, so their pages carry deliberately short, factual copy and point to a
  TDS on request. Send real descriptions to fill them out.
- **Product images.** Detail pages currently use a generated accent panel. Drop
  real product photography into `public/assets/` and swap the panel in
  `src/pages/ProductDetail.jsx` when it is available.
