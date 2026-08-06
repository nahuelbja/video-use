import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const browser = await puppeteer.launch({
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
  defaultViewport: { width: 1080, height: 1920, deviceScaleFactor: 2 },
});
const page = await browser.newPage();
await page.goto('file://' + path.join(__dirname, 'historia_contador.html'), { waitUntil: 'networkidle0' });
await page.evaluate(() => document.fonts.ready);
const stage = await page.$('#stage');
await stage.screenshot({ path: path.join(__dirname, 'historia_contador.png'), type: 'png' });
await browser.close();
console.log('Done: historia_contador.png');
