import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'motion/react'

/* ---------------- Reveal on scroll ---------------- */
export function Reveal({ children, delay = 0, y = 26, className = '', as = 'div' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-12% 0px -8% 0px' })
  const M = motion[as] ?? motion.div
  return (
    <M
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.72, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </M>
  )
}

/* Staggered children helper */
export function Stagger({ children, className = '', gap = 0.08 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hide"
      animate={inView ? 'show' : 'hide'}
      variants={{ show: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </motion.div>
  )
}

export const stagItem = {
  hide: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
}

/* ---------------- Buttons ---------------- */
const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-300 ease-[cubic-bezier(.16,1,.3,1)] active:scale-[0.97] text-[clamp(0.8rem,0.4vw+0.72rem,0.95rem)] px-[clamp(1rem,1.6vw,1.6rem)] py-[clamp(0.6rem,0.9vw,0.85rem)]'

export function Button({ to, href, children, variant = 'primary', className = '', ...rest }) {
  const styles = {
    primary:
      'bg-gradient-to-r from-blue-brand via-cyan-brand to-cyan-soft text-navy-ink shadow-[0_14px_40px_-14px_rgba(0,191,254,0.85)] hover:shadow-[0_20px_55px_-12px_rgba(0,191,254,0.95)] hover:-translate-y-0.5',
    ghost:
      'glass text-ink hover:border-blue-brand/40 hover:bg-white hover:-translate-y-0.5',
    pink:
      'bg-gradient-to-r from-magenta to-magenta-soft text-white shadow-[0_14px_40px_-14px_rgba(252,0,101,0.8)] hover:-translate-y-0.5',
  }
  const cls = `${base} ${styles[variant]} ${className}`
  const inner = (
    <>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      </span>
    </>
  )
  if (to) return <Link to={to} className={cls} {...rest}>{inner}</Link>
  if (href) return <a href={href} className={cls} {...rest}>{inner}</a>
  return <button className={cls} {...rest}>{inner}</button>
}

export function Arrow({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 ${className}`} aria-hidden="true">
      <path d="M5 12h13m0 0-5-5m5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ---------------- Section heading ---------------- */
export function Eyebrow({ children, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border border-blue-brand/20 bg-cyan-brand/10 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-blue-brand ${className}`}>
      <span className="relative flex h-1.5 w-1.5">
        <span className="anim-pulse-ring absolute inline-flex h-full w-full rounded-full bg-cyan-brand" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-brand" />
      </span>
      {children}
    </span>
  )
}

export function SectionHeading({ eyebrow, title, sub, align = 'left', className = '' }) {
  return (
    <div className={`${align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'} ${className}`}>
      {eyebrow && <Reveal><Eyebrow>{eyebrow}</Eyebrow></Reveal>}
      <Reveal delay={0.06}>
        <h2 className="mt-4 font-display text-[clamp(1.6rem,4.2vw,3.4rem)] font-extrabold leading-[1.08] tracking-tight balance">
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.12}>
          <p className="mt-4 text-[clamp(0.9rem,0.6vw+0.78rem,1.08rem)] leading-relaxed text-slate-600/85 pretty">{sub}</p>
        </Reveal>
      )}
    </div>
  )
}

/* ---------------- Animated background ---------------- */
export function Backdrop({ variant = 'default' }) {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-paper" />
      <div className="anim-drift absolute -left-[18%] top-[-12%] h-[55vmax] w-[55vmax] rounded-full bg-[radial-gradient(circle,rgba(0,114,206,0.14),transparent_62%)] blur-[60px]" />
      <div
        className="anim-drift absolute -right-[16%] top-[22%] h-[48vmax] w-[48vmax] rounded-full bg-[radial-gradient(circle,rgba(0,191,254,0.16),transparent_64%)] blur-[70px]"
        style={{ animationDelay: '-9s' }}
      />
      <div
        className="anim-drift absolute bottom-[-18%] left-[28%] h-[44vmax] w-[44vmax] rounded-full bg-[radial-gradient(circle,rgba(252,0,101,0.08),transparent_66%)] blur-[80px]"
        style={{ animationDelay: '-17s' }}
      />
      {/* grid */}
      <div
        className="absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(10,31,68,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(10,31,68,0.06) 1px, transparent 1px)',
          backgroundSize: 'clamp(38px, 5vw, 76px) clamp(38px, 5vw, 76px)',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 20%, #000 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 20%, #000 40%, transparent 100%)',
        }}
      />
      {variant === 'default' && (
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-paper to-transparent" />
      )}
    </div>
  )
}

/* ---------------- Card shell ---------------- */
export function Card({ children, className = '', accent = '#00bffe', interactive = true }) {
  const ref = useRef(null)
  const onMove = (e) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    ref.current.style.setProperty('--mx', `${e.clientX - r.left}px`)
    ref.current.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  return (
    <div
      ref={ref}
      onMouseMove={interactive ? onMove : undefined}
      style={{ '--accent': accent }}
      className={`group relative overflow-hidden rounded-2xl border border-ink/10 bg-white/85 shadow-[0_1px_2px_rgba(10,31,68,0.04),0_14px_34px_-20px_rgba(10,31,68,0.22)] backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${
        interactive ? 'hover:-translate-y-1.5 hover:border-ink/20 hover:shadow-[0_2px_4px_rgba(10,31,68,0.05),0_24px_48px_-22px_rgba(0,114,206,0.35)]' : ''
      } ${className}`}
    >
      {interactive && (
        <span
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(420px circle at var(--mx,50%) var(--my,50%), color-mix(in srgb, var(--accent) 22%, transparent), transparent 70%)',
          }}
        />
      )}
      <span
        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-60"
        style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

/* ---------------- Photo header for cards ---------------- */
export function CardImage({ src, alt = '', className = 'aspect-[16/10]' }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/25 to-transparent" />
    </div>
  )
}

/* ---------------- Count-up stat ---------------- */
export function Stat({ value, suffix = '', label }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-20% 0px' })
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return setN(value)
    let raf
    const t0 = performance.now()
    const dur = 1500
    const tick = (t) => {
      const p = Math.min((t - t0) / dur, 1)
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value])

  return (
    <div ref={ref} className="text-center sm:text-left">
      <div className="font-display text-[clamp(1.75rem,4vw,3rem)] font-extrabold leading-none text-gradient">
        {n}
        {suffix}
      </div>
      <div className="mt-2 text-[clamp(0.7rem,0.35vw+0.64rem,0.85rem)] uppercase tracking-[0.14em] text-slate-500">{label}</div>
    </div>
  )
}

/* ---------------- Marquee ---------------- */
export function Marquee({ items, className = '' }) {
  return (
    <div className={`relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)] ${className}`}>
      <div className="anim-marquee flex shrink-0 items-center gap-[clamp(1.5rem,4vw,4rem)] pr-[clamp(1.5rem,4vw,4rem)]">
        {[...items, ...items].map((it, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-[clamp(1.5rem,4vw,4rem)] whitespace-nowrap font-display text-[clamp(0.8rem,1.2vw,1.05rem)] font-semibold uppercase tracking-[0.16em] text-slate-500/80"
          >
            {it}
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-brand/70" />
          </span>
        ))}
      </div>
    </div>
  )
}

/* ---------------- Form field ---------------- */
export function Field({ label, name, value, onChange, error, type = 'text', ...rest }) {
  return (
    <label className="block">
      <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</span>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        aria-invalid={!!error}
        className={`mt-2 w-full rounded-xl border bg-ink/[0.04] px-4 py-3 text-[0.92rem] text-ink placeholder:text-slate-500 transition-colors duration-300 focus:bg-ink/[0.07] focus:outline-none ${
          error ? 'border-magenta/70' : 'border-ink/12 focus:border-cyan-brand/70'
        }`}
        {...rest}
      />
      {error && <span className="mt-1.5 block text-[0.72rem] font-medium text-magenta-soft">{error}</span>}
    </label>
  )
}
