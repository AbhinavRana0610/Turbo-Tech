import { Link } from 'react-router-dom'
import { company, products } from '../data/products'
import { Wordmark } from './Navbar'
import { Arrow } from './ui'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative mt-[clamp(4rem,10vw,9rem)] border-t border-ink/10 bg-white/70">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-brand/70 to-transparent" />

      <div className="shell grid gap-[clamp(2rem,4vw,3.5rem)] py-[clamp(2.5rem,6vw,5rem)] md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        {/* Brand */}
        <div>
          <Link to="/" className="flex items-center gap-2.5">
            <img src="/assets/logo-mark.png" alt="" className="h-11 w-auto" width="434" height="455" />
            <Wordmark />
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-500 pretty">
            {company.tagline}. Pigments, mould release agents, in-mould coatings, EVA &amp; PVC
            compounds and process solvents — manufactured in Delhi, India.
          </p>
          <p className="mt-5 font-display text-sm font-semibold text-blue-brand/90">
            “{company.motto}”
          </p>
        </div>

        {/* Products */}
        <nav aria-label="Products">
          <h3 className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-ink">Products</h3>
          <ul className="mt-4 space-y-2.5">
            {products.slice(0, 5).map((p) => (
              <li key={p.slug}>
                <Link
                  to={`/products/${p.slug}`}
                  className="text-sm text-slate-500 transition-colors duration-300 hover:text-blue-brand"
                >
                  {p.short}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/products?c=solvents" className="text-sm text-slate-500 transition-colors hover:text-blue-brand">
                Solvents &amp; Auxiliaries
              </Link>
            </li>
          </ul>
        </nav>

        {/* Company */}
        <nav aria-label="Company">
          <h3 className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-ink">Company</h3>
          <ul className="mt-4 space-y-2.5">
            {[
              { to: '/about', label: 'About Us' },
              { to: '/products', label: 'All Products' },
              { to: '/contact', label: 'Contact' },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-sm text-slate-500 transition-colors hover:text-blue-brand">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="/assets/turbotech-brochure.pdf"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-blue-brand"
              >
                Download Brochure <Arrow className="h-3.5 w-3.5" />
              </a>
            </li>
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <h3 className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-ink">Get in touch</h3>
          <address className="mt-4 space-y-3 text-sm not-italic text-slate-500">
            <p className="leading-relaxed">
              {company.address.line1}
              <br />
              {company.address.line2}
              <br />
              {company.address.city} — {company.address.pin}
            </p>
            <p className="flex flex-wrap gap-x-3 gap-y-1">
              {company.phones.slice(0, 2).map((p) => (
                <a key={p} href={`tel:${p.replace(/\s/g, '')}`} className="transition-colors hover:text-blue-brand">
                  {p}
                </a>
              ))}
            </p>
            <a
              href={`mailto:${company.email}`}
              className="block break-all transition-colors hover:text-blue-brand"
            >
              {company.email}
            </a>
          </address>
        </div>
      </div>

      <div className="shell flex flex-col items-center justify-between gap-3 border-t border-ink/8 py-6 text-center text-xs text-slate-500 sm:flex-row sm:text-left">
        <p>
          © {year} {company.legal}. All rights reserved.
        </p>
        <p className="tracking-wide">
          GSTIN <span className="text-slate-500">{company.gstin}</span>
        </p>
      </div>
    </footer>
  )
}
