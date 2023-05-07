import React from 'react';
import { Metadata } from 'next';

import './globals.css';
import { Inter } from 'next/font/google';
import styles from '@/app/[lang]/page.module.css';
import { i18n, Locale } from '@/lib/i18n/i18n-config';

import LocaleSwitcher from '@/lib/components/LocalSwitcher';

const inter = Inter({ subsets: ['latin'] });

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({
  params
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const title = `Localization - ${params.lang}`;
  const description = `Language Details ${params.lang}`;

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description
    },
    twitter: {
      title: title,
      description: description,
      card: 'summary_large_image',
      site: '@lighter_app'
    }
  };
}

export default function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return (
    <html lang={params.lang}>
      <body className={inter.className}>
        <main className={styles.main}>
          <div className={styles.description}>
            <p>Select The language to change the locale</p>
            <LocaleSwitcher selectedLocale={params.lang} />
          </div>

          {children}
        </main>
      </body>
    </html>
  );
}
