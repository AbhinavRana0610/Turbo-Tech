import { useState } from 'react'
import { motion } from 'motion/react'
import { Arrow, Button, Card, Eyebrow, Reveal, Stagger, stagItem } from '../components/ui'
import { company, products } from '../data/products'

/* No backend on this build: the form validates in the browser and then hands
   the enquiry to the visitor's mail client or WhatsApp, pre-filled. */

const EMPTY = { name: '', company: '', email: '', phone: '', product: '', message: '' }

function Field({ label, name, value, onChange, error, type = 'text', ...rest }) {
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

export default function Contact() {
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    setErrors((x) => ({ ...x, [name]: undefined }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Please tell us your name.'
    if (!form.email.trim() && !form.phone.trim()) {
      e.email = 'Add an email or a phone number so we can reply.'
      e.phone = ' '
    } else if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) {
      e.email = 'That email address does not look right.'
    }
    if (form.message.trim().length < 10) e.message = 'A line or two about your requirement helps.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const compose = () =>
    [
      `Name: ${form.name}`,
      form.company && `Company: ${form.company}`,
      form.email && `Email: ${form.email}`,
      form.phone && `Phone: ${form.phone}`,
      form.product && `Product of interest: ${form.product}`,
      '',
      form.message,
    ]
      .filter(Boolean)
      .join('\n')

  const submit = (e) => {
    e.preventDefault()
    if (!validate()) return
    const subject = `Enquiry${form.product ? ` — ${form.product}` : ''} | ${form.name}`
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(compose())}`
    setSent(true)
  }

  const whatsapp = () => {
    if (!validate()) return
    const num = company.phones[0].replace(/[^\d]/g, '')
    window.open(`https://wa.me/${num}?text=${encodeURIComponent(compose())}`, '_blank', 'noopener')
    setSent(true)
  }

  return (
    <>
      {/* Hero */}
      <section className="shell grid items-center gap-[clamp(2rem,5vw,4rem)] pt-[clamp(7rem,15vw,11rem)] pb-[clamp(1.5rem,4vw,3rem)] lg:grid-cols-[1.15fr_0.85fr]">
        <div>
        <Reveal>
          <Eyebrow>Contact</Eyebrow>
        </Reveal>
        <Reveal delay={0.06}>
          <h1 className="mt-5 max-w-4xl font-display text-[clamp(1.9rem,6.5vw,4.25rem)] font-extrabold leading-[1.04] tracking-[-0.02em] balance">
            Tell us what your line is <span className="text-gradient">running.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-5 max-w-2xl text-[clamp(0.9rem,0.6vw+0.8rem,1.12rem)] leading-relaxed text-slate-600/85 pretty">
            Send the system, the mould and the finish you need to hit. We will come back with the
            grade, the technical data sheet and a sample you can trial.
          </p>
        </Reveal>
        </div>

        <Reveal delay={0.15} className="hidden lg:block">
          <div className="relative overflow-hidden rounded-[clamp(1rem,2vw,1.75rem)] border border-ink/10 shadow-[0_30px_70px_-35px_rgba(10,31,68,0.45)]">
            <img
              src="/assets/img/contact-floor.webp"
              alt="Moulding machines running on a factory floor"
              className="aspect-[16/11] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-deep/30 via-transparent to-transparent" />
          </div>
        </Reveal>
      </section>

      {/* Contact cards */}
      <section className="shell py-[clamp(1rem,3vw,2.5rem)]">
        <Stagger className="grid gap-3 min-[560px]:grid-cols-2 lg:grid-cols-4">
          {[
            { k: 'Call', v: company.phones[0], href: `tel:${company.phones[0].replace(/\s/g, '')}`, c: '#00bffe' },
            { k: 'WhatsApp', v: company.phones[0], href: `https://wa.me/${company.phones[0].replace(/[^\d]/g, '')}`, c: '#00d6a8' },
            { k: 'Email', v: company.email, href: `mailto:${company.email}`, c: '#fc0065' },
            { k: 'Works', v: `${company.address.line2}, Delhi ${company.address.pin}`, href: 'https://www.google.com/maps/search/?api=1&query=Village+Singhola+Delhi+110040', c: '#8b7dff' },
          ].map((c) => (
            <motion.div key={c.k} variants={stagItem}>
              <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="block h-full">
                <Card accent={c.c} className="h-full p-[clamp(1.1rem,2vw,1.6rem)]">
                  <p className="text-[0.64rem] font-semibold uppercase tracking-[0.2em]" style={{ color: c.c }}>{c.k}</p>
                  <p className="mt-2.5 font-display text-[clamp(0.78rem,0.4vw+0.68rem,0.88rem)] font-bold leading-snug text-ink [overflow-wrap:anywhere]">
                    {c.v}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[0.72rem] font-semibold text-slate-500 transition-colors group-hover:text-ink">
                    Open <Arrow className="h-3 w-3" />
                  </span>
                </Card>
              </a>
            </motion.div>
          ))}
        </Stagger>
      </section>

      {/* Form + details */}
      <section className="shell py-[clamp(2rem,6vw,5rem)]">
        <div className="grid gap-[clamp(1.5rem,4vw,3rem)] lg:grid-cols-[1.25fr_0.75fr]">
          {/* Form */}
          <Reveal>
            <div className="glass rounded-2xl p-[clamp(1.25rem,3vw,2.5rem)]">
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="py-8 text-center"
                >
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-cyan-brand/15">
                    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7 text-cyan-brand">
                      <path d="m5 13 4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <h2 className="mt-5 font-display text-[clamp(1.15rem,2.4vw,1.75rem)] font-extrabold text-ink">
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
                    onClick={() => { setSent(false); setForm(EMPTY) }}
                    className="mt-6 text-[0.8rem] font-semibold text-slate-500 underline-offset-4 transition-colors hover:text-ink hover:underline"
                  >
                    Send another enquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={submit} noValidate>
                  <h2 className="font-display text-[clamp(1.15rem,2.4vw,1.75rem)] font-extrabold tracking-tight text-ink">
                    Send an enquiry
                  </h2>
                  <p className="mt-2 text-[0.82rem] text-slate-500">
                    Fields marked with an asterisk are required.
                  </p>

                  <div className="mt-7 grid gap-4 sm:grid-cols-2">
                    <Field label="Your name *" name="name" value={form.name} onChange={onChange} error={errors.name} autoComplete="name" placeholder="Nirmal Mittal" />
                    <Field label="Company" name="company" value={form.company} onChange={onChange} autoComplete="organization" placeholder="Footwear Pvt. Ltd." />
                    <Field label="Email" name="email" type="email" value={form.email} onChange={onChange} error={errors.email} autoComplete="email" placeholder="you@company.com" />
                    <Field label="Phone" name="phone" type="tel" value={form.phone} onChange={onChange} error={errors.phone?.trim() ? errors.phone : undefined} autoComplete="tel" placeholder="+91 ..." />
                  </div>

                  <label className="mt-4 block">
                    <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Product of interest
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

                  <label className="mt-4 block">
                    <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-slate-500">
                      Your requirement *
                    </span>
                    <textarea
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={onChange}
                      placeholder="System, mould temperature, cycle time, finish, monthly volume…"
                      className={`mt-2 w-full resize-y rounded-xl border bg-ink/[0.04] px-4 py-3 text-[0.92rem] text-ink placeholder:text-slate-500 transition-colors duration-300 focus:bg-ink/[0.07] focus:outline-none ${
                        errors.message ? 'border-magenta/70' : 'border-ink/12 focus:border-cyan-brand/70'
                      }`}
                    />
                    {errors.message && (
                      <span className="mt-1.5 block text-[0.72rem] font-medium text-magenta-soft">{errors.message}</span>
                    )}
                  </label>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <Button type="submit">
                      Send enquiry <Arrow />
                    </Button>
                    <Button type="button" variant="ghost" onClick={whatsapp}>
                      Send on WhatsApp
                    </Button>
                  </div>

                  <p className="mt-5 text-[0.72rem] leading-relaxed text-slate-500">
                    This form opens your own mail app or WhatsApp with the details filled in — nothing
                    is stored on this website.
                  </p>
                </form>
              )}
            </div>
          </Reveal>

          {/* Side details */}
          <Reveal delay={0.1}>
            <div className="space-y-4">
              <div className="glass rounded-2xl p-[clamp(1.25rem,2.5vw,2rem)]">
                <h3 className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Phone</h3>
                <ul className="mt-4 space-y-3">
                  {company.phones.map((p) => (
                    <li key={p}>
                      <a
                        href={`tel:${p.replace(/\s/g, '')}`}
                        className="group flex items-center justify-between gap-3 font-display text-[clamp(0.88rem,0.6vw+0.74rem,1.05rem)] font-bold text-ink transition-colors hover:text-blue-brand"
                      >
                        {p}
                        <Arrow className="h-4 w-4 text-slate-500 group-hover:text-blue-brand" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass rounded-2xl p-[clamp(1.25rem,2.5vw,2rem)]">
                <h3 className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Works address</h3>
                <address className="mt-4 text-[0.92rem] not-italic leading-relaxed text-slate-600/85">
                  {company.legal}
                  <br />
                  {company.address.line1}
                  <br />
                  {company.address.line2}
                  <br />
                  {company.address.city} — {company.address.pin}
                </address>
                <p className="mt-4 text-[0.75rem] text-slate-500">
                  GSTIN <span className="text-slate-500">{company.gstin}</span>
                </p>
              </div>

              <div className="glass rounded-2xl p-[clamp(1.25rem,2.5vw,2rem)]">
                <h3 className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-slate-500">Working hours</h3>
                <dl className="mt-4 space-y-2.5 text-[0.88rem]">
                  <div className="flex justify-between gap-3">
                    <dt className="text-slate-500">Monday – Saturday</dt>
                    <dd className="font-semibold text-ink">10:00 – 19:00</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-slate-500">Sunday</dt>
                    <dd className="font-semibold text-slate-500">Closed</dd>
                  </div>
                </dl>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Map */}
      <section className="shell pb-[clamp(3rem,8vw,6rem)]">
        <Reveal>
          <div className="glass relative h-[clamp(14rem,40vw,26rem)] overflow-hidden rounded-2xl">
            <iframe
              title="Turbotech works location map"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full saturate-[0.85]"
              src="https://www.google.com/maps?q=Village%20Singhola%2C%20Delhi%20110040&output=embed"
            />
          </div>
        </Reveal>
      </section>
    </>
  )
}
