import React from 'react';
import './globals.css';
import { Inter } from 'next/font/google';
import styles from '@/app/[lang]/page.module.css';
import LocaleSwitcher from '@/lib/components/LocalSwitcher';
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata({
  params
}: {
  params: { lang: string };
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
  params: { lang: string };
}) {
  return (
    <html lang={params.lang}>
      <body className={inter.className}>
        <main className={styles.main}>
          <div className={styles.description}>
            <p>Select The language to change the locale</p>
            <LocaleSwitcher />
          </div>

          {children}
        </main>
      </body>
    </html>
  );
}
