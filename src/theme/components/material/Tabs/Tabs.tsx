import React from 'react';
import TabsMat from '@material-ui/core/Tabs';
import {getComponentStyle} from 'theme/components/material/index';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(getComponentStyle('IconButton'));

const Tabs = (props: any) => {
    const classes = useStyles();
    const {
        children,
        ...rest
    } = props;

    return (
        <TabsMat classes={{root: classes.root, indicator: classes.indicator}} {...rest}>
            {children}
        </TabsMat>
    )
}

export default Tabs