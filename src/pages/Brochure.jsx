import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Arrow, Button, Eyebrow, Reveal } from '../components/ui'

const PDF = '/assets/turbotech-brochure.pdf'

/* The brochure's pages, rendered to images so they display on every device —
   most mobile browsers will not show a PDF inline. */
const PAGES = [
  { src: '/assets/brochure/page-1.webp', t: 'Cover', d: 'The full range at a glance.' },
  { src: '/assets/brochure/page-2.webp', t: 'Pigments & release agents', d: 'Properties, grades and applications.' },
  { src: '/assets/brochure/page-3.webp', t: 'IMC, solvents & compounds', d: 'Coatings, auxiliaries, EVA and PVC.' },
  { src: '/assets/brochure/page-4.webp', t: 'Packing & contact', d: 'Where to reach us.' },
]

/* Third-party lab reports, shown whole: the lab allows reproduction only in full,
   so the cards link to the complete PDFs rather than excerpts. */
const REPORTS = [
  {
    pdf: '/assets/test-reports/bfds-24061130-release-agent.pdf',
    thumb: '/assets/test-reports/bfds-24061130-release-agent.webp',
    t: 'Release Agent',
    colour: 'Transparent',
    no: 'BFDS-24061130',
  },
  {
    pdf: '/assets/test-reports/bfds-24061131-pigment.pdf',
    thumb: '/assets/test-reports/bfds-24061131-pigment.webp',
    t: 'Pigment',
    colour: 'Black',
    no: 'BFDS-24061131',
  },
]
const TESTS = ['Organotin compound', 'Phthalate', 'DMFU', 'Lead content']

export default function Brochure() {
  const [page, setPage] = useState(0)
  const [dir, setDir] = useState(1)

  const go = (i) => {
    const next = (i + PAGES.length) % PAGES.length
    setDir(next > page ? 1 : -1)
    setPage(next)
  }

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') go(page + 1)
      if (e.key === 'ArrowLeft') go(page - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const ctrl =
    'glass flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-ink transition-all duration-300 hover:border-blue-brand/40 hover:bg-white'

  return (
    <>
      {/* Hero */}
      <section className="shell pt-[clamp(7rem,15vw,11rem)] pb-[clamp(1.5rem,4vw,3rem)]">
        <Reveal>
          <Eyebrow>Brochure</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <h1 className="mt-5 max-w-4xl font-display text-[clamp(1.9rem,6.5vw,4.25rem)] font-extrabold leading-[1.04] tracking-[-0.02em] balance">
            The whole range, <span className="text-gradient">on four pages.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-5 max-w-2xl text-[clamp(0.9rem,0.6vw+0.8rem,1.12rem)] leading-relaxed text-slate-600/85 pretty">
            Every Turbotech product with its properties, grades and typical applications. Flip
            through it here, or keep a copy for your purchase and production teams.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={PDF} download="Turbotech-Brochure.pdf">
              Download PDF <Arrow className="rotate-90" />
            </Button>
            <Button href={PDF} target="_blank" rel="noreferrer" variant="ghost">
              Open full PDF
            </Button>
          </div>
        </Reveal>
      </section>

      {/* Viewer */}
      <section className="shell pb-[clamp(3rem,8vw,7rem)] pt-[clamp(1rem,2.5vw,2rem)]">
        <div className="grid gap-[clamp(1.25rem,3vw,2.5rem)] lg:grid-cols-[1fr_17rem]">
          {/* Current page */}
          <Reveal>
            <div className="glass rounded-[clamp(1rem,2vw,1.75rem)] p-[clamp(0.6rem,1.5vw,1.25rem)]">
              <div style={{ perspective: 1200 }} className="relative mx-auto aspect-[1323/1871] max-h-[80vh] overflow-hidden rounded-xl bg-white shadow-[0_30px_70px_-35px_rgba(10,31,68,0.45)]">
                <AnimatePresence initial={false} custom={dir} mode="popLayout">
                  <motion.a
                    key={page}
                    href={PAGES[page].src}
                    target="_blank"
                    rel="noreferrer"
                    custom={dir}
                    variants={{
                      enter: (d) => ({ opacity: 0, x: d * 60, rotateY: d * -12 }),
                      show: { opacity: 1, x: 0, rotateY: 0 },
                      exit: (d) => ({ opacity: 0, x: d * -60, rotateY: d * 12 }),
                    }}
                    initial="enter"
                    animate="show"
                    exit="exit"
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 block cursor-zoom-in"
                    aria-label={`Open page ${page + 1} full size`}
                  >
                    <img
                      src={PAGES[page].src}
                      alt={`Turbotech brochure, page ${page + 1}: ${PAGES[page].t}`}
                      className="h-full w-full object-contain"
                    />
                  </motion.a>
                </AnimatePresence>
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <button type="button" aria-label="Previous page" className={ctrl} onClick={() => go(page - 1)}>
                  <Arrow className="rotate-180" />
                </button>
                <div className="text-center">
                  <p className="font-display text-[clamp(0.9rem,0.6vw+0.75rem,1.05rem)] font-bold text-ink">{PAGES[page].t}</p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    Page {page + 1} of {PAGES.length} · tap to zoom
                  </p>
                </div>
                <button type="button" aria-label="Next page" className={ctrl} onClick={() => go(page + 1)}>
                  <Arrow />
                </button>
              </div>
            </div>
          </Reveal>

          {/* Thumbnails */}
          <Reveal delay={0.1}>
            <div className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] lg:flex-col lg:overflow-visible [&::-webkit-scrollbar]:hidden">
              {PAGES.map((p, i) => (
                <button
                  key={p.src}
                  type="button"
                  onClick={() => go(i)}
                  aria-current={i === page}
                  className={`group flex w-[9.5rem] shrink-0 items-center gap-3 rounded-2xl border p-2 text-left transition-all duration-300 lg:w-full ${
                    i === page
                      ? 'border-blue-brand/40 bg-white shadow-[0_14px_34px_-20px_rgba(0,114,206,0.6)]'
                      : 'border-ink/8 bg-white/50 hover:border-ink/20 hover:bg-white'
                  }`}
                >
                  <img
                    src={p.src}
                    alt=""
                    loading="lazy"
                    className="aspect-[1323/1871] w-12 shrink-0 rounded-md object-cover shadow-sm lg:w-14"
                  />
                  <span className="min-w-0">
                    <span className={`block text-[0.62rem] font-semibold uppercase tracking-[0.16em] ${i === page ? 'text-blue-brand' : 'text-slate-400'}`}>
                      Page {i + 1}
                    </span>
                    <span className="mt-0.5 block font-display text-[0.8rem] font-bold leading-tight text-ink">{p.t}</span>
                    <span className="mt-0.5 hidden text-[0.72rem] leading-snug text-slate-500 lg:block">{p.d}</span>
                  </span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Test reports */}
      <section className="shell pb-[clamp(3rem,8vw,7rem)]">
        <Reveal>
          <Eyebrow>Test reports</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-5 max-w-3xl font-display text-[clamp(1.5rem,4vw,2.75rem)] font-extrabold leading-[1.08] tracking-[-0.02em] balance">
            Lab-tested by <span className="text-gradient">BFDS.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-4 max-w-2xl text-[clamp(0.9rem,0.6vw+0.8rem,1.05rem)] leading-relaxed text-slate-600/85 pretty">
            Test reports from Bahadurgarh Footwear Development Services, dated 13-06-2024.
          </p>
        </Reveal>

        <div className="mt-[clamp(1.5rem,3vw,2.5rem)] grid gap-[clamp(1rem,2.5vw,1.75rem)] md:grid-cols-2">
          {REPORTS.map((r, i) => (
            <Reveal key={r.no} delay={0.08 * i}>
              <div className="glass flex h-full flex-col gap-4 rounded-[clamp(1rem,2vw,1.75rem)] p-[clamp(0.9rem,2vw,1.5rem)] min-[480px]:flex-row">
                <a
                  href={r.pdf}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${r.t} test report`}
                  className="group block shrink-0 overflow-hidden rounded-xl bg-white shadow-[0_20px_45px_-28px_rgba(10,31,68,0.5)] min-[480px]:w-[11.4rem]"
                >
                  <img
                    src={r.thumb}
                    alt={`${r.t} test report ${r.no}, page 1`}
                    loading="lazy"
                    className="aspect-[910/1287] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </a>
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-blue-brand">{r.no}</span>
                  <h3 className="mt-1 font-display text-[clamp(1.05rem,1vw+0.8rem,1.3rem)] font-bold text-ink">{r.t}</h3>
                  <p className="mt-0.5 text-xs text-slate-500">Colour: {r.colour}</p>
                  <ul className="mt-3 grid gap-1.5">
                    {TESTS.map((t) => (
                      <li key={t} className="flex items-center justify-between gap-3 rounded-lg border border-ink/8 bg-white/60 px-3 py-1.5 text-[0.78rem] text-ink">
                        {t}
                        <span className="text-[0.66rem] font-bold uppercase tracking-[0.12em] text-emerald-600">Pass</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button href={r.pdf} target="_blank" rel="noreferrer" className="!px-4 !py-2 text-[0.8rem]">
                      View PDF
                    </Button>
                    <Button href={r.pdf} download={`Turbotech-${r.no}.pdf`} variant="ghost" className="!px-4 !py-2 text-[0.8rem]">
                      Download <Arrow className="rotate-90" />
                    </Button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
