import './App.css'
import React, {useCallback} from 'react'
import {changeLanguage} from './init';
import {useTranslation} from 'react-i18next';

// eslint-disable-next-line react/prop-types
const Fake0 = ({ p }) => {
    const {t} = useTranslation()
    console.log('fake', p())

    return (<div>Fake:<p>{t('test_date', {date: new Date()})}</p></div>)
    //return (<div>Fake:</div>)
}

const Fake = React.memo(Fake0)

/**
 * Returns the main app
 *
 * @returns {*} The app depending on the context
 */
function App() {
    const {t} = useTranslation()
    const handleChangeLanguage = useCallback((newLanguage) => changeLanguage(newLanguage), [changeLanguage])
    console.log('app')
    const p = useCallback(() => (1234), [])

    return (
        <div className="App">
            <header className="App-header">
                <p>{t('test_date', {date: new Date()})}</p>
                <p>{t('test_currency', {value: 1234})}</p>
                <button onClick={() => handleChangeLanguage('fr')}>fr</button>
                <button onClick={() => handleChangeLanguage('en')}>en</button>
                <button onClick={() => handleChangeLanguage('nl')}>nl</button>
                <Fake p={p}/>
            </header>
        </div>
    )
}

export default App
