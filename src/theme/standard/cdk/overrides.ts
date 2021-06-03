import palette from '../palette';

const overrides = {
    accordion: {
        accentColor: palette.primary.main, // accordion's accent color theme input
        fontColor: palette.secondary.dark // accordion's font color theme input
    },
    button: {
        baseColor: palette.primary.main, // button's base color theme input
        hoverBaseColor: palette.button.hoverBaseColor, // button's hover base color theme input
        primaryFontColor: palette.button.primaryFontColor, // button's primary font color theme input
        primaryHoverFontColor: palette.button.primaryFontColor, // button's primary hover font color theme input
        secondaryFontColor: palette.button.secondaryFontColor, // button's secondary font color theme input
        secondaryHoverFontColor: palette.button.secondaryFontColor, // button's secondary hover font color theme input
        textFontColor: palette.primary.main, // button's text font color theme input
        textHoverFontColor: palette.button.textFontColor, // button's text hover font color theme input
    },
    checkbox: {
        baseColor: palette.secondary.main, // checkbox's base color theme input
        checkColor: palette.secondary.contrastText, // checkbox's check color theme input
    },
    chip: {
        baseColor: '#eeeeee', // chip's base color theme input
        accentColor: '', // chip's accent color theme input
        fontColor: '#000000', // chip's font color theme input
    },
    date: {
        baseColor: palette.primary.main, // date's base color theme input
        accentColor: palette.background.paper, // date's accent color theme input
    },
    dropdown: {
        baseColor: palette.background.paper, // dropdown's base color theme input
        fontColor: '#000000', // dropdown's font color theme input
    },
    footer: {
        baseColor: '#000000', // footer's base color theme input
        fontColor: '#ffffff', // footer's font color theme input
        accentColor: '#0067b3', // footer's accent color theme input
        logo: 'yahooLogo', // footer's logo theme input
    },
    header: {
        baseColor: palette.background.paper, // header's base color theme input
        accentColor: '#000000', // header's accent color theme input
        fontColor: '#000000', // header's font color theme input
        menuBaseColor: palette.background.paper, // header's menu base color theme input
        hamburguerColor: '#000000', // header's hamburguer color theme input
        logo: 'yahooLogo',// header's logo theme input
        logoResponsive: 'yahooLogo', // header's logo responsive theme input
    },
    inputText: {
        selectedBaseColor: palette.text.primary, // input text's selected base color theme input
    },
    paginator: {
        baseColor: '#eeeeee', // paginator's base color theme input
        fontColor: '#000000', // paginator's font color theme input
    },
    progressBar: {
        accentColor: '#FFED00', // progress bar's accent color theme input
        baseColor: '#000000', // progress bar's base color theme input
    },
    radio: {
        baseColor: '#000000', // radio's base color theme input
    },
    select: {
        baseColor: '#D9D9D9', // select's base color theme input
    },
    sidenav: {
        baseColor: '#F8F8F8', // sidenav's base color theme input
        arrowBaseColor: '#F8F8F8', // sidenav's arrow base color theme input
        arrowAccentColor: '#000000', // sidenav's arrow accent color theme input
    },
    slider: {
        baseColor: '#0067b3', // slider's base color theme input
    },
    spinner: {
        accentColor: palette.primary.main, // spinner's accent color theme input
        baseColor: palette.background.paper, // spinner's base color theme input
    },
    switch: {
        checkedBaseColor: palette.primary.main, // switch's checked base color theme input
    },
    table: {
        baseColor: palette.primary.main, // table's base color theme input
        fontColor: palette.background.paper, // table's font color theme input
    },
    tabs: {
        baseColor: palette.primary.main, // tabs' base color theme input
    },
    toggleGroup: {
        selectedBaseColor: palette.primary.main, // toggle group's selected base color theme input
        selectedHoverBaseColor: '#000000', // toggle group's selected hover base color theme input
        selectedFontColor: '#ffffff', // toggle group's selected font color theme input
        selectedHoverFontColor: '#ffffff', // toggle group's selected hover font color theme input
        unselectedBaseColor: '#D9D9D9', // toggle group's unselected base color theme input
        unselectedHoverBaseColor: '#eeeeee', // toggle group's selected hover base color theme input
        unselectedFontColor: '#000000', // toggle group's unselected font color theme input
        unselectedHoverFontColor: '#000000', // toggle group's unselected hover font color theme input
    },
    wizard: {
        baseColor: palette.primary.main, // wizard's base color theme input
        fontColor: palette.background.paper, // wizard's font color theme input
    },

};

export default overrides
