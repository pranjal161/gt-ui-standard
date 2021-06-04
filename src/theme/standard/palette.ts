import {colors} from '@material-ui/core';

export const globalTokens = {
    __grey_1: '#102A43',
    __grey_2: '#486581',
    __grey_3: '#627D98',
    __grey_4: '#829AB1',
    __grey_5: '#BCCCDC',
    __grey_6: '#D9E2EC',
    __grey_7: '#F5F7FA',
    __blue_1: '#0B69A3',
    __blue_2: '#2BB0ED',
    __blue_3: '#5ED0FA',
    __blue_4: '#B3ECFF',
    black: '#000000',
    lightBlack: '#212121',
    yellow: '#FFED00',
    lightGrey: '#D9D9D9',
    darkRed: '#D0011B',
    lightRed: '#FF6161',
    lightBlue: '#CEE0F5',
    lightYellow: '#FCF2BD',
    lightPink: '#F9CFCF',
    lightGreen: '#DBF1C4',
    blue: '#005FCC',
    lighterGrey: '#F8F8F8',
    red: '#D0011B',
    violet: '#8800F6',
    darkBlue: '#006BF6',
    inherit: 'inherit',
    transparent: 'transparent',
    purple: '#6f2c91',
    mediumPurple: '#ead8f3',
    lightPurple: '#f5ebf9',
    lighterPurple: '#d0bddb',
    white: '#ffffff',
    darkGrey: '#666666',
    mediumGrey: '#bfbfbf',
    mediumWhite: '#f9f9f9',
    mediumBlue: '#0067b3',
    softBlue: '#b1cee6',
    darkWhite: '#eeeeee',
    lighterBlack: '#b1b1b1',
    mediumBlack: '#676767',
    mediumGreyBlack: '#dbdbdb',
    lightWhite: '#f2f2f2',
    softGrey: '#cecece',
    softBlack: '#565656',
    fontSize10: '10px',
    type_sans: 'Open Sans, sans-serif',
    type_scale_root: '16px',
    type_scale_08: '3.75rem',
    type_scale_07: '3rem',
    type_scale_06: '2rem',
    type_scale_05: '1.5rem',
    type_scale_04: '1.25rem',
    type_scale_03: '1rem',
    type_scale_02: '0.875rem',
    type_scale_01: '0.75rem',
    type_light: '300',
    type_regular: '400',
    type_semibold: '600',
    type_bold: 'bold',
    type_italic: 'italic',
    type_normal: 'normal',
    type_spacing_tight_02: '-0.05em',
    type_spacing_tight_01: '-0.025em',
    type_spacing_normal: '0',
    type_spacing_wide_01: '0.025em',
    type_spacing_wide_02: '0.05em',
    type_spacing_wide_03: '0.1em',
    type_initial: 'initial',
    type_uppercase: 'uppercase',
    type_no_line: 'none',
    type_underline: 'underline',
    type_line_through: 'line-through',
    type_leading_compact_03: '1em',
    type_leading_compact_02: '1.25em',
    type_leading_compact_01: '1.365em',
    type_leading_normal: '1.5em',
    type_leading_loose_01: '1.75em',
    type_leading_loose_02: '2em'
};

const white = '#FFFFFF';
const black = '#000000';

const palette = {
    black,
    white,
    primary: {
        contrastText: white,
        dark: colors.indigo[900],
        main: globalTokens.__grey_2,
        light: colors.indigo[100]
    },
    secondary: {
        contrastText: white,
        dark: colors.blue[900],
        main: globalTokens.mediumBlue,
        light: colors.blue['A400']
    },
    error: {
        contrastText: white,
        dark: colors.red[900],
        main: colors.red[600],
        light: colors.red[400]
    },
    text: {
        primary: globalTokens.__grey_1,
        secondary: globalTokens.__grey_2,
    },
    icon: globalTokens.__grey_2,
    background: {
        default: '#F4F6F8',
        paper: white
    },
    divider: colors.grey[200],

};
const project = {
    tabs: {
        button: {
            background: '#FAFBFC',
            border: '#FAFBFC',
            color: globalTokens.__grey_3,
        },
        activated: {
            background: globalTokens.__grey_7,
            color: globalTokens.__grey_1,
            border:globalTokens.__grey_5,
        },
        closeIcon: globalTokens.__grey_1
    },
    button: {
        hoverBase: globalTokens.black,
        primaryFont: globalTokens.white,
        secondaryFont: globalTokens.black,
        textFont: globalTokens.white
    },
    text: {
        placeholder: globalTokens.__grey_4,
        link: globalTokens.__blue_1,
    }
};

export default {...palette, project}
