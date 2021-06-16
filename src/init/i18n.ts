import { allLanguages, language } from 'configs';

import en from 'locales/en'
import { findAndSaveMissingTranslation } from 'utils/missingTranslations';
import { format as formatDate } from 'date-fns';
import { formatValue } from 'utils/functions';
import fr from 'locales/fr'
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import isDate from 'date-fns/isDate';
import { logErrorByMessage } from 'utils/system';

//ressources has to be loaded according allLanguages
//The format of the ressource has to be : { #language# : #namespace# : translationObject }
const resources:any = { en, fr };

//Fill an array with the name of all namespaces
const allNamespaces = Object.keys(en).map((namespace) => namespace)

export const options:any = {
    //Namespace configurations
    ns: ['system', 'common', ...allNamespaces], //namespace
    defaultNS: 'common',

    //Here the ressources to use
    resources,

    //Save all missing translations into the localstorage
    saveMissing: true,

    lng: language,
    //We decide to let it fail (silently) instead displaying a wrong translation
    fallbackLng: false, // use en if detected lng is not available
    whitelist: allLanguages,

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
        escapeValue: false, // react already safes from xss
        format: function (value:any, format:any, lng?:any) {
            if (format === 'uppercase')
                return value && value.toUpperCase();
            if (format)
                return formatValue(value, format);
            if (isDate(value)) {
                const langVariable:string = lng ? lng : 'en'
                const locale = resources[langVariable];
                console.log('locale',locale);
                const formatdatee= format ? format : 'M/d/yyyy'

                return formatDate(value, formatdatee, { locale });
            }

            return value;
        },

    },
    react: {
        useSuspense: true
    },

}

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init(options);

//We save all missing translation into the localstorage
i18n.on('missingKey', function (language, ns, ident) {
    findAndSaveMissingTranslation(ns, ident);
    logErrorByMessage('i18nMissingTranslation', { ns, ident, language })
});

export default i18n;
