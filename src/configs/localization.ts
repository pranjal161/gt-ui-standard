import moment from 'moment';

export const language = 'en'
export const country = 'EN'

export const locale = `${language}-${country}`

const localization = {
    en: {
        date: {
            short: 'MM/dd/yyyy',
            long: 'MMM ddd yyyy',
        },
        number: {
            pattern: /^([0-9]+[.,]?([0-9]{1,2})?)$/,
            digits: '.0-2',
            lang: 'en'
        },
        currency: {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 2
        }
    },
    fr: {
        date: {
            short: 'dd/MM/yyyy',
            long: 'ddd MMM yyyy',
        },
        number: {
            pattern: /^([0-9]+[.,]?([0-9]{1,2})?)$/,
            digits: '.0-2',
            lang: 'fr'
        },
        currency: {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 2
        }
    }
}

const format = localization[language]

export const displayDate = (value: any) => (moment(value).format(format.date.short))
export const displayLongDate = (value: any) => (moment(value).format(format.date.long))
//export const displayNumber = (value:any) => new Intl.NumberFormat(locale, format.number).format(value);
export const displayCurrency = (value: any) => new Intl.NumberFormat(locale, format.currency).format(value);
export const displayPercent = (value: any) => new Intl.NumberFormat(locale,
    {style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2}).format(value / 100);
export const displayDecimal = (value: any) => new Intl.NumberFormat(locale).format(value);
