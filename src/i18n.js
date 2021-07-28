import i18n from "i18next";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    ns: ["translation"],
    // // we init with resources
    // resources: {
    //   en: {
    //     translation: {
    //       sidebar: {
    //         header: {
    //           contact: "Contact",
    //           languages: "Languages",
    //           skillset: "Skillset",
    //           interests: "Interests",
    //         },
    //         interests: {
    //           interest1: "Cooking",
    //           interest2: "Sketching",
    //           interest3: "Playing Guitar",
    //           interest4: "Chess",
    //           interest5: "Cycling, Touring",
    //           interest6: "Strategy Games",
    //         },
    //       },
    //     },
    //   },
    //   de: {
    //     translation: {
    //       sidebar: {
    //         header: {
    //           contact: "Kontakt",
    //           languages: "Sprachen",
    //           skillset: "Skillset",
    //           interests: "Interessen",
    //         },
    //         interests: {
    //           interest1: "Kochen",
    //           interest2: "Zeichnen",
    //           interest3: "Gitarre spielen",
    //           interest4: "Schach",
    //           interest5: "Fahrradfahren, Touren",
    //           interest6: "Strategiespiele",
    //         },
    //       },
    //     },
    //   },
    // },
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
