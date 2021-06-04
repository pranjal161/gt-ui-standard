import {TypeText} from '@material-ui/core/styles/createPalette';
import React from 'react';

declare module '@material-ui/core/styles/createPalette' {
    interface ProjectButtonOption {
        hoverBase: React.CSSProperties['color'],
        primaryFont: React.CSSProperties['color'],
        secondaryFont: React.CSSProperties['color'],
        textFont: React.CSSProperties['color'],
    }
    interface ProjectText extends TypeText{
        placeholder: React.CSSProperties['color'],
        link:React.CSSProperties['color']
    }

    interface ProjectTabButton {
        button : {
            background: React.CSSProperties['color'],
            border: React.CSSProperties['color'],
            color: React.CSSProperties['color'],
        }
        activated : {
            background: React.CSSProperties['color'],
            border: React.CSSProperties['color'],
            color: React.CSSProperties['color'],
        }
        closeIcon : React.CSSProperties['color']
    }

    interface Project {
        button:ProjectButtonOption;
        text:ProjectText;
        tabs:ProjectTabButton;
    }

    interface Palette {
        project:Project;
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
