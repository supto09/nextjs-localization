# Next.js Localization Example

This is a beginner-friendly project that demonstrates how to implement localization in your web application using the i18n library with Next.js. While the [official example](https://nextjs.org/docs/app/building-your-application/routing/internationalization) provides an abstract idea about how to use localization in Next.js 13 with the app directory structure, this project offers a more concrete and practical example that you can easily follow along with.

In addition, this project goes a step further by saving the user's selected locale in a browser cookie, allowing the same locale to be used on subsequent visits. Unlike the official example, which doesn't save user preferences, this project provides a more seamless user experience by remembering the user's selected language.


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Saving User's Selected Locale in a Browser Cookie

To save the user's selected locale in a browser cookie, the project uses an API that is implemented in the `app/api/save-locale.ts` file. This API receives the selected locale, and sets a cookie with the selected locale value.

Here's the code for the `app/api/save-locale.ts` file:

```
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
```

## Redirecting Users to Proper Route for Locale

To redirect the user to the proper route for the selected locale, the project uses middleware that is implemented in the `middleware.ts file`. This middleware checks the requested route for a valid locale parameter, and redirects the user to the proper route for the selected locale.

If no locale parameter is specified in the route, the middleware checks the browser cookie for a saved locale. If a saved locale is found, the middleware  redirects the user to the proper route for the selected locale.

If no saved locale is found in the browser cookie, the middleware uses the default locale of the user's browser, which is determined using `@formatjs/intl-localematcher` and `negotiator`.

If none of the above methods work, the middleware falls back to the `en` locale as the default, and redirects the user to the proper route for the `en` locale.

Here's the code for selecting locale in `middleware.ts` file:

```
function getLocale(request: NextRequest): string | undefined {
  // select locale information saved in browser cookie
  const localeFromCookie = request.cookies.get(LOCALE_COOKIE_NAME)?.value;
  if (localeFromCookie) {
    return localeFromCookie;
  }

  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // Use negotiator and intl-localematcher to get best locale
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  // we are using map to convert the locales array of string literals to string array
  const locales: string[] = i18n.locales.map((s) => s);
  return matchLocale(languages, locales, i18n.defaultLocale);
}
```

By using this middleware, the project ensures that the user is always redirected to the proper route for the selected locale, even if the user manually types in a URL without the locale parameter.


## Contributions
This project is open for contributions. If you find any bugs or issues, feel free to raise a new issue or submit a pull request. Any suggestions and improvements to the existing codebase are welcome.

Thank you for considering contributing to this project!
