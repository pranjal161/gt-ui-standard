import { I18nextProvider } from 'react-i18next';
//import {ThemeProvider} from '@dxc-technology/halstack-react';
import { ThemeProvider as MatThemeProvider } from '@material-ui/core';
import {createMuiTheme} from '@material-ui/core/styles';
import {addDecorator} from '@storybook/react';
import React from 'react';
import i18n from './i18n';
import themes from '../src/theme';
import {withThemes} from '@react-theming/storybook-addon';

addDecorator(storyFn => (
    <I18nextProvider i18n={i18n}>{storyFn()}</I18nextProvider>
));

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
