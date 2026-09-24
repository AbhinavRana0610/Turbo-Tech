import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { Arrow, Button, Field } from './ui'
import { company, products } from '../data/products'

/* Enquiry form that pops up on every page once the visitor has scrolled far enough:
   past two sections, or past one on pages with three sections or fewer. It shows once
   per page view, and stops for the rest of the session once an enquiry is submitted.
   Like the Contact page there is no backend: Submit hands the enquiry to the
   visitor's mail app, pre-filled. */

const EMPTY = { name: '', email: '', phone: '', product: '', message: '' }
const SENT_KEY = 'tt-enquiry-sent'
const EASE = [0.16, 1, 0.3, 1]

// Session storage can throw (private mode, blocked site data); treat that as "not sent".
const alreadySent = () => {
  try { return sessionStorage.getItem(SENT_KEY) === '1' } catch { return false }
}
const markSent = () => {
  try { sessionStorage.setItem(SENT_KEY, '1') } catch { /* nothing to do */ }
}

/* The page's top-level content sections. Skips sections nested inside another, and
   sticky bars (the Products filter), which never scroll out of view. */
function topSections() {
  const main = document.querySelector('main')
  if (!main) return []
  return [...main.querySelectorAll('section')].filter(
    (s) => !s.parentElement.closest('section') && getComputedStyle(s).position !== 'sticky'
  )
}

/* Calls `onReach` once per page, when the visitor scrolls past the page's trigger
   section: the 2nd, or the 1st when the page has three sections or fewer. */
function useSectionTrigger(onReach, enabled) {
  const { pathname } = useLocation()
  const cb = useRef(onReach)
  cb.current = onReach

  useEffect(() => {
    if (!enabled) return
    let fired = false
    const check = () => {
      if (fired) return
      const sections = topSections()
      const target = sections[sections.length <= 3 ? 0 : 1]
      // Another dialog (the mobile menu, the call popup) is open: wait for it to close.
      if (!target || document.querySelector('[role="dialog"]')) return
      if (target.getBoundingClientRect().bottom <= 0) {
        fired = true
        cb.current()
      }
    }
    window.addEventListener('scroll', check, { passive: true })
    return () => window.removeEventListener('scroll', check)
  }, [pathname, enabled])
}

export default function EnquiryPopup() {
  const { pathname } = useLocation()
  const [submitted, setSubmitted] = useState(alreadySent)
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const firstField = useRef(null)

  useSectionTrigger(() => setOpen(true), !submitted)

  // A new page starts closed; its own scroll decides when the popup shows.
  useEffect(() => setOpen(false), [pathname])

  // Lock the page behind the popup (Lenis needs pausing too), close on Escape.
  useEffect(() => {
    if (!open) return
    const root = document.documentElement
    root.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    window.__lenis?.stop()
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    const t = setTimeout(() => firstField.current?.focus(), 350)
    return () => {
      clearTimeout(t)
      root.style.overflow = ''
      document.body.style.overflow = ''
      window.__lenis?.start()
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    setErrors((x) => ({ ...x, [name]: undefined }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Please tell us your name.'
    if (!form.email.trim()) e.email = 'Please add your email.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) e.email = 'That email address does not look right.'
    if (!form.phone.trim()) e.phone = 'Please add your phone number.'
    else if (form.phone.replace(/[^\d]/g, '').length < 10) e.phone = 'That phone number looks too short.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = (e) => {
    e.preventDefault()
    if (!validate()) return
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      form.product && `Product of interest: ${form.product}`,
      '',
      form.message,
    ]
      .filter(Boolean)
      .join('\n')
    const subject = `Enquiry${form.product ? ` — ${form.product}` : ''} | ${form.name}`
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
    markSent()
    setSubmitted(true)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="enquiry"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="enquiry-title"
        >
          <div className="absolute inset-0 bg-ink/45 backdrop-blur-sm" onClick={() => setOpen(false)} />

          <motion.div
            data-lenis-prevent
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="relative max-h-[92dvh] w-full overflow-y-auto overscroll-contain rounded-t-3xl border border-ink/10 bg-white shadow-[0_30px_80px_-30px_rgba(10,31,68,0.6)] [scrollbar-width:none] sm:max-w-2xl sm:rounded-3xl [&::-webkit-scrollbar]:hidden"
          >
            {/* Brand strip, as on the site's cards */}
            <div className="h-1 w-full bg-gradient-to-r from-blue-deep via-cyan-brand to-magenta" />

            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close enquiry form"
              className="absolute right-4 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-ink/5 hover:text-ink"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            <div className="p-[clamp(1.25rem,3.5vw,2rem)]">
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="py-6 text-center"
                >
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-cyan-brand/15">
                    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7 text-cyan-brand" aria-hidden="true">
                      <path d="m5 13 4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <h2 id="enquiry-title" className="mt-5 font-display text-[clamp(1.15rem,2.4vw,1.6rem)] font-extrabold text-ink">
                    Your enquiry is ready to send.
                  </h2>
                  <p className="mx-auto mt-3 max-w-md text-[0.9rem] leading-relaxed text-slate-500 pretty">
                    We have handed it to your mail app with everything filled in. If nothing opened,
                    write to us directly at{' '}
                    <a href={`mailto:${company.email}`} className="font-semibold text-blue-brand underline-offset-4 hover:underline">
                      {company.email}
                    </a>
                    .
                  </p>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="mt-6 text-[0.8rem] font-semibold text-slate-500 underline-offset-4 transition-colors hover:text-ink hover:underline"
                  >
                    Close
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={submit} noValidate>
                  <h2 id="enquiry-title" className="pr-10 font-display text-[clamp(1.15rem,2.4vw,1.6rem)] font-extrabold tracking-tight text-ink">
                    Send an enquiry
                  </h2>
                  <p className="mt-2 text-[0.82rem] text-slate-500">
                    Fields marked with an asterisk are required.
                  </p>

                  <div className="mt-5 grid gap-3 md:grid-cols-2 md:gap-x-4">
                    <Field ref={firstField} label="Name *" name="name" value={form.name} onChange={onChange} error={errors.name} autoComplete="name" placeholder="Your name" />
                    <Field label="Email ID *" name="email" type="email" value={form.email} onChange={onChange} error={errors.email} autoComplete="email" placeholder="you@company.com" />
                    <Field label="Phone number *" name="phone" type="tel" value={form.phone} onChange={onChange} error={errors.phone} autoComplete="tel" placeholder="+91 ..." />
                    <label className="block">
                      <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-slate-500">
                        Services / products interested
                      </span>
                      <select
                        name="product"
                        value={form.product}
                        onChange={onChange}
                        className="mt-2 w-full appearance-none rounded-xl border border-ink/12 bg-ink/[0.04] px-4 py-3 text-[0.92rem] text-ink transition-colors duration-300 focus:border-cyan-brand/70 focus:outline-none"
                      >
                        <option value="" className="bg-white">Select a product…</option>
                        {products.map((p) => (
                          <option key={p.slug} value={p.name} className="bg-white">{p.name}</option>
                        ))}
                        <option value="Shade card" className="bg-white">Shade card</option>
                        <option value="Other" className="bg-white">Something else</option>
                      </select>
                    </label>
                  </div>

                  <label className="mt-3 block">
                    <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-slate-500">Message</span>
                    <textarea
                      name="message"
                      rows={2}
                      value={form.message}
                      onChange={onChange}
                      placeholder="Tell us about your requirement…"
                      className="mt-2 w-full resize-y rounded-xl border border-ink/12 bg-ink/[0.04] px-4 py-3 text-[0.92rem] text-ink placeholder:text-slate-500 transition-colors duration-300 focus:border-cyan-brand/70 focus:bg-ink/[0.07] focus:outline-none"
                    />
                  </label>

                  <Button type="submit" className="mt-5 w-full">
                    Submit <Arrow />
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
