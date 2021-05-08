import {changeLanguageCountry} from 'configs';
//Initialization of i18n and moment
export * from './i18n'
export * from './moment'

//Initialize with the default language and country
changeLanguageCountry('en', 'EN')
