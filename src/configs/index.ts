import {localizationChangeLanguage} from 'configs/localization';
import i18n from 'i18next';

export const changeLanguage = (lng:string) => {
    localizationChangeLanguage(lng)
    i18n.changeLanguage(lng)
}
