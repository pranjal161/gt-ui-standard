import React from 'react';
import {TypeText} from '@material-ui/core/styles/createPalette';

declare module '@material-ui/core/styles/createPalette' {
    interface ProjectButtonOption {
        hoverBase: React.CSSProperties['color'],
        primaryFont: React.CSSProperties['color'],
        secondaryFont: React.CSSProperties['color'],
        textFont: React.CSSProperties['color'],
    }
    interface ProjectText extends TypeText{
        placeholder: React.CSSProperties['color'],
        label: React.CSSProperties['color'],
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

    interface ProjectSideBar {
        toolbar : {
            border: React.CSSProperties['color'],
            color: React.CSSProperties['color'],
            activatedBackground: React.CSSProperties['color'],
            activatedColor: React.CSSProperties['color'],
        }
    }

    interface Project {
        button:ProjectButtonOption;
        text:ProjectText;
        tabs:ProjectTabButton;
        sidebar:ProjectSideBar;
        skeleton:React.CSSProperties['color'],
    }

    interface Palette {
        project:Project;
    }
}

export {}
