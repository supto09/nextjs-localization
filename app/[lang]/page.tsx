import styles from './page.module.css';
import Link from 'next/link';
import { getDictionary } from '@/lib/i18n/get-dictionary';
import { Locale } from '@/lib/i18n/i18n-config';

type PageParams = {
  params: {
    lang: Locale;
  };
};

export default async function Home({ params }: PageParams) {
  const dictionary = await getDictionary(params.lang);

  return (
    <>
      <div className={styles.center}>
        <p>{dictionary['home-page'].message}</p>
      </div>

      <div className={styles.grid}>
        <Link href={`${params.lang}/details`} className={styles.card}>
          <h2>
            {dictionary['home-page']['details-title']} <span>-&gt;</span>
          </h2>
          <p>{dictionary['home-page']['details-description']}</p>
        </Link>
      </div>
    </>
  );
}
