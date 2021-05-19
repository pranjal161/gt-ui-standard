import 'init'
import App from './App'
import React from 'react'
import {renderWithRedux} from './utils/test-utils';
import {screen} from '@testing-library/react'

test('App render correctly', () => {
    renderWithRedux(<App/>, {initialState: {}})
    const linkElement = screen.getByTestId('main_app')
    expect(linkElement).toBeInTheDocument()
})
