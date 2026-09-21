/**
 * Responsive audit: loads each route at a range of widths, reports any
 * horizontal overflow and names the elements that cause it.
 *
 *   node scripts/responsive-check.mjs [baseUrl] [--shots <dir>]
 */
import puppeteer from 'puppeteer-core'
import { mkdirSync } from 'node:fs'

const BASE = process.argv[2]?.startsWith('http') ? process.argv[2] : 'http://127.0.0.1:5180'
const shotIdx = process.argv.indexOf('--shots')
const SHOTS = shotIdx > -1 ? process.argv[shotIdx + 1] : null
if (SHOTS) mkdirSync(SHOTS, { recursive: true })

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const ROUTES = ['/', '/products', '/products/pu-pigments', '/about', '/contact']
const WIDTHS = [300, 360, 414, 640, 768, 1024, 1280, 1536, 1920, 2560]

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars', '--enable-unsafe-swiftshader'],
})

let failures = 0

for (const route of ROUTES) {
  for (const width of WIDTHS) {
    const page = await browser.newPage()
    await page.setViewport({ width, height: 900, deviceScaleFactor: 1 })
    await page.goto(BASE + route, { waitUntil: 'networkidle2', timeout: 30000 })
    await new Promise((r) => setTimeout(r, 700))

    const report = await page.evaluate((vw) => {
      const doc = document.documentElement
      const overflow = doc.scrollWidth - vw
      const culprits = []
      if (overflow > 1) {
        for (const el of document.querySelectorAll('body *')) {
          const r = el.getBoundingClientRect()
          if (r.width === 0 && r.height === 0) continue
          if (r.right > vw + 1 || r.left < -1) {
            const style = getComputedStyle(el)
            if (style.position === 'fixed') continue
            culprits.push({
              tag: el.tagName.toLowerCase(),
              cls: (el.className?.baseVal ?? el.className ?? '').toString().slice(0, 90),
              left: Math.round(r.left),
              right: Math.round(r.right),
              w: Math.round(r.width),
            })
          }
        }
      }
      // Also flag text that would clip
      return { overflow, culprits: culprits.slice(0, 6), scrollW: doc.scrollWidth }
    }, width)

    const bad = report.overflow > 1
    if (bad) failures++
    const tag = bad ? 'OVERFLOW' : 'ok'
    console.log(`${tag.padEnd(9)} ${route.padEnd(26)} ${String(width).padStart(5)}px  scrollW=${report.scrollW}`)
    for (const c of report.culprits) {
      console.log(`            └─ <${c.tag}> w=${c.w} [${c.left}..${c.right}]  ${c.cls}`)
    }

    if (SHOTS && [300, 768, 1536].includes(width)) {
      const name = route.replace(/\//g, '_') || '_home'
      await page.screenshot({ path: `${SHOTS}/${name}__${width}.png`, fullPage: true })
    }
    await page.close()
  }
}

await browser.close()
console.log(failures ? `\n${failures} viewport(s) overflow.` : '\nNo horizontal overflow at any tested width.')
process.exit(failures ? 1 : 0)
