import palette, {special} from 'theme/standard/material/palette';

const overrides = {
    accordion: {
        accentColor: palette.primary.main, // accordion's accent color theme input
        fontColor: palette.text.secondary // accordion's font color theme input
    },
    button: {
        baseColor: palette.primary.main, // button's base color theme input
        hoverBaseColor: palette.black, // button's hover base color theme input
        primaryFontColor: palette.white, // button's primary font color theme input
        primaryHoverFontColor: palette.white, // button's primary hover font color theme input
        secondaryFontColor: palette.black, // button's secondary font color theme input
        secondaryHoverFontColor: palette.black, // button's secondary hover font color theme input
        textFontColor: palette.primary.main, // button's text font color theme input
        textHoverFontColor: palette.white, // button's text hover font color theme input
    },
    checkbox: {
        baseColor: palette.icon, // checkboxes base color theme input
        checkColor: palette.white, // checkboxes check color theme input
    },
    chip: {
        baseColor: special.darkWhite, // chip's base color theme input
        accentColor: '', // chip's accent color theme input
        fontColor: palette.black, // chip's font color theme input
    },
    date: {
        baseColor: palette.primary.main, // date's base color theme input
        accentColor: palette.white, // date's accent color theme input
    },
    dropdown: {
        baseColor: palette.white, // dropdown's base color theme input
        fontColor: palette.black, // dropdown's font color theme input
    },
    footer: {
        baseColor: palette.black, // footer's base color theme input
        fontColor: palette.white, // footer's font color theme input
        accentColor: palette.primary.main, // footer's accent color theme input
        logo: 'yahooLogo', // footer's logo theme input
    },
    header: {
        baseColor: palette.white, // header's base color theme input
        accentColor: palette.black, // header's accent color theme input
        fontColor: palette.black, // header's font color theme input
        menuBaseColor: palette.white, // header's menu base color theme input
        hamburguerColor: palette.black, // header's hamburguer color theme input
        logo: 'yahooLogo',// header's logo theme input
        logoResponsive: 'yahooLogo', // header's logo responsive theme input
    },
    inputText: {
        selectedBaseColor: special.lightGrey, // input text's selected base color theme input
    },
    paginator: {
        baseColor: special.darkWhite, // paginator's base color theme input
        fontColor: palette.black, // paginator's font color theme input
    },
    progressBar: {
        accentColor: palette.primary.light, // progress bar's accent color theme input
        baseColor: palette.black, // progress bar's base color theme input
    },
    radio: {
        baseColor: palette.black, // radio's base color theme input
    },
    select: {
        baseColor: special.lightGrey, // select's base color theme input
    },
    sidenav: {
        baseColor: special.lighterGrey, // sidenav's base color theme input
        arrowBaseColor: special.lighterGrey, // sidenav's arrow base color theme input
        arrowAccentColor: palette.black, // sidenav's arrow accent color theme input
    },
    slider: {
        baseColor:palette.secondary.main, // slider's base color theme input
    },
    spinner: {
        accentColor: palette.primary.main, // spinner's accent color theme input
        baseColor: palette.white, // spinner's base color theme input
    },
    switch: {
        checkedBaseColor: palette.primary.main, // switch's checked base color theme input
    },
    table: {
        baseColor: palette.primary.main, // table's base color theme input
        fontColor: palette.white, // table's font color theme input
    },
    tabs: {
        baseColor: palette.primary.main, // tabs' base color theme input
    },
    toggleGroup: {
        selectedBaseColor: palette.primary.main, // toggle group's selected base color theme input
        selectedHoverBaseColor: palette.black, // toggle group's selected hover base color theme input
        selectedFontColor: palette.white, // toggle group's selected font color theme input
        selectedHoverFontColor: palette.white, // toggle group's selected hover font color theme input
        unselectedBaseColor: special.lightGrey, // toggle group's unselected base color theme input
        unselectedHoverBaseColor: special.darkWhite, // toggle group's selected hover base color theme input
        unselectedFontColor: palette.black, // toggle group's unselected font color theme input
        unselectedHoverFontColor: palette.black, // toggle group's unselected hover font color theme input
    },
    wizard: {
        baseColor: palette.primary.main, // wizard's base color theme input
        fontColor: palette.white, // wizard's font color theme input
    },

};

export default overrides
