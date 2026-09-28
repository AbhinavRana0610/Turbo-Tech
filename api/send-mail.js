/* ============================================================
   send-mail - Vercel serverless version of the general send-mail.php.
   Vercel does not run PHP, so the same logic lives here in Node and
   sends through SMTP (Gmail by default) with nodemailer.
   Response: "success" or "error" (the forms check this exact text).

   Needs these environment variables in Vercel (Project > Settings >
   Environment Variables):
     SMTP_USER  the Gmail address that sends the mail
     SMTP_PASS  a Gmail App Password for it (not the normal password)
     SMTP_HOST  optional, default smtp.gmail.com
     SMTP_PORT  optional, default 465
   ============================================================ */

import nodemailer from 'nodemailer'

// ---------------- CONFIG ----------------
const clientEmail = 'turbotechchemicals@gmail.com' // where enquiries go
const siteName = '' // used in the subject; empty = the website's domain
const bccEmails = 'anandkpp123@gmail.com, promopactmarketing@gmail.com' // optional, comma separated
// Gmail only sends "From" the account it logs in with, so From is SMTP_USER.
// ----------------------------------------

const labels = {
  whatsappName: 'Name',
  whatsappMobile: 'Mobile',
  companyName: 'Company Name',
  company: 'Company Name',
  name: 'Name',
  email: 'Email',
  mobile: 'Mobile',
  phone: 'Mobile',
  productService: 'Product/Service',
  product: 'Product/Service',
  message: 'Message',
}

// Not included in the email body
const skipFields = ['formSource', 'website']

const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s)

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  if (req.method !== 'POST') return res.status(405).end()

  const { SMTP_USER, SMTP_PASS, SMTP_HOST = 'smtp.gmail.com', SMTP_PORT = '465' } = process.env
  if (!isEmail(clientEmail) || !SMTP_USER || !SMTP_PASS) {
    console.error('send-mail: clientEmail, SMTP_USER or SMTP_PASS is not set')
    return res.send('error')
  }

  const post = typeof req.body === 'object' && req.body ? req.body : {}

  // Honeypot: a hidden "website" field no person fills. A bot did, so quietly say success.
  if (post.website) return res.send('success')

  const host = String(req.headers['x-forwarded-host'] || req.headers.host || 'localhost')
    .replace(/[^a-z0-9.-]/gi, '')
    .replace(/^www\./i, '')
  const site = siteName || host

  let formType = 'Website Form'
  if (post.formSource) formType = String(post.formSource).trim()
  else if ('whatsappName' in post) formType = 'WhatsApp Contact Form'
  else if ('email' in post) formType = 'Email Contact Form'

  const lines = []
  let hasContact = false
  for (const [key, raw] of Object.entries(post)) {
    if (skipFields.includes(key)) continue
    const value = (Array.isArray(raw) ? raw.join(', ') : String(raw ?? '')).trim()
    if (!value) continue

    // "project_location" / "projectLocation" -> "Project Location"
    const label =
      labels[key] ||
      key
        .replace(/([a-z])([A-Z])|[_-]+/g, (_, a, b) => (a ? `${a} ${b}` : ' '))
        .trim()
        .replace(/\b\w/g, (c) => c.toUpperCase())

    if (/mobile|phone|email/i.test(key)) hasContact = true

    // Long message on its own lines, the rest on one line
    lines.push(value.includes('\n') || value.length > 80 ? `\n${label}:\n${value}` : `${label}: ${value}`)
  }

  // Empty, or no mobile/email to reply to
  if (!lines.length || !hasContact) return res.send('Invalid form submission.')

  // Indian time, d-m-Y H:i:s
  const p = Object.fromEntries(
    new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Kolkata',
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23',
    })
      .formatToParts(new Date())
      .map((x) => [x.type, x.value])
  )
  const currentTime = `${p.day}-${p.month}-${p.year} ${p.hour}:${p.minute}:${p.second}`

  const body =
    `${formType} Submission:\n\n` +
    lines.join('\n') +
    `\n\n----\nSubmitted: ${currentTime}` +
    `\nPage: ${req.headers.referer || 'N/A'}`

  // Reply-To only takes a valid email
  const visitorEmail = String(post.email || '').trim()

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    })
    await transporter.sendMail({
      from: { name: `${site} Website`, address: SMTP_USER },
      to: clientEmail,
      bcc: bccEmails || undefined,
      replyTo: isEmail(visitorEmail) ? visitorEmail : clientEmail,
      subject: `${site} Inquiry - ${currentTime}`,
      text: body,
    })
    return res.send('success')
  } catch (err) {
    console.error('send-mail:', err)
    return res.send('error')
  }
}
