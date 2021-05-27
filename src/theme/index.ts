import cdkThemeStd from 'theme/standard/cdk/overrides'
import {typography as typographyStd} from 'theme/standard/mat'

let matTheme
let cdkTheme

// eslint-disable-next-line no-process-env
if (process.env['REACT_APP_CUSTOMER_ID']==='standard') {
    matTheme = {typography: typographyStd}
    cdkTheme = cdkThemeStd
}

export default {matTheme, cdkTheme}
