import i18n from "i18next";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

import translationEN from "./locales/en/translation.json";
import translationDE from "./locales/de/translation.json";

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    ns: ["translation"],
    resources: {
      en: {
        translation: translationEN,
      },
      de: {
        translation: translationDE,
      },
    },
    fallbackLng: "en",
    debug: true,
    keySeparator: ".",
    defaultNA: "translation",
    ns: "translation",

    interpolation: {
      escapeValue: false,
    },

    backend: {
      // cv/ is added because of the 'homepage' field in package.json
      loadPath: "cv/locales/{{lng}}/{{ns}}.json",
      addPath: "cv/locales/add/{{lng}}/{{ns}}",
    },
  });

export default i18n;
