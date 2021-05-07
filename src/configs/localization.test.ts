import {displayDate} from './localization'
import {momentChangeLanguage} from 'init';

const date = new Date('2018-09-22T15:00:00')

describe('Localization', () => {

    test('en : display short date', () => {
        momentChangeLanguage('fr')
        expect(displayDate(date)).toEqual('22/9/2018')
    })

})
