/**
 * 
 * @param {response} response Response of the HTTP request
 * @param {linkName} linkName Title of the link which you want to retrieve
 * @returns {link} Href of the linkName provided that is present in the response
 */
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
 * 
 * @param {options} options Response of the HTTP request
 * @returns {mergedOptions} Merge multiple oneOf schema objects
 */
const mergeOptions = (options: any) => {
    let mergedOptions = {};
    if (options.oneOf.length > 1) {
        for (const item of options.oneOf) {
            mergedOptions = { ...mergedOptions, ...item };
        }
    }
    
    return mergedOptions;
}

/**
 * 
 * @param {response} response Response of the HTTP request
 * @returns {options} Property Options for Table
 */
export const getPropertyOptionsFromTable = (response: any) => {
    let options;
    if (response._options && response._options.properties &&
        response._options.properties._links &&
        response._options.properties._links.properties &&
        response._options.properties._links.properties.item &&
        response._options.properties._links.properties.item.properties &&
        response._options.properties._links.properties.item.properties.summary &&
        response._options.properties._links.properties.item.properties.summary.properties) {
        options =
            response._options.properties._links.properties.item.properties.summary.properties;
        options = options && options.oneOf ? mergeOptions(options) : options;

        return options;
    }
}

/**
 * 
 * @param {value} value Value of the field
 * @param {id} id ID of the field whose oneOf should be picked
 * @param {response} response Response of the HTTP request
 * @param {type} type if needs to be formatted to any specific format like date or currency
 * @returns {options} Title from oneOf Object
 */
export const getDescriptionValue = (value: any, id: string, response: any, type?: string) => {
    const options = getPropertyOptionsFromTable(response);
    if (options && options[id] && options[id].oneOf) {
        for (const item of options[id].oneOf) {
            if (item.enum[0] === value) {
                value = item.title;
            }
        }
    }
    else if (type) {
        value = formatValue(value, type);
    }

    return value ? value : '';
}

/**
 * 
 * @param {value} value Value of the field
 * @param {style} style ID of the field whose oneOf should be picked
 * @returns {options} STRING - Either formated value or the title provided to the value
 */
export const formatValue = (value: any, style?: string | undefined) => {
    const intl = {
        locale: 'nl-NL',
        currency: 'EUR',
        DateFormat: 'en-GB'
    };
    if (value !== null && value !== undefined) {
        let formattedValue;
        if (style) {
            switch (style) {
                case 'currency':
                    formattedValue = new Intl.NumberFormat(intl.locale, {
                        style: style,
                        currency: intl.currency
                    }).format(value);
                    break;
                case 'percent':
                    formattedValue = new Intl.NumberFormat(intl.locale, {
                        style: style,
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    }).format(value / 100);
                    break;
                case 'decimal':
                    formattedValue = new Intl.NumberFormat(intl.locale).format(value);
                    break;
                case 'date':
                    if (value === '9999-99-99') {
                        // hardcoding> api fix
                        formattedValue = '99/99/9999'
                    }
                    else {
                        const date = new Date(value);
                        formattedValue = new Intl.DateTimeFormat(intl.DateFormat).format(date);
                    }
                    break;
            }
        }

        return formattedValue ? formattedValue : value;
    }
}

/**
 * 
 * @param {paginateUrl} paginateUrl Url with or without other parameters
 * @param {page} page Current Page Number
 * @param {perPageItems} perPageItems How many items to retrieve in single page
 * @returns {url} URL - with appended _num: How many records to retrieve and _start: Where to start thre records parameters
 */
export const paginationLink = (paginateUrl: string, page: number, perPageItems: number) => {
    if (paginateUrl) {
        const url = new URL(paginateUrl);
        const params = new URLSearchParams(url.search);
        const baseUrl = paginateUrl.includes('?') ? paginateUrl.split('?')[0] : paginateUrl;
        const start = (page - 1) * perPageItems + 1;
        params.set('_num', perPageItems.toString());
        params.set('_start', start.toString());

        return `${baseUrl}?${params.toString()}`;
    }
}

/**
 * 
 * @param {response} response Response of the HTTP request
 * @returns {consistency} BOOLEAN if consistent or not
 */
export const isResponseConsistent = (response: any) => {
    if (response && response.data && response.data._embedded &&
        response.data._embedded['cscaia:status_report']) {
        return response.data._embedded['cscaia:status_report'].consistent;
    }
}

/**
 * 
 * @param {response} response Response of the HTTP request
 * @returns {report} OBJECT - consist of consistency report and error messages if any
 */
export const getStatusReport = (response: any) => {
    if (response && response.data && response.data._embedded &&
        response.data._embedded['cscaia:status_report']) {
        return response.data._embedded['cscaia:status_report']
    }
}

/**
 * 
 * @param {date}date The initial date for which days will be added
 * @param {days} days Number of days that will be added on the initial date
 * @returns {date} The new date
 */
export function addDays(date: any, days: number) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);

    return result;
}

/**
 * Schema Search
 * @param {obj} obj that will be used for the search
 * @returns {*} URL - with Parameters for the search - for eg. persons, tickets, contracts
 */
export function search(obj: any) {
    const { searchUrl, name, value } = obj;
    let url = `${searchUrl}?`;
    let params;
    const nameSelected = value;
    
    if (nameSelected && nameSelected !== '') {
        
        if (nameSelected !== undefined) {
            params = name + '=' + nameSelected;
        }
        if (params !== undefined || params !== null) {
            params = params + '&_num=' + 30;
        }

        if (url !== undefined && (params !== undefined && params !== null)) {
            return (url + params);
        }
    }
    
    return ''
}

/**
 * Filter and get value from an Object
 * @param {array} array array from which we want the result
 * @param {filterBy} filterBy property on which we want the filteration to take place
 * @param {matchingValue} matchingValue value that matches the property's value in the array
 * @param {returnValue} returnValue any specific attribute whose value should be returned
 * @returns {result} either STRING or ARRAY if returnValue is passed or not
 */
export const getValues = (array: Array<any>, filterBy: string, matchingValue: string, returnValue?: string) => {
    const filter: any = array && array.filter((array: any) => array[filterBy] === matchingValue);

    return returnValue ? filter && filter[0] && filter[0][returnValue] : filter && filter[0];
}

/**
 * Get Options for OneOf(Select) type field
 * @param {response} response Response of the HTTP request
 * @param {id} id ID of the field
 * @returns {list} Array to populate select dropdown
 */
export const getOneOfFromResponse = (response: any, id: string) => {
    const enumItemList = [];
    if(response._options &&
        response._options.properties &&
        response._options.properties[id] &&
        response._options.properties[id]['oneOf']) {
        const oneOfArray: Array<any> = response._options.properties[id]['oneOf'];
        const processedList = [];
        for (const item of oneOfArray) {
            // to add check for current lang when picking enum title
            const isExisting = processedList.filter((array: any) => array.enum === item.enum);
            if (isExisting.length === 0) {
                processedList.push(item);
                enumItemList.push({ value: item.enum[0], label: item.title });
            }
        }
    }

    return enumItemList;
}