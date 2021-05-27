import {colors } from '@material-ui/core';

const black = '#000000'
const white = '#FFFFFF'
const darkWhite = '#EEEEEE'
const purple= '#6f2c91'
const lightPurple = '#f5ebf9'
const mediumPurple = '#ead8f3'
const lighterGrey = '#F8F8F8'
const lightBlack = '#212121'

export const special = {
    darkWhite,
    lightGrey : colors.grey['100'],
    lighterGrey,
    lightBlack
}

//Palette color can be override here for the entire of the application
export default {
    black,
    white,
    primary: {
        contrastText: white,
        dark: mediumPurple,
        main: purple,
        light: lightPurple
    },
    secondary: {
        contrastText: white,
        dark: colors.blue[900],
        main: '#0067B3',
        light: colors.blue['A400']
    },
    error: {
        contrastText: white,
        dark: colors.red[900],
        main: colors.red[600],
        light: colors.red[400]
    },
    text: {
        primary: black,
        secondary: colors.grey['800'],
        link: colors.blue[600]
    },

    link: purple,
    icon:purple,
    background: {
        default: '#F4F6F8',
        paper: white
    },
    divider: colors.grey[200]
};
