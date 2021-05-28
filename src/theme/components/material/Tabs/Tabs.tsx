import TabsMat from '@material-ui/core/Tabs';
import {getComponentStyle} from 'theme/components/material/index';
import {withStyles} from '@material-ui/core';

const Tabs = withStyles(getComponentStyle('Tabs'))(TabsMat);
export default Tabs
