import './App.css'

import React, {useEffect} from 'react'
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import routes, { applyRoutes } from './routes';

import useDeskAuth from 'hooks/useDeskAuth';
import useDeskSubscribe from 'hooks/useDeskSubscribe';
import useDeskTickets from 'hooks/useDeskTickets';

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
    useDeskSubscribe({collection: 'tickets'})
    //------------------------------------
    const {signIn} = useDeskAuth()
    const {getAll} = useDeskTickets()
    const tickets = getAll()

    useEffect(() => {
        //Todo : remove this temporary signin
        signIn({email: 'tempo@tempo.com', password: 'tempo1'})
    },[signIn])

    return (
        <div data-testid="main_app" className="App">
            <Router basename="/">
                {routeNodes}

                <LocationDisplay />
            </Router>
            <header className="App-header">
                List of tickets :
                {tickets && tickets.map((ticket:any, index:number) => <h6 key={index}>{ticket.title}</h6>)}
            </header>
        </div>
    )
}

export default App
