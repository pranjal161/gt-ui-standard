import TabsMat from '@material-ui/core/Tabs';
import {globalStyle} from 'styles/GlobalStyle';
import {withStyles} from '@material-ui/core';

const Tabs = withStyles({
    root: {
        borderBottom: '1px solid #000000A3',
        backgroundColor: globalStyle.colours.white,
        color: globalStyle.colours.purple,
    },
    indicator: {
        backgroundColor: globalStyle.colours.purple
    },
})(TabsMat);

export default Tabs
