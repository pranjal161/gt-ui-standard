import { render, screen } from '@testing-library/react'
import CentralSpinner from './CentralSpinner';
import React from 'react'

test('renders the central spinner', () => {
    render(<CentralSpinner />)
    const linkElement = screen.getByTestId ('central-spinner')
    expect(linkElement).toBeInTheDocument()
})
