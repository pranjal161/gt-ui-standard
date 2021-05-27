import IconButtonMat from '@material-ui/core/IconButton';
import React from 'react';
import {globalStyle} from 'styles/GlobalStyle';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
    textButton: {
        cursor: 'pointer', '&:hover,&:focus': {
            backgroundColor: globalStyle.colours.black,
            color: globalStyle.colours.white // FONT COLOUR
        },
        backgroundColor: globalStyle.colours.transparent, // BUTTON COLOUR
        color: globalStyle.colours.purple, // FONT COLOUR
        dark: '#000000',
        contrastText: '#ffffff',
        fontSize: '14px',
        letterSpacing: '1px',
        boxShadow: 'none',
        fontWeight: 500,
        borderRadius: '4px',
        minHeight: '43px',
        lineHeight: '1',
        fontFamily: [
            'Open Sans',
            'sans-serif'
        ].join(','),
        padding: '20px',
        textOverflow: 'ellipsis',
        overflow: 'hidden'
    },
    primaryButton: {
        cursor: 'pointer', '&:hover,&:focus': {
            backgroundColor: '#000000'
        },
        backgroundColor: globalStyle.colours.purple, // BUTTON COLOUR
        color: '#ffffff', // FONT COLOUR
        dark: '#000000',
        contrastText: '#ffffff',
        fontSize: '14px',
        letterSpacing: '1px',
        boxShadow: 'none',
        fontWeight: 500,
        borderRadius: '4px',
        minHeight: '43px',
        lineHeight: '1',
        fontFamily: [
            'Open Sans',
            'sans-serif'
        ].join(','),
        padding: '20px',
        textOverflow: 'ellipsis',
        overflow: 'hidden'
    },
    secondaryButton: {
        backgroundColor: '#00000000',
        color: '#000000', // FONT COLOUR
        dark: '#000000',
        contrastText: '#ffffff',
        fontSize: '14px',
        letterSpacing: '1px',
        boxShadow: 'none',
        fontWeight: 500,
        borderRadius: '4px',
        minHeight: '43px',
        lineHeight: '1',
        fontFamily: [
            'Open Sans',
            'sans-serif'
        ].join(','),
        padding: '20px',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        cursor: 'pointer', '&:hover,&:focus': {
            backgroundColor: '#00000014',
            border: '2px solid #000000'
        },
        border: '2px solid #6f2c91'
    }
});

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
