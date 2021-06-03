/* eslint-disable no-process-env */
import {palette as paletteCovea, typography as typographyCovea} from './covea/mat'
import {palette as paletteStd, typography as typographyStd} from './standard/mat'
import cdkThemeCovea from './covea/cdk/overrides'
import cdkThemeStd from './standard/cdk/overrides'

let matTheme
let cdkTheme

//this is used for initialization of the APP.

// eslint-disable-next-line no-unused-vars
const components = {
    MuiTypography: {
        variants: [
            {
                props: {variant: 'display1'},
                style: {
                    border: '2px dashed'
                }
            }
        ]
    }
}

if (process.env['REACT_APP_CUSTOMER_ID'] === 'standard') {
    matTheme = {typography: typographyStd, palette: paletteStd, components}
    cdkTheme = cdkThemeStd
}
else if (process.env['REACT_APP_CUSTOMER_ID'] === 'covea') {
    matTheme = {typography: typographyCovea, palette: paletteCovea}
    cdkTheme = cdkThemeCovea
}

export default {matTheme, cdkTheme}
