import {allLanguages, language as defaultLanguage } from 'configs/localization';
import en from 'locales/en'
import {findAndSaveMissingTranslation} from 'utils/missingTranslations';
import {formatValue} from 'utils/functions';
import fr from 'locales/fr'
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {logErrorByCode} from 'utils/system';
import nl from 'locales/nl'

//ressources has to be loaded according allLanguages
//The format of the ressource has to be : { #language# : #namespace# : translationObject }
const resources = {en, fr, nl};

//Fill an array with the name of all namespaces
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
        //We decide to let it fail (silently) instead displaying a wrong translation
        fallbackLng: false, // use en if detected lng is not available
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
i18n.on('missingKey', function (language, ns, ident) {
    findAndSaveMissingTranslation(ns, ident);
    logErrorByCode('i18nMissingTranslation', {ns, ident, language})
});

//Event when the language has been changed on i18n
/*i18n.on('languageChanged', function(lng) {
    momentChangeLanguage(lng)
});*/

export default i18n;
