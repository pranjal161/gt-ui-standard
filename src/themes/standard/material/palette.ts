import { colors } from '@material-ui/core';
import dxcColors from 'themes/standard/dxcColors'
const white = '#FFFFFF';
const black = '#000000';

//Palette color can be override here for the entire of the application
export default {
    black,
    white,
    primary: {
        contrastText: white,
        dark: colors.indigo[900],
        main: dxcColors.purple,
        light: colors.indigo[100]
    },
    secondary: {
        contrastText: white,
        dark: colors.blue[900],
        main: colors.blue['A400'],
        light: colors.blue['A400']
    },
    error: {
        contrastText: white,
        dark: colors.red[900],
        main: colors.red[600],
        light: colors.red[400]
    },
    text: {
        primary: dxcColors.black,
        secondary: dxcColors.black,
        link: colors.blue[600]
    },
    link: colors.blue[800],
    icon:colors.blue[600],
    background: {
        default: '#F4F6F8',
        paper: white
    },
    divider: colors.grey[200]
};
