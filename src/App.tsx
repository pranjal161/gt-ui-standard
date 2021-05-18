import './App.css'

import React, {useEffect} from 'react'

import logo from './logo.svg'
import useDeskAuth from 'hooks/useDeskAuth';

/**
 * Returns the main app
 *
 * @returns {*} The app depending on the context
 */
function App() {

    // eslint-disable-next-line no-process-env
    const envVariable = process.env.REACT_APP_HOST_URL;
    console.log('envVariable', envVariable);
    const {signIn} = useDeskAuth()
    useEffect(() => {
        //Todo : remove this temporary signin
        signIn({email: 'tempo@tempo.com', password: 'tempo1'})
    },[])

    return (
        <div data-testid="main_app" className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    )
}

export default App
