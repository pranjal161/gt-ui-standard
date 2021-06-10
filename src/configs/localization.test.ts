import {displayDate, displayLongDate, localizationChange} from './localization'

const date = new Date('2018-09-22T15:00:00')

describe('Localization', () => {

    test('en : display short date', () => {
        localizationChange('en', 'US')
        expect(displayDate(date)).toEqual('9/22/2018')
    })

    test('fr : display short date', () => {
        localizationChange('fr', 'FR')
        expect(displayDate(date)).toEqual('22/9/2018')
    })

    test('en : display long date', () => {
        localizationChange('en', 'US')
        expect(displayLongDate(date)).toEqual('September 22nd 2018')
    })

    test('fr : display long date', () => {
        localizationChange('fr', 'FR')
        expect(displayLongDate(date)).toEqual('22 septembre 2018')
    })

})
