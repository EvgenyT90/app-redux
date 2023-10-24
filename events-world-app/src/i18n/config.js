import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
    fallbackLng: "ru",
    lng: "ru",
    resources: {
        en: {
            translations: require("./locales/en/translation.json"),
        },
        ru: {
            translations: require("./locales/ru/translation.json"),
        },
    },
    ns: ["translations"],
    defaultNS: "translations",
});

i18n.langueages = ["en", "ru"];

export default i18n;
