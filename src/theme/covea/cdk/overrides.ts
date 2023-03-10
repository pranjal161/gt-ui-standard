import {globalStyle} from '../GlobalStyle';

const overrides = {
    accordion: {
        accentColor: globalStyle.colours.blue, // accordion's accent color theme input
        fontColor: globalStyle.colours.darkGrey // accordion's font color theme input
    },
    button: {
        baseColor: globalStyle.colours.blue, // button's base color theme input
        hoverBaseColor: globalStyle.colours.black, // button's hover base color theme input
        primaryFontColor: globalStyle.colours.white, // button's primary font color theme input
        primaryHoverFontColor: globalStyle.colours.white, // button's primary hover font color theme input
        secondaryFontColor: globalStyle.colours.black, // button's secondary font color theme input
        secondaryHoverFontColor: globalStyle.colours.black, // button's secondary hover font color theme input
        textFontColor: globalStyle.colours.blue, // button's text font color theme input
        textHoverFontColor: globalStyle.colours.white, // button's text hover font color theme input
    },
    checkbox: {
        baseColor: globalStyle.colours.black, // checkboxes base color theme input
        checkColor: globalStyle.colours.white, // checkboxes check color theme input
    },
    chip: {
        baseColor: globalStyle.colours.darkWhite, // chip's base color theme input
        accentColor: '', // chip's accent color theme input
        fontColor: globalStyle.colours.black, // chip's font color theme input
    },
    date: {
        baseColor: globalStyle.colours.blue, // date's base color theme input
        accentColor: globalStyle.colours.white, // date's accent color theme input
    },
    dropdown: {
        baseColor: globalStyle.colours.white, // dropdown's base color theme input
        fontColor: globalStyle.colours.black, // dropdown's font color theme input
    },
    footer: {
        baseColor: globalStyle.colours.black, // footer's base color theme input
        fontColor: globalStyle.colours.white, // footer's font color theme input
        accentColor: globalStyle.colours.blue, // footer's accent color theme input
        logo: 'yahooLogo', // footer's logo theme input
    },
    header: {
        baseColor: globalStyle.colours.white, // header's base color theme input
        accentColor: globalStyle.colours.black, // header's accent color theme input
        fontColor: globalStyle.colours.black, // header's font color theme input
        menuBaseColor: globalStyle.colours.white, // header's menu base color theme input
        hamburguerColor: globalStyle.colours.black, // header's hamburguer color theme input
        logo: 'yahooLogo',// header's logo theme input
        logoResponsive: 'yahooLogo', // header's logo responsive theme input
    },
    inputText: {
        selectedBaseColor: globalStyle.colours.lightGrey, // input text's selected base color theme input
    },
    paginator: {
        baseColor: globalStyle.colours.darkWhite, // paginator's base color theme input
        fontColor: globalStyle.colours.black, // paginator's font color theme input
    },
    progressBar: {
        accentColor: globalStyle.colours.lightBlue, // progress bar's accent color theme input
        baseColor: globalStyle.colours.black, // progress bar's base color theme input
    },
    radio: {
        baseColor: globalStyle.colours.black, // radio's base color theme input
    },
    select: {
        baseColor: globalStyle.colours.lightGrey, // select's base color theme input
    },
    sidenav: {
        baseColor: globalStyle.colours.lighterGrey, // sidenav's base color theme input
        arrowBaseColor: globalStyle.colours.lighterGrey, // sidenav's arrow base color theme input
        arrowAccentColor: globalStyle.colours.black, // sidenav's arrow accent color theme input
    },
    slider: {
        baseColor: globalStyle.colours.blue, // slider's base color theme input
    },
    spinner: {
        accentColor: globalStyle.colours.blue, // spinner's accent color theme input
        baseColor: globalStyle.colours.white, // spinner's base color theme input
    },
    switch: {
        checkedBaseColor: globalStyle.colours.blue, // switch's checked base color theme input
    },
    table: {
        baseColor: globalStyle.colours.blue, // table's base color theme input
        fontColor: globalStyle.colours.white, // table's font color theme input
    },
    tabs: {
        baseColor: globalStyle.colours.blue, // tabs' base color theme input
    },
    toggleGroup: {
        selectedBaseColor: globalStyle.colours.blue, // toggle group's selected base color theme input
        selectedHoverBaseColor: globalStyle.colours.black, // toggle group's selected hover base color theme input
        selectedFontColor: globalStyle.colours.white, // toggle group's selected font color theme input
        selectedHoverFontColor: globalStyle.colours.white, // toggle group's selected hover font color theme input
        unselectedBaseColor: globalStyle.colours.lightGrey, // toggle group's unselected base color theme input
        unselectedHoverBaseColor: globalStyle.colours.darkWhite, // toggle group's selected hover base color theme input
        unselectedFontColor: globalStyle.colours.black, // toggle group's unselected font color theme input
        unselectedHoverFontColor: globalStyle.colours.black, // toggle group's unselected hover font color theme input
    },
    wizard: {
        baseColor: globalStyle.colours.blue, // wizard's base color theme input
        fontColor: globalStyle.colours.white, // wizard's font color theme input
    },

};

export default overrides
