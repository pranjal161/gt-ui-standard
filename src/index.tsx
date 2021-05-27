import 'init'
import './index.css'
import App from './App'
import CentralSpinner from 'components/CentralSpinner/CentralSpinner';
import FirebaseProvider from 'configs/FirebaseProvider';
import {Provider} from 'react-redux';
import React from 'react'
import ReactDOM from 'react-dom'
import {ThemeProvider as MatThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {ThemeProvider as CdkThemeProvider} from '@dxc-technology/halstack-react';
import configureStore from 'store/configureStore';
import {matTheme, cdkTheme} from 'theme';
import reportWebVitals from './reportWebVitals'

const store = configureStore()
const matTheme2 = createMuiTheme(matTheme)

ReactDOM.render(
    <React.StrictMode>
        <React.Suspense fallback={<CentralSpinner/>}>
            <Provider store={store}>
                <FirebaseProvider dispatch={store.dispatch}>
                    <MatThemeProvider theme={matTheme2}>
                        <CdkThemeProvider theme={cdkTheme}>
                            <App/>
                        </CdkThemeProvider>
                    </MatThemeProvider>
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
