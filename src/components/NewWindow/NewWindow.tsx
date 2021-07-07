import React, { useEffect, useRef } from 'react';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import ReactDOM from 'react-dom';
import { create } from 'jss';
import generateClassName from '../../theme/generateClassName';

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

    (Array.from(document.styleSheets) as CSSStyleSheet[]).forEach((styleSheet) => {

        if (styleSheet.cssRules) {
            // for <style> elements
            const newStyleEl = document.createElement('style');
            Array.from(styleSheet.cssRules).forEach((cssRule) => {
                // write the text of each rule into the body of the style element
                newStyleEl.appendChild(document.createTextNode(cssRule.cssText));
            });
            targetDoc.head.appendChild(newStyleEl);
        } 
        else if (styleSheet.href) {
            // for <link> elements loading CSS from a URL
            const newLinkEl = document.createElement('link');
            newLinkEl.rel = 'stylesheet';
            newLinkEl.href = styleSheet.href;
            targetDoc.head.appendChild(newLinkEl);
        }
    });
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
    const jssInstance = create({
        ...jssPreset(),
        insertionPoint: container
    });

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
    }, []);

    useEffect(() => {
        windowRef.current.document.body.appendChild(container);
    }, [children]);

    return (
        ReactDOM.createPortal(
            <StylesProvider
                jss={jssInstance}
                generateClassName={generateClassName}
                sheetsManager={new Map()}>
                {children}
            </StylesProvider>
            , container)
    )
}

//
export default NewWindow;

export const NewWindowMemo = React.memo(NewWindow);
