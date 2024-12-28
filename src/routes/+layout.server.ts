import type { LayoutServerLoad } from "./$types";
import {
  loadTranslations,
  locales,
  defaultLocale,
  translations,
} from "$lib/translations";

export const load: LayoutServerLoad = async ({
  url,
  cookies,
  request,
  // locals,
}) => {
  const { pathname } = url;

  // Get user preferred locale
  let locale = (cookies.get("lang") || "").toLowerCase();

  // Get user preferred locale
  if (!locale) {
    // If no cookie is set, try to determine the locale from the 'Accept-Language' header
    const acceptLanguageHeader = request.headers.get("accept-language") || "";

    // Attempt to match the language code with optional region code
    let match = acceptLanguageHeader.match(/^[a-z]+(?=[-_])/i);

    // If no match is found, try to match just the language code
    if (!match) {
      match = acceptLanguageHeader.match(/^[a-z]+/i);
    }

    // If a match is found, use it as the locale, otherwise fall back to the default locale
    locale = match ? match[0].toLowerCase() : defaultLocale;
  }

  // Get defined locales
  const supportedLocales = locales.get().map((l) => l.toLowerCase());

  // Use default locale if current locale is not supported
  if (!supportedLocales.includes(locale)) {
    locale = defaultLocale;
  }

  await loadTranslations(locale, pathname); // keep this just before the `return`

  const initLocale = pathname.startsWith("/ee")
    ? "et"
    : pathname.startsWith("/ru")
    ? "ru"
    : "en";
  await loadTranslations(initLocale);

  return {
    i18n: { locale, route: pathname },
    translations: translations.get(), // `translations` on server contain all translations loaded by different clients
    // session: await locals.auth,
  };
};
