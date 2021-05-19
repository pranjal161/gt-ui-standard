import palette from 'themes/standard/material/palette';
import overrides from './overrides'
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette,
    overrides
});

export {theme}
