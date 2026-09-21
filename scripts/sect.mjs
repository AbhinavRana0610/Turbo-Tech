import puppeteer from 'puppeteer-core'
const b = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, args: ['--no-sandbox','--hide-scrollbars','--enable-unsafe-swiftshader'] })
const p = await b.newPage()
p.on('pageerror', e => console.log('PAGE-ERR:', String(e).slice(0,200)))
await p.setViewport({ width: Number(process.env.W||1280), height: 900 })
await p.goto((process.env.BASE||'http://127.0.0.1:5181')+'/', { waitUntil: 'domcontentloaded' })
await new Promise(r => setTimeout(r, 2500))
const y = await p.evaluate(() => {
  const h = [...document.querySelectorAll('h2')].find(e => e.textContent.includes('specification'))
  return h ? h.getBoundingClientRect().top + scrollY - 40 : 0
})
await p.evaluate(v => window.scrollTo(0, v), y)
await new Promise(r => setTimeout(r, 1400))
await p.screenshot({ path: process.env.OUT })
await b.close()
