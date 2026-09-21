import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'motion/react'
import {
  Arrow, Button, Card, CardImage, Eyebrow, Marquee, Reveal, SectionHeading, Stagger, Stat, stagItem,
} from '../components/ui'
import { categories, clients, company, industries, products, testimonials } from '../data/products'

const SlipperScene = lazy(() => import('../three/Slipper'))

/* Tracks how far the visitor has scrolled through the first two screens —
   this is what drives the colour change on the 3D sole. */
function useHeroProgress() {
  const progress = useRef(0)
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const span = window.innerHeight * 2.4
      const p = Math.min(Math.max(window.scrollY / span, 0), 1)
      progress.current = p
      setPct(p)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])
  return { progress, pct }
}

function useLowPower() {
  const [low, setLow] = useState(false)
  useEffect(() => {
    const check = () =>
      setLow(
        window.innerWidth < 768 ||
          window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
          (navigator.hardwareConcurrency ?? 8) <= 4
      )
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  return low
}

/* Pigment properties, straight from the brochure. The colours are illustrative —
   this is a capability panel, not a shade card, so no shade is named. */
const PIGMENT_TRAITS = [
  { hex: '#00bffe', t: 'High colour strength', d: 'Vivid, intense colour at relatively low pigment loading.' },
  { hex: '#eef3ff', t: 'Opacity or transparency', d: 'Opaque and transparent grades, depending on the application.' },
  { hex: '#fc0065', t: 'Migration resistance', d: 'Minimises colour bleeding or transfer to adjacent materials.' },
  { hex: '#0072ce', t: 'Light (UV) fastness', d: 'Holds its colour through sunlight exposure.' },
  { hex: '#ffb400', t: 'Heat stability', d: 'Withstands processing temperatures without shifting shade.' },
  { hex: '#00d6a8', t: 'Excellent dispersion', d: 'Mixes uniformly into the PU system, minimising streaks and specks.' },
  { hex: '#1a1a1a', t: 'Anti-static grades', d: 'Reduces static charge accumulation on the finished surface.' },
  { hex: '#c0491d', t: 'Weather resistance', d: 'Suitable grades retain appearance during outdoor exposure.' },
]

const PROCESS = [
  {
    n: '01', t: 'Tell us your system', d: 'Share the polyol, the mould, the cycle time and the finish you need to hit.',
    icon: <path d="M4 5h16v11H9l-5 4V5Z M8 9.5h8 M8 12.5h5" />,
  },
  {
    n: '02', t: 'We match the grade', d: 'Pigment loading, release type and coating are selected against your line, not a catalogue.',
    icon: <path d="M12 4a8 8 0 1 0 0 16a8 8 0 1 0 0-16Z M12 9a3 3 0 1 0 0 6a3 3 0 1 0 0-6Z M12 2v3 M12 19v3 M2 12h3 M19 12h3" />,
  },
  {
    n: '03', t: 'Sample and trial', d: 'You run a trial batch. We stay on the call while the first soles come off the mould.',
    icon: <path d="M9 3h6 M10 3v6l-5 9.5A1.7 1.7 0 0 0 6.5 21h11a1.7 1.7 0 0 0 1.5-2.5L14 9V3 M7.2 15h9.6" />,
  },
  {
    n: '04', t: 'Supply and support', d: 'Repeatable batches, consistent shade, and a number you can actually reach.',
    icon: <path d="M2.5 6h11v10h-11Z M13.5 9.5h4l3 3.5v3h-7 M7 18.2a1.8 1.8 0 1 0 0-.01 M17 18.2a1.8 1.8 0 1 0 0-.01" />,
  },
]

/* The four steps as a timeline that fills in as it scrolls past: a gradient
   line grows from step to step and each node lights up when the line reaches it. */
function ProcessTimeline() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 78%', 'center 42%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 110, damping: 24, mass: 0.4 })
  const head = useTransform(fill, (v) => `${v * 100}%`)
  const [active, setActive] = useState(-1)

  // Nodes sit at the start of each quarter, so node i lights up at i / 4.
  useMotionValueEvent(fill, 'change', (v) => {
    const n = PROCESS.findLastIndex((_, i) => v >= i / PROCESS.length + 0.015)
    setActive((a) => (a === n ? a : n))
  })

  const glow = 'shadow-[0_0_0_4px_rgba(0,191,254,0.25),0_0_22px_4px_rgba(0,191,254,0.65)]'

  return (
    <div ref={ref} className="relative mt-[clamp(2.5rem,5vw,4.5rem)]">
      {/* Track + fill: horizontal on desktop */}
      <div className="absolute left-0 right-0 top-[27px] hidden h-[3px] rounded-full bg-ink/8 md:block">
        <motion.div
          style={{ scaleX: fill }}
          className="h-full origin-left rounded-full bg-gradient-to-r from-blue-deep via-cyan-brand to-magenta"
        />
        <motion.span
          style={{ left: head }}
          className={`absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white ${glow}`}
        />
      </div>
      {/* ...and vertical on mobile */}
      <div className="absolute bottom-3 left-[26px] top-3 w-[3px] rounded-full bg-ink/8 md:hidden">
        <motion.div
          style={{ scaleY: fill }}
          className="h-full w-full origin-top rounded-full bg-gradient-to-b from-blue-deep via-cyan-brand to-magenta"
        />
        <motion.span
          style={{ top: head }}
          className={`absolute left-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white ${glow}`}
        />
      </div>

      <div className="grid gap-9 md:grid-cols-4 md:gap-5">
        {PROCESS.map((s, i) => {
          const on = i <= active
          return (
            <div key={s.n} className="group relative pl-[4.5rem] md:pl-0">
              {/* Node */}
              <motion.div
                animate={on ? { scale: [0.85, 1.12, 1] } : { scale: 1 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-0 top-0 md:relative md:mb-6 md:w-fit"
              >
                {on && <span className="anim-pulse-ring absolute inset-0 rounded-full bg-cyan-brand/40" />}
                <div
                  className={`relative flex h-[56px] w-[56px] items-center justify-center rounded-full border font-display text-sm font-bold transition-all duration-500 ${
                    on
                      ? 'border-transparent bg-gradient-to-br from-blue-deep via-blue-brand to-cyan-brand text-white shadow-[0_12px_30px_-8px_rgba(0,114,206,0.7)]'
                      : 'border-ink/12 bg-white text-slate-400'
                  }`}
                >
                  {s.n}
                </div>
              </motion.div>

              {/* Copy */}
              <motion.div
                animate={on ? { opacity: 1, y: 0 } : { opacity: 0.35, y: 14 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl transition-colors duration-500 md:-mx-3 md:p-3 md:group-hover:bg-white/70"
              >
                <div
                  className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-500 group-hover:-translate-y-0.5 group-hover:-rotate-6 ${
                    on ? 'bg-cyan-brand/12 text-blue-brand' : 'bg-ink/5 text-slate-400'
                  }`}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    {s.icon}
                  </svg>
                </div>
                <h3 className="font-display text-[clamp(0.98rem,1vw+0.75rem,1.2rem)] font-bold text-ink">{s.t}</h3>
                <p className="mt-2 text-[clamp(0.8rem,0.35vw+0.72rem,0.9rem)] leading-relaxed text-slate-500 pretty">{s.d}</p>
              </motion.div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const STANDARDS = ['REACH', 'RoHS', 'CPSIA', 'Phthalate Free']

const STORY_POINTS = [
  'Formulated for PU, PVC and EVA footwear lines',
  'REACH, RoHS and CPSIA compliant, phthalate-free grades',
  'Trial support on your own moulds before you commit',
]

const SHOT_TO_SOLE = [
  { t: 'Colour the polyol', d: 'Pigment goes in first, dispersed so the shade is the same on shot one and shot one thousand.' },
  { t: 'Prepare the mould', d: 'Release agent and in-mould coating lay down the finish before any material arrives.' },
  { t: 'Demould a finished part', d: 'The sole comes out coloured, coated and clean, with nothing left behind in the cavity.' },
]

/* Horizontal, snap-scrolling industry cards with arrow controls. */
function IndustryRail() {
  const rail = useRef(null)
  const [edge, setEdge] = useState({ start: true, end: false })

  const update = () => {
    const el = rail.current
    if (!el) return
    setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 })
  }
  useEffect(() => {
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const step = (dir) => {
    const el = rail.current
    const card = el?.querySelector('[data-card]')
    if (!el || !card) return
    el.scrollBy({ left: dir * (card.getBoundingClientRect().width + 16), behavior: 'smooth' })
  }

  const ctrl =
    'glass flex h-11 w-11 items-center justify-center rounded-full text-ink transition-all duration-300 hover:border-cyan-brand/60 hover:bg-ink/10 disabled:pointer-events-none disabled:opacity-30'

  return (
    <>
      <div className="mt-[clamp(1.5rem,3vw,2.5rem)] flex justify-end gap-2">
        <button type="button" aria-label="Previous industries" className={ctrl} disabled={edge.start} onClick={() => step(-1)}>
          <Arrow className="rotate-180" />
        </button>
        <button type="button" aria-label="Next industries" className={ctrl} disabled={edge.end} onClick={() => step(1)}>
          <Arrow />
        </button>
      </div>

      <div
        ref={rail}
        onScroll={update}
        className="mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {industries.map((ind, i) => (
          <article
            key={ind.title}
            data-card
            className="group relative aspect-[4/5] w-[min(82vw,22rem)] shrink-0 snap-start overflow-hidden rounded-2xl border border-ink/10"
          >
            <img
              src={ind.image}
              alt={ind.title}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020a1c] via-[#020a1c]/55 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-[clamp(1.1rem,2vw,1.6rem)]">
              <span className="font-display text-xs font-bold tracking-[0.2em] text-cyan-soft">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-2 font-display text-[clamp(1.1rem,1vw+0.85rem,1.4rem)] font-bold leading-tight text-white balance">
                {ind.title}
              </h3>
              <p className="mt-2 text-[clamp(0.8rem,0.35vw+0.72rem,0.9rem)] leading-relaxed text-slate-300/90 pretty">{ind.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}

export default function Home() {
  const { progress, pct } = useHeroProgress()
  const low = useLowPower()

  return (
    <>
      {/* ---------------------------------------------------------- HERO */}
      <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-[clamp(5.5rem,12vw,8rem)] pb-[clamp(2rem,6vw,4rem)]">
        <div className="shell grid items-center gap-[clamp(1.5rem,4vw,3rem)] lg:grid-cols-[1.05fr_0.95fr]">
          {/* Copy */}
          <div className="relative z-10 order-2 lg:order-1">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
              <Eyebrow>Delhi, India · Since 2023</Eyebrow>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 font-display text-[clamp(1.85rem,7.2vw,4.75rem)] font-extrabold leading-[1.02] tracking-[-0.02em] balance"
            >
              Everything is white
              <br className="hidden min-[400px]:block" />{' '}
              <span className="text-gradient">before it&apos;s coloured.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 max-w-xl text-[clamp(0.9rem,0.7vw+0.8rem,1.15rem)] leading-relaxed text-slate-600/85 pretty"
            >
              Turbotech makes the pigments, mould release agents, in-mould coatings and
              compounds that turn a raw polyurethane shot into a finished sole —{' '}
              <span className="text-ink">a complete solution for P.U., PVC &amp; EVA footwear.</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Button to="/products">
                Explore Products <Arrow />
              </Button>
              <Button to="/contact" variant="ghost">
                Request a Sample
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.45 }}
              className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2"
            >
              {STANDARDS.map((s) => (
                <span key={s} className="flex items-center gap-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-slate-500">
                  <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 text-cyan-brand">
                    <path d="m5 13 4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {s}
                </span>
              ))}
            </motion.div>
          </div>

          {/* 3D sole */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative order-1 lg:order-2"
          >
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[min(80vw,34rem)] w-[min(80vw,34rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,191,254,0.2),transparent_65%)] blur-2xl" />
            <Suspense
              fallback={
                <div className="flex h-[clamp(15rem,52vw,32rem)] items-center justify-center">
                  <div className="h-10 w-10 animate-spin rounded-full border-2 border-ink/15 border-t-cyan-brand" />
                </div>
              }
            >
              <SlipperScene
                progress={progress}
                quality={low ? 'low' : 'high'}
                className="h-[clamp(17rem,52vw,32rem)] w-full [&>canvas]:!touch-pan-y"
              />
            </Suspense>

            <div className="pointer-events-none absolute inset-x-0 bottom-1 flex justify-center">
              <span className="glass rounded-full px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-slate-600">
                <span className="hidden min-[380px]:inline">Drag to spin · Tap to recolour · </span>
                <span className="min-[380px]:hidden">Drag · Tap · </span>
                {Math.round(pct * 100)}%
              </span>
            </div>
          </motion.div>
        </div>

        {/* scroll cue */}
        <div className="pointer-events-none absolute inset-x-0 bottom-4 hidden justify-center lg:flex">
          <motion.div
            animate={{ y: [0, 9, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex h-9 w-5 items-start justify-center rounded-full border border-ink/20 p-1"
          >
            <span className="h-1.5 w-1 rounded-full bg-cyan-brand" />
          </motion.div>
        </div>
      </section>

      {/* ---------------------------------------------------------- MARQUEE */}
      <div className="border-y border-ink/8 bg-ink/[0.02] py-[clamp(0.9rem,1.6vw,1.4rem)]">
        <Marquee items={['Pigments', 'Release Agents', 'In-Mould Coatings', 'EVA Compound', 'PVC Compound', 'MCL', 'Hardener', 'DMF', 'Mould Cleaner', 'BC']} />
      </div>

      {/* ---------------------------------------------------- COLOUR MATCH */}
      <section className="shell pt-[clamp(3rem,7vw,6rem)]">
        <Reveal>
          <Link
            to="/contact"
            className="group relative grid overflow-hidden rounded-[clamp(1rem,2vw,1.75rem)] border border-ink/10 shadow-[0_24px_60px_-30px_rgba(10,31,68,0.35)] md:grid-cols-[1.1fr_1fr]"
          >
            <div className="relative min-h-[14rem] overflow-hidden md:min-h-[20rem]">
              <img
                src="/assets/img/shade-pigments.webp"
                alt="Bowls of red, pink and violet pigment powder"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/70 to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-white" />
            </div>
            <div className="relative flex flex-col justify-center bg-white p-[clamp(1.4rem,3.5vw,3rem)]">
              <div>
                <Eyebrow>Colour matching</Eyebrow>
              </div>
              <h2 className="mt-4 font-display text-[clamp(1.4rem,2.8vw,2.3rem)] font-extrabold leading-tight tracking-tight balance">
                Send us a swatch. <span className="text-gradient">We&apos;ll send it back in PU.</span>
              </h2>
              <p className="mt-3 text-[clamp(0.85rem,0.45vw+0.76rem,1rem)] leading-relaxed text-slate-600/85 pretty">
                A leather offcut, a finished sole, a brand code. We match it to a pigment grade for your
                system and ship a sample you can run on your own line.
              </p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-brand">
                Request a colour match <Arrow />
              </span>
            </div>
          </Link>
        </Reveal>
      </section>

      {/* ---------------------------------------------------------- STORY */}
      <section className="shell py-[clamp(3rem,8vw,7rem)]">
        <div className="grid items-center gap-[clamp(2.5rem,5vw,4.5rem)] lg:grid-cols-2">
          <Reveal className="relative">
            <div className="relative overflow-hidden rounded-[clamp(1rem,2vw,1.75rem)] border border-ink/10">
              <img
                src="/assets/img/story-lab.webp"
                alt="Chemist pipetting samples into a row of test tubes"
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-deep/25 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-5 right-4 rounded-2xl border border-ink/10 bg-white/90 px-5 py-4 backdrop-blur-md sm:right-8">
              <div className="font-display text-[clamp(1.1rem,2vw,1.5rem)] font-extrabold text-gradient">Singhola, Delhi</div>
              <div className="mt-1 text-[0.68rem] uppercase tracking-[0.16em] text-slate-500">Where every batch is made</div>
            </div>
          </Reveal>

          <div>
            <SectionHeading
              eyebrow="Who we are"
              title={<>Chemistry made for the <span className="text-gradient">moulding floor.</span></>}
              sub={`Turbotech is the footwear chemicals brand of ${company.legal}. We started with one narrow job — the materials that sit between a raw PU shot and a finished sole — and built the range outward from there: pigments, release agents, in-mould coatings, EVA and PVC compounds, and the process chemicals that keep a line running.`}
            />
            <Stagger className="mt-7 space-y-3">
              {STORY_POINTS.map((pt) => (
                <motion.div key={pt} variants={stagItem} className="flex items-start gap-3 text-[clamp(0.85rem,0.4vw+0.76rem,1rem)] text-slate-700">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-brand/15 text-cyan-brand">
                    <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3">
                      <path d="m5 13 4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {pt}
                </motion.div>
              ))}
            </Stagger>
            <Reveal delay={0.1} className="mt-8">
              <Button to="/about" variant="ghost">
                More about us <Arrow />
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- STATS */}
      <section className="shell py-[clamp(3rem,7vw,6rem)]">
        <div className="grid grid-cols-2 gap-[clamp(1.25rem,3vw,2.5rem)] lg:grid-cols-4">
          <Stat value={10} suffix="" label="Products in range" />
          <Stat value={6} suffix="" label="Industries served" />
          <Stat value={4} suffix="" label="Compliance standards" />
          <Stat value={100} suffix="%" label="Made in India" />
        </div>
      </section>

      {/* ---------------------------------------------------- PIGMENT TRAITS */}
      <section className="shell py-[clamp(3rem,8vw,7rem)]">
        <SectionHeading
          eyebrow="Colourants"
          title={<>Colour is a <span className="text-gradient">specification</span>, not a decoration.</>}
          sub="Our pigments are dispersed for polyurethane chemistry — high tinting strength at low loading, stable through heat and sunlight, and inert to the curing reaction. Each grade is chosen against the property your line depends on."
        />

        <Stagger className="mt-[clamp(2rem,4vw,3.5rem)] grid grid-cols-2 gap-3 min-[560px]:grid-cols-3 lg:grid-cols-4 xl:gap-4">
          {PIGMENT_TRAITS.map((s) => (
            <motion.div key={s.t} variants={stagItem}>
              <Card accent={s.hex} className="flex h-full flex-col">
                <div
                  className="relative h-[clamp(4.5rem,11vw,8rem)] w-full shrink-0 overflow-hidden transition-transform duration-700 group-hover:scale-105"
                  style={{ background: s.hex }}
                >
                  <span className="shimmer absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
                <div className="p-[clamp(0.75rem,1.4vw,1.15rem)]">
                  <h3 className="font-display text-[clamp(0.8rem,0.5vw+0.7rem,0.98rem)] font-bold leading-tight text-ink balance">
                    {s.t}
                  </h3>
                  <p className="mt-1.5 text-[clamp(0.68rem,0.3vw+0.62rem,0.8rem)] leading-snug text-slate-500 pretty">{s.d}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </Stagger>

        <Reveal delay={0.1} className="mt-8">
          <p className="text-sm text-slate-500">
            Colours shown are illustrative.{' '}
            <Link to="/contact" className="font-semibold text-blue-brand underline-offset-4 hover:underline">
              Ask for the shade card
            </Link>{' '}
            matched to your system.
          </p>
        </Reveal>
      </section>

      {/* ---------------------------------------------------------- PRODUCTS */}
      <section className="shell py-[clamp(3rem,8vw,7rem)]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="The range"
            title={<>Ten products. <span className="text-gradient">One line.</span></>}
            sub="From the pigment that colours the shot to the cleaner that strips the mould at the end of the shift."
          />
          <Reveal delay={0.16}>
            <Button to="/products" variant="ghost">
              All products <Arrow />
            </Button>
          </Reveal>
        </div>

        <Stagger className="mt-[clamp(2rem,4vw,3.5rem)] grid gap-4 min-[620px]:grid-cols-2 xl:grid-cols-3">
          {products.slice(0, 5).map((p) => (
            <motion.div key={p.slug} variants={stagItem}>
              <Link to={`/products/${p.slug}`} className="block h-full">
                <Card accent={p.accent} className="h-full">
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
                  <h3 className="mt-5 font-display text-[clamp(1.05rem,1.4vw,1.5rem)] font-bold leading-tight text-ink">{p.name}</h3>
                  <p className="mt-2.5 text-[clamp(0.8rem,0.35vw+0.72rem,0.92rem)] leading-relaxed text-slate-500 pretty">{p.summary}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-[0.78rem] font-semibold text-blue-brand">
                    View details <Arrow className="h-3.5 w-3.5" />
                  </span>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}

          {/* Solvents tile */}
          <motion.div variants={stagItem}>
            <Link to="/products?c=solvents" className="block h-full">
              <Card accent="#00bffe" className="h-full">
                <CardImage src="/assets/img/p-dmf.webp" alt="Rows of blue and orange chemical drums" />
                <div className="p-[clamp(1.15rem,2.2vw,1.9rem)]">
                <div>
                  <span className="inline-flex rounded-full bg-cyan-brand/15 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-blue-brand">
                    Solvents &amp; Auxiliaries
                  </span>
                  <h3 className="mt-5 font-display text-[clamp(1.05rem,1.4vw,1.5rem)] font-bold leading-tight text-ink">
                    Five process chemicals
                  </h3>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {products.filter((p) => p.category === 'solvents').map((p) => (
                    <span key={p.slug} className="glass rounded-full px-3 py-1.5 text-[0.72rem] font-semibold text-slate-700">
                      {p.short}
                    </span>
                  ))}
                </div>
                </div>
              </Card>
            </Link>
          </motion.div>
        </Stagger>
      </section>

      {/* ---------------------------------------------------------- PROCESS */}
      <section className="shell py-[clamp(3rem,8vw,7rem)]">
        <SectionHeading
          eyebrow="How we work"
          align="center"
          title={<>We sell a <span className="text-gradient">result</span>, not a drum.</>}
          sub="Footwear chemicals only work in context. Here is what buying from Turbotech actually looks like."
        />

        <ProcessTimeline />
      </section>

      {/* ---------------------------------------------------------- INDUSTRIES */}
      <section className="shell py-[clamp(3rem,8vw,7rem)]">
        <SectionHeading
          eyebrow="Where it ends up"
          title={<>Built for the <span className="text-gradient">factory floor.</span></>}
          sub="The same chemistry serves very different lines. These are the industries our products were formulated around."
        />

        <IndustryRail />
      </section>

      {/* ------------------------------------------------------ SHOT TO SOLE */}
      <section className="relative mt-[clamp(2rem,5vw,4rem)] mb-[clamp(1rem,2.5vw,2rem)] overflow-hidden">
        <img
          src="/assets/img/process-sole-machine.webp"
          alt="A shoe held in an industrial moulding machine"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-paper/85" />
        <div className="absolute inset-0 bg-gradient-to-b from-paper via-transparent to-paper" />
        <div className="shell relative py-[clamp(4rem,11vw,9rem)]">
          <SectionHeading
            eyebrow="Shot to sole"
            align="center"
            title={<>One mould cycle. <span className="text-gradient">Three of our products at work.</span></>}
            sub="By the time a sole leaves the press, it has been coloured, coated and released. Each of those steps is a Turbotech product doing its job."
          />
          <Stagger className="mt-[clamp(2rem,4vw,3.5rem)] grid gap-4 md:grid-cols-3" gap={0.1}>
            {SHOT_TO_SOLE.map((s, i) => (
              <motion.div key={s.t} variants={stagItem} className="glass rounded-2xl p-[clamp(1.15rem,2.2vw,1.75rem)]">
                <span className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-extrabold text-cyan-brand/40">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-1 font-display text-[clamp(1rem,1vw+0.75rem,1.25rem)] font-bold text-ink">{s.t}</h3>
                <p className="mt-2 text-[clamp(0.8rem,0.35vw+0.72rem,0.9rem)] leading-relaxed text-slate-600/85 pretty">{s.d}</p>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---------------------------------------------------- TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section className="shell py-[clamp(3rem,8vw,7rem)]">
          <SectionHeading
            eyebrow="From the factory floor"
            title={<>Heard on <span className="text-gradient">the line.</span></>}
            sub="What the people running our chemistry every shift have to say about it."
          />
          <Stagger className="mt-[clamp(2rem,4vw,3.5rem)] grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {testimonials.map((t) => (
              <motion.div key={t.name} variants={stagItem}>
                <Card className="flex h-full flex-col p-[clamp(1.15rem,2.2vw,1.75rem)]">
                  <span className="font-display text-5xl leading-none text-cyan-brand/50">&ldquo;</span>
                  <p className="mt-1 flex-1 text-[clamp(0.88rem,0.4vw+0.78rem,1rem)] leading-relaxed text-slate-700 pretty">{t.quote}</p>
                  <div className="mt-6 border-t border-ink/10 pt-4">
                    <div className="font-display font-bold text-ink">{t.name}</div>
                    <div className="mt-0.5 text-xs text-slate-500">
                      {[t.role, t.company, t.city].filter(Boolean).join(' · ')}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </Stagger>
        </section>
      )}

      {/* ---------------------------------------------------------- CLIENTS */}
      {clients.length > 0 && (
        <section className="shell py-[clamp(2rem,5vw,4rem)]">
          <p className="text-center text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Running on Turbotech chemistry
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 min-[560px]:grid-cols-3 lg:grid-cols-6">
            {clients.map((c) => (
              <div key={c.name} className="glass flex h-20 items-center justify-center rounded-xl p-4">
                <img src={c.logo} alt={c.name} loading="lazy" className="max-h-full max-w-full object-contain opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------- CTA
          Half the usual breathing room: the negative bottom margin eats half of
          the footer's top margin, so only this section's gap shrinks. */}
      <section className="shell py-[clamp(1rem,2.5vw,2rem)] -mb-[clamp(2rem,5vw,4.5rem)]">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-[clamp(1rem,2vw,1.75rem)] px-[clamp(1.25rem,4vw,4rem)] py-[clamp(2.25rem,5vw,4.5rem)] text-center">
            <div className="anim-drift pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(0,191,254,0.3),transparent_65%)] blur-2xl" />
            <div className="anim-drift pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(252,0,101,0.26),transparent_65%)] blur-2xl" style={{ animationDelay: '-11s' }} />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl font-display text-[clamp(1.45rem,4vw,2.9rem)] font-extrabold leading-tight tracking-tight balance">
                Tell us what your line is running.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[clamp(0.85rem,0.5vw+0.76rem,1.05rem)] leading-relaxed text-slate-600/85 pretty">
                Send us the system, the mould and the finish you need. We will come back with the
                grade — and a sample you can trial.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button to="/contact">
                  Get in touch <Arrow />
                </Button>
                <Button href={`tel:${company.phones[0].replace(/\s/g, '')}`} variant="ghost">
                  {company.phones[0]}
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  )
}
