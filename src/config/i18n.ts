import i18n from 'i18next';
import backend from 'i18next-xhr-backend';
import { initReactI18next } from 'react-i18next';

i18n.use(backend)
    .use(initReactI18next)
    .init({
        lng: 'en',
        fallbackLng: 'en',
        ns: ['home'],
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
