import palette from 'themes/standard/material/palette';
import typography from 'themes/standard/material/typography';
import overrides from './overrides'

import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette,
    typography,
    overrides,
});

export {theme}
