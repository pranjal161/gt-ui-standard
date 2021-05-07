import {
    displayCurrency,
    displayDate,
    displayDecimal,
    displayLongDate,
    displayNumber,
    displayPercent
} from 'configs/localization';
import {logErrorByCode} from 'utils/system';

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

        case 'number':
            return displayNumber(value)

        case 'date':
        case 'dateLong':
            if (value === '9999-99-99') // Date.max from API
                return '99/99/9999'

            if (value === '0000-00-00') // Date.min from API
                return '00/00/0000'

            return (style === 'date') ? displayDate(value) : displayLongDate(value)
        default: {
            logErrorByCode('formatValueStyleNotDefined', {style, value})
            
            return value
        }
    }
}
