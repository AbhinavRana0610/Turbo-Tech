import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Arrow, Button, Card, Eyebrow, Reveal, SectionHeading, Stagger, stagItem } from '../components/ui'
import { company, industries } from '../data/products'

const VALUES = [
  {
    t: 'Consistency batch to batch',
    d: 'A shade that drifts between drums costs a factory more than the drum did. Our dispersions are made to repeat.',
    c: '#00bffe',
  },
  {
    t: 'Formulated for the line',
    d: 'We pick grades against your polyol, your mould temperature and your cycle time — not off a generic spec sheet.',
    c: '#fc0065',
  },
  {
    t: 'Compliance built in',
    d: 'Phthalate-free formulations aligned with REACH, RoHS and CPSIA, so an export order never stalls on chemistry.',
    c: '#5ad6ff',
  },
  {
    t: 'A number that answers',
    d: 'When a trial goes wrong at 11pm, technical help is a phone call away, not a ticket in a queue.',
    c: '#00d6a8',
  },
]

const CAPABILITIES = [
  { t: 'Colourants', d: 'Organic, inorganic and anti-static pigments for PU systems.' },
  { t: 'Mould Release', d: 'Solvent and water based, gloss and matt, multi-release grades.' },
  { t: 'In-Mould Coatings', d: 'Abrasion and scratch resistant finishes bonded during cure.' },
  { t: 'Compounds', d: 'EVA and PVC compounds for soles, midsoles and mouldings.' },
  { t: 'Solvents & Auxiliaries', d: 'MCL, Hardener, DMF, Mould Cleaner and BC.' },
]

/* The certificate section (details, links and the certificate) in a popup. Locks the page behind it (Lenis too), closes on
   Escape, the backdrop or the close button. */
function CertificateModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return
    const root = document.documentElement
    root.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    window.__lenis?.stop()
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      root.style.overflow = ''
      document.body.style.overflow = ''
      window.__lenis?.start()
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="certificate"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="GST registration certificate"
        >
          <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            data-lenis-prevent
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-h-[92dvh] w-full max-w-5xl overflow-y-auto overscroll-contain rounded-2xl lg:flex lg:overflow-hidden bg-white shadow-[0_30px_80px_-30px_rgba(10,31,68,0.7)]"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close certificate"
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-500 shadow transition-colors hover:text-ink"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            {/* Details. Side by side with the certificate from lg up, so the whole
                popup fits the screen; stacked (certificate below) on smaller screens. */}
            <div className="flex flex-col items-start justify-center p-[clamp(1.25rem,3vw,2.25rem)] lg:min-w-0 lg:flex-1 lg:overflow-y-auto">
              <Eyebrow>Certified</Eyebrow>
              <h2 className="mt-4 pr-10 font-display text-[clamp(1.4rem,2.6vw,2rem)] font-extrabold leading-[1.08] tracking-tight balance">
                Registered, on record, <span className="text-gradient">easy to verify.</span>
              </h2>
              <p className="mt-3 text-[clamp(0.88rem,0.4vw+0.8rem,1rem)] leading-relaxed text-slate-600/85 pretty">
                {`${company.legal} is registered under the Goods and Services Tax Act, 2017. The registration certificate is below — check the GSTIN against the government portal before you place your first order.`}
              </p>

              <div className="mt-6 grid w-full gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/8 min-[480px]:grid-cols-2">
                {[
                  { k: 'GSTIN', v: company.gstin },
                  { k: 'Trade name', v: company.legal },
                  { k: 'Registered from', v: company.gstRegisteredFrom },
                  { k: 'Registration type', v: `${company.gstType} · ${company.constitution}` },
                ].map((f) => (
                  <div key={f.k} className="bg-white/90 p-[clamp(0.9rem,1.8vw,1.25rem)]">
                    <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-slate-500">{f.k}</p>
                    <p className="mt-1.5 font-display text-[clamp(0.9rem,0.6vw+0.75rem,1.08rem)] font-bold break-words text-ink">{f.v}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button href="/assets/certificates/gst-registration-certificate.pdf" target="_blank" rel="noreferrer">
                  View certificate <Arrow />
                </Button>
                <Button
                  href="https://services.gst.gov.in/services/searchtp"
                  target="_blank"
                  rel="noreferrer"
                  variant="ghost"
                >
                  Verify on GST portal
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-center bg-ink/[0.04] p-4 lg:order-first lg:shrink-0 lg:p-5">
              <img
                src="/assets/certificates/gst-certificate.webp"
                alt="GST registration certificate (Form GST REG-06) for Nirmal Industries"
                decoding="async"
                className="aspect-[1100/1557] w-full max-w-md rounded-lg border border-ink/10 bg-white object-contain shadow-[0_18px_40px_-24px_rgba(10,31,68,0.5)] lg:h-[calc(92dvh-2.5rem)] lg:w-auto lg:max-w-none"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function About() {
  const [certOpen, setCertOpen] = useState(false)
  const closeCert = () => setCertOpen(false)

  return (
    <>
      <CertificateModal open={certOpen} onClose={closeCert} />
      {/* Hero */}
      <section className="shell grid items-center gap-[clamp(2rem,5vw,4rem)] pt-[clamp(5.04rem,10.8vw,7.92rem)] pb-[clamp(2rem,5vw,4rem)] lg:grid-cols-[1.1fr_0.9fr]">
        <div>
        <Reveal>
          <Eyebrow>About us</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <h1 className="mt-5 max-w-4xl font-display text-[clamp(1.9rem,6.5vw,4.25rem)] font-extrabold leading-[1.04] tracking-[-0.02em] balance">
            We make the chemistry that{' '}
            <span className="text-gradient">footwear is finished with.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-6 max-w-2xl text-[clamp(0.92rem,0.6vw+0.82rem,1.15rem)] leading-relaxed text-slate-600/85 pretty">
            Turbotech is the chemicals brand of <strong className="text-ink">{company.legal}</strong>,
            a {company.constitution.toLowerCase()} based in Singhola, Delhi. We supply pigments,
            mould release agents, in-mould coatings, EVA and PVC compounds and process solvents to
            manufacturers working in polyurethane, PVC and EVA footwear.
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button to="/products">
              See the range <Arrow />
            </Button>
            <Button href="/assets/turbotech-brochure.pdf" target="_blank" rel="noreferrer" variant="ghost">
              Download brochure
            </Button>
            <Button type="button" onClick={() => setCertOpen(true)} variant="ghost">
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-blue-brand" aria-hidden="true">
                <path d="M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6l-7-3Z M8.8 12.2l2.2 2.2 4.4-4.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              View Certificate
            </Button>
          </div>
        </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="relative overflow-hidden rounded-[clamp(1rem,2vw,1.75rem)] border border-ink/10 shadow-[0_30px_70px_-35px_rgba(10,31,68,0.45)]">
            <img
              src="/assets/img/about-factory.webp"
              alt="A clean moulding shop floor with rows of machines"
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-deep/30 via-transparent to-transparent" />
          </div>
        </Reveal>
      </section>

      {/* Facts strip */}
      <section className="shell py-[clamp(2rem,5vw,4rem)]">
        <Reveal>
          <div className="glass grid gap-px overflow-hidden rounded-2xl sm:grid-cols-2 lg:grid-cols-4">
            {[
              { k: 'Trade name', v: company.legal },
              { k: 'Constitution', v: company.constitution },
              { k: 'Proprietor', v: company.proprietor },
              { k: 'GSTIN', v: company.gstin },
            ].map((f) => (
              <div key={f.k} className="bg-ink/[0.02] p-[clamp(1rem,2.2vw,1.75rem)]">
                <p className="text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-slate-500">{f.k}</p>
                <p className="mt-2 font-display text-[clamp(0.9rem,0.8vw+0.74rem,1.15rem)] font-bold break-words text-ink">
                  {f.v}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Photo band */}
      <section className="shell py-[clamp(1rem,3vw,2rem)]">
        <div className="grid gap-4 md:grid-cols-[1.4fr_1fr]">
          {[
            { src: '/assets/img/about-supply.webp', alt: 'Pallets of packed material sacks ready for dispatch', cap: 'Packed, labelled and dispatched from Delhi' },
            { src: '/assets/img/story-lab.webp', alt: 'Chemist pipetting samples into test tubes', cap: 'Grades matched to your system' },
          ].map((im, i) => (
            <Reveal key={im.src} delay={i * 0.08}>
              <figure className="group relative h-full min-h-[14rem] overflow-hidden rounded-2xl border border-ink/10">
                <img
                  src={im.src}
                  alt={im.alt}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
                <figcaption className="absolute bottom-0 left-0 p-5 font-display text-[clamp(0.95rem,1vw+0.7rem,1.2rem)] font-bold text-white">
                  {im.cap}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="shell py-[clamp(3rem,8vw,7rem)]">
        <div className="grid gap-[clamp(2rem,5vw,4rem)] lg:grid-cols-[1fr_0.85fr]">
          <div>
            <SectionHeading
              eyebrow="Our approach"
              title={<>A sole is only as good as the <span className="text-gradient">last step.</span></>}
            />
            <div className="mt-6 space-y-5 text-[clamp(0.88rem,0.5vw+0.78rem,1.05rem)] leading-relaxed text-slate-600/85 pretty">
              <p>
                A polyurethane sole passes through a lot of chemistry before it leaves the factory.
                The mould has to release cleanly. The coating has to bond while the part is still
                curing. The pigment has to hold its shade through heat, sunlight and a year of wear.
                Any one of those going wrong shows up as a reject.
              </p>
              <p>
                Turbotech exists to supply all of it from one place, matched to each other. Our
                release agents are formulated to stay compatible with our in-mould coatings. Our
                pigments are dispersed so they do not interfere with the cure. The point is not a
                longer catalogue — it is fewer variables on your line.
              </p>
              <p className="font-display text-[clamp(1rem,1.6vw,1.4rem)] font-bold leading-snug text-ink">
                “{company.motto}.”
              </p>
            </div>
          </div>

          {/* Capabilities list */}
          <Reveal delay={0.12}>
            <div className="glass rounded-2xl p-[clamp(1.25rem,2.5vw,2rem)]">
              <h3 className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
                What we manufacture
              </h3>
              <ul className="mt-5 divide-y divide-ink/8">
                {CAPABILITIES.map((c, i) => (
                  <li key={c.t} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                    <span className="font-display text-[0.7rem] font-bold text-cyan-brand/70">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <p className="font-display text-[clamp(0.88rem,0.5vw+0.78rem,1rem)] font-bold text-ink">{c.t}</p>
                      <p className="mt-1 text-[clamp(0.75rem,0.3vw+0.7rem,0.85rem)] leading-relaxed text-slate-500">{c.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="shell py-[clamp(3rem,8vw,7rem)]">
        <SectionHeading
          eyebrow="What we hold to"
          align="center"
          title={<>Four things we do not <span className="text-gradient">compromise on.</span></>}
        />
        <Stagger className="mt-[clamp(2rem,4vw,3.5rem)] grid gap-4 min-[600px]:grid-cols-2">
          {VALUES.map((v) => (
            <motion.div key={v.t} variants={stagItem}>
              <Card accent={v.c} className="h-full p-[clamp(1.25rem,2.4vw,2rem)]">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-500 group-hover:scale-110"
                  style={{ background: `${v.c}22`, boxShadow: `inset 0 0 0 1px ${v.c}55` }}
                >
                  <span className="h-3 w-3 rounded-full" style={{ background: v.c }} />
                </span>
                <h3 className="mt-5 font-display text-[clamp(1rem,1.1vw+0.76rem,1.3rem)] font-bold leading-snug text-ink balance">
                  {v.t}
                </h3>
                <p className="mt-2.5 text-[clamp(0.8rem,0.35vw+0.74rem,0.94rem)] leading-relaxed text-slate-500 pretty">
                  {v.d}
                </p>
              </Card>
            </motion.div>
          ))}
        </Stagger>
      </section>

      {/* Industries */}
      <section className="shell py-[clamp(3rem,8vw,7rem)]">
        <SectionHeading
          eyebrow="Who we supply"
          title={<>Six industries, <span className="text-gradient">one chemistry set.</span></>}
        />
        <Stagger className="mt-[clamp(2rem,4vw,3rem)] grid gap-3 min-[560px]:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, i) => (
            <motion.div key={ind.title} variants={stagItem}>
              <Card accent={i % 2 ? '#fc0065' : '#00bffe'} className="h-full p-[clamp(1.1rem,2vw,1.6rem)]">
                <h3 className="font-display text-[clamp(0.92rem,0.8vw+0.74rem,1.12rem)] font-bold leading-snug text-ink">
                  {ind.title}
                </h3>
                <p className="mt-2 text-[clamp(0.76rem,0.32vw+0.7rem,0.87rem)] leading-relaxed text-slate-500 pretty">
                  {ind.desc}
                </p>
              </Card>
            </motion.div>
          ))}
        </Stagger>
      </section>

      {/* Location + CTA */}
      <section className="shell py-[clamp(2rem,5vw,4rem)]">
        <Reveal>
          <div className="glass grid overflow-hidden rounded-2xl lg:grid-cols-2">
            <div className="p-[clamp(1.25rem,3vw,3rem)]">
              <Eyebrow>Our works</Eyebrow>
              <h2 className="mt-5 font-display text-[clamp(1.25rem,2.8vw,2.2rem)] font-extrabold leading-tight tracking-tight balance">
                Singhola, North Delhi.
              </h2>
              <address className="mt-4 text-[clamp(0.85rem,0.45vw+0.76rem,1rem)] not-italic leading-relaxed text-slate-600/85">
                {company.address.line1}
                <br />
                {company.address.line2}
                <br />
                {company.address.city} — {company.address.pin}
                <br />
                {company.address.country}
              </address>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button to="/contact">
                  Contact us <Arrow />
                </Button>
                <Button
                  href="https://www.google.com/maps/search/?api=1&query=Plot+No+128+Khasra+No+69+Village+Singhola+Delhi+110040"
                  target="_blank"
                  rel="noreferrer"
                  variant="ghost"
                >
                  Open in Maps
                </Button>
              </div>
            </div>
            <div className="relative min-h-[14rem] overflow-hidden border-t border-ink/10 lg:border-l lg:border-t-0">
              <iframe
                title="Turbotech works location"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full saturate-[0.85]"
                src="https://www.google.com/maps?q=Village%20Singhola%2C%20Delhi%20110040&output=embed"
              />
            </div>
          </div>
        </Reveal>
      </section>
    </>
  )
}
