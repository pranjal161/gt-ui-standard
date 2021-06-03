import * as createPalette from '@material-ui/core/styles/createPalette';
import React from 'react';

declare module '@material-ui/core/styles/createPalette' {
    interface Palette {
        border: Palette['primary'];
    }
    interface PaletteOptions {
        border?: PaletteOptions['primary'];
    }
}

declare module '@material-ui/core/styles/createTypography' {
    interface Typography {
        display1: React.CSSProperties;
        display2: React.CSSProperties;
    }

    // allow configuration using `createMuiTheme`
    interface TypographyOptions {
        display1?: React.CSSProperties;
        display2?: React.CSSProperties;
    }
}

declare module '@material-ui/core/Typography/Typography' {
    interface TypographyPropsVariantOverrides {
        display1: true;
        display2: true;
    }
}

export {}
