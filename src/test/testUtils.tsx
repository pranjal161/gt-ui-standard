import {ThemeProvider as MatThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import React, {FC, ReactElement} from 'react'
import {RenderOptions, render} from '@testing-library/react'
import { applyMiddleware, createStore } from 'redux';

import {ThemeProvider as CdkThemeProvider} from '@dxc-technology/halstack-react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import checkPropTypes from 'check-prop-types';
import reducers from 'store/reducers';
import themes from 'theme';

const findByTestAttr = (wrapper:any, id:any) => wrapper.find(`[data-test="${id}"]`)
// eslint-disable-next-line valid-jsdoc
/**
 * Throw error if conformingProps do not pass propTypes validation.
 * @param {React.component} component - Component to check props against.
 * @param {object} conformingProps - Props we expect to conform to defined propTypes.
 */
const checkProps = (component:any, conformingProps:any) => {
    const propError = checkPropTypes(
        component.propTypes,
        conformingProps,
        'prop',
        component.name);
    expect(propError).toBeUndefined();
}
export {findByTestAttr, checkProps}

const AllTheProviders: FC = ({children}) => {
    const matMuiTheme = createMuiTheme(themes.matTheme)

    return (
        <MatThemeProvider theme={matMuiTheme}>
            <CdkThemeProvider theme={themes.cdkTheme}>
                {children}
            </CdkThemeProvider>
        </MatThemeProvider>
    )
}
AllTheProviders.propTypes = {
    children: PropTypes.any
}

const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'queries'>
) => render(ui, { wrapper: AllTheProviders, ...options })

/**
 * Render for testing with Redux store
 * @param {any} ui Component to renders
 * @param {any} initialState initialState of the store
 * @param {any} store Store
 * @param {any} renderOptions Options
 * @return {any} render
 */
function renderWithRedux (
    ui :any,
    {
        initialState ,
        store = createStore(reducers, initialState, applyMiddleware(thunk)),
        ...renderOptions
    } :any
) {
    const Wrapper = ({ children } : any) => <Provider store={store}>{children}</Provider>
    Wrapper.propTypes = {
        children: PropTypes.element.isRequired
    };

    return render(ui, { wrapper: Wrapper, ...renderOptions })
}

const thunk =
    ({ dispatch, getState } :any) => (next: any) => (action: any) => {
        if (typeof action === 'function') {
            return action(dispatch, getState, { getFirebase: () => null, getFirestore: () => null })
        }

        return next(action)
    }

export * from '@testing-library/react'

export {customRender as render, renderWithRedux}

