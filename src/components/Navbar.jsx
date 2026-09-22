import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { Button, Arrow } from './ui'
import { productPages } from '../data/productPages'

const links = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/brochure', label: 'Brochure' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
]

const EASE = [0.16, 1, 0.3, 1]

export function Wordmark({ className = '' }) {
  return (
    <span className={`flex flex-col leading-none ${className}`}>
      <span className="font-display text-[clamp(0.95rem,1.5vw,1.3rem)] font-extrabold tracking-[0.02em] text-ink">
        TURBOTECH
      </span>
      <span className="mt-0.5 text-[clamp(0.36rem,0.55vw,0.5rem)] font-semibold uppercase tracking-[0.3em] text-blue-brand/80">
        By Nirmal Industries
      </span>
    </span>
  )
}

const navCls = (isActive) =>
  `relative flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
    isActive ? 'text-ink' : 'text-slate-600/80 hover:text-ink'
  }`

function ActivePill({ isActive }) {
  if (!isActive) return null
  return (
    <motion.span
      layoutId="nav-pill"
      className="absolute inset-0 rounded-full border border-cyan-brand/35 bg-cyan-brand/12"
      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
    />
  )
}

/* "Products" link with a panel of the product pages that opens on hover or keyboard focus. */
function ProductsMenu({ label }) {
  const [show, setShow] = useState(false)
  const timer = useRef(null)
  const { pathname } = useLocation()

  useEffect(() => setShow(false), [pathname])
  useEffect(() => () => clearTimeout(timer.current), [])

  // A short delay on close lets the pointer cross the gap into the panel.
  const open = () => {
    clearTimeout(timer.current)
    setShow(true)
  }
  const close = () => {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setShow(false), 140)
  }

  return (
    <div
      className="relative"
      onMouseEnter={open}
      onMouseLeave={close}
      onFocus={open}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && close()}
      onKeyDown={(e) => e.key === 'Escape' && setShow(false)}
    >
      <NavLink to="/products" aria-haspopup="true" aria-expanded={show} className={({ isActive }) => navCls(isActive)}>
        {({ isActive }) => (
          <>
            <span className="relative z-10">{label}</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className={`relative z-10 h-3.5 w-3.5 transition-transform duration-300 ${show ? 'rotate-180' : ''}`}
            >
              <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <ActivePill isActive={isActive} />
          </>
        )}
      </NavLink>

      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="absolute left-1/2 top-full z-50 w-[34rem] -translate-x-1/2 origin-top pt-3"
          >
            <div className="overflow-hidden rounded-2xl border border-ink/10 bg-white/95 p-2.5 shadow-[0_30px_70px_-30px_rgba(10,31,68,0.5)] backdrop-blur-xl">
              <motion.ul
                initial="hide"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.035, delayChildren: 0.05 } } }}
                className="grid grid-cols-2 gap-1"
              >
                {productPages.map((p) => (
                  <motion.li
                    key={p.slug}
                    variants={{ hide: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } } }}
                  >
                    <NavLink
                      to={`/products/${p.slug}`}
                      className={({ isActive }) =>
                        `group flex items-center gap-3 rounded-xl p-2 transition-colors duration-300 ${
                          isActive ? 'bg-cyan-brand/10' : 'hover:bg-ink/[0.04]'
                        }`
                      }
                    >
                      <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                        <img
                          src={p.image}
                          alt=""
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <span className="absolute inset-0 rounded-lg ring-1 ring-inset ring-ink/10" />
                      </span>
                      <span className="flex min-w-0 flex-1 items-center gap-2">
                        <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: p.accent, boxShadow: `0 0 8px ${p.accent}` }} />
                        <span className="truncate font-display text-[0.9rem] font-bold text-ink">{p.name}</span>
                      </span>
                      <Arrow className="h-3.5 w-3.5 shrink-0 -translate-x-1 text-blue-brand opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                    </NavLink>
                  </motion.li>
                ))}
              </motion.ul>

              <Link
                to="/products"
                className="group mt-1.5 flex items-center justify-between rounded-xl bg-gradient-to-r from-blue-deep via-blue-brand to-cyan-brand px-4 py-3 text-sm font-semibold text-white"
              >
                All Products
                <Arrow className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${
          solid
            ? 'border-b border-ink/10 bg-white/80 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <nav className="shell flex items-center justify-between gap-3 py-[clamp(0.55rem,1.2vw,1rem)]">
          <Link to="/" className="flex shrink-0 items-center gap-2 sm:gap-2.5" aria-label="Turbotech home">
            <img
              src="/assets/logo-mark.png"
              alt=""
              width="434"
              height="455"
              className="h-[clamp(1.85rem,3.4vw,2.7rem)] w-auto drop-shadow-[0_0_14px_rgba(0,191,254,0.45)]"
            />
            <Wordmark className="hidden min-[380px]:flex" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 lg:flex">
            {links.map((l) =>
              l.to === '/products' ? (
                <ProductsMenu key={l.to} label={l.label} />
              ) : (
                <NavLink key={l.to} to={l.to} end={l.to === '/'} className={({ isActive }) => navCls(isActive)}>
                  {({ isActive }) => (
                    <>
                      <span className="relative z-10">{l.label}</span>
                      <ActivePill isActive={isActive} />
                    </>
                  )}
                </NavLink>
              )
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Wrapper carries the breakpoint: Button sets its own display. */}
            <span className="hidden sm:block">
              <Button to="/contact">
                Get a Quote <Arrow />
              </Button>
            </span>

            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="glass flex h-10 w-10 shrink-0 items-center justify-center rounded-full lg:hidden"
            >
              <span className="relative block h-3.5 w-4">
                <span
                  className={`absolute left-0 h-0.5 w-full rounded bg-ink transition-all duration-300 ${
                    open ? 'top-1.5 rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute left-0 top-1.5 h-0.5 w-full rounded bg-ink transition-all duration-300 ${
                    open ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute left-0 h-0.5 w-full rounded bg-ink transition-all duration-300 ${
                    open ? 'top-1.5 -rotate-45' : 'top-3'
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-white/95 backdrop-blur-2xl" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ y: -18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="relative flex h-full flex-col justify-center overflow-y-auto px-[var(--shell)] pb-16 pt-24 [@media(max-height:760px)]:justify-start"
            >
              <ul className="space-y-1">
                {links.map((l, i) => (
                  <motion.li
                    key={l.to}
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.06, duration: 0.45, ease: EASE }}
                  >
                    <NavLink
                      to={l.to}
                      end={l.to === '/'}
                      className={({ isActive }) =>
                        `flex items-baseline gap-3 border-b border-ink/8 py-4 font-display text-[clamp(1.5rem,7vw,2.4rem)] font-bold tracking-tight transition-colors ${
                          isActive ? 'text-gradient' : 'text-ink/85 hover:text-blue-brand'
                        }`
                      }
                    >
                      <span className="font-sans text-[0.6rem] font-semibold text-cyan-brand/70">
                        0{i + 1}
                      </span>
                      {l.label}
                    </NavLink>
                    {l.to === '/products' && (
                      <div className="flex flex-wrap gap-1.5 border-b border-ink/8 py-3">
                        {productPages.map((p) => (
                          <NavLink
                            key={p.slug}
                            to={`/products/${p.slug}`}
                            className={({ isActive }) =>
                              `inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[0.78rem] font-semibold transition-colors ${
                                isActive
                                  ? 'border-cyan-brand/40 bg-cyan-brand/10 text-blue-brand'
                                  : 'border-ink/10 bg-white text-slate-600 hover:text-ink'
                              }`
                            }
                          >
                            <span className="h-1.5 w-1.5 rounded-full" style={{ background: p.accent }} />
                            {p.name}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.34, duration: 0.45 }}
                className="mt-8"
              >
                <Button to="/contact" className="w-full">
                  Get a Quote <Arrow />
                </Button>
                <a
                  href="mailto:turbotechchemicals@gmail.com"
                  className="mt-5 block break-all text-sm text-slate-500 transition-colors hover:text-blue-brand"
                >
                  turbotechchemicals@gmail.com
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
