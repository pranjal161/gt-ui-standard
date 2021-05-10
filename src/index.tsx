import 'init'
import './index.css'
import App from './App'
import CentralSpinner from 'components/CentralSpinner/CentralSpinner';
import FirebaseProvider from 'configs/FirebaseProvider';
import { Provider } from 'react-redux';
import React from 'react'
import ReactDOM from 'react-dom'
import configureStore from 'store/configureStore';
import reportWebVitals from './reportWebVitals'

const store = configureStore()

ReactDOM.render(
    <React.StrictMode>
        <React.Suspense fallback={<CentralSpinner/>}>
            <Provider store={store}>
                <FirebaseProvider dispatch={store.dispatch}>
                    <App />
                </FirebaseProvider>
            </Provider>
        </React.Suspense>
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
