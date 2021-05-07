import './App.css'
import React, {useCallback, useState} from 'react'
import {changeLanguage} from './configs/localization';
import {useTranslation} from 'react-i18next';

// eslint-disable-next-line react/prop-types
const Child0 = ({ p }) => {
    const {t} = useTranslation()
    console.log('child render', p())

    return (<div><p>Child render : {t('test_date', {date: new Date()})}</p></div>)
    //return (<div>Fake:</div>)
}

const Child = React.memo(Child0)

/**
 * Returns the main app
 *
 * @returns {*} The app depending on the context
 */
function App() {
    const {t} = useTranslation()
    const [state, setState] = useState(0)
    const handleChangeLanguage = (newLanguage) => changeLanguage(newLanguage)
    console.log('app')
    const p = useCallback(() => (1234), [])

    return (
        <div className="App" data-testid={'main_app'}>
            <header className="App-header">
                <p>{t('test_date', {date: new Date()})}</p>
                <p>{t('test_currency', {value: 1234})}</p>
                <button onClick={() => handleChangeLanguage('fr')}>Change language to fr</button>
                <button onClick={() => handleChangeLanguage('en')}>Change language to en</button>
                <button onClick={() => handleChangeLanguage('nl')}>Change language to nl</button>

                <button onClick={() => setState((prev) => prev+1)}>change the state : {state}</button>
                <Child p={p}/>
            </header>
        </div>
    )
}

export default App
