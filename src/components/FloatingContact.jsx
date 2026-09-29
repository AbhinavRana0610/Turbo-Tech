import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Arrow, Button, Field } from './ui'
import { company } from '../data/products'
import { sendEnquiry } from './sendEnquiry'

/* ---------------- Config ----------------
   Every number and address the widget uses. They default to the company record so the
   site has one source of truth; override a value here to point the widget elsewhere. */
const CONTACT = {
  phone: company.phones[0],
}

const EASE = [0.16, 1, 0.3, 1]

/* Phones and tablets, including iPadOS, which reports itself as a Mac with touch. */
function isMobile() {
  const ua = navigator.userAgent
  return (
    /Android|iPhone|iPad|iPod|Mobi|Tablet|Silk|Kindle|Opera Mini|IEMobile/i.test(ua) ||
    (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)
  )
}

/* ---------------- Icons ---------------- */
const WhatsAppIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
)

const PhoneIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
  </svg>
)

const MailIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

/* ---------------- Desktop call popup ---------------- */
function CallModal({ onClose }) {
  const [copied, setCopied] = useState(false)
  const closeRef = useRef(null)

  useEffect(() => {
    closeRef.current?.focus()
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.phone)
      setCopied(true)
    } catch {
      /* Clipboard can be denied; the number is on screen either way. */
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[70] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="call-modal-title"
    >
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.97 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="relative w-full max-w-sm rounded-3xl border border-ink/10 bg-white p-7 text-center shadow-[0_30px_70px_-30px_rgba(10,31,68,0.55)]"
      >
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-ink/5 hover:text-ink"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-cyan-brand/12 text-blue-brand">
          <PhoneIcon className="h-6 w-6" />
        </span>
        <p id="call-modal-title" className="mt-4 text-sm text-slate-500">Please call us at</p>
        <a
          href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
          className="mt-1 block font-display text-2xl font-bold tracking-tight text-ink"
        >
          {CONTACT.phone}
        </a>
        <button
          onClick={copy}
          className="mt-5 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-brand via-cyan-brand to-cyan-soft px-5 py-2.5 text-sm font-semibold text-navy-ink transition-transform active:scale-[0.97]"
        >
          {copied ? 'Copied!' : 'Copy number'}
        </button>
      </motion.div>
    </motion.div>
  )
}

/* ---------------- WhatsApp / Email enquiry forms ----------------
   Same look as the home page enquiry popup. Both post to /api/send-mail (the port of
   send-mail.php) and neither opens WhatsApp or a mail app. The field names are the ones
   send-mail.php expects, so it labels each mail "WhatsApp Contact Form" (whatsappName)
   or "Email Contact Form" (email) on its own. */
const FORMS = {
  whatsapp: {
    Icon: WhatsAppIcon,
    bg: '#25d366',
    withEmail: false,
    fields: (f) => ({ whatsappName: f.name, whatsappMobile: f.phone, message: f.message }),
  },
  email: {
    Icon: MailIcon,
    bg: '#fc0065',
    withEmail: true,
    fields: (f) => ({ name: f.name, email: f.email, phone: f.phone, message: f.message }),
  },
}
const FORM_EMPTY = { name: '', email: '', phone: '', message: '' }

function ContactFormModal({ kind, onClose }) {
  const { Icon, bg, withEmail, fields } = FORMS[kind]
  const [form, setForm] = useState(FORM_EMPTY)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [failed, setFailed] = useState(false)
  const [trap, setTrap] = useState('')
  const firstField = useRef(null)

  // Lock the page behind the form (Lenis needs pausing too), close on Escape.
  useEffect(() => {
    const root = document.documentElement
    root.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    window.__lenis?.stop()
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    const t = setTimeout(() => firstField.current?.focus(), 350)
    return () => {
      clearTimeout(t)
      root.style.overflow = ''
      document.body.style.overflow = ''
      window.__lenis?.start()
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    setErrors((x) => ({ ...x, [name]: undefined }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Please tell us your name.'
    if (withEmail) {
      if (!form.email.trim()) e.email = 'Please add your email.'
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) e.email = 'That email address does not look right.'
    }
    if (!form.phone.trim()) e.phone = 'Please add your phone number.'
    else if (form.phone.replace(/[^\d]/g, '').length < 10) e.phone = 'That phone number looks too short.'
    if (!form.message.trim()) e.message = 'Please add a message.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = async (e) => {
    e.preventDefault()
    if (sending || !validate()) return
    setSending(true)
    setFailed(false)
    const ok = await sendEnquiry({ ...fields(form), website: trap })
    setSending(false)
    if (!ok) return setFailed(true)
    setSent(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`${kind}-modal-title`}
    >
      <div className="absolute inset-0 bg-ink/45 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        data-lenis-prevent
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.45, ease: EASE }}
        className="relative max-h-[92dvh] w-full overflow-y-auto overscroll-contain rounded-t-3xl border border-ink/10 bg-white shadow-[0_30px_80px_-30px_rgba(10,31,68,0.6)] [scrollbar-width:none] sm:max-w-md sm:rounded-3xl [&::-webkit-scrollbar]:hidden"
      >
        {/* Brand strip, as on the site's cards */}
        <div className="h-1 w-full bg-gradient-to-r from-blue-deep via-cyan-brand to-magenta" />

        <button
          type="button"
          onClick={onClose}
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
              <h2 id={`${kind}-modal-title`} className="mt-5 font-display text-[clamp(1.15rem,2.4vw,1.6rem)] font-extrabold text-ink">
                Thank you, your enquiry has been sent.
              </h2>
              <p className="mx-auto mt-3 max-w-md text-[0.9rem] leading-relaxed text-slate-500 pretty">
                Our team will get back to you shortly.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 text-[0.8rem] font-semibold text-slate-500 underline-offset-4 transition-colors hover:text-ink hover:underline"
              >
                Close
              </button>
            </motion.div>
          ) : (
            <form onSubmit={submit} noValidate>
              <div className="flex items-center gap-3 pr-10">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white" style={{ background: bg }}>
                  <Icon className="h-5 w-5" />
                </span>
                <h2 id={`${kind}-modal-title`} className="font-display text-[clamp(1.15rem,2.4vw,1.6rem)] font-extrabold tracking-tight text-ink">
                  Send an enquiry
                </h2>
              </div>
              <p className="mt-2 text-[0.82rem] text-slate-500">
                Fields marked with an asterisk are required.
              </p>

              <div className="mt-5 grid gap-3">
                <Field ref={firstField} label="Name *" name="name" value={form.name} onChange={onChange} error={errors.name} autoComplete="name" placeholder="Your name" />
                {withEmail && (
                  <Field label="Email ID *" name="email" type="email" value={form.email} onChange={onChange} error={errors.email} autoComplete="email" placeholder="you@company.com" />
                )}
                <Field label="Phone number *" name="phone" type="tel" value={form.phone} onChange={onChange} error={errors.phone} autoComplete="tel" placeholder="+91 ..." />
                <label className="block">
                  <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-slate-500">Message *</span>
                  <textarea
                    name="message"
                    rows={3}
                    value={form.message}
                    onChange={onChange}
                    aria-invalid={!!errors.message}
                    placeholder="Tell us about your requirement…"
                    className={`mt-2 w-full resize-y rounded-xl border bg-ink/[0.04] px-4 py-3 text-[0.92rem] text-ink placeholder:text-slate-500 transition-colors duration-300 focus:bg-ink/[0.07] focus:outline-none ${
                      errors.message ? 'border-magenta/70' : 'border-ink/12 focus:border-cyan-brand/70'
                    }`}
                  />
                  {errors.message && <span className="mt-1.5 block text-[0.72rem] font-medium text-magenta-soft">{errors.message}</span>}
                </label>
              </div>

              {/* Honeypot for spam bots: off screen, people never fill it */}
              <input
                type="text"
                name="website"
                value={trap}
                onChange={(e) => setTrap(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] h-px w-px opacity-0"
              />

              {failed && (
                <p role="alert" className="mt-4 text-[0.8rem] font-medium text-magenta-soft">
                  Something went wrong. Please try again, or write to us at{' '}
                  <a href={`mailto:${company.email}`} className="font-semibold underline underline-offset-4">
                    {company.email}
                  </a>
                  .
                </p>
              )}

              <Button type="submit" disabled={sending} className="mt-5 w-full disabled:pointer-events-none disabled:opacity-60">
                Submit <Arrow />
              </Button>
            </form>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ---------------- Widget ---------------- */
const ITEMS = [
  { key: 'whatsapp', label: 'WhatsApp', Icon: WhatsAppIcon, bg: '#25d366' },
  { key: 'call', label: 'Call us', Icon: PhoneIcon, bg: '#00bffe' },
  { key: 'email', label: 'Email us', Icon: MailIcon, bg: '#fc0065' },
]

/* WhatsApp / Call / Email buttons stacked bottom-right on every page. Anything passed as
   children (the back-to-top button) sits at the bottom of the same column. */
export default function FloatingContact({ children }) {
  const [callOpen, setCallOpen] = useState(false)
  const [formOpen, setFormOpen] = useState(null) // 'whatsapp' | 'email' | null
  const closeForm = useCallback(() => setFormOpen(null), [])

  const actions = {
    whatsapp: () => setFormOpen('whatsapp'),
    call: () => {
      if (isMobile()) window.location.href = `tel:${CONTACT.phone.replace(/\s/g, '')}`
      else setCallOpen(true)
    },
    email: () => setFormOpen('email'),
  }

  return (
    <>
      <div
        className="fixed bottom-[max(clamp(1rem,3vw,2rem),env(safe-area-inset-bottom))] right-[max(clamp(1rem,3vw,2rem),env(safe-area-inset-right))] z-30 flex flex-col items-end gap-2.5 sm:gap-3"
      >
        {ITEMS.map(({ key, label, Icon, bg }, i) => (
          <motion.button
            key={key}
            layout
            type="button"
            onClick={actions[key]}
            aria-label={label}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + i * 0.08, duration: 0.5, ease: EASE }}
            className="group relative flex h-11 w-11 items-center justify-center rounded-full text-white shadow-[0_12px_30px_-10px_rgba(10,31,68,0.55)] ring-1 ring-white/40 transition-transform duration-300 ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-0.5 hover:scale-105 active:scale-95 sm:h-12 sm:w-12"
            style={{ background: bg }}
          >
            <Icon className="h-5 w-5 sm:h-[1.35rem] sm:w-[1.35rem]" />
            {/* Label slides out on hover, on devices that hover. */}
            <span className="pointer-events-none absolute right-full mr-3 hidden translate-x-2 whitespace-nowrap rounded-full bg-ink px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-lg transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 [@media(hover:hover)]:block">
              {label}
            </span>
          </motion.button>
        ))}
        {children}
      </div>

      <AnimatePresence>{callOpen && <CallModal onClose={() => setCallOpen(false)} />}</AnimatePresence>
      <AnimatePresence>{formOpen && <ContactFormModal key={formOpen} kind={formOpen} onClose={closeForm} />}</AnimatePresence>
    </>
  )
}
