import { getLink } from './functions';
import { resource } from './static/data';

describe('Test Functions', () => {
    test('Test Get Link Function, Should have link as the output', () => {
        const link = getLink(resource, 'contract:extension_list');
        expect(link).toBe('http://20.33.40.147:13111/csc/insurance/contracts/ID-W4Fb6FAqu/extension_elements');
    });
});