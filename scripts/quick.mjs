import puppeteer from 'puppeteer-core'
import { appendFileSync, writeFileSync } from 'node:fs'
const OUT = process.env.OUT || 'audit.txt'
writeFileSync(OUT, '')
const log = (s) => { appendFileSync(OUT, s + '\n'); console.log(s) }
const b = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, args: ['--no-sandbox','--disable-gpu','--hide-scrollbars','--enable-unsafe-swiftshader'] })
const page = await b.newPage()
for (const route of ['/','/products','/products/pu-pigments','/about','/contact']) {
  for (const w of [300, 360, 768, 1280, 2560]) {
    await page.setViewport({ width: w, height: 880 })
    await page.goto((process.env.BASE || 'http://127.0.0.1:5180') + route, { waitUntil: 'domcontentloaded' })
    await new Promise(r => setTimeout(r, 450))
    const r = await page.evaluate((vw) => {
      const d = document.documentElement
      const over = d.scrollWidth - vw
      const bad = []
      if (over > 1) for (const el of document.querySelectorAll('body *')) {
        const q = el.getBoundingClientRect()
        if (!q.width && !q.height) continue
        if (getComputedStyle(el).position === 'fixed') continue
        if (q.right > vw + 1 || q.left < -1) bad.push(`<${el.tagName.toLowerCase()}> w=${Math.round(q.width)} [${Math.round(q.left)}..${Math.round(q.right)}] ${String(el.className||'').slice(0,80)}`)
      }
      return { over, bad: bad.slice(0, 5) }
    }, w)
    log(`${r.over > 1 ? 'OVERFLOW' : 'ok      '} ${route.padEnd(24)} ${String(w).padStart(5)}px  over=${r.over}`)
    r.bad.forEach(x => log('     ' + x))
  }
}
await b.close()
log('done')
