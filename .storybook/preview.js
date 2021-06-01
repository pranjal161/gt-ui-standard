import {ThemeProvider} from '@dxc-technology/halstack-react';
import themes from '../src/theme';
import { withThemes } from '@react-theming/storybook-addon';

// create decorator
const themingDecorator = withThemes(ThemeProvider, [themes.cdkTheme]);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  themingDecorator
];

