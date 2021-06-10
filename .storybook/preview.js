import {I18nextProvider} from 'react-i18next';
import {ThemeProvider as MatThemeProvider} from '@material-ui/core';
import React from 'react';
import {createMuiTheme} from '@material-ui/core/styles';
import {addDecorator} from '@storybook/react';
import i18n from './i18n';
import {useEffect} from 'react';
import themes from '../src/theme';
import {withThemes} from '@react-theming/storybook-addon';

addDecorator((storyFn, context) => {
    useEffect(() => {
        if (!context.globals.locale)
            return

        import('../src/configs')
            .then((module) => {
                module.changeLanguageCountry(context.globals.locale, context.globals.locale)
            });

    }, [context.globals.locale])

    return (
        < I18nextProvider i18n={i18n}>{storyFn()}</I18nextProvider>
    )
});

// create decorator
//const themingDecorator = withThemes(ThemeProvider, [themes.cdkTheme]);

const providerFn = ({theme, children}) => {
    const muTheme = createMuiTheme(theme);
    return <MatThemeProvider theme={muTheme}>{children}</MatThemeProvider>;
};

addDecorator(withThemes(null, [themes.matTheme], {providerFn}));

export const parameters = {
    actions: {argTypesRegex: '^on[A-Z].*'},
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
}
/*
export const decorators = [
    themingDecorator
];*/

export const globalTypes = {
    locale: {
        name: 'Locale',
        description: 'Internationalization locale',
        defaultValue: 'en',
        toolbar: {
            icon: 'globe',
            items: [
                {value: 'en', right: '🇺🇸', title: 'English'},
                {value: 'fr', right: '🇫🇷', title: 'Français'},
                {value: 'es', right: '🇪🇸', title: 'Español'},
                {value: 'zh', right: '🇨🇳', title: '中文'},
                {value: 'kr', right: '🇰🇷', title: '한국어'},
            ],
        },
    },
};
