import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'motion/react'
import { Arrow, Button, Card, Eyebrow, Marquee, Reveal, Stagger, stagItem } from '../components/ui'
import { company } from '../data/products'
import { productPages } from '../data/productPages'

/* ------------------------------------------------------------------
   Product page template. All copy comes from src/data/productPages.js;
   this file only decides how each kind of section looks and moves.
------------------------------------------------------------------- */

const EASE = [0.16, 1, 0.3, 1]
const iconProps = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' }

const ICONS = {
  drop: <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5" />,
  sun: <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z M12 2v2 M12 20v2 M4.9 4.9l1.4 1.4 M17.7 17.7l1.4 1.4 M2 12h2 M20 12h2 M4.9 19.1l1.4-1.4 M17.7 6.3l1.4-1.4" />,
  flame: <path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2.5 1.5-4 2.5-5 .3 1.7 1.2 2.7 2.5 3-.8-2.8-.5-5.4 0-8Z" />,
  flask: <path d="M9 3h6 M10 3v6L4.5 18.5A1.7 1.7 0 0 0 6 21h12a1.7 1.7 0 0 0 1.5-2.5L14 9V3 M7 15h10" />,
  shield: <path d="M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6l-7-3Z M8.8 12.2l2.2 2.2 4.4-4.6" />,
  sparkle: <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8Z M19 15.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7Z" />,
  clock: <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z M12 7v5l3 2" />,
  repeat: <path d="M17 2l4 4-4 4 M3 11v-1a4 4 0 0 1 4-4h14 M7 22l-4-4 4-4 M21 13v1a4 4 0 0 1-4 4H3" />,
  link: <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1 M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />,
  puzzle: <path d="M4 7h3a2 2 0 1 1 4 0h3v3a2 2 0 1 1 0 4v3h-3a2 2 0 1 0-4 0H4v-3a2 2 0 1 0 0-4Z" />,
  dots: <path d="M6 6h.01 M12 6h.01 M18 6h.01 M6 12h.01 M12 12h.01 M18 12h.01 M6 18h.01 M12 18h.01 M18 18h.01" />,
  wave: <path d="M2 12c2.5-4 5-4 7.5 0s5 4 7.5 0 3.5-3 5-2" />,
  feather: <path d="M20 4c-6 0-12 4-13 13l-3 3 M7 17c4 0 8-1 10-5 M9 13h6" />,
  pulse: <path d="M3 12h4l2-5 4 10 2-5h6" />,
  cube: <path d="M12 3 3 8l9 5 9-5-9-5Z M3 8v8l9 5 9-5V8 M12 13v8" />,
  gear: <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-2.9-1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0-1.2-2.9H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.2-2.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 2.9-1.2V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 2.9 1.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0 1.2 2.9h.1a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" />,
  tag: <path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9-9-9Z M7.5 7.5h.01" />,
  arrows: <path d="M7 7h10v10 M7 17 17 7" />,
  layers: <path d="M12 3 3 8l9 5 9-5-9-5Z M3 13l9 5 9-5 M3 17.5l9 5 9-5" />,
  pin: <path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12Z M12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />,
  truck: <path d="M3 6h11v10H3Z M14 10h4l3 3v3h-7 M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z M17.5 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />,
  globe: <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z M3 12h18 M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3Z" />,
  box: <path d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5Z M3 7.5l9 4.5 9-4.5 M12 12v9" />,
  eye: <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />,
  bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />,
  leaf: <path d="M5 21c0-9 5-15 16-16-1 11-7 16-16 16Z M5 21l8-8" />,
}

/* Picks an icon from the words in a card title. */
const ICON_RULES = [
  [/uv|light fast|weather|sun/i, 'sun'],
  [/heat|thermal/i, 'flame'],
  [/chemical|compatib/i, 'flask'],
  [/colour|shade|pigment|stain|discolour/i, 'drop'],
  [/dispersion/i, 'dots'],
  [/migration/i, 'arrows'],
  [/abrasion|scratch|durable|strength/i, 'shield'],
  [/adhesion/i, 'link'],
  [/flexib/i, 'wave'],
  [/lightweight/i, 'feather'],
  [/shock|elastic|resilien/i, 'pulse'],
  [/water|moisture/i, 'drop'],
  [/dimension|stability/i, 'cube'],
  [/processing|application/i, 'gear'],
  [/cost/i, 'tag'],
  [/drying/i, 'clock'],
  [/consistent|release/i, 'repeat'],
  [/residue|build-up|surface|finish/i, 'sparkle'],
  [/opacity|transparen/i, 'eye'],
  [/static/i, 'bolt'],
  [/phthalate/i, 'leaf'],
]
const iconFor = (t) => ICONS[ICON_RULES.find(([re]) => re.test(t))?.[1] ?? 'layers']

function Icon({ name, title, className = 'h-5 w-5' }) {
  return (
    <svg {...iconProps} className={className} aria-hidden="true">
      {name ? ICONS[name] : iconFor(title)}
    </svg>
  )
}

/* Heading with the `hl` part drawn in the brand gradient. */
function Title({ text, hl }) {
  const i = hl ? text.lastIndexOf(hl) : -1
  if (i < 0) return text
  return (
    <>
      {text.slice(0, i)}
      <span className="text-gradient">{hl}</span>
      {text.slice(i + hl.length)}
    </>
  )
}

function Check({ color, className = 'mt-0.5 h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`shrink-0 ${className}`} style={{ color }} aria-hidden="true">
      <motion.path
        d="m5 13 4 4L19 7"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
      />
    </svg>
  )
}

/* Smooth-scrolls to an in-page anchor, via Lenis when it is running. */
function scrollToHash(e, hash) {
  const el = document.getElementById(hash.slice(1))
  if (!el) return
  e.preventDefault()
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -90 })
  else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' })
}

function Cta({ to, label, variant }) {
  if (to.startsWith('#'))
    return (
      <Button href={to} variant={variant} onClick={(e) => scrollToHash(e, to)}>
        {label} {!variant && <Arrow />}
      </Button>
    )
  return (
    <Button to={to} variant={variant}>
      {label} {!variant && <Arrow />}
    </Button>
  )
}

/* ---------------- shared text blocks ---------------- */
const pCls = 'text-[clamp(0.9rem,0.5vw+0.8rem,1.05rem)] leading-relaxed text-slate-600/90 pretty'
const h2Cls = 'font-display text-[clamp(1.6rem,4vw,3.1rem)] font-extrabold leading-[1.08] tracking-tight balance'

function Paras({ items, className = '', first = false, delay = 0.08 }) {
  if (!items?.length) return null
  return items.map((t, i) => (
    <Reveal key={t} delay={delay + i * 0.05}>
      <p
        className={`${i ? 'mt-4' : className} ${
          first && i === 0
            ? 'font-display text-[clamp(1rem,0.6vw+0.88rem,1.2rem)] font-semibold leading-snug text-ink pretty'
            : pCls
        }`}
      >
        {t}
      </p>
    </Reveal>
  ))
}

function Note({ children }) {
  if (!children) return null
  return (
    <Reveal delay={0.1}>
      <p className="mt-5 inline-flex items-start gap-2 rounded-xl border border-dashed border-ink/15 bg-white/60 px-3.5 py-2.5 text-[0.8rem] leading-relaxed text-slate-500">
        <svg {...iconProps} className="mt-0.5 h-4 w-4 shrink-0 text-blue-brand" aria-hidden="true">
          <path d="M7 3h7l5 5v13H7Z M14 3v5h5 M10 13h6 M10 17h6" />
        </svg>
        {children}
      </p>
    </Reveal>
  )
}

function Lead({ children }) {
  if (!children) return null
  return (
    <Reveal delay={0.1}>
      <p className="mt-6 font-display text-[clamp(0.95rem,0.5vw+0.84rem,1.1rem)] font-bold text-ink">{children}</p>
    </Reveal>
  )
}

function Heading({ s, n, className = '', center = false }) {
  return (
    <div className={`${center ? 'mx-auto max-w-3xl text-center' : ''} ${className}`}>
      <Reveal>
        <span className={`flex items-center gap-3 font-display text-xs font-bold tracking-[0.24em] text-slate-400 ${center ? 'justify-center' : ''}`}>
          <span className="text-blue-brand">{String(n).padStart(2, '0')}</span>
          <span className="h-px w-10 bg-gradient-to-r from-blue-brand/60 to-transparent" />
        </span>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className={`mt-4 ${h2Cls}`}>
          <Title text={s.heading} hl={s.hl} />
        </h2>
      </Reveal>
    </div>
  )
}

function Badges({ items, accent }) {
  if (!items?.length) return null
  return (
    <Stagger className="mt-6 flex flex-wrap gap-2" gap={0.07}>
      {items.map((b) => (
        <motion.span
          key={b}
          variants={stagItem}
          className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/85 px-3.5 py-2 text-[0.74rem] font-semibold text-ink shadow-[0_8px_20px_-14px_rgba(10,31,68,0.4)]"
        >
          <span className="h-2 w-2 rounded-full" style={{ background: accent, boxShadow: `0 0 10px ${accent}` }} />
          {b}
        </motion.span>
      ))}
    </Stagger>
  )
}

function BulletGrid({ items, accent, cols = 'min-[480px]:grid-cols-2' }) {
  return (
    <Stagger className={`mt-4 grid gap-2.5 ${cols}`} gap={0.045}>
      {items.map((b) => (
        <motion.div
          key={b}
          variants={stagItem}
          className="group flex items-center gap-3 rounded-xl border border-ink/8 bg-white/80 px-4 py-3 shadow-[0_6px_18px_-14px_rgba(10,31,68,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/15 hover:bg-white"
        >
          <span
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110"
            style={{ background: `${accent}1f` }}
          >
            <Check color={accent} className="h-4 w-4" />
          </span>
          <span className="text-[clamp(0.84rem,0.3vw+0.78rem,0.95rem)] font-medium text-ink">{b}</span>
        </motion.div>
      ))}
    </Stagger>
  )
}

/* Image that drifts a little slower than the page. */
function ParallaxImage({ src, alt = '', className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-9%', '9%'])
  return (
    <div ref={ref} className={`${className.includes('absolute') ? '' : 'relative'} overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        style={{ y, scale: 1.2 }}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  )
}

/* ================================================================== HERO */
function Hero({ page }) {
  const { hero, accent, image, name } = page
  const words = hero.title.split(' ')
  const hlStart = hero.hl ? hero.title.lastIndexOf(hero.hl) : -1
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -60])

  let offset = 0
  return (
    <section ref={ref} className="relative overflow-hidden pt-[clamp(6.5rem,14vw,9.5rem)] pb-[clamp(2rem,5vw,4rem)]">
      <div
        className="anim-drift pointer-events-none absolute -right-[10%] top-0 h-[42rem] w-[42rem] max-w-[90vw] rounded-full opacity-50 blur-[90px]"
        style={{ background: `radial-gradient(circle, ${accent}55, transparent 65%)` }}
      />

      <div className="shell relative grid items-start gap-[clamp(2rem,5vw,4rem)] lg:grid-cols-[1.1fr_0.9fr]">
        {/* Copy */}
        <div className="order-2 lg:order-1">
          <motion.nav
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-[0.78rem] font-semibold text-slate-500"
          >
            <Link to="/products" className="transition-colors hover:text-blue-brand">
              Products
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-ink">{name}</span>
          </motion.nav>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05, ease: EASE }} className="mt-5">
            <Eyebrow>{name}</Eyebrow>
          </motion.div>

          <h1 className="mt-5 font-display text-[clamp(2rem,6.2vw,4.4rem)] font-extrabold leading-[1.04] tracking-[-0.02em] balance">
            {words.map((w, i) => {
              const start = offset
              offset += w.length + 1
              const inHl = hlStart >= 0 && start >= hlStart
              return (
                <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                  <motion.span
                    initial={{ y: '105%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 + i * 0.06, ease: EASE }}
                    className={`inline-block ${inHl ? 'text-gradient' : ''}`}
                  >
                    {w}
                  </motion.span>
                  {i < words.length - 1 && ' '}
                </span>
              )
            })}
          </h1>

          {hero.sub && (
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
              className="mt-4 font-display text-[clamp(1.05rem,1vw+0.8rem,1.4rem)] font-semibold leading-snug"
              style={{ color: accent === '#5ad6ff' ? '#0072ce' : accent }}
            >
              {hero.sub}
            </motion.p>
          )}

          {hero.paras.map((t, i) => (
            <motion.p
              key={t}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 + i * 0.08, ease: EASE }}
              className={`mt-4 max-w-2xl ${i === 0 ? 'text-[clamp(0.95rem,0.6vw+0.84rem,1.14rem)] text-slate-700' : 'text-[clamp(0.88rem,0.45vw+0.8rem,1.02rem)] text-slate-600/85'} leading-relaxed pretty`}
            >
              {t}
            </motion.p>
          ))}

          {hero.highlight && (
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65, ease: EASE }}
              className="mt-6 flex max-w-2xl gap-3 rounded-2xl border border-ink/10 bg-white/75 p-4 text-[clamp(0.86rem,0.4vw+0.78rem,0.98rem)] font-medium leading-relaxed text-ink shadow-[0_14px_34px_-22px_rgba(10,31,68,0.35)] backdrop-blur"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white" style={{ background: `linear-gradient(135deg, #004da5, ${accent})` }}>
                <Icon name="pin" className="h-4.5 w-4.5" />
              </span>
              <span>{hero.highlight}</span>
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75, ease: EASE }}
            className="mt-8 flex flex-wrap gap-3"
          >
            {hero.ctas.map((c) => (
              <Cta key={c.label} {...c} />
            ))}
          </motion.div>
        </div>

        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.1, ease: EASE }}
          className="relative order-1 lg:sticky lg:top-28 lg:order-2"
        >
          {/* spinning gradient ring */}
          <div className="pointer-events-none absolute -inset-3 rounded-[2rem] opacity-70 blur-[2px] sm:-inset-4">
            <div
              className="h-full w-full animate-[spin_14s_linear_infinite] rounded-[2rem]"
              style={{ background: `conic-gradient(from 0deg, transparent 0 55%, ${accent} 70%, #0072ce 82%, transparent 92%)`, maskImage: 'radial-gradient(closest-side, transparent 96%, #000 97%)' }}
            />
          </div>

          <motion.div
            initial={{ clipPath: 'inset(12% 12% 12% 12% round 1.75rem)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0% round 1.75rem)' }}
            transition={{ duration: 1.3, delay: 0.15, ease: EASE }}
            className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-ink/10 shadow-[0_40px_80px_-40px_rgba(10,31,68,0.55)] lg:aspect-[4/5]"
          >
            <motion.img
              src={image}
              alt={name}
              style={{ y: imgY }}
              initial={{ scale: 1.25 }}
              animate={{ scale: 1.12 }}
              transition={{ duration: 1.8, ease: EASE }}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 mix-blend-multiply" style={{ background: `linear-gradient(160deg, transparent 35%, ${accent}66)` }} />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#020a1c]/75 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-[clamp(1rem,2.5vw,1.6rem)]">
              <span className="font-display text-[clamp(1.5rem,4.5vw,2.6rem)] font-extrabold tracking-tight text-white drop-shadow-[0_2px_22px_rgba(0,0,0,0.5)]">
                {name}
              </span>
              <span className="mb-1 shrink-0 rounded-full bg-white/15 px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur">
                Turbotech
              </span>
            </div>
            <span className="shimmer pointer-events-none absolute inset-0 opacity-40" />
          </motion.div>

          {/* floating property chips */}
          <motion.div style={{ y: cardY }} className="pointer-events-none absolute inset-0 hidden sm:block">
            {hero.chips?.slice(0, 3).map((c, i) => (
              <motion.div
                key={c}
                initial={{ opacity: 0, x: i % 2 ? 24 : -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.9 + i * 0.15, ease: EASE }}
                className={`absolute ${['-left-6 top-[12%]', '-right-5 top-[42%]', '-left-3 bottom-[22%]'][i]}`}
              >
                <div className="anim-float flex items-center gap-2.5 rounded-2xl border border-ink/10 bg-white/90 px-3.5 py-2.5 shadow-[0_18px_40px_-20px_rgba(10,31,68,0.5)] backdrop-blur" style={{ animationDelay: `${-i * 2.3}s` }}>
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl text-white" style={{ background: `linear-gradient(135deg, #0072ce, ${accent})` }}>
                    <Icon title={c} className="h-4 w-4" />
                  </span>
                  <span className="font-display text-[0.8rem] font-bold text-ink">{c}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {hero.swatches && (
            <div className="absolute -bottom-5 right-6 flex -space-x-2">
              {['#fc0065', '#ff7a00', '#ffc400', '#00c26e', '#00bffe', '#7a3cff'].map((c, i) => (
                <motion.span
                  key={c}
                  initial={{ opacity: 0, y: 16, scale: 0.6 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.2 + i * 0.07, ease: EASE }}
                  className="h-9 w-9 rounded-full border-[3px] border-white shadow-[0_8px_18px_-8px_rgba(10,31,68,0.5)]"
                  style={{ background: c }}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

/* ================================================================== SECTIONS */

function Prose({ s, n, accent }) {
  if (s.layout === 'band') return <Band s={s} n={n} accent={accent} />

  if (s.layout === 'image' || s.layout === 'finish') {
    const flip = n % 2 === 0
    return (
      <section className="shell py-[clamp(3rem,8vw,6.5rem)]">
        <div className="grid items-center gap-[clamp(2rem,5vw,4.5rem)] lg:grid-cols-2">
          <Reveal className={`relative ${flip ? 'lg:order-2' : ''}`}>
            {s.layout === 'finish' ? (
              <FinishVisual accent={accent} />
            ) : (
              <div className="relative">
                <div className="absolute -inset-3 rounded-[2rem] opacity-60 blur-2xl" style={{ background: `radial-gradient(circle at 30% 30%, ${accent}55, transparent 70%)` }} />
                <ParallaxImage src={s.image} className="aspect-[4/3] rounded-[clamp(1rem,2vw,1.75rem)] border border-ink/10 shadow-[0_30px_70px_-35px_rgba(10,31,68,0.45)]" />
                <span
                  className="absolute -bottom-4 flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-[0_18px_40px_-16px_rgba(0,77,165,0.7)] max-sm:hidden"
                  style={{ background: `linear-gradient(135deg, #004da5, ${accent})`, [flip ? 'left' : 'right']: '-1rem' }}
                >
                  <Icon title={s.heading} className="h-7 w-7" />
                </span>
              </div>
            )}
          </Reveal>
          <div>
            <Heading s={s} n={n} />
            <Paras items={s.paras} className="mt-5" first />
            <Badges items={s.badges} accent={accent} />
            <Paras items={s.after} className="mt-5" />
          </div>
        </div>
      </section>
    )
  }

  if (s.layout === 'features') {
    return (
      <section className="shell py-[clamp(3rem,8vw,6.5rem)]">
        <div className="grid items-start gap-[clamp(2rem,5vw,4.5rem)] lg:grid-cols-[0.95fr_1.05fr]">
          <div className="lg:sticky lg:top-28">
            <Heading s={s} n={n} />
            <Paras items={s.paras} className="mt-5" first />
          </div>
          <div className="glass rounded-[clamp(1rem,2vw,1.75rem)] p-[clamp(1.1rem,2.6vw,2rem)]">
            <Reveal>
              <p className="font-display text-[clamp(0.95rem,0.5vw+0.84rem,1.1rem)] font-bold text-ink">{s.lead}</p>
            </Reveal>
            <BulletGrid items={s.bullets} accent={accent} />
            <Note>{s.note}</Note>
          </div>
        </div>
      </section>
    )
  }

  // split: sticky heading left, reading column right
  return (
    <section className="shell py-[clamp(3rem,8vw,6.5rem)]">
      <div className="grid items-start gap-[clamp(1.5rem,5vw,4.5rem)] lg:grid-cols-[0.85fr_1.15fr]">
        <div className="lg:sticky lg:top-28">
          <Heading s={s} n={n} />
          <Reveal delay={0.1}>
            <motion.div initial="hide" whileInView="show" viewport={{ once: true }} className="mt-6 h-1 w-24 overflow-hidden rounded-full bg-ink/8">
              <motion.div
                variants={{ hide: { x: '-100%' }, show: { x: 0, transition: { duration: 1.2, delay: 0.2, ease: EASE } } }}
                className="h-full w-full rounded-full"
                style={{ background: `linear-gradient(90deg, #0072ce, ${accent})` }}
              />
            </motion.div>
          </Reveal>
        </div>
        <div className="border-l-2 border-ink/8 pl-[clamp(1rem,2.5vw,2rem)]">
          <Paras items={s.paras} first />
          <Lead>{s.lead}</Lead>
          {s.bullets && <BulletGrid items={s.bullets} accent={accent} />}
          <Note>{s.note}</Note>
          <Paras items={s.after} className="mt-5" />
        </div>
      </div>
    </section>
  )
}

function Band({ s, n, accent }) {
  return (
    <section className="relative overflow-hidden py-[clamp(3.5rem,9vw,7.5rem)]">
      <ParallaxImage src={s.image} className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#020a1c]/95 via-[#04102a]/88 to-[#002a6b]/85" />
      <div className="anim-drift pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full blur-3xl" style={{ background: `radial-gradient(circle, ${accent}55, transparent 65%)` }} />

      <div className="shell relative">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <span className="font-display text-xs font-bold tracking-[0.24em] text-cyan-soft">{String(n).padStart(2, '0')}</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 font-display text-[clamp(1.5rem,3.8vw,3rem)] font-extrabold leading-[1.1] tracking-tight text-white balance">{s.heading}</h2>
          </Reveal>
        </div>

        <Stagger className="mt-[clamp(2rem,4vw,3.5rem)] grid gap-4 md:grid-cols-3" gap={0.1}>
          {s.paras.map((t, i) => (
            <motion.div
              key={t}
              variants={stagItem}
              className="rounded-2xl border border-white/10 bg-white/[0.06] p-[clamp(1.2rem,2.2vw,1.75rem)] backdrop-blur-md transition-colors duration-500 hover:bg-white/[0.1]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-cyan-soft">
                <Icon name={['pin', 'truck', 'globe'][i % 3]} />
              </span>
              <p className="mt-4 text-[clamp(0.86rem,0.4vw+0.78rem,0.98rem)] leading-relaxed text-slate-200/90 pretty">{t}</p>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  )
}

/* Two sample tiles: one with a moving highlight (gloss), one flat (matte). */
function FinishVisual({ accent, compact = false }) {
  const tiles = [
    { k: 'Gloss', bg: `linear-gradient(135deg, #0a1f44, ${accent === '#5ad6ff' ? '#0072ce' : accent} 60%, #5ad6ff)`, gloss: true },
    { k: 'Matte', bg: 'linear-gradient(135deg, #1f2a3d, #3a4a63)', gloss: false },
  ]
  return (
    <div className={`grid grid-cols-2 gap-4 ${compact ? '' : 'sm:gap-5'}`}>
      {tiles.map((t, i) => (
        <motion.div
          key={t.k}
          initial={{ opacity: 0, y: 30, rotate: i ? 3 : -3 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: i * 0.12, ease: EASE }}
          className={`group relative overflow-hidden rounded-[clamp(1rem,2vw,1.5rem)] shadow-[0_30px_60px_-30px_rgba(10,31,68,0.6)] ${compact ? 'aspect-[5/3]' : 'aspect-[3/4]'}`}
          style={{ background: t.bg }}
        >
          {t.gloss ? (
            <>
              <span className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent" />
              <motion.span
                className="absolute -inset-y-4 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                animate={{ x: ['-150%', '400%'] }}
                transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 1.2, ease: 'easeInOut' }}
              />
            </>
          ) : (
            <span
              className="absolute inset-0 opacity-40"
              style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)', backgroundSize: '4px 4px' }}
            />
          )}
          <span className="absolute bottom-3 left-3 rounded-full bg-black/30 px-3 py-1 font-display text-[0.72rem] font-bold uppercase tracking-[0.18em] text-white backdrop-blur">
            {t.k}
          </span>
        </motion.div>
      ))}
    </div>
  )
}

/* ---------------- cards ---------------- */
function Cards({ s, n, accent }) {
  if (s.layout === 'stack') return <StackCards s={s} n={n} accent={accent} />
  if (s.layout === 'products') return <SolventProducts s={s} n={n} accent={accent} />

  const cols = s.compact
    ? 'min-[480px]:grid-cols-2 lg:grid-cols-4'
    : s.cols === 2
      ? 'md:grid-cols-2'
      : s.layout === 'swatch'
        ? 'min-[560px]:grid-cols-2 lg:grid-cols-5'
        : 'min-[560px]:grid-cols-2 xl:grid-cols-3'

  return (
    <section className="shell py-[clamp(3rem,8vw,6.5rem)]">
      {s.splitIntro ? (
        <div className="grid items-start gap-[clamp(1.5rem,4vw,4rem)] lg:grid-cols-[0.8fr_1.2fr]">
          <Heading s={s} n={n} />
          <div className="grid gap-x-8 md:grid-cols-2">
            {s.paras.map((t, i) => (
              <Reveal key={t} delay={0.06 * i}>
                <p className={`${pCls} mt-4 md:mt-0 ${i > 1 ? 'md:mt-5' : ''}`}>{t}</p>
              </Reveal>
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-3xl">
          <Heading s={s} n={n} />
          <Paras items={s.paras} className="mt-5" />
          <Lead>{s.lead}</Lead>
        </div>
      )}

      <Stagger className={`mt-[clamp(1.75rem,3.5vw,3rem)] grid gap-4 ${cols}`} gap={0.07}>
        {s.items.map((it, i) => (
          <motion.div key={it.t} variants={stagItem} className={s.compact && i === s.items.length - 1 ? 'lg:col-span-1' : ''}>
            <Card accent={accent} className="h-full">
              {s.layout === 'swatch' && <Swatch kind={it.swatch} accent={accent} />}
              <div className={s.compact ? 'p-[clamp(1rem,1.8vw,1.4rem)]' : 'p-[clamp(1.2rem,2.2vw,1.75rem)]'}>
                {s.layout !== 'swatch' && (
                  <div className="flex items-center justify-between">
                    <span
                      className="flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-[0_14px_30px_-12px_rgba(0,114,206,0.7)] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
                      style={{ background: `linear-gradient(135deg, #004da5, #0072ce 45%, ${accent})` }}
                    >
                      <Icon title={it.t} className="h-6 w-6" />
                    </span>
                    <span className="font-display text-xs font-bold tracking-[0.2em] text-slate-300 transition-colors duration-500 group-hover:text-blue-brand">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                )}
                <h3 className={`${s.layout === 'swatch' ? '' : 'mt-5'} font-display text-[clamp(1rem,0.8vw+0.8rem,1.25rem)] font-bold leading-snug text-ink`}>{it.t}</h3>
                <p className="mt-2 text-[clamp(0.82rem,0.35vw+0.74rem,0.94rem)] leading-relaxed text-slate-500 pretty">{it.d}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </Stagger>

      <Note>{s.note}</Note>
      <Paras items={s.after} className="mt-6 max-w-3xl" />
    </section>
  )
}

function Swatch({ kind, accent }) {
  const checker = {
    backgroundImage:
      'linear-gradient(45deg,#e6ecf5 25%,transparent 25%),linear-gradient(-45deg,#e6ecf5 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#e6ecf5 75%),linear-gradient(-45deg,transparent 75%,#e6ecf5 75%)',
    backgroundSize: '16px 16px',
    backgroundPosition: '0 0,0 8px,8px -8px,-8px 0',
  }
  const fills = {
    opaque: { background: `linear-gradient(135deg, ${accent}, #b0004a)` },
    transparent: { background: `linear-gradient(135deg, ${accent}55, #00bffe44)` },
    bright: { background: 'linear-gradient(90deg,#fc0065,#ff7a00,#ffc400,#00c26e,#00bffe,#7a3cff)' },
    weather: { background: 'linear-gradient(180deg,#5ad6ff,#0072ce)' },
    heat: { background: 'linear-gradient(135deg,#ffb400,#c0491d 60%,#6b1d0b)' },
  }
  return (
    // The observer sits on the box, not the bar: at scaleX 0 the bar has no area to observe.
    <motion.div
      initial="hide"
      whileInView="show"
      viewport={{ once: true }}
      className="relative h-24 overflow-hidden"
      style={kind === 'transparent' ? checker : { background: '#fff' }}
    >
      <motion.div
        variants={{ hide: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1, ease: EASE } } }}
        className="absolute inset-0 origin-left"
        style={fills[kind]}
      />
      {kind === 'weather' && (
        <span className="absolute right-4 top-3 text-white/90">
          <svg {...iconProps} className="h-8 w-8 animate-[spin_12s_linear_infinite]">{ICONS.sun}</svg>
        </span>
      )}
      {kind === 'bright' && <span className="shimmer absolute inset-0" />}
    </motion.div>
  )
}

/* Sticky heading on the left; numbered cards on the right with a line that fills as you scroll. */
function StackCards({ s, n, accent }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 })

  return (
    <section className="shell py-[clamp(3rem,8vw,6.5rem)]">
      <div className="grid items-start gap-[clamp(2rem,5vw,4.5rem)] lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-28">
          <Heading s={s} n={n} />
          <Paras items={s.paras} className="mt-5" />
          <Reveal delay={0.12}>
            <div className="mt-8 hidden flex-wrap gap-2 lg:flex">
              {s.items.map((it) => (
                <span key={it.t} className="rounded-full border border-ink/10 bg-white/70 px-3 py-1.5 text-[0.7rem] font-semibold text-slate-600">
                  {it.t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <div ref={ref} className="relative pl-[clamp(1.5rem,3vw,2.5rem)]">
          <div className="absolute bottom-2 left-0 top-2 w-[3px] rounded-full bg-ink/8">
            <motion.div style={{ scaleY: fill, background: `linear-gradient(180deg, #004da5, #00bffe, ${accent})` }} className="h-full w-full origin-top rounded-full" />
          </div>
          <div className="space-y-4">
            {s.items.map((it, i) => (
              <Reveal key={it.t} delay={0.04}>
                <Card accent={accent} className="p-[clamp(1.2rem,2.4vw,1.9rem)]">
                  <div className="flex items-start gap-4">
                    <span
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white shadow-[0_14px_30px_-12px_rgba(0,114,206,0.7)] transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110"
                      style={{ background: `linear-gradient(135deg, #004da5, #0072ce 45%, ${accent})` }}
                    >
                      <Icon title={it.t} className="h-6 w-6" />
                    </span>
                    <div>
                      <span className="font-display text-[0.68rem] font-bold tracking-[0.2em] text-slate-400">{String(i + 1).padStart(2, '0')}</span>
                      <h3 className="font-display text-[clamp(1.05rem,1vw+0.8rem,1.35rem)] font-bold leading-snug text-ink">{it.t}</h3>
                      {[].concat(it.d).map((t) => (
                        <p key={t} className="mt-2.5 text-[clamp(0.84rem,0.35vw+0.76rem,0.96rem)] leading-relaxed text-slate-500 pretty">
                          {t}
                        </p>
                      ))}
                    </div>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function SolventProducts({ s, n, accent }) {
  return (
    <section className="shell py-[clamp(3rem,8vw,6.5rem)]">
      <div className="grid items-end gap-[clamp(1.5rem,4vw,4rem)] lg:grid-cols-2">
        <div>
          <Heading s={s} n={n} />
          <Lead>{s.lead}</Lead>
          <Stagger className="mt-4 flex flex-wrap gap-2" gap={0.06}>
            {s.bullets.map((b, i) => (
              <motion.a
                key={b}
                variants={stagItem}
                href={`#${s.items[i].id}`}
                onClick={(e) => scrollToHash(e, `#${s.items[i].id}`)}
                className="group inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/85 px-4 py-2.5 font-display text-[0.9rem] font-bold text-ink shadow-[0_8px_20px_-14px_rgba(10,31,68,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-brand/40"
              >
                {b}
                <Arrow className="h-3.5 w-3.5 rotate-90 text-blue-brand" />
              </motion.a>
            ))}
          </Stagger>
        </div>
        <div>
          <Paras items={s.paras2} />
        </div>
      </div>

      <div className="mt-[clamp(2rem,5vw,4rem)] space-y-5">
        {s.items.map((it, i) => (
          <Reveal key={it.id}>
            <div id={it.id} className="scroll-mt-28">
              <Card accent={accent}>
                <div className="grid md:grid-cols-[0.8fr_1.2fr]">
                  <div className={`relative min-h-[12rem] overflow-hidden ${i % 2 ? 'md:order-2' : ''}`}>
                    <img src={it.img} alt={it.t} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#020a1c]/80 via-[#020a1c]/30 to-transparent" />
                    <span className="absolute bottom-4 left-5 font-display text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-none tracking-tight text-white">{it.t}</span>
                    <span className="absolute right-4 top-4 font-display text-xs font-bold tracking-[0.2em] text-white/70">{String(i + 1).padStart(2, '0')} / 05</span>
                  </div>
                  <div className="flex flex-col justify-center p-[clamp(1.25rem,3vw,2.5rem)]">
                    <h3 className="font-display text-[clamp(1.2rem,1.5vw+0.8rem,1.75rem)] font-extrabold text-ink">{it.t}</h3>
                    {it.d.map((t) => (
                      <p key={t} className={`mt-3 ${pCls}`}>
                        {t}
                      </p>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ---------------- types ---------------- */
function Types({ s, n, accent }) {
  return (
    <section id={s.id} className="shell scroll-mt-24 py-[clamp(3rem,8vw,6.5rem)]">
      <Heading s={s} n={n} center />
      <Reveal delay={0.08}>
        <p className={`mx-auto mt-5 max-w-2xl text-center ${pCls}`}>{s.paras[0]}</p>
      </Reveal>

      <div className="mt-[clamp(2rem,4vw,3.5rem)] grid gap-5 lg:grid-cols-2">
        {s.groups.map((g, gi) => (
          <TiltCard key={g.t} delay={gi * 0.12}>
            <div className="relative h-full overflow-hidden rounded-[clamp(1rem,2vw,1.75rem)] border border-ink/10 bg-white/90 shadow-[0_30px_60px_-35px_rgba(10,31,68,0.45)]">
              <div
                className="relative overflow-hidden px-[clamp(1.25rem,3vw,2.25rem)] py-[clamp(1.5rem,3vw,2.25rem)] text-white"
                style={{ background: gi ? 'linear-gradient(135deg,#020a1c,#002a6b 60%,#004da5)' : `linear-gradient(135deg,#004da5,#0072ce 50%,${accent})` }}
              >
                <div className="anim-drift absolute -right-10 -top-16 h-48 w-48 rounded-full bg-white/15 blur-2xl" />
                <span className="font-display text-xs font-bold tracking-[0.24em] text-white/70">{String(gi + 1).padStart(2, '0')}</span>
                <h3 className="mt-2 font-display text-[clamp(1.3rem,2vw+0.8rem,2rem)] font-extrabold leading-tight">{g.t}</h3>
                {g.palette && (
                  <div className="mt-5 flex gap-2">
                    {g.palette.map((c, i) => (
                      <motion.span
                        key={c}
                        initial={{ opacity: 0, y: 12, scale: 0.5 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 + i * 0.07, ease: EASE }}
                        className="h-8 w-8 rounded-full border-2 border-white/80 shadow-[0_6px_14px_-6px_rgba(0,0,0,0.5)]"
                        style={{ background: c }}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="p-[clamp(1.25rem,3vw,2.25rem)]">
                {g.d?.map((t) => (
                  <p key={t} className={`mb-4 ${pCls}`}>
                    {t}
                  </p>
                ))}
                {g.lead && <p className="font-display text-[0.98rem] font-bold text-ink">{g.lead}</p>}
                {g.bullets && (
                  <ul className="mt-4 space-y-3">
                    {g.bullets.map((b) => (
                      <li key={b} className="flex gap-3 text-[clamp(0.86rem,0.3vw+0.8rem,0.96rem)] leading-relaxed text-slate-700">
                        <Check color={gi ? '#0072ce' : accent} />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
                {g.subs && (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {g.subs.map((sub) => (
                      <div key={sub.t} className="group overflow-hidden rounded-2xl border border-ink/10 bg-paper/70">
                        <FinishStrip gloss={sub.finish === 'gloss'} accent={accent} />
                        <div className="p-4">
                          <h4 className="font-display text-[1rem] font-bold text-ink">{sub.t}</h4>
                          <p className="mt-1.5 text-[0.86rem] leading-relaxed text-slate-500 pretty">{sub.d}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {g.after?.map((t) => (
                  <p key={t} className="mt-5 text-[0.86rem] leading-relaxed text-slate-500 pretty">
                    {t}
                  </p>
                ))}
              </div>
            </div>
          </TiltCard>
        ))}
      </div>

      {s.after?.map((t) => (
        <Reveal key={t} delay={0.1}>
          <p className="mx-auto mt-8 max-w-3xl rounded-2xl border border-ink/10 bg-white/70 p-5 text-center text-[clamp(0.88rem,0.4vw+0.8rem,1rem)] font-medium leading-relaxed text-ink pretty">
            {t}
          </p>
        </Reveal>
      ))}
    </section>
  )
}

function FinishStrip({ gloss, accent }) {
  return (
    <div
      className="relative h-16 overflow-hidden"
      style={{ background: gloss ? `linear-gradient(135deg,#0a1f44,${accent})` : 'linear-gradient(135deg,#27334a,#445571)' }}
    >
      {gloss ? (
        <>
          <span className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/35 to-transparent" />
          <motion.span
            className="absolute -inset-y-2 w-1/4 -skew-x-12 bg-gradient-to-r from-transparent via-white/70 to-transparent"
            animate={{ x: ['-150%', '500%'] }}
            transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 1.4, ease: 'easeInOut' }}
          />
        </>
      ) : (
        <span className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '4px 4px' }} />
      )}
    </div>
  )
}

/* Card that leans toward the pointer. */
function TiltCard({ children, delay = 0 }) {
  const ref = useRef(null)
  const [t, setT] = useState({ x: 0, y: 0 })
  const onMove = (e) => {
    if (!ref.current || window.matchMedia('(hover: none)').matches) return
    const r = ref.current.getBoundingClientRect()
    setT({ x: ((e.clientY - r.top) / r.height - 0.5) * -5, y: ((e.clientX - r.left) / r.width - 0.5) * 6 })
  }
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      onMouseMove={onMove}
      onMouseLeave={() => setT({ x: 0, y: 0 })}
      className="[perspective:1400px]"
    >
      <motion.div animate={{ rotateX: t.x, rotateY: t.y }} transition={{ type: 'spring', stiffness: 160, damping: 18 }} className="h-full">
        {children}
      </motion.div>
    </motion.div>
  )
}

/* ---------------- applications ---------------- */
function Apps({ s, n, accent }) {
  const cols = s.items.length === 4 ? 'md:grid-cols-2 xl:grid-cols-4' : s.items.length === 5 ? 'md:grid-cols-2 xl:grid-cols-6' : 'md:grid-cols-2 xl:grid-cols-3'
  return (
    <section className="shell py-[clamp(3rem,8vw,6.5rem)]">
      <div className="max-w-3xl">
        <Heading s={s} n={n} />
        <Paras items={s.paras} className="mt-5" />
        <Lead>{s.lead}</Lead>
      </div>

      <Stagger className={`mt-[clamp(1.75rem,3.5vw,3rem)] grid gap-4 ${cols}`} gap={0.08}>
        {s.items.map((it, i) => (
          <motion.article
            key={it.t}
            variants={stagItem}
            className={`group relative flex min-h-[22rem] flex-col justify-end overflow-hidden rounded-2xl border border-ink/10 shadow-[0_24px_50px_-30px_rgba(10,31,68,0.55)] ${
              s.items.length === 5 ? (i < 2 ? 'xl:col-span-3' : 'xl:col-span-2') : ''
            }`}
          >
            <img
              src={it.img}
              alt={it.t}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020a1c] via-[#020a1c]/65 to-[#020a1c]/5 transition-opacity duration-500 group-hover:opacity-95" />
            <span
              className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-x-100"
              style={{ background: `linear-gradient(90deg, #00bffe, ${accent})` }}
            />
            <div className="relative p-[clamp(1.2rem,2.2vw,1.75rem)]">
              <span className="font-display text-xs font-bold tracking-[0.2em] text-cyan-soft">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-2 font-display text-[clamp(1.1rem,1vw+0.85rem,1.4rem)] font-bold leading-tight text-white balance">{it.t}</h3>
              <p className="mt-2 text-[clamp(0.82rem,0.3vw+0.76rem,0.92rem)] leading-relaxed text-slate-300/95 pretty">{it.d}</p>
            </div>
          </motion.article>
        ))}
      </Stagger>

      <Note>{s.note}</Note>
      <Paras items={s.after} className="mt-6 max-w-3xl" />
    </section>
  )
}

/* ---------------- product range (release agents) ---------------- */
function Range({ s, n, accent }) {
  return (
    <section className="shell py-[clamp(3rem,8vw,6.5rem)]">
      <div className="relative overflow-hidden rounded-[clamp(1rem,2vw,1.75rem)] border border-ink/10 bg-white/80 p-[clamp(1.25rem,4vw,3.5rem)] shadow-[0_30px_70px_-40px_rgba(10,31,68,0.45)] backdrop-blur">
        <div className="anim-drift pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full blur-3xl" style={{ background: `radial-gradient(circle, ${accent}44, transparent 65%)` }} />
        <div className="relative grid items-start gap-[clamp(1.5rem,4vw,4rem)] lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Heading s={s} n={n} />
            <Paras items={s.paras} className="mt-5" />
            <Paras items={s.after} className="mt-4" />
          </div>
          <div>
            <Reveal>
              <p className="font-display text-[clamp(0.95rem,0.5vw+0.84rem,1.1rem)] font-bold text-ink">{s.lead}</p>
            </Reveal>
            <Stagger className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3" gap={0.05}>
              {s.bullets.map((b, i) => (
                <motion.div key={b.t} variants={stagItem}>
                  <Link
                    to={b.to}
                    className="group flex h-full items-center justify-between gap-2 rounded-xl border border-ink/10 bg-paper/80 px-3.5 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-brand/40 hover:bg-white hover:shadow-[0_14px_30px_-18px_rgba(0,114,206,0.6)]"
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="font-display text-[0.65rem] font-bold text-slate-400">{String(i + 1).padStart(2, '0')}</span>
                      <span className="font-display text-[0.88rem] font-bold text-ink">{b.t}</span>
                    </span>
                    <Arrow className="h-3.5 w-3.5 text-blue-brand opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </motion.div>
              ))}
            </Stagger>
            <Note>{s.note}</Note>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- supply ---------------- */
function Supply({ s, n, accent }) {
  return (
    <section className="shell py-[clamp(3rem,8vw,6.5rem)]">
      <div className="grid items-end gap-[clamp(1.5rem,4vw,4rem)] lg:grid-cols-2">
        <Heading s={s} n={n} />
        <div>
          <Paras items={s.paras} />
        </div>
      </div>
      <Lead>{s.lead}</Lead>

      <div className="relative mt-6">
        {/* connecting line */}
        <motion.div
          initial="hide"
          whileInView="show"
          viewport={{ once: true, margin: '-20% 0px' }}
          className="absolute left-0 right-0 top-[2.1rem] hidden h-[2px] bg-ink/8 lg:block"
        >
          <motion.div
            variants={{ hide: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1.6, ease: EASE } } }}
            className="h-full origin-left"
            style={{ background: `linear-gradient(90deg, #004da5, #00bffe, ${accent})` }}
          />
        </motion.div>
        <Stagger className={`grid gap-4 sm:grid-cols-2 ${s.items.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`} gap={0.14}>
          {s.items.map((it) => (
            <motion.div key={it.t} variants={stagItem}>
              <div className="relative flex h-16 w-16 items-center justify-center">
                <span className="anim-pulse-ring absolute inset-0 rounded-2xl" style={{ background: `${accent}33` }} />
                <span className="relative flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-[0_16px_34px_-14px_rgba(0,77,165,0.7)]" style={{ background: `linear-gradient(135deg, #004da5, ${accent})` }}>
                  <Icon name={it.icon} className="h-7 w-7" />
                </span>
              </div>
              <Card accent={accent} className="mt-5 p-[clamp(1.1rem,2vw,1.5rem)]">
                <h3 className="font-display text-[clamp(1rem,0.8vw+0.8rem,1.2rem)] font-bold text-ink">{it.t}</h3>
                <p className="mt-2 text-[clamp(0.82rem,0.35vw+0.74rem,0.94rem)] leading-relaxed text-slate-500 pretty">{it.d}</p>
              </Card>
            </motion.div>
          ))}
        </Stagger>
      </div>

      <Note>{s.note}</Note>
      <Paras items={s.after} className="mt-6 max-w-3xl" />
    </section>
  )
}

/* ---------------- manufacturer / supplier / exporter ---------------- */
function Trio({ s, accent }) {
  return (
    <section className="shell py-[clamp(3rem,8vw,6.5rem)]">
      <Stagger className="grid gap-4 lg:grid-cols-3" gap={0.12}>
        {s.items.map((it, i) => (
          <motion.div key={it.heading} variants={stagItem}>
            <Card accent={accent} className="h-full p-[clamp(1.3rem,2.6vw,2rem)]">
              <div className="flex items-center justify-between">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-[0_14px_30px_-12px_rgba(0,114,206,0.7)] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110" style={{ background: `linear-gradient(135deg, #004da5, #0072ce 45%, ${accent})` }}>
                  <Icon name={it.icon} className="h-7 w-7" />
                </span>
                <span className="font-display text-[2.6rem] font-extrabold leading-none text-ink/[0.06]">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h2 className="mt-6 font-display text-[clamp(1.2rem,1.2vw+0.85rem,1.6rem)] font-extrabold leading-tight tracking-tight text-ink balance">{it.heading}</h2>
              {it.paras.map((t) => (
                <p key={t} className="mt-3.5 text-[clamp(0.84rem,0.35vw+0.76rem,0.95rem)] leading-relaxed text-slate-600/90 pretty">
                  {t}
                </p>
              ))}
              {it.badges && (
                <div className="mt-5 flex flex-col gap-2">
                  {it.badges.map((b) => (
                    <span key={b} className="inline-flex items-center gap-2.5 rounded-xl border border-ink/10 bg-paper/80 px-3 py-2 text-[0.8rem] font-semibold text-ink">
                      <Check color={accent} className="h-4 w-4" />
                      {b}
                    </span>
                  ))}
                </div>
              )}
              {it.after?.map((t) => (
                <p key={t} className="mt-4 text-[clamp(0.84rem,0.35vw+0.76rem,0.95rem)] leading-relaxed text-slate-600/90 pretty">
                  {t}
                </p>
              ))}
            </Card>
          </motion.div>
        ))}
      </Stagger>
    </section>
  )
}

/* ---------------- checklist ---------------- */
function Checklist(props) {
  return props.s.style === 'grid' ? <ChecklistGrid {...props} /> : <ChecklistSteps {...props} />
}

function ChecklistSteps({ s, n, accent }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 })
  const [active, setActive] = useState(-1)
  useEffect(
    () =>
      fill.on('change', (v) => {
        const i = Math.floor(v * s.bullets.length + 0.2) - 1
        setActive((a) => (a === i ? a : i))
      }),
    [fill, s.bullets.length]
  )

  return (
    <section className="shell py-[clamp(3rem,8vw,6.5rem)]">
      <div className="grid items-start gap-[clamp(2rem,5vw,4.5rem)] lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-28">
          <Heading s={s} n={n} />
          <Paras items={s.paras} className="mt-5" />
          <Lead>{s.lead}</Lead>
          <div className="mt-6 hidden lg:block">
            {s.after?.map((t, i) => (
              <Reveal key={t} delay={0.1 + i * 0.05}>
                <p className={`${i ? 'mt-4' : ''} ${i === s.after.length - 1 ? 'border-l-2 pl-4 font-medium text-ink' : 'text-slate-600/90'} text-[clamp(0.88rem,0.4vw+0.8rem,1rem)] leading-relaxed pretty`} style={i === s.after.length - 1 ? { borderColor: accent } : undefined}>
                  {t}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        <div ref={ref} className="relative">
          <div className="absolute bottom-6 left-[1.45rem] top-6 w-[3px] rounded-full bg-ink/8">
            <motion.div style={{ scaleY: fill, background: `linear-gradient(180deg, #004da5, #00bffe, ${accent})` }} className="h-full w-full origin-top rounded-full" />
          </div>
          <ol className="relative space-y-3">
            {s.bullets.map((b, i) => {
              const on = i <= active
              return (
                <li key={b} className="flex items-center gap-4">
                  <motion.span
                    animate={on ? { scale: [0.85, 1.15, 1] } : { scale: 1 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border font-display text-[0.8rem] font-bold transition-all duration-500 ${
                      on ? 'border-transparent text-white shadow-[0_10px_24px_-8px_rgba(0,114,206,0.7)]' : 'border-ink/12 bg-white text-slate-400'
                    }`}
                    style={on ? { background: `linear-gradient(135deg, #004da5, ${accent})` } : undefined}
                  >
                    {on ? (
                      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                        <path d="m5 13 4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      String(i + 1).padStart(2, '0')
                    )}
                  </motion.span>
                  <motion.div
                    animate={on ? { opacity: 1, x: 0 } : { opacity: 0.45, x: 8 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className={`flex-1 rounded-xl border px-4 py-3.5 transition-colors duration-500 ${on ? 'border-ink/10 bg-white shadow-[0_12px_28px_-20px_rgba(10,31,68,0.45)]' : 'border-transparent bg-white/40'}`}
                  >
                    <span className="font-display text-[clamp(0.92rem,0.4vw+0.84rem,1.05rem)] font-semibold text-ink">{b}</span>
                  </motion.div>
                </li>
              )
            })}
          </ol>
          <div className="mt-6 lg:hidden">
            <Paras items={s.after} />
          </div>
        </div>
      </div>
    </section>
  )
}

function ChecklistGrid({ s, n, accent }) {
  return (
    <section className="shell py-[clamp(3rem,8vw,6.5rem)]">
      <div className="relative overflow-hidden rounded-[clamp(1rem,2vw,1.75rem)] bg-gradient-to-br from-navy via-blue-deep to-navy p-[clamp(1.4rem,4vw,3.5rem)] text-white shadow-[0_40px_80px_-40px_rgba(0,42,107,0.8)]">
        <div className="anim-drift pointer-events-none absolute -right-16 -top-24 h-80 w-80 rounded-full blur-3xl" style={{ background: `radial-gradient(circle, ${accent}66, transparent 65%)` }} />
        <div className="relative">
          <Reveal>
            <span className="font-display text-xs font-bold tracking-[0.24em] text-cyan-soft">{String(n).padStart(2, '0')}</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 font-display text-[clamp(1.6rem,4vw,3rem)] font-extrabold leading-[1.08] tracking-tight balance">{s.heading}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-2xl text-[clamp(0.9rem,0.5vw+0.8rem,1.05rem)] leading-relaxed text-slate-200/90 pretty">{s.paras[0]}</p>
          </Reveal>
          <Stagger className="mt-8 grid gap-2.5 min-[480px]:grid-cols-2 lg:grid-cols-5" gap={0.05}>
            {s.bullets.map((b, i) => (
              <motion.div key={b} variants={stagItem} className="group rounded-xl border border-white/12 bg-white/[0.07] p-4 backdrop-blur transition-colors duration-300 hover:bg-white/[0.13]">
                <span className="font-display text-[0.68rem] font-bold tracking-[0.2em] text-cyan-soft">{String(i + 1).padStart(2, '0')}</span>
                <p className="mt-2 font-display text-[0.95rem] font-semibold leading-snug">{b}</p>
              </motion.div>
            ))}
          </Stagger>
          {s.after?.map((t) => (
            <Reveal key={t} delay={0.1}>
              <p className="mt-8 font-display text-[clamp(0.98rem,0.6vw+0.85rem,1.2rem)] font-semibold text-cyan-soft">{t}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- quote form ---------------- */
function Quote({ s, accent, page }) {
  const init = Object.fromEntries(s.form.fields.map((f) => [f.name, f.initial ? page.name : '']))
  const [form, setForm] = useState(init)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
    setErrors((x) => ({ ...x, [e.target.name]: undefined }))
  }

  const submit = (e) => {
    e.preventDefault()
    const err = {}
    if (!form.name.trim()) err.name = true
    if (!form.phone.trim() && !form.email.trim()) err.phone = err.email = true
    setErrors(err)
    if (Object.keys(err).length) return
    const body = s.form.fields
      .filter((f) => form[f.name]?.trim())
      .map((f) => `${f.label}: ${form[f.name]}`)
      .join('\n')
    const subject = `${s.form.title} — ${page.name} | ${form.name}`
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  const input = (bad) =>
    `peer mt-2 w-full rounded-xl border bg-white/80 px-4 py-3 text-[0.92rem] text-ink transition-all duration-300 focus:bg-white focus:outline-none focus:shadow-[0_0_0_4px_rgba(0,191,254,0.15)] ${
      bad ? 'border-magenta/70' : 'border-ink/12 focus:border-cyan-brand/70'
    }`

  return (
    <section id={s.id} className="shell scroll-mt-24 py-[clamp(3rem,8vw,6.5rem)]">
      <div className="grid items-start gap-[clamp(2rem,5vw,4.5rem)] lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-28">
          <Reveal>
            <Eyebrow>{s.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className={`mt-4 ${h2Cls}`}>
              <Title text={s.heading} hl={s.hl} />
            </h2>
          </Reveal>
          <Paras items={s.paras} className="mt-5" />
          <Reveal delay={0.2}>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <a href={`tel:${company.phones[0].replace(/\s/g, '')}`} className="glass group flex items-center gap-3 rounded-2xl p-4 transition-all hover:-translate-y-0.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-brand/12 text-blue-brand">
                  <svg {...iconProps} className="h-5 w-5"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" /></svg>
                </span>
                <span className="font-display text-[0.92rem] font-semibold text-ink">{company.phones[0]}</span>
              </a>
              <a href={`mailto:${company.email}`} className="glass group flex items-center gap-3 rounded-2xl p-4 transition-all hover:-translate-y-0.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-magenta/10 text-magenta">
                  <svg {...iconProps} className="h-5 w-5"><path d="M3 6h18v12H3Z M3 7l9 6 9-6" /></svg>
                </span>
                <span className="font-display text-[0.82rem] font-semibold text-ink [overflow-wrap:anywhere]">{company.email}</span>
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="relative">
            <div className="absolute -inset-px rounded-[clamp(1rem,2vw,1.75rem)] opacity-70" style={{ background: `linear-gradient(135deg, #00bffe55, transparent 40%, ${accent}55)` }} />
            <div className="glass relative rounded-[clamp(1rem,2vw,1.75rem)] p-[clamp(1.25rem,3vw,2.5rem)]">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div key="sent" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease: EASE }} className="py-10 text-center">
                    <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cyan-brand/15">
                      <Check color="#00bffe" className="h-8 w-8" />
                    </span>
                    <h3 className="mt-5 font-display text-[clamp(1.15rem,2.4vw,1.6rem)] font-extrabold text-ink">Your enquiry is ready to send.</h3>
                    <p className="mx-auto mt-3 max-w-md text-[0.9rem] leading-relaxed text-slate-500 pretty">
                      We have handed it to your mail app with everything filled in. If nothing opened, write to us directly at{' '}
                      <a href={`mailto:${company.email}`} className="font-semibold text-blue-brand">{company.email}</a>.
                    </p>
                    <button type="button" onClick={() => { setSent(false); setForm(init) }} className="mt-6 text-[0.8rem] font-semibold text-slate-500 underline-offset-4 hover:text-ink hover:underline">
                      Send another enquiry
                    </button>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={submit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <h3 className="font-display text-[clamp(1.2rem,2.2vw,1.7rem)] font-extrabold tracking-tight text-ink">{s.form.title}</h3>
                    <Stagger className="mt-6 grid gap-4 sm:grid-cols-2" gap={0.05}>
                      {s.form.fields.map((f) => (
                        <motion.label key={f.name} variants={stagItem} className={`block ${f.textarea ? 'sm:col-span-2' : ''}`}>
                          <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-slate-500">
                            {f.label}
                            {f.required && ' *'}
                          </span>
                          {f.textarea ? (
                            <textarea name={f.name} rows={4} value={form[f.name]} onChange={onChange} className={`${input(errors[f.name])} resize-y`} />
                          ) : (
                            <input name={f.name} type={f.type ?? 'text'} autoComplete={f.autoComplete} value={form[f.name]} onChange={onChange} aria-invalid={!!errors[f.name]} className={input(errors[f.name])} />
                          )}
                        </motion.label>
                      ))}
                    </Stagger>
                    <div className="mt-7">
                      <Button type="submit" className="w-full sm:w-auto">
                        {s.form.cta} <Arrow />
                      </Button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------------- FAQ ---------------- */
function Faq({ s, n, accent }) {
  const [open, setOpen] = useState(0)
  return (
    <section className="shell py-[clamp(3rem,8vw,6.5rem)]">
      <div className="grid items-start gap-[clamp(2rem,5vw,4.5rem)] lg:grid-cols-[0.7fr_1.3fr]">
        <div className="lg:sticky lg:top-28">
          <Heading s={s} n={n} />
          <Reveal delay={0.1}>
            <div className="mt-8 hidden h-40 w-40 items-center justify-center rounded-[2rem] text-white shadow-[0_30px_60px_-30px_rgba(0,77,165,0.8)] lg:flex" style={{ background: `linear-gradient(135deg, #004da5, #0072ce 45%, ${accent})` }}>
              <motion.span animate={{ rotate: [0, -8, 8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} className="font-display text-7xl font-extrabold">
                ?
              </motion.span>
            </div>
          </Reveal>
        </div>

        <Stagger className="space-y-3" gap={0.07}>
          {s.items.map((f, i) => {
            const on = open === i
            return (
              <motion.div
                key={f.q}
                variants={stagItem}
                className={`overflow-hidden rounded-2xl border transition-all duration-500 ${on ? 'border-ink/15 bg-white shadow-[0_24px_50px_-30px_rgba(10,31,68,0.45)]' : 'border-ink/10 bg-white/70 hover:bg-white'}`}
              >
                <button type="button" onClick={() => setOpen(on ? -1 : i)} aria-expanded={on} className="flex w-full items-center gap-4 p-[clamp(1rem,2vw,1.4rem)] text-left">
                  <span className={`font-display text-[0.8rem] font-bold transition-colors ${on ? 'text-blue-brand' : 'text-slate-400'}`}>{i + 1}.</span>
                  <span className="flex-1 font-display text-[clamp(0.95rem,0.5vw+0.85rem,1.12rem)] font-bold leading-snug text-ink">{f.q}</span>
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-500 ${on ? 'rotate-45 text-white' : 'bg-ink/5 text-ink'}`}
                    style={on ? { background: `linear-gradient(135deg, #0072ce, ${accent})` } : undefined}
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease: EASE }}>
                      <p className="px-[clamp(1rem,2vw,1.4rem)] pb-[clamp(1rem,2vw,1.4rem)] pl-[clamp(2.4rem,4vw,3.2rem)] text-[clamp(0.86rem,0.35vw+0.78rem,0.98rem)] leading-relaxed text-slate-600 pretty">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </Stagger>
      </div>
    </section>
  )
}

/* ---------------- conclusion ---------------- */
function Conclusion({ s, page }) {
  const hasQuote = page.sections.some((x) => x.type === 'quote')
  return (
    <section className="shell py-[clamp(2rem,5vw,4rem)]">
      <Reveal>
        <div className="relative overflow-hidden rounded-[clamp(1rem,2vw,1.75rem)] bg-gradient-to-br from-navy via-blue-deep to-navy px-[clamp(1.25rem,5vw,4.5rem)] py-[clamp(2.5rem,6vw,5rem)] shadow-[0_40px_80px_-40px_rgba(0,42,107,0.8)]">
          <div className="anim-drift pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(0,191,254,0.45),transparent_65%)] blur-2xl" />
          <div className="anim-drift pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full blur-2xl" style={{ background: `radial-gradient(circle, ${page.accent}66, transparent 65%)`, animationDelay: '-11s' }} />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
              maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, #000 30%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, #000 30%, transparent 100%)',
            }}
          />
          <div className="relative mx-auto max-w-4xl text-center">
            {s.eyebrow && <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-cyan-soft">{s.eyebrow}</span>}
            <h2 className="mx-auto mt-4 font-display text-[clamp(1.6rem,4vw,3rem)] font-extrabold leading-tight tracking-tight text-white balance">{s.heading}</h2>
            {s.paras.map((t, i) => (
              <p key={t} className={`mx-auto mt-4 max-w-3xl text-[clamp(0.88rem,0.5vw+0.78rem,1.05rem)] leading-relaxed pretty ${i === s.paras.length - 1 ? 'font-medium text-white' : 'text-slate-200/85'}`}>
                {t}
              </p>
            ))}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Cta to={hasQuote ? '#quote' : '/contact'} label="Get a Quote" />
              <Button to="/contact" variant="ghost">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

/* Links to the other product pages. */
function MoreProducts({ page }) {
  const others = productPages.filter((p) => p.slug !== page.slug)
  return (
    <section className="shell pb-[clamp(2rem,5vw,4rem)] pt-[clamp(1rem,3vw,2rem)]">
      <Reveal>
        <p className="text-center text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Explore Our Products</p>
      </Reveal>
      <Stagger className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-5" gap={0.06}>
        {others.map((p) => (
          <motion.div key={p.slug} variants={stagItem}>
            <Link to={`/products/${p.slug}`} className="group relative block aspect-[4/3] overflow-hidden rounded-2xl border border-ink/10">
              <img src={p.image} alt={p.name} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020a1c]/90 via-[#020a1c]/30 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 p-3.5 font-display text-[clamp(0.85rem,0.5vw+0.75rem,1rem)] font-bold text-white">
                {p.name}
                <Arrow className="h-3.5 w-3.5" />
              </span>
              <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" style={{ background: p.accent }} />
            </Link>
          </motion.div>
        ))}
      </Stagger>
    </section>
  )
}

const RENDER = { prose: Prose, cards: Cards, types: Types, apps: Apps, range: Range, supply: Supply, trio: Trio, checklist: Checklist, quote: Quote, faq: Faq, conclusion: Conclusion }

export default function ProductPage({ page }) {
  useEffect(() => {
    const prev = document.title
    document.title = `${page.hero.title} | Turbotech by Nirmal Industries`
    return () => {
      document.title = prev
    }
  }, [page])

  // Numbered sections skip the ones that carry their own label.
  let n = 0
  return (
    <>
      <Hero page={page} />
      <div className="border-y border-ink/8 bg-white/50 py-5 backdrop-blur">
        <Marquee items={page.marquee} />
      </div>
      {page.sections.map((s, i) => {
        const C = RENDER[s.type]
        if (!['trio', 'quote', 'conclusion'].includes(s.type)) n += 1
        return <C key={i} s={s} n={n} accent={page.accent} page={page} />
      })}
      <MoreProducts page={page} />
    </>
  )
}
