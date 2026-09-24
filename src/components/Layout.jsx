import { useEffect, useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import Lenis from 'lenis'
import Navbar from './Navbar'
import Footer from './Footer'
import FloatingContact from './FloatingContact'
import { Backdrop } from './ui'

/** Smooth scrolling, skipped when the visitor prefers reduced motion. */
function useLenis() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, touchMultiplier: 1.6 })
    let raf
    const loop = (t) => {
      lenis.raf(t)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    window.__lenis = lenis
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      delete window.__lenis
    }
  }, [])
}

/** Resets scroll on navigation, or scrolls to the #section when the link has one. */
function ScrollToTop() {
  const { pathname, search, hash, key } = useLocation()
  useEffect(() => {
    if (!hash) {
      if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true })
      else window.scrollTo(0, 0)
      return
    }
    // Wait out the 0.4s page transition (during it the target can also exist inside the
    // outgoing page), then retry briefly until the section is mounted.
    let tries = 0
    let timer
    const seek = () => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el) {
        if (window.__lenis) window.__lenis.scrollTo(el, { offset: -90 })
        else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' })
      } else if (tries++ < 20) {
        timer = setTimeout(seek, 60)
      }
    }
    timer = setTimeout(seek, 480)
    return () => clearTimeout(timer)
  }, [pathname, search, hash, key])
  return null
}

/** Thin progress bar that tracks how far down the page you are. */
function ScrollBar() {
  const ref = useRef(null)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      const p = h > 0 ? window.scrollY / h : 0
      if (ref.current) ref.current.style.transform = `scaleX(${p})`
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])
  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent">
      <div
        ref={ref}
        className="h-full origin-left bg-gradient-to-r from-blue-deep via-cyan-brand to-magenta"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  )
}

/** Back-to-top button that fades in once you are past the first screen.
    Positioned by FloatingContact, at the bottom of its column. */
function ToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.9)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 12 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={() =>
            window.__lenis ? window.__lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: 'smooth' })
          }
          aria-label="Back to top"
          className="glass flex h-11 w-11 items-center justify-center rounded-full text-blue-brand transition-colors hover:border-cyan-brand/60 hover:text-ink sm:h-12 sm:w-12"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
            <path d="M12 19V5m0 0-6 6m6-6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default function Layout() {
  const { pathname } = useLocation()
  useLenis()

  return (
    <>
      <Backdrop />
      <ScrollBar />
      <ScrollToTop />
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <FloatingContact>
        <ToTop />
      </FloatingContact>
    </>
  )
}
