export * from 'init/firebase'
export * from './i18n'

import {changeLanguageCountry} from 'configs';

//Initialize with the default language and country
changeLanguageCountry('en', 'EN')
