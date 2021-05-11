import 'init/i18n'
import * as functions from './functions';
import * as staticResources from './static/data';
import {changeLanguageCountry} from 'configs';

changeLanguageCountry('en', 'EN')

describe('Testing Get Link', () => {
    test('Non existing parameter, Should return null', () => {
        const extension = functions.getLink(staticResources.resource, 'extension_list');
        expect(extension).toBeNull();
    });

    test('Existing Value, Should have link as the output', () => {
        const link = functions.getLink(staticResources.resource, 'contract:extension_list');
        expect(link).toBe('http://20.33.40.147:13111/csc/insurance/contracts/ID-W4Fb6FAqu/extension_elements');
    });
});

describe('Testing Function getDescriptionValue', () => {
    test('Should Return Formatted Title', () => {
        const response = functions.getDescriptionValue('to_transfer', 'contract:proposition_status', staticResources.contractResponse);
        expect(response).toBe('To Transfer');
    });
});

describe('Testing Format Value', () => {
    test('Exisiting Parameter - Date Type, Should Return Formatted Date', () => {

        const date = new Date('2018-09-22T15:00:00')
        const today = functions.formatValue(date, 'date');
        expect(today).toBe('9/22/2018');
    });

    test('Exisiting Parameter - Currency Type, Should Return Formatted Currency', () => {
        const currency = functions.formatValue('100', 'currency');
        expect(currency).toBe('€100.00');
    });

    test('Non Existing Parameter Style - Uppercase, Should Return Text as is since there is no style matched', () => {
        const valueUnchanged = 'Text Will Not be converted to Uppercase';
        const text = functions.formatValue('Text Will Not be converted to Uppercase', 'uppercase');
        //Since no operation has been performed
        expect(text).toBe(valueUnchanged);
    });
});

describe('Testing Function PaginationLink', () => {
    test('Return Paginated Link, Should Return Link with Paginated Parameters', () => {
        const toPaginateUrl = 'http://20.33.40.147:13111/csc/insurance/contracts';
        const paginatedUrl = functions.paginationLink(toPaginateUrl, 4, 10);
        const expectedResult = 'http://20.33.40.147:13111/csc/insurance/contracts?_num=10&_start=31'
        expect(paginatedUrl).toBe(expectedResult);
    });
});

describe('Testing Function isResponseConsistent', () => {
    test('Return Consistency Report picked from Response, Should Return Formatted Date', () => {
        const resource = functions.isResponseConsistent(staticResources.consistentResource);
        expect(resource).toBeFalsy();
    });

    test('Return Undefined when there is no Consistency Report Status found in resource', () => {
        const inconsistent = functions.isResponseConsistent(staticResources.inConsistentResource);
        expect(inconsistent).toBeUndefined();
    });
});

describe('Testing Function Get Status Report', () => {
    test('Should Return Status Report', () => {
        const statusReport = functions.getStatusReport(staticResources.consistentResource);
        expect(statusReport).toHaveProperty('consistent');
    });
});

describe('Testing Function addDays', () => {
    test('Should Return Status Report', () => {
        const days = functions.addDays('5/10/2021', 4);
        expect(days).not.toBeNull();
    });
});

describe('Testing Function search', () => {
    test('Should Return URL with searching parameters', () => {
        const url = functions.search({searchUrl: 'http://20.33.40.147:13111/csc/insurance/contracts', name: 'contract:number', value: 'PCMR0001457'});
        const expected = 'http://20.33.40.147:13111/csc/insurance/contracts?contract:number=PCMR0001457&_num=30';
        expect(url).toBe(expected);
    });
});

describe('Testing Function getValues', () => {
    test('Should Return string value', () => {
        const options = functions.getValues(staticResources.getvaluesArray, 'schema', 'contracts', 'rel');
        expect(options).toBe('search-get');
    });

    test('Should Return array value', () => {
        const options = functions.getValues(staticResources.getvaluesArray, 'schema', 'contracts');
        expect(options).toBe(staticResources.getvaluesArray[1]);
    });
});

describe('Testing Function getOneOfFromResponse', () => {
    test('Should Return Array of object with labels and values', () => {
        const response = functions.getOneOfFromResponse(staticResources.oneOfResource, 'quote:status');
        expect(response).toStrictEqual(staticResources.oneOfOptionsExpected);
    });

    test('Should Return Empty Array, If Not found', () => {
        const response = functions.getOneOfFromResponse(staticResources.oneOfResource, 'quote:frequency');
        expect(response).toStrictEqual([]);
    });
});
