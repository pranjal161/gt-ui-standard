import i18n from 'i18next';
import {localizationChange} from 'configs/localization';

export let language: string
export let country: string
export const allLanguages = ['en', 'fr', 'nl']
export let locale: string
const setLocale = () => (locale = `${language}-${country}`)

export const changeLanguageCountry = (lng?: string, cntry?: string) => {
    if (lng) {
        language = lng
        i18n.changeLanguage(lng)
    }
    if (cntry)
        country = cntry
    setLocale()
    localizationChange()
}

