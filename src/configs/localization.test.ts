import {displayDate, displayLongDate, localizationChangeLanguage} from './localization'

const date = new Date('2018-09-22T15:00:00')

describe('Localization', () => {

    test('en : display short date', () => {
        localizationChangeLanguage('en')
        expect(displayDate(date)).toEqual('9/22/2018')
    })

    test('fr : display short date', () => {
        localizationChangeLanguage('fr')
        expect(displayDate(date)).toEqual('22/9/2018')
    })

    test('en : display long date', () => {
        localizationChangeLanguage('en')
        expect(displayLongDate(date)).toEqual('September 22nd 2018')
    })

    test('fr : display long date', () => {
        localizationChangeLanguage('fr')
        expect(displayLongDate(date)).toEqual('22 septembre 2018')
    })

})
