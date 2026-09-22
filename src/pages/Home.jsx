import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'motion/react'
import { Arrow, Button, Card, CardImage, Reveal, SectionHeading, Stagger, stagItem } from '../components/ui'
import { company } from '../data/products'

const SlipperScene = lazy(() => import('../three/Slipper'))

/* Tracks how far the visitor has scrolled through the first two screens —
   this is what drives the colour change on the 3D sole. Kept in a ref so
   scrolling never re-renders the page. */
function useHeroProgress() {
  const progress = useRef(0)
  useEffect(() => {
    const onScroll = () => {
      const span = window.innerHeight * 2.4
      progress.current = Math.min(Math.max(window.scrollY / span, 0), 1)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])
  return progress
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

/* ------------------------------------------------------------------
   Copy. Every visible string below is taken word for word from the
   "TURBOTECH — HOMEPAGE CONTENT" document.
------------------------------------------------------------------- */

const HERO_TAGS = ['P.U.', 'PVC', 'EVA', 'Pigments', 'Release Agents', 'IMC', 'Compounds']

const PRODUCTS = [
  {
    name: 'PU Pigments',
    tag: 'Bring Every Colour to Life.',
    body: [
      'Create vivid, consistent and high-quality colours with PU pigments designed for excellent dispersion and compatibility with polyurethane systems.',
      'Our pigment solutions offer high colour strength along with properties such as UV and heat stability, chemical resistance and migration resistance.',
    ],
    cta: 'Explore PU Pigments',
    to: '/products/pu-pigments',
    image: '/assets/img/p-pigments.webp',
    accent: '#fc0065',
  },
  {
    name: 'Release Agents',
    tag: 'Smooth Release. Better Finish. Efficient Production.',
    body: [
      'Our release solutions are designed to make demoulding easier while helping maintain a smooth, clean surface finish.',
      'With fast drying, thermal stability and low mould build-up, they support consistent performance across production cycles.',
    ],
    cta: 'Explore Release Agents',
    to: '/products/release-agents',
    image: '/assets/img/p-release.webp',
    accent: '#00bffe',
  },
  {
    name: 'IMC',
    tag: 'Protection That Performs.',
    body: [
      'Our IMC solutions are designed to provide strong adhesion with PU while supporting abrasion resistance, scratch resistance, flexibility and surface durability.',
      'Available performance characteristics can support different footwear finishes, from gloss to matte applications.',
    ],
    cta: 'Explore IMC',
    to: '/products/imc',
    image: '/assets/img/p-imc.webp',
    accent: '#5ad6ff',
  },
  {
    name: 'EVA Compound',
    tag: 'Lightweight by Nature. Strong in Performance.',
    body: [
      'EVA solutions combine lightweight construction with flexibility, elasticity and shock absorption — making them suitable for footwear applications where comfort and performance matter.',
    ],
    cta: 'Explore EVA Compounds',
    to: '/products/eva-compound',
    image: '/assets/img/p-eva.webp',
    accent: '#00d6a8',
  },
  {
    name: 'PVC Compound',
    tag: 'Built for Strength. Designed for Reliability.',
    body: [
      'Our PVC compound solutions offer a combination of mechanical strength, chemical resistance, abrasion resistance and dimensional stability.',
      'Designed for applications where durability and reliable processing are essential.',
    ],
    cta: 'Explore PVC Compounds',
    to: '/products/pvc-compound',
    image: '/assets/img/p-pvc.webp',
    accent: '#8b7dff',
  },
  {
    name: 'Specialty Chemicals',
    tag: 'The Chemistry Behind the Process.',
    body: [
      'Our range includes MCL, Hardener, DMF, Mould Cleaner and BC, supporting specific processing and manufacturing requirements.',
    ],
    cta: 'Explore Specialty Chemicals',
    to: '/products/solvents',
    image: '/assets/img/p-dmf.webp',
    accent: '#0072ce',
  },
]

const WHY = [
  {
    t: 'Consistent Colour',
    d: 'Achieve vibrant and reliable colour performance with solutions designed for excellent dispersion.',
    icon: <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5" />,
  },
  {
    t: 'Smooth Processing',
    d: 'Solutions designed to support efficient production and easier processing.',
    icon: <path d="M3 12h12 M11 6l6 6-6 6 M21 5v14" />,
  },
  {
    t: 'Superior Surface Finish',
    d: 'Improve the appearance and finish of footwear components with application-focused chemistry.',
    icon: <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8Z M19 15.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7Z" />,
  },
  {
    t: 'Reliable Performance',
    d: 'Properties such as chemical, UV, abrasion and weather resistance help support demanding applications.',
    icon: <path d="M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6l-7-3Z M8.8 12.2l2.2 2.2 4.4-4.6" />,
  },
  {
    t: 'Complete Product Range',
    d: 'From pigments and release agents to compounds and specialty chemicals, bring multiple footwear requirements under one roof.',
    icon: <path d="M4 4h7v7H4Z M13 4h7v7h-7Z M4 13h7v7H4Z M13 13h7v7h-7Z" />,
  },
]

const PROBLEMS = [
  { q: 'Colour variation?', image: '/assets/img/ps-colour.webp', alt: 'A fan deck of colour swatches', a: 'Choose the right pigment solution for consistent, vibrant results.', accent: '#fc0065' },
  { q: 'Mould sticking?', image: '/assets/img/ps-mould.webp', alt: 'Close-up of a steel injection mould', a: 'Our release solutions are designed for easier demoulding and cleaner mould surfaces.', accent: '#00bffe' },
  { q: 'Surface wear and scratches?', image: '/assets/img/ps-wear.webp', alt: 'Worn soles of a pair of shoes', a: 'IMC solutions provide adhesion and resistance-focused performance.', accent: '#5ad6ff' },
  { q: 'Looking for lightweight footwear?', image: '/assets/img/ps-light.webp', alt: 'A pair of lightweight sneakers tossed in the air', a: 'EVA compounds offer flexibility, resilience and shock absorption.', accent: '#00d6a8' },
  { q: 'Need durable PVC performance?', image: '/assets/img/ps-pvc.webp', alt: 'Muddy rubber boots on gravel', a: 'PVC compounds provide strength, chemical resistance and dimensional stability.', accent: '#8b7dff' },
  { q: 'Looking for processing support?', image: '/assets/img/ps-support.webp', alt: 'Technician working at a laboratory bench', a: 'Explore our range of specialty chemicals for specific production requirements.', accent: '#0072ce' },
]

const APPLICATIONS = [
  { title: 'PU Footwear', desc: 'Colour, release and surface solutions for PU-based footwear.', image: '/assets/img/ind-footwear.webp' },
  { title: 'Safety Footwear', desc: 'Solutions designed around durability, finish and performance requirements.', image: '/assets/img/ind-safety.webp' },
  { title: 'Sports Footwear', desc: 'Material and colour solutions for modern sports footwear applications.', image: '/assets/img/ind-sports.webp' },
  { title: 'Sandals & Slippers', desc: 'Flexible chemistry solutions for everyday footwear manufacturing.', image: '/assets/img/p-eva.webp' },
  { title: 'Industrial Footwear', desc: 'Performance-oriented solutions for demanding footwear applications.', image: '/assets/img/ind-industrial.webp' },
  { title: 'Fashion Footwear', desc: 'Colour and surface solutions that help bring distinctive footwear designs to life.', image: '/assets/img/ind-fashion.webp' },
]

const PERFORMANCE = [
  { t: 'Colour Strength', hex: '#fc0065' },
  { t: 'Excellent Dispersion', hex: '#00bffe' },
  { t: 'UV Resistance', hex: '#ffb400' },
  { t: 'Heat Stability', hex: '#c0491d' },
  { t: 'Chemical Resistance', hex: '#00d6a8' },
  { t: 'Abrasion Resistance', hex: '#0072ce' },
  { t: 'Flexibility', hex: '#8b7dff' },
  { t: 'Surface Finish', hex: '#5ad6ff' },
]

const THE_RIGHT = [
  { t: 'The right colour.', icon: <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z" /> },
  { t: 'The right release.', icon: <path d="M4 14v5h16v-5 M12 15V4 M7.5 8.5 12 4l4.5 4.5" /> },
  { t: 'The right adhesion.', icon: <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1 M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" /> },
  { t: 'The right material.', icon: <path d="M12 3 3 8l9 5 9-5-9-5Z M3 13l9 5 9-5 M3 17.5l9 5 9-5" /> },
  { t: 'The right finish.', icon: <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8Z" /> },
]

const PHONES = ['+91 8130243046', '+91 9839830808', '+91 9599078709', '+91 9654688447']

/* ------------------------------------------------------------------ */

/* Horizontal, snap-scrolling image cards with arrow controls. */
function ImageRail({ items }) {
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
    'glass flex h-11 w-11 items-center justify-center rounded-full text-ink transition-all duration-300 hover:border-blue-brand/40 hover:bg-white disabled:pointer-events-none disabled:opacity-30'

  return (
    <>
      <div className="mt-[clamp(1.5rem,3vw,2.5rem)] flex justify-end gap-2">
        <button type="button" aria-label="Previous" className={ctrl} disabled={edge.start} onClick={() => step(-1)}>
          <Arrow className="rotate-180" />
        </button>
        <button type="button" aria-label="Next" className={ctrl} disabled={edge.end} onClick={() => step(1)}>
          <Arrow />
        </button>
      </div>

      <div
        ref={rail}
        onScroll={update}
        className="mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((it, i) => (
          <article
            key={it.title}
            data-card
            className="group relative aspect-[4/5] w-[min(82vw,22rem)] shrink-0 snap-start overflow-hidden rounded-2xl border border-ink/10"
          >
            <img
              src={it.image}
              alt={it.title}
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
                {it.title}
              </h3>
              <p className="mt-2 text-[clamp(0.8rem,0.35vw+0.72rem,0.9rem)] leading-relaxed text-slate-300/90 pretty">{it.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}

/* A row of steps that fills in as it scrolls past: a gradient line grows
   from node to node and each node lights up when the line reaches it. */
function Timeline({ items, cols = 'md:grid-cols-5' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'center 45%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 110, damping: 24, mass: 0.4 })
  const head = useTransform(fill, (v) => `${v * 100}%`)
  const [active, setActive] = useState(-1)

  // Node i sits at the start of column i, so it lights up at i / n.
  useMotionValueEvent(fill, 'change', (v) => {
    const n = items.findLastIndex((_, i) => v >= i / items.length + 0.015)
    setActive((a) => (a === n ? a : n))
  })

  const glow = 'shadow-[0_0_0_4px_rgba(0,191,254,0.25),0_0_22px_4px_rgba(0,191,254,0.65)]'

  return (
    <div ref={ref} className="relative">
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

      <div className={`grid gap-7 md:gap-5 ${cols}`}>
        {items.map((s, i) => {
          const on = i <= active
          return (
            <div key={s.t} className="group relative flex min-h-[56px] items-center pl-[4.5rem] md:block md:pl-0">
              <motion.div
                animate={on ? { scale: [0.85, 1.12, 1] } : { scale: 1 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-0 top-0 md:relative md:mb-5 md:w-fit"
              >
                {on && <span className="anim-pulse-ring absolute inset-0 rounded-full bg-cyan-brand/40" />}
                <div
                  className={`relative flex h-[56px] w-[56px] items-center justify-center rounded-full border transition-all duration-500 ${
                    on
                      ? 'border-transparent bg-gradient-to-br from-blue-deep via-blue-brand to-cyan-brand text-white shadow-[0_12px_30px_-8px_rgba(0,114,206,0.7)]'
                      : 'border-ink/12 bg-white text-slate-400'
                  }`}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    {s.icon}
                  </svg>
                </div>
              </motion.div>

              <motion.p
                animate={on ? { opacity: 1, y: 0 } : { opacity: 0.35, y: 12 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-[clamp(1.05rem,1vw+0.8rem,1.35rem)] font-bold text-ink"
              >
                {s.t}
              </motion.p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const iconProps = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' }

export default function Home() {
  const progress = useHeroProgress()
  const low = useLowPower()

  return (
    <>
      {/* ------------------------------------------------------ 01 HERO */}
      <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-[clamp(5.5rem,12vw,8rem)] pb-[clamp(2rem,6vw,4rem)]">
        <div className="shell grid items-center gap-[clamp(1.5rem,4vw,3rem)] lg:grid-cols-[1.05fr_0.95fr]">
          {/* Copy */}
          <div className="relative z-10 order-2 lg:order-1">
            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[clamp(2rem,7.2vw,4.75rem)] font-extrabold leading-[1.02] tracking-[-0.02em] balance"
            >
              Advanced Chemistry.
              <br />
              <span className="text-gradient">Better Footwear.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 max-w-xl font-display text-[clamp(1rem,0.9vw+0.8rem,1.35rem)] font-semibold leading-snug text-ink pretty"
            >
              Complete chemical solutions for P.U., PVC &amp; EVA footwear manufacturing.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 max-w-xl text-[clamp(0.9rem,0.6vw+0.8rem,1.1rem)] leading-relaxed text-slate-600/85 pretty"
            >
              At Turbotech, we deliver application-focused solutions designed to support better colour, smoother
              processing, superior surface finish and reliable material performance.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Button to="/products">
                Explore Our Products <Arrow />
              </Button>
              <Button to="/contact" variant="ghost">
                Get a Quote
              </Button>
            </motion.div>

            <motion.ul
              initial="hide"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.45 } } }}
              className="mt-9 flex flex-wrap items-center gap-2"
            >
              {HERO_TAGS.map((t) => (
                <motion.li
                  key={t}
                  variants={{ hide: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                  className="rounded-full border border-ink/10 bg-white/70 px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-slate-600"
                >
                  {t}
                </motion.li>
              ))}
            </motion.ul>
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

      {/* ------------------------------------------------ 02 INTRODUCTION */}
      <section className="shell py-[clamp(3rem,8vw,7rem)]">
        <div className="grid items-center gap-[clamp(2.5rem,5vw,4.5rem)] lg:grid-cols-2">
          <Reveal className="relative">
            <div className="relative overflow-hidden rounded-[clamp(1rem,2vw,1.75rem)] border border-ink/10 shadow-[0_30px_70px_-35px_rgba(10,31,68,0.45)]">
              <img
                src="/assets/img/story-lab.webp"
                alt="Chemist pipetting samples into a row of test tubes"
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-deep/25 via-transparent to-transparent" />
            </div>
            <img
              src="/assets/img/shade-pigments.webp"
              alt="Bowls of red, pink and violet pigment powder"
              loading="lazy"
              decoding="async"
              className="absolute -bottom-6 -right-3 hidden aspect-square w-[38%] rounded-2xl border-4 border-white object-cover shadow-[0_24px_50px_-24px_rgba(10,31,68,0.55)] sm:block lg:-right-8"
            />
          </Reveal>

          <div>
            <SectionHeading
              title={<>Your Partner in <span className="text-gradient">Footwear Chemistry</span></>}
              sub="Turbotech by Nirmal Industries brings together a comprehensive range of chemical and material solutions for the footwear industry."
            />
            <Reveal delay={0.1}>
              <p className="mt-4 text-[clamp(0.88rem,0.5vw+0.78rem,1.02rem)] leading-relaxed text-slate-600/85 pretty">
                From vibrant PU pigments and efficient release agents to IMC, EVA compounds, PVC compounds and specialty
                chemicals, our solutions are designed around the real requirements of modern footwear manufacturing.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-5 border-l-2 border-cyan-brand pl-4 font-display text-[clamp(0.95rem,0.6vw+0.82rem,1.12rem)] font-semibold leading-snug text-ink pretty">
                We focus on the things that matter on the production floor — colour consistency, smooth processing,
                surface quality, durability and performance.
              </p>
            </Reveal>
            <Reveal delay={0.22} className="mt-8">
              <Button to="/about" variant="ghost">
                Discover Turbotech <Arrow />
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- CERTIFICATE */}
      <section className="shell py-[clamp(2rem,6vw,5rem)]">
        <div className="grid items-center gap-[clamp(2.5rem,6vw,5rem)] lg:grid-cols-[1fr_0.8fr]">
          <div>
            <SectionHeading
              eyebrow="Certified"
              title={<>Registered, on record, <span className="text-gradient">easy to verify.</span></>}
              sub={`${company.legal} is registered under the Goods and Services Tax Act, 2017. The registration certificate is below — check the GSTIN against the government portal before you place your first order.`}
            />

            <Stagger className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/8 min-[480px]:grid-cols-2">
              {[
                { k: 'GSTIN', v: company.gstin },
                { k: 'Trade name', v: company.legal },
                { k: 'Registered from', v: company.gstRegisteredFrom },
                { k: 'Registration type', v: `${company.gstType} · ${company.constitution}` },
              ].map((f) => (
                <motion.div key={f.k} variants={stagItem} className="bg-white/90 p-[clamp(0.9rem,1.8vw,1.25rem)]">
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-slate-500">{f.k}</p>
                  <p className="mt-1.5 font-display text-[clamp(0.9rem,0.6vw+0.75rem,1.08rem)] font-bold break-words text-ink">{f.v}</p>
                </motion.div>
              ))}
            </Stagger>

            <Reveal delay={0.1} className="mt-8 flex flex-wrap gap-3">
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
            </Reveal>
          </div>

          {/* Certificate preview */}
          <Reveal delay={0.12}>
            <a
              href="/assets/certificates/gst-registration-certificate.pdf"
              target="_blank"
              rel="noreferrer"
              className="group relative mx-auto block max-w-[26rem] [perspective:1400px]"
              aria-label="Open the GST registration certificate"
            >
              {/* stacked sheets behind */}
              <span className="absolute inset-0 translate-x-3 translate-y-3 rotate-[4deg] rounded-xl border border-ink/10 bg-white/70 transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-5 group-hover:rotate-[7deg]" />
              <span className="absolute inset-0 -translate-x-2 translate-y-1.5 -rotate-[3deg] rounded-xl border border-ink/10 bg-white/80 transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-x-4 group-hover:-rotate-[5deg]" />

              <div className="relative overflow-hidden rounded-xl border border-ink/10 bg-white shadow-[0_40px_80px_-40px_rgba(10,31,68,0.55)] transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] [transform:rotateX(6deg)_rotateY(-8deg)] group-hover:[transform:rotateX(0deg)_rotateY(0deg)_translateY(-6px)]">
                <img
                  src="/assets/certificates/gst-certificate.webp"
                  alt="GST registration certificate (Form GST REG-06) for Nirmal Industries"
                  loading="lazy"
                  decoding="async"
                  className="aspect-[1100/1557] w-full object-cover"
                />
                <span className="shimmer pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>

              {/* seal */}
              <span className="absolute -bottom-5 -left-4 flex items-center gap-2.5 rounded-2xl border border-ink/10 bg-white/95 px-4 py-3 shadow-[0_18px_40px_-20px_rgba(10,31,68,0.4)] backdrop-blur sm:-left-8">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-deep via-blue-brand to-cyan-brand text-white">
                  <svg viewBox="0 0 24 24" fill="none" className="h-4.5 w-4.5">
                    <path d="M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6l-7-3Z M8.8 12.2l2.2 2.2 4.4-4.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span>
                  <span className="block font-display text-sm font-bold leading-tight text-ink">GST REG-06</span>
                  <span className="block text-[0.64rem] uppercase tracking-[0.14em] text-slate-500">Government of India</span>
                </span>
              </span>
            </a>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------- 03 PRODUCTS */}
      <section className="shell py-[clamp(3rem,8vw,7rem)]">
        <SectionHeading
          align="center"
          title={<>Complete Solutions for <span className="text-gradient">P.U., PVC &amp; EVA</span></>}
          sub="Explore our range of products developed to support different stages and requirements of footwear manufacturing."
        />

        <Stagger className="mt-[clamp(2rem,4vw,3.5rem)] grid gap-4 min-[620px]:grid-cols-2 xl:grid-cols-3">
          {PRODUCTS.map((p) => (
            <motion.div key={p.name} variants={stagItem}>
              <Link to={p.to} className="block h-full">
                <Card accent={p.accent} className="h-full">
                  <CardImage src={p.image} alt={p.name} />
                  <div className="p-[clamp(1.15rem,2.2vw,1.75rem)]">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-[clamp(1.1rem,1.3vw,1.45rem)] font-bold leading-tight text-ink">{p.name}</h3>
                      <span
                        className="mt-1 h-3 w-3 shrink-0 rounded-full transition-transform duration-500 group-hover:scale-150"
                        style={{ background: p.accent, boxShadow: `0 0 16px -2px ${p.accent}` }}
                      />
                    </div>
                    <p className="mt-1.5 text-[0.85rem] font-semibold text-blue-brand">{p.tag}</p>
                    {p.body.map((b) => (
                      <p key={b} className="mt-3 text-[clamp(0.8rem,0.35vw+0.72rem,0.9rem)] leading-relaxed text-slate-500 pretty">
                        {b}
                      </p>
                    ))}
                    <span className="mt-5 inline-flex items-center gap-1.5 text-[0.8rem] font-semibold text-blue-brand">
                      {p.cta} <Arrow className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </Stagger>
      </section>

      {/* ------------------------------------------------ 04 WHY TURBOTECH */}
      <section id="why-turbotech" className="shell scroll-mt-24 py-[clamp(3rem,8vw,7rem)]">
        <SectionHeading
          title={<>More Than Chemicals. <span className="text-gradient">Solutions for Better Manufacturing.</span></>}
          sub="Every manufacturing process has its own requirements. That's why Turbotech focuses on solutions that address practical production needs — from colour and mould release to adhesion, finish and material performance."
        />

        <Stagger className="mt-[clamp(2rem,4vw,3.5rem)] grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          {WHY.map((w, i) => (
            <motion.div key={w.t} variants={stagItem} className={i < 3 ? 'lg:col-span-2' : 'lg:col-span-3'}>
              <Card className="h-full p-[clamp(1.25rem,2.4vw,2rem)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-deep via-blue-brand to-cyan-brand text-white shadow-[0_14px_30px_-12px_rgba(0,114,206,0.7)] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                  <svg {...iconProps} className="h-6 w-6">
                    {w.icon}
                  </svg>
                </div>
                <h3 className="mt-5 font-display text-[clamp(1.05rem,1vw+0.8rem,1.3rem)] font-bold text-ink">{w.t}</h3>
                <p className="mt-2 text-[clamp(0.82rem,0.35vw+0.74rem,0.95rem)] leading-relaxed text-slate-500 pretty">{w.d}</p>
              </Card>
            </motion.div>
          ))}
        </Stagger>
      </section>

      {/* ---------------------------------------- 05 PROBLEM / SOLUTION */}
      <section className="shell py-[clamp(3rem,8vw,7rem)]">
        <SectionHeading
          title={<>Every Production Challenge Needs <span className="text-gradient">the Right Chemistry.</span></>}
        />

        <Stagger className="mt-[clamp(2rem,4vw,3.5rem)] grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {PROBLEMS.map((p) => (
            <motion.div key={p.q} variants={stagItem}>
              <Card accent={p.accent} className="h-full">
                <CardImage src={p.image} alt={p.alt} className="aspect-[16/9]" />
                <div className="p-[clamp(1.15rem,2.2vw,1.6rem)]">
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display text-base font-extrabold text-white"
                      style={{ background: p.accent }}
                      aria-hidden="true"
                    >
                      ?
                    </span>
                    <h3 className="font-display text-[clamp(1rem,0.8vw+0.8rem,1.2rem)] font-bold leading-snug text-ink">{p.q}</h3>
                  </div>
                </div>
                <div className="flex items-start gap-3 border-t border-dashed border-ink/12 p-[clamp(1.15rem,2.2vw,1.6rem)]">
                  <svg {...iconProps} className="mt-0.5 h-5 w-5 shrink-0 text-blue-brand transition-transform duration-500 group-hover:translate-x-1">
                    <path d="M5 12h13m0 0-5-5m5 5-5 5" />
                  </svg>
                  <p className="text-[clamp(0.84rem,0.35vw+0.76rem,0.95rem)] leading-relaxed text-slate-600 pretty">{p.a}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </Stagger>

        <Reveal delay={0.1} className="mt-[clamp(2rem,4vw,3rem)] flex justify-center">
          <Button to="/contact">
            Find Your Solution <Arrow />
          </Button>
        </Reveal>
      </section>

      {/* ------------------------------------------------ 06 APPLICATIONS */}
      <section id="applications" className="shell scroll-mt-24 py-[clamp(3rem,8vw,7rem)]">
        <SectionHeading
          title={<>Made for the <span className="text-gradient">Footwear Industry</span></>}
          sub="From everyday footwear to demanding industrial applications, Turbotech solutions are designed to support a wide range of footwear manufacturing requirements."
        />
        <ImageRail items={APPLICATIONS} />
      </section>

      {/* ------------------------------------------------ 07 PERFORMANCE */}
      <section className="shell py-[clamp(3rem,8vw,7rem)]">
        <div className="grid items-start gap-[clamp(2rem,5vw,4.5rem)] lg:grid-cols-[0.9fr_1.1fr]">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              title={<>Performance You Can See. <span className="text-gradient">Quality You Can Feel.</span></>}
              sub="From the colour of a finished sole to the smoothness of its surface, every detail matters."
            />
            <Reveal delay={0.1}>
              <p className="mt-5 font-display text-[clamp(0.95rem,0.5vw+0.84rem,1.1rem)] font-semibold text-ink">
                Turbotech solutions are developed around key performance requirements including:
              </p>
            </Reveal>
          </div>

          <div>
            <Stagger className="grid grid-cols-2 gap-3 sm:gap-4" gap={0.07}>
              {PERFORMANCE.map((f, i) => (
                <motion.div key={f.t} variants={stagItem}>
                  <Card accent={f.hex} className="h-full p-[clamp(1rem,2vw,1.4rem)]">
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink/6">
                      {/* Driven by the grid's show variant, not its own whileInView:
                          at scaleX 0 the bar has no area, so observing it is unreliable. */}
                      <motion.div
                        variants={{
                          hide: { scaleX: 0 },
                          show: { scaleX: 1, transition: { duration: 1.1, delay: 0.25 + i * 0.07, ease: [0.16, 1, 0.3, 1] } },
                        }}
                        className="h-full origin-left rounded-full"
                        style={{ background: `linear-gradient(90deg, ${f.hex}66, ${f.hex})` }}
                      />
                    </div>
                    <p className="mt-4 font-display text-[clamp(0.92rem,0.7vw+0.75rem,1.15rem)] font-bold leading-tight text-ink">
                      {f.t}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </Stagger>
            <Reveal delay={0.1}>
              <p className="mt-6 text-[clamp(0.88rem,0.45vw+0.78rem,1rem)] leading-relaxed text-slate-600/85 pretty">
                Our product range combines these performance characteristics across different applications and product
                categories.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ 08 BRAND STORY */}
      <section className="relative overflow-hidden py-[clamp(3.5rem,9vw,8rem)]">
        <img
          src="/assets/img/process-sole-machine.webp"
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-paper/90" />
        <div className="absolute inset-0 bg-gradient-to-b from-paper via-transparent to-paper" />

        <div className="shell relative">
          <SectionHeading
            align="center"
            title={<>From Colour to Compound, <span className="text-gradient">We Understand the Process.</span></>}
            sub="Footwear manufacturing is not just about the final product. It is about hundreds of small decisions that come together during production."
          />

          <div className="mt-[clamp(2.5rem,5vw,4rem)]">
            <Timeline items={THE_RIGHT} />
          </div>

          <Reveal delay={0.05}>
            <p className="mx-auto mt-[clamp(2.5rem,5vw,4rem)] max-w-3xl text-center text-[clamp(0.9rem,0.55vw+0.8rem,1.08rem)] leading-relaxed text-slate-600 pretty">
              Turbotech brings these requirements together through a focused portfolio of PU, PVC and EVA solutions,
              helping manufacturers find the chemistry suited to their application.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-6 max-w-3xl text-center font-display text-[clamp(1.2rem,2.2vw,1.9rem)] font-extrabold leading-tight tracking-tight text-ink balance">
              One Brand. Multiple Solutions. <span className="text-gradient">One Focus — Better Footwear.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------ 09 VISUAL CTA */}
      <section className="shell py-[clamp(3rem,7vw,6rem)]">
        <Reveal>
          <div className="group relative overflow-hidden rounded-[clamp(1rem,2vw,1.75rem)] shadow-[0_40px_80px_-40px_rgba(10,31,68,0.6)]">
            <img
              src="/assets/img/shade-pigments.webp"
              alt=""
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#020a1c]/95 via-[#020a1c]/80 to-[#020a1c]/30" />
            <div className="relative max-w-2xl px-[clamp(1.4rem,5vw,4.5rem)] py-[clamp(2.5rem,7vw,5.5rem)]">
              <h2 className="font-display text-[clamp(1.6rem,4vw,3.2rem)] font-extrabold leading-[1.08] tracking-tight text-white balance">
                Let’s Create Better Footwear, Together.
              </h2>
              <p className="mt-4 text-[clamp(0.9rem,0.55vw+0.8rem,1.08rem)] leading-relaxed text-slate-200/90 pretty">
                Looking for the right pigment, release agent, IMC, EVA compound, PVC compound or specialty chemical for
                your application?
              </p>
              <p className="mt-3 font-display text-[clamp(0.95rem,0.5vw+0.84rem,1.1rem)] font-semibold text-cyan-soft">
                Talk to the Turbotech team about your requirement.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button to="/contact">
                  Get a Quote <Arrow />
                </Button>
                <Button to="/contact" variant="ghost">
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ------------------------------------------------ 10 CONTACT */}
      <section className="shell py-[clamp(3rem,7vw,6rem)]">
        <div className="grid items-center gap-[clamp(2rem,5vw,4rem)] lg:grid-cols-[1fr_1fr]">
          <div>
            <SectionHeading
              title={<>Let’s Talk About <span className="text-gradient">Your Requirement.</span></>}
              sub="Have a product requirement or need help choosing the right solution?"
            />
            <Reveal delay={0.1}>
              <p className="mt-3 text-[clamp(0.9rem,0.6vw+0.78rem,1.08rem)] leading-relaxed text-slate-600/85 pretty">
                Send us your details and our team will get in touch with you.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <Card interactive={false} className="p-[clamp(1.4rem,3vw,2.25rem)]">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-brand/12 text-blue-brand">
                  <svg {...iconProps} className="h-5 w-5">
                    <path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12Z M12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                  </svg>
                </span>
                <address className="not-italic">
                  <p className="font-display text-lg font-bold text-ink">{company.legal}</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    Plot No. 128, Khasra No. 69,
                    <br />
                    Village Singhola, Delhi – 110040
                  </p>
                </address>
              </div>

              <div className="mt-6 grid gap-6 border-t border-ink/10 pt-6 sm:grid-cols-[auto_1fr] sm:gap-x-10">
                <div>
                  <p className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Call Us</p>
                  <ul className="mt-2.5 space-y-1.5">
                    {PHONES.map((p) => (
                      <li key={p}>
                        <a
                          href={`tel:${p.replace(/\s/g, '')}`}
                          className="font-display text-[0.98rem] font-semibold text-ink transition-colors hover:text-blue-brand"
                        >
                          {p}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Email Us</p>
                  <a
                    href={`mailto:${company.email}`}
                    className="mt-2.5 block font-display text-[0.98rem] font-semibold text-ink transition-colors [overflow-wrap:anywhere] hover:text-blue-brand"
                  >
                    {company.email}
                  </a>
                </div>
              </div>

              <div className="mt-7">
                <Button to="/contact">
                  Send an Enquiry <Arrow />
                </Button>
              </div>
            </Card>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------- 11 FINAL CTA
          Dark blue, and with half the usual breathing room: the negative bottom
          margin eats half of the footer's top margin. */}
      <section className="shell py-[clamp(1rem,2.5vw,2rem)] -mb-[clamp(2rem,5vw,4.5rem)]">
        <Reveal>
          <div className="relative overflow-hidden rounded-[clamp(1rem,2vw,1.75rem)] bg-gradient-to-br from-navy via-blue-deep to-navy px-[clamp(1.25rem,4vw,4rem)] py-[clamp(2.5rem,6vw,5rem)] text-center shadow-[0_40px_80px_-40px_rgba(0,42,107,0.8)]">
            <div className="anim-drift pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(0,191,254,0.45),transparent_65%)] blur-2xl" />
            <div className="anim-drift pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(252,0,101,0.35),transparent_65%)] blur-2xl" style={{ animationDelay: '-11s' }} />
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                backgroundSize: '48px 48px',
                maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, #000 30%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, #000 30%, transparent 100%)',
              }}
            />
            <div className="relative">
              <h2 className="mx-auto max-w-3xl font-display text-[clamp(1.5rem,4vw,3rem)] font-extrabold leading-tight tracking-tight text-white balance">
                Everything You Need to Move Your Production Forward.
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-[clamp(0.88rem,0.5vw+0.78rem,1.05rem)] leading-relaxed text-slate-200/85 pretty">
                Explore Turbotech's range of P.U., PVC &amp; EVA footwear solutions and find the chemistry that fits your
                application.
              </p>
              <div className="mt-8 flex justify-center">
                <Button to="/products">
                  Explore Products <Arrow />
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  )
}
