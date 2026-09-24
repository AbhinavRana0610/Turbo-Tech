import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { company } from '../data/products'

/* ---------------- Config ----------------
   Every number and address the widget uses. They default to the company record so the
   site has one source of truth; override a value here to point the widget elsewhere. */
const CONTACT = {
  whatsapp: company.phones[0], // any format; non-digits are stripped for the links
  phone: company.phones[0],
  email: company.email,
}

const EASE = [0.16, 1, 0.3, 1]
const digits = (n) => n.replace(/[^\d]/g, '')

/* Phones and tablets, including iPadOS, which reports itself as a Mac with touch. */
function isMobile() {
  const ua = navigator.userAgent
  return (
    /Android|iPhone|iPad|iPod|Mobi|Tablet|Silk|Kindle|Opera Mini|IEMobile/i.test(ua) ||
    (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)
  )
}

/* Mobile: wa.me hands off to the installed app. Desktop: try the desktop app's
   whatsapp:// link, and open WhatsApp Web if the page never loses focus to it. */
function openWhatsApp() {
  const num = digits(CONTACT.whatsapp)
  if (isMobile()) {
    window.location.href = `https://wa.me/${num}`
    return
  }

  let handed = false
  const onLeave = () => { handed = true }
  window.addEventListener('blur', onLeave)
  document.addEventListener('visibilitychange', onLeave)

  window.location.href = `whatsapp://send?phone=${num}`

  // Browsers allow a popup for a few seconds after the click, so this stays unblocked.
  setTimeout(() => {
    window.removeEventListener('blur', onLeave)
    document.removeEventListener('visibilitychange', onLeave)
    if (!handed) window.open(`https://web.whatsapp.com/send?phone=${num}`, '_blank', 'noopener')
  }, 1500)
}

/* Desktop: Gmail compose in a new tab, or mailto: if the tab is blocked.
   Mobile: mailto: so Gmail or the default mail app picks it up. */
function openEmail() {
  const to = encodeURIComponent(CONTACT.email)
  if (!isMobile()) {
    // No 'noopener' here: with it, window.open always returns null and a blocked
    // popup can't be told apart from an opened one.
    const tab = window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${to}`, '_blank')
    if (tab) {
      tab.opener = null
      return
    }
  }
  window.location.href = `mailto:${CONTACT.email}`
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

  const actions = {
    whatsapp: openWhatsApp,
    call: () => {
      if (isMobile()) window.location.href = `tel:${CONTACT.phone.replace(/\s/g, '')}`
      else setCallOpen(true)
    },
    email: openEmail,
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
    </>
  )
}
