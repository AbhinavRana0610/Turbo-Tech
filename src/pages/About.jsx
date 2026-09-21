import { motion } from 'motion/react'
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

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="shell grid items-center gap-[clamp(2rem,5vw,4rem)] pt-[clamp(7rem,15vw,11rem)] pb-[clamp(2rem,5vw,4rem)] lg:grid-cols-[1.1fr_0.9fr]">
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
