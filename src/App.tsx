import './App.css'

import React, { useEffect } from 'react'
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import routes, { applyRoutes } from './routes';
import useDeskAuth from 'hooks/useDeskAuth';
import useDeskSubscribe from 'hooks/useDeskSubscribe';

export const LocationDisplay = () => {
    const location = useLocation()

    return <div className="d-none" data-testid="location-display">{location.pathname}</div>
}

/**
 * Returns the main app
 *
 * @returns {*} The app depending on the context
 */
function App() {
    const routeNodes = applyRoutes(routes);
    // Firebase Desk management ----------
    // Do not change
    useDeskSubscribe({ collection: 'tickets' })
    //------------------------------------
    // eslint-disable-next-line no-process-env
    const envVariable = process.env.REACT_APP_HOST_URL;
    console.log('envVariable', envVariable);

    const { signIn } = useDeskAuth()


    useEffect(() => {
        //Todo : remove this temporary signin
        signIn({ email: 'tempo@tempo.com', password: 'tempo1' })
    }, [signIn])

    return (
        <div data-testid="main_app" className="App">
            <Router basename="/">
                {routeNodes}

                <LocationDisplay />
            </Router>
        </div>
    )
}

export default App
