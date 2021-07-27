import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  // we init with resources
  resources: {
    en: {
      translation: {
        sidebar: {
          header: {
            contact: "Contact",
            languages: "Languages",
            skillset: "Skillset",
            interests: "Interests",
          },
          interests: {
            interest1: "Cooking",
            interest2: "Sketching",
            interest3: "Playing Guitar",
            interest4: "Chess",
            interest5: "Cycling, Touring",
            interest6: "Strategy Games",
          },
        },
      },
    },
    de: {
      translation: {
        sidebar: {
          header: {
            contact: "Kontakt",
            languages: "Sprachen",
            skillset: "Skillset",
            interests: "Interessen",
          },
          interests: {
            interest1: "Kochen",
            interest2: "Zeichnen",
            interest3: "Gitarre spielen",
            interest4: "Schach",
            interest5: "Fahrradfahren, Touren",
            interest6: "Strategiespiele",
          },
        },
      },
    },
  },
  fallbackLng: "en",
  keySeparator: ".",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
