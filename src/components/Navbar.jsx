import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { Button, Arrow } from './ui'

const links = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
]

export function Wordmark({ className = '' }) {
  return (
    <span className={`flex flex-col leading-none ${className}`}>
      <span className="font-display text-[clamp(0.95rem,1.5vw,1.3rem)] font-extrabold tracking-[0.02em] text-ink">
        TURBOTECH
      </span>
      <span className="mt-0.5 text-[clamp(0.36rem,0.55vw,0.5rem)] font-semibold uppercase tracking-[0.3em] text-blue-brand/80">
        by Nirmal Industries
      </span>
    </span>
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
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                    isActive ? 'text-ink' : 'text-slate-600/80 hover:text-ink'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="relative z-10">{l.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full border border-cyan-brand/35 bg-cyan-brand/12"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
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
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex h-full flex-col justify-center px-[var(--shell)] pb-16 pt-24"
            >
              <ul className="space-y-1">
                {links.map((l, i) => (
                  <motion.li
                    key={l.to}
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.06, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
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
