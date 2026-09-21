import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'motion/react'
import { Arrow, Button, Card, Eyebrow, Reveal, Stagger, stagItem } from '../components/ui'
import { categories, productBySlug, products } from '../data/products'

function Check({ color }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="mt-0.5 h-4 w-4 shrink-0" style={{ color }} aria-hidden="true">
      <path d="m5 13 4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function ProductDetail() {
  const { slug } = useParams()
  const p = productBySlug(slug)

  if (!p) return <Navigate to="/products" replace />

  const cat = categories.find((c) => c.id === p.category)
  const idx = products.findIndex((x) => x.slug === p.slug)
  const next = products[(idx + 1) % products.length]

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-[clamp(6.5rem,14vw,10rem)] pb-[clamp(2rem,5vw,4rem)]">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[38rem] w-[min(92vw,60rem)] -translate-x-1/2 rounded-full opacity-45 blur-[90px]"
          style={{ background: `radial-gradient(circle, ${p.accent}55, transparent 68%)` }}
        />

        <div className="shell relative">
          <Reveal>
            <Link
              to={`/products${p.category ? `?c=${p.category}` : ''}`}
              className="group inline-flex items-center gap-1.5 text-[0.78rem] font-semibold text-slate-500 transition-colors hover:text-blue-brand"
            >
              <Arrow className="h-3.5 w-3.5 rotate-180 group-hover:-translate-x-1" />
              Back to {cat?.label ?? 'products'}
            </Link>
          </Reveal>

          <div className="mt-6 grid items-start gap-[clamp(1.5rem,4vw,3.5rem)] lg:grid-cols-[1.35fr_1fr]">
            <div>
              <Reveal delay={0.05}>
                <Eyebrow>{cat?.label}</Eyebrow>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="mt-5 font-display text-[clamp(1.85rem,6.5vw,4.25rem)] font-extrabold leading-[1.04] tracking-[-0.02em] balance">
                  {p.name}
                </h1>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-3 font-display text-[clamp(0.95rem,1.2vw,1.3rem)] font-semibold" style={{ color: p.accent }}>
                  {p.tagline}
                </p>
              </Reveal>
              <Reveal delay={0.22}>
                <p className="mt-5 max-w-2xl text-[clamp(0.9rem,0.6vw+0.8rem,1.12rem)] leading-relaxed text-slate-600/85 pretty">
                  {p.summary}
                </p>
              </Reveal>
              <Reveal delay={0.28}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button to="/contact">
                    Enquire about {p.short} <Arrow />
                  </Button>
                  <Button href="/assets/turbotech-brochure.pdf" target="_blank" rel="noreferrer" variant="ghost">
                    Download brochure
                  </Button>
                </div>
              </Reveal>
            </div>

            {/* Product photo */}
            <Reveal delay={0.2}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-ink/10 shadow-[0_30px_70px_-35px_rgba(10,31,68,0.45)] lg:aspect-square">
                <motion.img
                  src={p.image}
                  alt={p.name}
                  initial={{ scale: 1.12 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div
                  className="absolute inset-0 mix-blend-multiply"
                  style={{ background: `linear-gradient(160deg, transparent 40%, ${p.accent}55)` }}
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/55 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-[clamp(1rem,2.5vw,1.6rem)]">
                  <span className="font-display text-[clamp(1.4rem,5vw,2.6rem)] font-extrabold tracking-tight text-white drop-shadow-[0_2px_22px_rgba(0,0,0,0.5)]">
                    {p.short}
                  </span>
                  <span className="mb-1 shrink-0 rounded-full bg-black/35 px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur">
                    Turbotech
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Features */}
      {p.features && (
        <section className="shell py-[clamp(2rem,6vw,5rem)]">
          <Reveal>
            <h2 className="font-display text-[clamp(1.35rem,3vw,2.4rem)] font-extrabold tracking-tight">
              Key <span className="text-gradient">properties</span>
            </h2>
          </Reveal>
          <Stagger className="mt-[clamp(1.5rem,3vw,2.5rem)] grid gap-3 min-[560px]:grid-cols-2 xl:grid-cols-3" gap={0.05}>
            {p.features.map((f) => (
              <motion.div key={f.title} variants={stagItem}>
                <Card accent={p.accent} className="h-full p-[clamp(1rem,1.8vw,1.5rem)]">
                  <div className="flex gap-2.5">
                    <Check color={p.accent} />
                    <div>
                      <h3 className="font-display text-[clamp(0.88rem,0.5vw+0.78rem,1.02rem)] font-bold leading-snug text-ink">{f.title}</h3>
                      <p className="mt-1.5 text-[clamp(0.76rem,0.3vw+0.7rem,0.87rem)] leading-relaxed text-slate-500 pretty">{f.desc}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </Stagger>
        </section>
      )}

      {/* Variants */}
      {p.variants && (
        <section className="shell py-[clamp(2rem,6vw,5rem)]">
          <Reveal>
            <h2 className="font-display text-[clamp(1.35rem,3vw,2.4rem)] font-extrabold tracking-tight">
              Available <span className="text-gradient">types</span>
            </h2>
          </Reveal>
          <Stagger className="mt-[clamp(1.5rem,3vw,2.5rem)] grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {p.variants.map((v) => (
              <motion.div key={v.name} variants={stagItem}>
                <Card accent={p.accent} className="h-full p-[clamp(1.15rem,2.2vw,1.9rem)]">
                  <h3 className="font-display text-[clamp(0.98rem,1vw+0.76rem,1.2rem)] font-bold leading-snug text-ink">{v.name}</h3>
                  <ul className="mt-4 space-y-2.5">
                    {v.points.map((pt) => (
                      <li key={pt} className="flex gap-2.5 text-[clamp(0.78rem,0.32vw+0.72rem,0.88rem)] leading-relaxed text-slate-600/90">
                        <Check color={p.accent} />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </Stagger>
        </section>
      )}

      {/* Checklist (release agents) */}
      {p.checklist && (
        <section className="shell py-[clamp(2rem,6vw,5rem)]">
          <Reveal>
            <div className="glass overflow-hidden rounded-2xl p-[clamp(1.25rem,3vw,2.75rem)]">
              <h2 className="font-display text-[clamp(1.1rem,2.2vw,1.85rem)] font-extrabold tracking-tight text-ink balance">
                {p.checklist.title}
              </h2>
              <ul className="mt-6 grid gap-3 min-[560px]:grid-cols-2">
                {p.checklist.points.map((pt) => (
                  <li key={pt} className="flex gap-2.5 text-[clamp(0.8rem,0.35vw+0.74rem,0.94rem)] leading-relaxed text-slate-600/90">
                    <Check color={p.accent} />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </section>
      )}

      {/* Applications */}
      {p.applications && (
        <section className="shell py-[clamp(2rem,6vw,5rem)]">
          <Reveal>
            <h2 className="font-display text-[clamp(1.35rem,3vw,2.4rem)] font-extrabold tracking-tight">
              Typical <span className="text-gradient">applications</span>
            </h2>
          </Reveal>
          <Stagger className="mt-[clamp(1.5rem,3vw,2.5rem)] flex flex-wrap gap-2.5" gap={0.05}>
            {p.applications.map((a) => (
              <motion.span
                key={a}
                variants={stagItem}
                className="glass rounded-full px-[clamp(0.85rem,1.6vw,1.35rem)] py-[clamp(0.5rem,0.9vw,0.75rem)] text-[clamp(0.76rem,0.35vw+0.7rem,0.9rem)] font-medium text-slate-700 transition-colors duration-300 hover:border-ink/30 hover:text-ink"
              >
                {a}
              </motion.span>
            ))}
          </Stagger>
        </section>
      )}

      {/* Next product + CTA */}
      <section className="shell py-[clamp(2rem,5vw,4rem)]">
        <Reveal>
          <div className="glass flex flex-col gap-6 rounded-2xl p-[clamp(1.25rem,3vw,2.5rem)] md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Next product</p>
              <Link
                to={`/products/${next.slug}`}
                className="group mt-2 inline-flex items-center gap-3 font-display text-[clamp(1.15rem,3vw,2rem)] font-extrabold tracking-tight text-ink transition-colors hover:text-blue-brand"
              >
                {next.name}
                <Arrow className="h-5 w-5" />
              </Link>
            </div>
            <Button to="/contact" variant="pink" className="shrink-0">
              Request a sample <Arrow />
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  )
}
