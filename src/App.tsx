import './App.css'

import React, {useEffect} from 'react'
import routes, { applyRoutes } from './routes';

import { BrowserRouter as Router } from 'react-router-dom';
import useDeskAuth from 'hooks/useDeskAuth';

// import logo from './logo.svg'

/**
 * Returns the main app
 *
 * @returns {*} The app depending on the context
 */
function App() {
    const {signIn} = useDeskAuth();
    const routeNodes = applyRoutes(routes);

    useEffect(() => {
        //Todo : remove this temporary signin
        signIn({email: 'tempo@tempo.com', password: 'tempo1'})
    },[])

    return (
        <div data-testid="main_app" className="App">
            {/* <header className="App-header">
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
            </header> */}
            <Router basename="/">
                {routeNodes}
            </Router>
        </div>
    )
}

export default App
