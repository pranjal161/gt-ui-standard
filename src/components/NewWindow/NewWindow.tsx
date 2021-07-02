import React, { useEffect, useRef } from 'react';
import { StylesProvider, jssPreset } from '@material-ui/core';

import { DxcBox } from '@dxc-technology/halstack-react';
import ReactDOM from 'react-dom';
import { StyleSheetManager } from 'styled-components';
import { create } from 'jss';

/*eslint "require-jsdoc": [2, {
    "require": {
        "FunctionDeclaration": true,
        "MethodDefinition": true,
        "ClassDeclaration": false
    }
}]*/

/**
 * Makes a copy of css styles in the main window and 
 * passes them to the new popup window.
 * @param {any} sourceDoc The main window.
 * @param {any} targetDoc The newly created window.
 * @returns {void} attaches the css from source to destination element
 */
function copyStyles(sourceDoc: Document, targetDoc: Document) {

    let sourceStyles = sourceDoc.head.querySelectorAll('style');
    // styled-components are inserted in a style tag with data-* attributes.
    // Here, we check if they exist and skip importing them

    for(let i = 0; i < sourceStyles.length; i++) {
        if(sourceStyles[i].dataset &&
           sourceStyles[i].dataset.styled === 'active') {
            // skip import for styled components
        }
        else if(sourceStyles[i].dataset &&
                sourceStyles[i].dataset.jss) {
            // skip import for makeStyle components
        }
        else {
            const newStyleEl = sourceDoc.createElement('style');
            newStyleEl.appendChild(sourceDoc.createTextNode(sourceStyles[i].innerText));
            targetDoc.head.appendChild(newStyleEl);
        }
    }

    for(let i = 0; i < sourceDoc.styleSheets.length; i++) {
        if (sourceDoc.styleSheets[i].href) { // for <link> elements loading CSS from a URL
            const newLinkEl = sourceDoc.createElement('link');
            newLinkEl.rel = 'stylesheet';
            newLinkEl.href = sourceDoc.styleSheets[i].href!;
            targetDoc.head.appendChild(newLinkEl);
        }
    }
}

const NewWindow = ( props : {
                                        children: any, 
                                        onCloseCallback: Function, 
                                        windowMaximized?: boolean,
                                        passSetFocus?: boolean,
                                        windowWidth?: number,
                                        windowHeight?: number,
                                        windowLeft?: number,
                                        windowTop?: number
                                    }) => {
    const { 
        onCloseCallback = null,
        windowMaximized = false,
        passSetFocus = false,
        windowWidth = 620,
        windowHeight = 600,
        windowLeft = 200,
        windowTop = 200
    } = props;
    let { children } = props;
    const container = document.createElement('div');
    let windowRef = useRef<any>(null);
    let externalWindow: any;
    const jss = create({ ...jssPreset(), insertionPoint: container });

    const setFocus = () => {
        if(windowRef.current &&
           !windowRef.current.document.hasFocus()) {
            windowRef.current.focus();
        }
    }

    // When passing the NewWindow setFocus function to its children, 
    // the NewWindow must have only one child element and it must have a 
    // props property named setWindowFocus.
    if(passSetFocus) {
        children = React.cloneElement(children, {setWindowFocus: setFocus});
    }

    let windowNotFullScreenSpecs = '';
    if(!windowMaximized)
        windowNotFullScreenSpecs = `,width=${windowWidth},height=${windowHeight},left=${windowLeft},top=${windowTop}`;
    else
        windowNotFullScreenSpecs = `,width=${window.screen.availWidth},height=${window.screen.availHeight},left=0,top=0`;

    useEffect(() => {
        externalWindow = window.open('', '', windowNotFullScreenSpecs);
        externalWindow.document.body.appendChild(container);
        copyStyles(document, externalWindow.document);

        if(onCloseCallback)
            externalWindow.onbeforeunload = onCloseCallback;

        windowRef.current = externalWindow;
        
        return () => {
            windowRef.current = null;
            externalWindow.close();
        }
    }, []);

    useEffect(() => {
        windowRef.current.document.body.appendChild(container);
    }, [children]);

    return (
        ReactDOM.createPortal(<DxcBox
            margin="xxsmall"
            size="fillParent"
            shadowDepth={0}>
            <StylesProvider 
                jss={jss}
                injectFirst>
                <StyleSheetManager 
                    target={container}>
                    {children}
                </StyleSheetManager>
            </StylesProvider>
        </DxcBox>, container)
    )
}

export default NewWindow;

export const NewWindowMemo = React.memo(NewWindow);