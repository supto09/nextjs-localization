'use client';

import { usePathname, useRouter } from 'next/navigation';
import styles from '@/app/[lang]/page.module.css';
import { i18n, Locale } from '@/lib/i18n/i18n-config';

type Props = {
  selectedLocale: Locale;
};

export default function LocaleSwitcher({ selectedLocale }: Props) {
  const pathName = usePathname();
  const router = useRouter();

  /**
   * saves the local information in cookies and goes to that url after router refresh
   * @param locale
   */
  const handleLocaleClick = (locale: string) => {
    fetch('/api/save-locale', {
      method: 'POST',
      body: JSON.stringify({
        locale: locale
      })
    }).finally(() => {
      router.refresh();

      if (!pathName) return '/';
      const segments = pathName.split('/');
      segments[1] = locale;
      const url = segments.join('/');

      router.push(url);
    });
  };

  return (
    <div className={styles.linkContainer}>
      {i18n.locales.map((locale) => (
        <p
          key={locale}
          className={selectedLocale === locale ? styles.highLight : undefined}
          onClick={() => handleLocaleClick(locale)}>
          {locale}
        </p>
      ))}
    </div>
  );
}
