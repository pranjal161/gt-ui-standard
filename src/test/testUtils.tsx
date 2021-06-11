import {ThemeProvider as MatThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import React, {FC, ReactElement} from 'react'
import {RenderOptions, render } from '@testing-library/react'
import {ThemeProvider as CdkThemeProvider} from '@dxc-technology/halstack-react';
import PropTypes from 'prop-types';
import checkPropTypes from 'check-prop-types'
import themes from 'theme'

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

export * from '@testing-library/react'

export {customRender as render}

