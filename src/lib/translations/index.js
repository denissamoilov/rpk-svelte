import i18n from "sveltekit-i18n";
import lang from "./lang.json";

export const defaultLocale = "en";

/** @type {import('sveltekit-i18n').Config} */
const config = {
  translations: {
    en: { lang },
    et: { lang },
    ru: { lang },
  },
  loaders: [
    {
      locale: "en",
      key: "auth",
      loader: async () => (await import("./en/auth.json")).default,
    },
    {
      locale: "et",
      key: "auth",
      loader: async () => (await import("./et/auth.json")).default,
    },
    {
      locale: "ru",
      key: "auth",
      loader: async () => (await import("./ru/auth.json")).default,
    },
  ],
};

export const {
  t,
  locale,
  locales,
  loading,
  addTranslations,
  loadTranslations,
  translations,
  setLocale,
  setRoute,
} = new i18n(config);

loading.subscribe(async ($loading) => {
  if ($loading) {
    console.log("Loading translations for the main instance...");
    await loading.toPromise();
    console.log("Updated translations", translations.get());
  }
});
