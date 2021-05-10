import moment from 'moment'
import {momentChangeLanguage} from 'init/moment';

const localizations: any = {
    en: {
        date: {
            short: 'M/D/YYYY',
            long: 'MMMM Do YYYY',
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
            short: 'D/M/YYYY',
            long: 'D MMMM YYYY',
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

let format: any
let locale: string

const setFormat = (lng: string) => (format = localizations[lng])
const setLocale = (lng:string, cntry:string) => (locale = `${lng}-${cntry}`)

export const localizationChange = (lng: string, cntry:string) => {
    setFormat(lng)
    momentChangeLanguage(lng)
    setLocale(lng, cntry)
}

export const displayDate = (value: any) => (moment(value).format(format.date.short))
export const displayLongDate = (value: any) => (moment(value).format(format.date.long))
export const displayCurrency = (value: any) => new Intl.NumberFormat(locale, format.currency).format(value);
export const displayPercent = (value: any) => new Intl.NumberFormat(locale, format.percent).format(value / 100);
export const displayDecimal = (value: any) => new Intl.NumberFormat(locale, format.decimal).format(value);
export const displayNumber = (value: any) => new Intl.NumberFormat(locale).format(value);
