/* eslint-disable filenames/match-exported */
import palette from './palette';
import typography from './typography';
import overrides from './overrides'

import { createMuiTheme } from '@material-ui/core/styles';

const themeDef = {
    palette,
    typography,
    overrides,
}
console.log('themeDef', themeDef)

const theme = createMuiTheme(themeDef);

export default theme
