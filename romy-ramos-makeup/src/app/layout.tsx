import type { Metadata } from 'next';
import { Playfair_Display, Cormorant_Garamond, Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Romy Ramos Makeup — Maquillaje profesional en Paraguay',
  description:
    'Maquillaje profesional para novias, eventos sociales, glam y producciones editoriales. Atención personalizada en Asunción y todo Paraguay.',
  openGraph: {
    title: 'Romy Ramos Makeup — Maquillaje profesional en Paraguay',
    description:
      'Maquillaje profesional para novias, eventos sociales, glam y producciones editoriales.',
    type: 'website',
    locale: 'es_PY',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${playfair.variable} ${cormorant.variable} ${inter.variable}`}>
      <body style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
        {children}
        <Script id="cal-embed" strategy="lazyOnload">{`
          (function(C,A,L){let p=function(a,ar){a.q.push(ar)};let d=C.document;C.Cal=C.Cal||function(){let cal=C.Cal;let ar=arguments;if(!cal.loaded){cal.ns={};cal.q=cal.q||[];d.head.appendChild(d.createElement("script")).src=A;cal.loaded=true}if(ar[0]===L){const api=function(){p(api,arguments)};const namespace=ar[1];api.q=api.q||[];typeof namespace==="string"?(cal.ns[namespace]=api)&&p(api,ar):p(cal,ar);return}p(cal,ar)};})(window,"https://app.cal.com/embed/embed.js","init");
          Cal("init", {origin:"https://cal.com"});
        `}</Script>
      </body>
    </html>
  );
}
