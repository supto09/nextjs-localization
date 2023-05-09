import cookie from 'cookie';
import { Locale, LOCALE_COOKIE_NAME } from '@/lib/i18n/i18n-config';

type Body = {
  locale: Locale;
};

export async function POST(request: Request) {
  const { locale } = (await request.json()) as Body;

  const cookieData = cookie.serialize(LOCALE_COOKIE_NAME, locale, {
    path: '/',
    httpOnly: false,
    secure: false, // Set this to true on HTTPS environments
    sameSite: 'strict' as const,
    maxAge: 365 * 60 * 60 * 24 * 1000 // one year
  });

  return new Response(
    JSON.stringify({
      message: 'Set-Cookie returned'
    }),
    {
      status: 200,
      headers: { 'Set-Cookie': cookieData }
    }
  );
}
