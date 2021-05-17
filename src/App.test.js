import 'init'
import { render, screen } from '@testing-library/react'
import App from './App'
import React from 'react'

test('App render correctly', () => {
    render(<App />)
    const linkElement = screen.getByTestId('main_app')
    expect(linkElement).toBeInTheDocument()
})
