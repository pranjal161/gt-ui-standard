import moment from 'moment';

const getMomentRessource = (lang:string) => (lang === 'en'?'en-gb':lang)

//Load the moment language ressource and switch moment to the language
export const momentChangeLanguage = (newLanguage:string) => {
    // eslint-disable-next-line global-require
    require('moment/locale/' + getMomentRessource(newLanguage))
    moment.locale(newLanguage)
}

