import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const target = process.argv[2] || 'carrusel_separar_plata.html';
const htmlFile = path.join(__dirname, target);
const prefix = process.argv[3] || 'slide';
const outDir = __dirname;

const browser = await puppeteer.launch({
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
  defaultViewport: { width: 1080, height: 1350, deviceScaleFactor: 2 },
});

const page = await browser.newPage();
await page.goto(`file://${htmlFile}`, { waitUntil: 'networkidle0' });

// Wait for Google Fonts to load — explicitly load every @font-face used,
// then settle briefly (document.fonts.ready alone can resolve before
// large/rare faces like Archivo Black have actually painted).
await page.evaluate(async () => {
  const families = [
    '400 170px "Archivo Black"',
    'italic 400 64px "Playfair Display"',
    'italic 700 52px "Playfair Display"',
    '400 32px "Geist"',
    '600 34px "Geist"',
    '500 15px "Geist Mono"',
  ];
  try { await Promise.all(families.map((f) => document.fonts.load(f))); } catch (e) {}
  await document.fonts.ready;
});
await new Promise((r) => setTimeout(r, 400));

const slides = await page.$$('.slide');

console.log(`Found ${slides.length} slides`);

for (let i = 0; i < slides.length; i++) {
  const slide = slides[i];
  const outPath = path.join(outDir, `${prefix}_${String(i + 1).padStart(2, '0')}.png`);
  await slide.screenshot({
    path: outPath,
    type: 'png',
  });
  console.log(`Saved: ${outPath}`);
}

await browser.close();
console.log('Done.');
