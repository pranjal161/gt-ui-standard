import IconButtonMat from '@material-ui/core/IconButton';
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {getComponentStyle} from 'theme/components/material/index';

const useStyles = makeStyles(getComponentStyle('IconButton'))

const IconButton = (props: any) => {
    const classes = useStyles();

    const {
        children,
        color,
        className,
        muiClasses,
        ...rest
    } = props;
    if (color === 'primary') {
        const cls = className ? className : classes.primaryButton;
        
        return (
            <IconButtonMat {...rest} classes={muiClasses} className={cls}>
                {children}
            </IconButtonMat>
        );
    }
    else if (color === 'secondary') {
        const cls = className ? className : classes.secondaryButton;
        
        return (
            <IconButtonMat {...rest} classes={muiClasses} className={cls}>
                {children}
            </IconButtonMat>
        );
    }
    else {
        return (
            <IconButtonMat {...rest} classes={muiClasses} className={className}>
                {children}
            </IconButtonMat>
        );
    }
}

export default IconButton
