import ButtonMat from '@material-ui/core/Button';
import React from 'react';
import {getComponentStyle} from 'theme/components/material/index';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(getComponentStyle('Button'));

const Button = (props: any) => {
    const classes = useStyles();
    const {
        variant,
        color,
        children,
        className,
        muiClasses,
        ...rest
    } = props;
    let cls = className
    if (variant === 'text') {
        cls = className ? className : classes.textButton;
    }
    else {
        if (color === 'primary') {
            cls = className ? className : classes.primaryButton;
        }
        else if (color === 'secondary') {
            cls = className ? className : classes.secondaryButton;
        }
    }
    console.log(muiClasses, cls )

    return (
        <ButtonMat {...rest} >
            {children}
        </ButtonMat>
    );
}

export default Button
