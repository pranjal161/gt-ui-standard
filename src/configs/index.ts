import i18n from 'i18next';
import {localizationChange} from 'configs/localization';

//These are the current language and country
export let language: string
export let country: string

export const allLanguages = ['en', 'fr']

export const changeLanguageCountry = (lng?: string, cntry?: string) => {
    if (lng) {
        language = lng
        i18n.changeLanguage(lng)
    }
    if (cntry)
        country = cntry

    localizationChange(lng?lng:language, cntry?cntry:country)
}

