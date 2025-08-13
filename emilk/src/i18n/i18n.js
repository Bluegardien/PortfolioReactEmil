import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import fr from "./fr.json";
import en from "./en.json";
import es from "./es.json";
import de from "./de.json";

i18n
  .use(LanguageDetector) // détecte la langue du navigateur
  .use(initReactI18next) // connecte à React
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
      es: { translation: es },
      de: { translation: de },
    },
    fallbackLng: "en", // langue par défaut si non trouvée
    interpolation: {
      escapeValue: false, // React gère déjà la sécurité
    },
  });

export default i18n;