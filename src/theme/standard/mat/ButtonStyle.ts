import {globalStyle} from 'styles/GlobalStyle';

export const ButtonStyle = {
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
        paddingLeft: '30px',
        paddingRight: '30px',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        '&:disabled': {
            color: globalStyle.colours.lighterPurple,
            cursor: 'not-allowed', '&:hover,&:focus': {
                color: globalStyle.colours.lighterPurple
            }
        }
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
        paddingLeft: '30px',
        paddingRight: '30px',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        '&:disabled': {
            backgroundColor: globalStyle.colours.lighterPurple,
            color: globalStyle.colours.white,
            cursor: 'not-allowed', '&:hover,&:focus': {
                backgroundColor: globalStyle.colours.lighterPurple,
                color: globalStyle.colours.white // FONT COLOUR
            }
        }
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
        paddingLeft: '30px',
        paddingRight: '30px',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        cursor: 'pointer', '&:hover,&:focus': {
            backgroundColor: '#00000014',
            border: '2px solid #000000'
        },
        border: '2px solid #6f2c91',
        '&:disabled': {
            borderColor: globalStyle.colours.lighterPurple,
            color: globalStyle.colours.lightBlack,
            cursor: 'not-allowed', '&:hover,&:focus': {
                borderColor: globalStyle.colours.lighterPurple,
                color: globalStyle.colours.lightBlack
            }
        }
    }
}
