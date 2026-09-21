import puppeteer from 'puppeteer-core'
import { mkdirSync } from 'node:fs'
const DIR = process.env.DIR
mkdirSync(DIR, { recursive: true })
const b = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, args: ['--no-sandbox','--hide-scrollbars','--enable-unsafe-swiftshader'] })
const page = await b.newPage()
const jobs = JSON.parse(process.env.JOBS)
for (const [route, w, h, full] of jobs) {
  await page.setViewport({ width: w, height: h })
  await page.goto((process.env.BASE || 'http://127.0.0.1:5180') + route, { waitUntil: 'domcontentloaded' })
  await new Promise(r => setTimeout(r, 2200))
  const name = (route.replace(/\//g,'_') || '_home') + '__' + w
  await page.screenshot({ path: `${DIR}/${name}.png`, fullPage: !!full })
  console.log(name)
}
await b.close()
