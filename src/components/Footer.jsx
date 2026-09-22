import { Link } from 'react-router-dom'
import { company } from '../data/products'
import { Wordmark } from './Navbar'

/* Footer copy follows section 12 of the homepage content document. */
const QUICK_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/products', label: 'Products' },
  { to: '/#applications', label: 'Applications' },
  { to: '/#why-turbotech', label: 'Why Turbotech' },
  { to: '/brochure', label: 'Resources' },
  { to: '/contact', label: 'Contact Us' },
]

const PRODUCT_LINKS = [
  { to: '/products/pu-pigments', label: 'PU Pigments' },
  { to: '/products/release-agents', label: 'Release Agents' },
  { to: '/products/imc', label: 'IMC' },
  { to: '/products/eva-compound', label: 'EVA Compound' },
  { to: '/products/pvc-compound', label: 'PVC Compound' },
  { to: '/products/solvents', label: 'Specialty Chemicals' },
]

const PHONE = '+91 8130243046'

function Column({ title, links }) {
  return (
    <nav aria-label={title}>
      <h3 className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-ink">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="text-sm text-slate-500 transition-colors duration-300 hover:text-blue-brand">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative mt-[clamp(4rem,10vw,9rem)] border-t border-ink/10 bg-white/70">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-brand/70 to-transparent" />

      <div className="shell grid gap-[clamp(2rem,4vw,3.5rem)] py-[clamp(2.5rem,6vw,5rem)] sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        {/* Brand */}
        <div>
          <Link to="/" className="flex items-center gap-2.5" aria-label="Turbotech home">
            <img src="/assets/logo-mark.png" alt="" className="h-11 w-auto" width="434" height="455" />
            <Wordmark />
          </Link>
          <p className="mt-5 max-w-xs font-display text-sm font-semibold leading-relaxed text-blue-brand pretty">
            A Complete Solution for P.U. PVC &amp; EVA Footwear
          </p>
        </div>

        <Column title="Quick Links" links={QUICK_LINKS} />
        <Column title="Products" links={PRODUCT_LINKS} />

        {/* Contact */}
        <div>
          <h3 className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-ink">Contact</h3>
          <address className="mt-4 space-y-3 text-sm not-italic text-slate-500">
            <p className="leading-relaxed">Plot No. 128, Khasra No. 69, Village Singhola, Delhi – 110040</p>
            <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="block transition-colors hover:text-blue-brand">
              {PHONE}
            </a>
            <a href={`mailto:${company.email}`} className="block break-all transition-colors hover:text-blue-brand">
              {company.email}
            </a>
          </address>
        </div>
      </div>

      <div className="shell border-t border-ink/8 py-6 text-center text-xs text-slate-500 sm:text-left">
        <p>© {year} Nirmal Industries. All Rights Reserved.</p>
      </div>
    </footer>
  )
}
