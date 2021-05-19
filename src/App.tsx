import './App.css'

import React, {useEffect} from 'react'
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import routes, { applyRoutes } from './routes';

import useDeskAuth from 'hooks/useDeskAuth';

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
    const {signIn} = useDeskAuth();
    const routeNodes = applyRoutes(routes);

    useEffect(() => {
        //Todo : remove this temporary signin
        signIn({email: 'tempo@tempo.com', password: 'tempo1'})
    },[])

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
