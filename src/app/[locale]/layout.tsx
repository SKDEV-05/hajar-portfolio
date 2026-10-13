import type { Viewport } from 'next';
import { notFound } from 'next/navigation';
import { locales, Locale, copy } from '@/data/content';
import { Providers } from '@/components/controls';
import { Header, Footer } from '@/components/layout';
import { ScrollMotion } from '@/components/scroll-motion';
import '@fontsource-variable/manrope';
import '../globals.css';
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#061f2b' },
    { media: '(prefers-color-scheme: light)', color: '#f4f3ed' },
  ],
};
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  const l = locale as Locale;
  return (
    <html lang={l} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body id="top">
        <Providers>
          <ScrollMotion />
          <a className="skip-link" href="#main">
            {copy[l].skip}
          </a>
          <Header locale={l} />
          <main id="main">{children}</main>
          <Footer locale={l} />
        </Providers>
      </body>
    </html>
  );
}
