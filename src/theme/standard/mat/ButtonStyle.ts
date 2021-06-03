import palette from 'theme/standard/palette';

export const ButtonStyle = {
    textButton: {
        cursor: 'pointer', '&:hover,&:focus': {
            backgroundColor: palette.black,
            color: palette.white // FONT COLOUR
        },
        backgroundColor: 'transparent', // BUTTON COLOUR
        color: palette.primary.main, // FONT COLOUR
        dark: '#000000',
        contrastText: '#ffffff',
        fontSize: '14px',
        letterSpacing: '1px',
        boxShadow: 'none',
        fontWeight: 400,
        borderRadius: '4px',
        minHeight: '43px',
        lineHeight: '1',
        paddingLeft: '30px',
        paddingRight: '30px',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        '&:disabled': {
            color: palette.primary.light,
            cursor: 'not-allowed', '&:hover,&:focus': {
                color: palette.primary.light
            }
        }
    },
    primaryButton: {
        cursor: 'pointer', '&:hover,&:focus': {
            backgroundColor: '#000000'
        },
        backgroundColor: palette.primary.main, // BUTTON COLOUR
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
            backgroundColor: palette.primary.light,
            color: palette.white,
            cursor: 'not-allowed', '&:hover,&:focus': {
                backgroundColor: palette.primary.light,
                color: palette.white // FONT COLOUR
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
        border: '2px solid',
        borderColor:palette.primary.main,
        '&:disabled': {
            borderColor: palette.primary.light,
            color: palette.text.secondary,
            cursor: 'not-allowed', '&:hover,&:focus': {
                borderColor: palette.primary.light,
                color: palette.text.secondary
            }
        }
    }
}
