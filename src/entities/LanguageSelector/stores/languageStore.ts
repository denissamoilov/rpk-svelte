import type { ObjectValues, SelectOptionType } from "$lib/types/docs";
import { writable } from "svelte/store";

const supportedLanguages = {
  ENGLISH: "en",
  ESTONIAN: "ee",
  RUSSIAN: "ru",
} as const;

export type supportedLanguagesType = ObjectValues<typeof supportedLanguages>;

export const languageStore = writable<SelectOptionType>({
  value: supportedLanguages.ENGLISH,
  label: "English",
  disabled: false,
});

export const setLanguage = (lang: SelectOptionType) => {
  languageStore.set(lang);
};
