import puppeteer from 'puppeteer-core'
const b = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, args: ['--no-sandbox','--hide-scrollbars','--enable-unsafe-swiftshader'] })
const page = await b.newPage()
page.on('console', m => { if (m.type()==='error') console.log('CONSOLE-ERR:', m.text().slice(0,300)) })
page.on('pageerror', e => console.log('PAGE-ERR:', String(e).slice(0,300)))
await page.setViewport({ width: Number(process.env.W||300), height: 900 })
await page.goto('http://127.0.0.1:5180/', { waitUntil: 'domcontentloaded' })
await new Promise(r => setTimeout(r, 6000))
const info = await page.evaluate(() => {
  const c = document.querySelector('canvas')
  if (!c) return { canvas: false }
  const r = c.getBoundingClientRect()
  // sample the middle of the canvas to see if anything is drawn
  const gl = c.getContext('webgl2') || c.getContext('webgl')
  return { canvas: true, css:[Math.round(r.width),Math.round(r.height)], attr:[c.width,c.height], gl: !!gl, aspect: +(r.width/r.height).toFixed(2) }
})
console.log(JSON.stringify(info))
await page.screenshot({ path: process.env.OUT || 'dbg.png' })
await b.close()
