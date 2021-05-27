import TabsMat from '@material-ui/core/Tabs';
import {withStyles} from '@material-ui/core';
import {getComponentStyle} from 'theme/components/material/index';

const Tabs = withStyles(getComponentStyle('Tabs'))(TabsMat);
export default Tabs
