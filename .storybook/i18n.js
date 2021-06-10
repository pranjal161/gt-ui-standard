import i18n from 'i18next';
import {options} from '../src/init';
import { initReactI18next } from 'react-i18next';
import {language} from '../src/configs';

i18n.use(initReactI18next).init({...options, lng:language});

export default i18n;
