/* eslint-disable no-process-env */
import {palette as paletteCovea, typography as typographyCovea} from './covea/mat'
import cdkThemeCovea from './covea/cdk/overrides'
import cdkThemeStd from './standard/cdk/overrides'
import { typography as typographyStd} from './standard/mat'

let matTheme
let cdkTheme

//this is used for initialization of the APP.

if (process.env['REACT_APP_CUSTOMER_ID'] === 'standard') {
    matTheme = {typography: typographyStd}
    cdkTheme = cdkThemeStd
}
else if (process.env['REACT_APP_CUSTOMER_ID'] === 'covea') {
    matTheme = {typography: typographyCovea, palette:paletteCovea}
    cdkTheme = cdkThemeCovea
}

export default {matTheme, cdkTheme}
