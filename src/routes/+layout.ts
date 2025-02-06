import { addTranslations, setLocale, setRoute } from "$lib/translations";
import { authStore } from "$lib/stores/auth";
import { browser } from "$app/environment";

/** @type {import('@sveltejs/kit').Load} */
export const load = async ({ data }) => {
  const { i18n, translations } = data;
  const { locale, route } = i18n;

  addTranslations(translations);

  await setRoute(route);
  await setLocale(locale);

  // Only fetch user data in the browser and if we have an access token
  if (browser) {
    await authStore.fetchUser();
  }

  return i18n;
};
