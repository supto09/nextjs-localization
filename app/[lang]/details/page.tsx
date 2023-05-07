import styles from '@/app/[lang]/page.module.css';
import { Locale } from '@/lib/i18n/i18n-config';
import { getDictionary } from '@/lib/i18n/get-dictionary';

type PageParams = {
  params: {
    lang: Locale;
  };
};

export default async function DetailsPage({ params }: PageParams) {
  const dictionary = await getDictionary(params.lang);

  return (
    <>
      <div className={styles.main}>
        <p>{dictionary['details-page'].message}</p>
      </div>
    </>
  );
}
