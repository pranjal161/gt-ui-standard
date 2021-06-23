import IconButtonMat from '@material-ui/core/IconButton';
import React from 'react';
import {getComponentStyle} from 'theme/components/material/index';
import {makeStyles} from '@material-ui/core/styles';

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
            <IconButtonMat classes={muiClasses} className={cls} {...rest}>
                {children}
            </IconButtonMat>
        );
    }
    else if (color === 'secondary') {
        const cls = className ? className : classes.secondaryButton;
        
        return (
            <IconButtonMat classes={muiClasses} className={cls} {...rest}>
                {children}
            </IconButtonMat>
        );
    }
    else if (color === 'textButton') {
        const cls = className ? className : classes.textButton;

        return (
            <IconButtonMat {...rest} classes={muiClasses} className={cls}>
                {children}
            </IconButtonMat>
        );
    }
    else {
        return (
            <IconButtonMat classes={muiClasses} className={className} color={color} {...rest}>
                {children}
            </IconButtonMat>
        );
    }
}

export default IconButton
