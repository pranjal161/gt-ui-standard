import 'init'
import './index.css'
import {ThemeProvider as MatThemeProvider, StylesProvider, createMuiTheme} from '@material-ui/core/styles';
import App from './App'
import {ThemeProvider as CdkThemeProvider} from '@dxc-technology/halstack-react';
import CentralSpinner from 'components/CentralSpinner/CentralSpinner';
import {Provider} from 'react-redux';
import React from 'react'
import ReactDOM from 'react-dom'
import configureStore from 'store/configureStore';
import generateClassName from '../src/theme/generateClassName';
import reportWebVitals from './reportWebVitals'
import themes from 'theme';

const store = configureStore();
const matMuiTheme = createMuiTheme(themes.matTheme);

console.log('matMuiTheme', matMuiTheme)

ReactDOM.render(
    <React.StrictMode>
        <React.Suspense fallback={<CentralSpinner/>}>
            <Provider store={store}>
                <StylesProvider generateClassName={generateClassName}>
                    <MatThemeProvider theme={matMuiTheme}>
                        <CdkThemeProvider theme={themes.cdkTheme}>
                            <App/>
                        </CdkThemeProvider>
                    </MatThemeProvider>
                </StylesProvider>
            </Provider>
        </React.Suspense>
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
