import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import ko from "./ko.json";
import cn from "./cn.json";
import es from "./es.json";
import ar from "./ar.json";
import it from "./it.json";

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: en,
        },
        ko: {
            translation: ko,
        },
        cn: {
            translation: cn,
        },
        es: {
            translation: es,
        },
        ar: {
            translation: ar,
        },
        it: {
            translation: it,
        },
    },
    lng: "ko-KR",
    fallbackLng: {
        "ko-KR": ["ko-KR"],
        default: ["en-US"],
    },
    debug: true,
    defaultNS: "translation",
    ns: "translation",
    keySeparator: false,
    interpolation: {
        escapeValue: false,
    },
    react: {
        useSuspense: false,
    },
});

export default i18n;
