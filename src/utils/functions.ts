/* eslint-disable no-process-env */
/**
 *
 * @param {response} response Response of the HTTP request
 * @param {linkName} linkName Title of the link which you want to retrieve
 * @returns {link} Href of the linkName provided that is present in the response
 */

import {
    displayCurrency,
    displayDate,
    displayDecimal,
    displayLongDate,
    displayNumber,
    displayPercent
} from 'configs/localization';

import {APIConfig} from 'configs/apiConfig';
import axios from 'axios';
//import {logErrorByCode} from 'utils/system';

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
            mergedOptions = {...mergedOptions, ...item};
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
 * Format given value according the given style.
 * It's based on locale parametrization
 * @param {any} value Value to format
 * @param {string  | undefined} style Oneof : currency, percent, decimal, date, dateLong
 * @param {string  | undefined} option extra option, can be the current currency for example
 * @return {string | undefined} formatted value | undefined
 */
export const formatValue = (value: any, style?: string | undefined, option?: string) => {
    if (!value)
        return

    if (!style)
        return value

    switch (style) {
        case 'text':
            return value

        case 'currency':
            return displayCurrency(value, option)

        case 'percent':
            return displayPercent(value)

        case 'decimal':
            return displayDecimal(value)

        case 'number':
            return displayNumber(value)

        case 'date' || 'dateLong':
            if (value === '9999-99-99') // Date.max from API
                return '99/99/9999'

            if (value === '0000-00-00') // Date.min from API
                return '00/00/0000'

            const date = new Date(value);

            return (style === 'date') ? displayDate(date) : displayLongDate(date)
        default: {
            //logErrorByCode('formatValueStyleNotDefined', {style, value})

            return value
        }
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
    if (response && response._embedded &&
        response._embedded['cscaia:status_report']) {
        return response._embedded['cscaia:status_report'].consistent;
    }
}

/**
 *
 * @param {response} response Response of the HTTP request
 * @returns {report} OBJECT - consist of consistency report and error messages if any
 */
export const getStatusReport = (response: any) => {
    if (response && response._embedded &&
        response._embedded['cscaia:status_report']) {
        return response._embedded['cscaia:status_report']
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
    const {searchUrl, name, value} = obj;
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
    if(response && response._options &&
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
                enumItemList.push({value: item.enum[0], label: item.title});
            }
        }
    }

    return enumItemList;
}

/** Check whether a PATCH operation can be performed on the field provided
 * @param  {any} response provided response
 * @param  {string} field field which should be checked for edit capability
 * @returns {boolean} true, if PATCH operation is available for the provided field
 */
export const isFieldEditable = (response: any, field: string): boolean => {
    if (response && response['_options']) {
        const patchLink = response['_options']['links'].find((item: any) => item.method === 'PATCH');
        if (!patchLink) {
            return false;
        }

        return !!(patchLink &&
            patchLink['schema'] &&
            patchLink['schema']['properties'] &&
            patchLink['schema']['properties'][field]);
    }

    return false;

}

/**Whether the propertyName provided is a required field.
 * @param  {any} response provided response
 * @param  {string} field the field/propertyName which should be checked whether required
 * @returns {boolean} true, if present in required array in API
 */
export const isFieldRequired = (response: any, field: string) => (
    response && response['_options'] &&
    response['_options']['required'] &&
    response['_options']['required'].indexOf(field) !== -1
)

/**Whether the propertyName provided is available for GET. If avaiable for GET, it should be visible, else not.
 * @param  {any} response provided response
 * @param  {string} field the field/propertyName which should be checked for visibility
 * @returns {boolean} true, if allowed for GET and therefore should be visible on screen
 */
export const isFieldVisible = (response: any, field: string): boolean => {
    if (response && response['_options'] &&
        response['_options']['properties'] &&
        response['_options']['properties'][field]) {
        return true;
    }
    else {
        return false;
    }
}

/** If POST method is allowed on the current href
 * @param  {any} response provided response
 * @returns {boolean} whether the POST operation is available for href
 */
export const isFieldCreatable = (response: any): boolean => {
    if (response && response['_options'] && response['_options']['links']) {
        const postLink = response['_options']['links'].find((item: any) => item.method === 'POST');
        if (postLink.isEmpty()) {
            return false;
        }

        return true;
    }

    return false;
}

/** If DELETE method is allowed on the current href or response._links.self.href
 * @param  {any} response provided response
 * @returns {boolean} whether the DELETE operation is available for href
 */
export const isFieldDeletable = (response: any): boolean => {
    if (response && response['_options'] && response['_options']['links']) {
        const deleteLink = response['_options']['links'].find((item: any) => item.method === 'DELETE');
        if (deleteLink.isEmpty()) {
            return false;
        }

        return true;
    }

    return false;
}

export const hasRelInOptions = (response: any, rel: string): boolean => response && response._options && response._options['links'] && response['_options']['links'].find((item: any) => item.rel === rel)

export const hasMethodInOptions = (response: any, method: string): boolean => response && response._options && response._options['links'] && response['_options']['links'].find((item: any) => item.method === method)

/** To check if 'cscaia:save' link is available in _links of the provided response
 * @param  {any} resource response object
 * @returns {boolean} whether the link is present or not
 */
export const isSaveOperationAvailable = (resource: any): boolean => {
    if (getLink(resource, 'cscaia:save')) {
        return true;
    }
    else {
        return false;
    }
}

/** Fetches the title of the resource from _links.self.title
 * @param  {any} response provided response
 * @returns {string|null} title of the resource if pr
 */
export const getTitle = (response: any): string | null => {
    if (response &&
        response._links &&
        response._links['self'] &&
        response._links['self'].title) {
        return response._links['self'].title;
    }
    else {
        return null;
    }
}

/** Fetches allowed minlength from API for a property
 * @param  {any} response API response provided
 * @param  {string} propertyName concerned propertyName
 * @returns {number| null} allowed min Length value
 */
export const getMinLength = (response: any, propertyName: string) => {
    if (response && response['_options'] &&
        response['_options']['properties'] &&
        response['_options']['properties'][propertyName] &&
        response['_options']['properties'][propertyName].minLength) {
        return response['_options']['properties'][propertyName].minLength;
    }
}

/** Fetches allowed maxlength from API for a property
 * @param  {any} response API response provided
 * @param  {string} propertyName concerned propertyName
 * @returns {number| null} allowed maxLength value
 */
export const getMaxLength = (response: any, propertyName: string) => {
    if (response && response['_options'] &&
        response['_options']['properties'] &&
        response['_options']['properties'][propertyName] &&
        response['_options']['properties'][propertyName].maxLength) {
        return response['_options']['properties'][propertyName].maxLength;
    }
}

/** Fetches allowed minimum allowed value from API for a property
 * @param  {any} response API response provided
 * @param  {string} propertyName concerned propertyName
 * @returns {number| null} allowed minimum value
 */
export const getMinValue = (response: any, propertyName: string) => {
    if (response && response['_options'] &&
        response['_options']['properties'] &&
        response['_options']['properties'][propertyName] &&
        response['_options']['properties'][propertyName].minimum) {
        return response['_options']['properties'][propertyName].minimum;
    }
}

/** Fetches allowed maximum allowed value from API for a property
 * @param  {any} response API response provided
 * @param  {string} propertyName concerned propertyName
 * @returns {number| null} allowed maximum value
 */
export const getMaxValue = (response: any, propertyName: string) => {
    if (response && response['_options'] &&
        response['_options']['properties'] &&
        response['_options']['properties'][propertyName] &&
        response['_options']['properties'][propertyName].maximum) {
        return response['_options']['properties'][propertyName].maximum;
    }
}

/** Returns the type of property
 * @param  {any} response API response provided
 * @param  {string} propertyName concerned propertyName
 * @returns {string} type like number, array, string etc
 */
export const getPropertyType = (response: any, propertyName: string) => {
    if (response && response['_options'] &&
        response['_options']['properties'] &&
        response['_options']['properties'][propertyName] &&
        response['_options']['properties'][propertyName].type) {
        return response['_options']['properties'][propertyName].type;
    }
}

export const getDescriptionFromOneOf = (value: string, id: string, response: any) => {
    if (
        response._options &&
        response._options.properties &&
        response._options.properties[id] &&
        response._options.properties[id]['oneOf']
    ) {
        for (let i = 0; i < response._options.properties[id]['oneOf'].length; i++) {
            if (
                response._options.properties[id]['oneOf'][i]['enum'][0] ===
                value
            ) {
                value = response._options.properties[id]['oneOf'][i]['title'];
            }
        }
    }

    return value;
}

/** Returns the axios API request
 * @param  {Object} payload Object to send in PATCH & POST request
 * @param  {string} url Resource URL
 * @param  {Object} params  Optional parameter pass additional parameter to the request, in case we need change in headers, responseType etc
 * @param headers
 * @returns {Promise}
 */
export const APIActions = {

    get: (url: string, params?: { headers?: any; }) => axios.get(url, {headers: params && params.headers ? params.headers : APIConfig.defaultHeader}),
    post: (url: string, payload: Object, params?: { headers?: any; }) => axios.post(url, payload, {headers: params && params.headers ? params.headers : APIConfig.defaultHeader}),
    patch: (url: string, payload: Object, params?: { headers?: any; }) => axios.patch(url, payload, {headers: params && params.headers ? params.headers : APIConfig.defaultHeader}),
    delete: (url: string, params?: { headers?: any; }) => axios.delete(url, {headers: params && params.headers ? params.headers : APIConfig.defaultHeader})
}

/** To get error message from Property
 * @param  {any} response API response provided
 * @param  {string} propertyName concerned propertyName
 * @returns {Obejct} Error message object
 */
export const getErrorMessage = (response: any, propertyName: string) => {
    let report;
    if (response) {
        const statusReport = getStatusReport(response);
        if (statusReport && statusReport.messages && statusReport.messages.length > 0) {
            report = statusReport.messages.find((message: any) => message.context[0]['propertyNames'][0] === propertyName)
        }
    }

    return report
}
