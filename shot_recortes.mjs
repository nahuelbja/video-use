import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const browser = await puppeteer.launch({
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
  defaultViewport: { width: 600, height: 3000, deviceScaleFactor: 2 },
});
const page = await browser.newPage();
await page.goto('file://' + path.join(__dirname, 'gen_recortes.html'), { waitUntil: 'networkidle0' });

for (let i = 1; i <= 8; i++) {
  const el = await page.$('#r' + i);
  await el.screenshot({
    path: path.join(__dirname, `recorte_0${i}.png`),
    omitBackground: true,
  });
  console.log(`recorte_0${i}.png`);
}
await browser.close();
console.log('Done.');
