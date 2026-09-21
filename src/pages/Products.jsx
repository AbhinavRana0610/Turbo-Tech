import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { Arrow, CardImage, Button, Card, Eyebrow, Reveal } from '../components/ui'
import { categories, products } from '../data/products'

export default function Products() {
  const [params, setParams] = useSearchParams()
  const active = params.get('c') ?? 'all'

  const list = useMemo(
    () => (active === 'all' ? products : products.filter((p) => p.category === active)),
    [active]
  )

  const setCat = (id) => {
    if (id === 'all') setParams({}, { replace: true })
    else setParams({ c: id }, { replace: true })
  }

  const tabs = [{ id: 'all', label: 'All Products' }, ...categories]

  return (
    <>
      {/* Header */}
      <section className="shell pt-[clamp(7rem,15vw,11rem)] pb-[clamp(1.5rem,4vw,3rem)]">
        <Reveal>
          <Eyebrow>Catalogue</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <h1 className="mt-5 max-w-4xl font-display text-[clamp(1.9rem,6.5vw,4.25rem)] font-extrabold leading-[1.04] tracking-[-0.02em] balance">
            The complete <span className="text-gradient">P.U., PVC &amp; EVA</span> chemical range.
          </h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-5 max-w-2xl text-[clamp(0.9rem,0.6vw+0.8rem,1.1rem)] leading-relaxed text-slate-600/85 pretty">
            Ten products across five categories — pigments, mould release agents, in-mould
            coatings, compounds and the solvents that keep a footwear line moving.
          </p>
        </Reveal>
      </section>

      {/* Filter tabs */}
      <section className="shell sticky top-[clamp(3.5rem,8vw,5rem)] z-30 py-3">
        <div className="glass flex gap-1.5 overflow-x-auto rounded-full p-1.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {tabs.map((t) => {
            const on = active === t.id
            return (
              <button
                key={t.id}
                onClick={() => setCat(t.id)}
                className={`relative shrink-0 rounded-full px-[clamp(0.75rem,1.6vw,1.2rem)] py-2 text-[clamp(0.7rem,0.35vw+0.64rem,0.84rem)] font-semibold whitespace-nowrap transition-colors duration-300 ${
                  on ? 'text-navy-ink' : 'text-slate-600 hover:text-ink'
                }`}
              >
                {on && (
                  <motion.span
                    layoutId="cat-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-brand to-cyan-soft"
                    transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                  />
                )}
                <span className="relative z-10">{t.label}</span>
              </button>
            )
          })}
        </div>
      </section>

      {/* Grid */}
      <section className="shell pb-[clamp(3rem,8vw,7rem)] pt-[clamp(1rem,2.5vw,2rem)]">
        <motion.div layout className="grid gap-4 min-[620px]:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((p) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, scale: 0.94, y: 18 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: -12 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link to={`/products/${p.slug}`} className="block h-full">
                  <Card accent={p.accent} className="flex h-full flex-col">
                    <CardImage src={p.image} alt={p.name} />
                    <div className="p-[clamp(1.15rem,2.2vw,1.9rem)]">
                    <div className="flex items-start justify-between gap-3">
                      <span
                        className="inline-flex rounded-full px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-[0.16em]"
                        style={{ background: `${p.accent}22`, color: p.accent }}
                      >
                        {categories.find((c) => c.id === p.category)?.label}
                      </span>
                      <span
                        className="h-8 w-8 shrink-0 rounded-full transition-transform duration-500 group-hover:scale-125"
                        style={{ background: p.accent, boxShadow: `0 0 26px -4px ${p.accent}` }}
                      />
                    </div>

                    <h2 className="mt-5 font-display text-[clamp(1.05rem,1.4vw,1.5rem)] font-bold leading-tight text-ink">
                      {p.name}
                    </h2>
                    <p className="mt-1.5 text-[0.78rem] font-medium text-blue-brand/80">{p.tagline}</p>
                    <p className="mt-3 flex-1 text-[clamp(0.8rem,0.35vw+0.72rem,0.92rem)] leading-relaxed text-slate-500 pretty">
                      {p.summary}
                    </p>

                    {p.features && (
                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {p.features.slice(0, 3).map((f) => (
                          <span key={f.title} className="rounded-full border border-ink/10 bg-ink/5 px-2.5 py-1 text-[0.66rem] font-medium text-slate-600">
                            {f.title}
                          </span>
                        ))}
                        {p.features.length > 3 && (
                          <span className="rounded-full border border-ink/10 bg-ink/5 px-2.5 py-1 text-[0.66rem] font-medium text-slate-500">
                            +{p.features.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    <span className="mt-5 inline-flex items-center gap-1.5 text-[0.78rem] font-semibold text-blue-brand">
                      View details <Arrow className="h-3.5 w-3.5" />
                    </span>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Enquiry strip */}
        <Reveal className="mt-[clamp(2.5rem,5vw,4rem)]">
          <div className="glass flex flex-col items-center justify-between gap-5 rounded-2xl p-[clamp(1.25rem,3vw,2.5rem)] text-center sm:flex-row sm:text-left">
            <div>
              <h2 className="font-display text-[clamp(1.05rem,1.6vw,1.5rem)] font-bold text-ink">
                Need a technical data sheet or a shade card?
              </h2>
              <p className="mt-1.5 text-[clamp(0.8rem,0.4vw+0.72rem,0.92rem)] text-slate-500">
                Tell us the product and the system you are running — we will send the TDS and packing options.
              </p>
            </div>
            <Button to="/contact" className="shrink-0">
              Request TDS <Arrow />
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  )
}
