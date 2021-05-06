export const language = 'en'
export const country = 'EN'
export const curentCurrency = 'euro'
export const locale = `${language}-${country}`

const euro = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2
});

const usd = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
});

const localization = {
    date: {
        en: {
            short: 'dd/MM/yyyy',
            Long: 'ddd MMM yyyy',
        }
    },
    number: {
        en: {
            pattern: /^([0-9]+[.,]?([0-9]{1,2})?)$/,
            digits: '.0-2',
            lang: 'en'
        }
    },
    currency: {
        euro: (value:any) => euro.format(value),
        usd:  (value:any) => usd.format(value),
    }
}

export const currency = localization.currency[curentCurrency]
