import {displayCurrency, displayDate, displayDecimal, displayLongDate, displayPercent} from 'configs/localization';

export const getLink = (response: any, linkName: string) => {
    if (response &&
        response._links &&
        response._links[linkName] &&
        response._links[linkName].href) {
        return response._links[linkName].href;
    }
    else {
        return null;
    }
}

/**
 * Format given value according the given style.
 * It's based on locale parametrization
 * @param {any} value Value to format
 * @param {string  | undefined} style Oneof : currency, percent, decimal, date, dateLong
 * @return {string | undefined} formatted value | undefined
 */
export const formatValue = (value: any, style?: string | undefined) => {
    if (!value)
        return

    if (!style)
        return value

    switch (style) {
        case 'currency':
            return displayCurrency(value)

        case 'percent':
            return displayPercent(value)

        case 'decimal':
            return displayDecimal(value)

        case 'date':
        case 'dateLong':
            if (value === '9999-99-99') // Date.max from API
                return '99/99/9999'

            return (style === 'date') ? displayDate(value) : displayLongDate(value)
        default: {
            console.error('formatValue, style :', style, ' not defined to convert value : ', value)

            return value
        }
    }
}
