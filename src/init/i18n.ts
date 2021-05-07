import * as fr from 'locales/fr/fr.json'
import * as nl from 'locales/nl/nl.json';
import {allLanguages, language as defaultLanguage } from 'configs/localization';
import en from 'locales/en'
import {findAndSaveMissingTranslation} from 'utils/missingTranslations';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {formatValue} from 'utils/functions';
import {logErrorByCode} from 'utils/system';

//ressources has to be loaded according allLanguages
//The format of the ressource has to be : { #language# : #namespace# : translationObject }
const resources = {
    en,
    fr: {translation: fr.fr},
    nl: {translation: nl.nl}
};

const allNamespaces = Object.keys(en).map((namespace) => namespace)

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        //Namespace configuration
        ns: ['system', 'common', ...allNamespaces], //namespace
        defaultNS: 'common',

        //Here the ressources to use
        resources,

        //Save all missing translations into the localstorage
        saveMissing: true,

        lng: defaultLanguage,
        fallbackLng: 'en', // use en if detected lng is not available
        whitelist: allLanguages,

        keySeparator: false, // we do not use keys in form messages.welcome

        interpolation: {
            escapeValue: false, // react already safes from xss
            format: function (value, format) {
                if (format === 'uppercase')
                    return value && value.toUpperCase();
                if (format)
                    return formatValue(value, format);

                return value;
            }
        },
        react: {
            useSuspense: true
        },

    });

//We save all missing translation into the localstorage
i18n.on('missingKey', function (_, ns, ident) {
    findAndSaveMissingTranslation(ns, ident);
    logErrorByCode('i18nMissingTranslation', {ns, ident})
});

export default i18n;
