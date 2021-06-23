import {applyMiddleware, createStore} from 'redux'
import PropTypes from 'prop-types';
import {Provider} from 'react-redux'
import React from 'react'
import reducers from 'store/reducers';
import {render as rtlRender} from '@testing-library/react'

const thunk =
    ({dispatch, getState}) => (next) => (action) => {
        if (typeof action === 'function') {
            return action(dispatch, getState, {getFirebase:() => null, getFirestore:() => null})
        }

        return next(action)
    }

/**
 * Render for testing with Redux store
 * @param {any} ui Component to renders
 * @param {any} initialState initialState of the store
 * @param {any} store Store
 * @param {any} renderOptions Options
 * @return {any} render
 */
function renderWithRedux(
    ui,
    {
        initialState,
        store = createStore(reducers, initialState, applyMiddleware(thunk)),
        ...renderOptions
    } = {}
) {
    const Wrapper = ({children}) => <Provider store={store}>{children}</Provider>
    Wrapper.propTypes = {
        children: PropTypes.element.isRequired
    };

    return rtlRender(ui, {wrapper: Wrapper, ...renderOptions})
}

// re-export everything
export * from '@testing-library/react'
// override render method
export {renderWithRedux}
