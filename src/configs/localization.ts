import {format, formatISO} from 'date-fns';
import date_enEN from 'date-fns/locale/en-US';
import date_frFR from 'date-fns/locale/fr';

import i18n from 'init/i18n';

const dateLocale:any = {'en-EN':date_enEN, 'fr-FR':date_frFR}

const localizations: any = {
    en: {

        date: {
            short: 'M/d/yyyy',
            long: 'MMMM do yyyy',
        },
        currency: {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 2
        },
        percent: {
            style: 'percent',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        },
        decimal: {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }

    },
    nl: {
        date: {
            short: 'l',
            long: 'LL',
        },
        currency: {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 2
        },
        percent: {
            style: 'percent',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        },
        decimal: {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }

    },
    fr: {
        date: {
            short: 'd/M/yyyy',
            long: 'd MMMM yyyy',
        },
        currency: {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 2
        },
        percent: {
            style: 'percent',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        },
        decimal: {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }
    }
}

let formatt: any
let locale: string
const setFormat = (lng: string) => (formatt = localizations[lng])
const setLocale = (lng: string, cntry: string) => (locale = `${lng}-${cntry}`)

export const displayDate = (value: any) => format(value, formatt.date.short, {locale:dateLocale[locale]});
export const displayLongDate = (value: any) => format(value, formatt.date.long, {locale:dateLocale[locale]});
export const displayCurrency = (value: any, currency?: string) => new Intl.NumberFormat(locale, currency ? {
    ...formatt.currency,
    currency
} : formatt.currency).format(value);
export const displayPercent = (value: any) => new Intl.NumberFormat(locale, formatt.percent).format(value / 100);
export const displayDecimal = (value: any) => new Intl.NumberFormat(locale, formatt.decimal).format(value);
export const displayNumber = (value: any) => new Intl.NumberFormat(locale).format(value);
export const localizationChange = (lng: string, cntry: string) => {
    setFormat(lng)
    // momentChangeLanguage(lng)
    i18n.changeLanguage(lng);
    setLocale(lng, cntry)
    console.log(lng, cntry)
}
export const displayISODate = (timestamp: any) => formatISO(timestamp);
