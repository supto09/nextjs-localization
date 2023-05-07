'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from '@/app/[lang]/page.module.css';
import { i18n } from '@/lib/i18n/i18n-config';

export default function LocaleSwitcher() {
  const pathName = usePathname();
  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/';
    const segments = pathName.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  return (
    <div className={styles.linkContainer}>
      {i18n.locales.map((locale) => (
        <p key={locale}>
          <Link href={redirectedPathName(locale)}>{locale}</Link>
        </p>
      ))}
    </div>
  );
}
