import {ThemeProvider} from '@dxc-technology/halstack-react';
import { ThemeProvider as MatThemeProvider } from '@material-ui/core';
import {createMuiTheme} from '@material-ui/core/styles';
import {addDecorator} from '@storybook/react';
import React from 'react';
import themes from '../src/theme';
import { withThemes } from '@react-theming/storybook-addon';

// create decorator
const themingDecorator = withThemes(ThemeProvider, [themes.cdkTheme]);

const providerFn = ({ theme, children }) => {
  const muTheme = createMuiTheme(theme);
  return <MatThemeProvider theme={muTheme}>{children}</MatThemeProvider>;
};

addDecorator(withThemes(null, [themes.matTheme], { providerFn }));

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

console.log('themingDecorator', themingDecorator)

/*export const decorators = [
  themingDecorator
];

*/
