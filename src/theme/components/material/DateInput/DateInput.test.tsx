import * as resource from 'assets/staticData/data';

import { render, screen } from '@testing-library/react'

import DateField from './DateInput'
import React from 'react'

test('renders the Date component', () => {
    render(<DateField data={resource.resource} propertyName="contract:renewal_date" />)
    const linkElement = screen.getByTestId('contract:renewal_date');
    expect(linkElement).toBeInTheDocument()
})

test ('Test value', () => {
    render(<DateField data={resource.resource} propertyName="contract:renewal_date" />)
    const linkElement = screen.getByTestId('contract:renewal_date');
    expect(linkElement).toContainHTML('01/05/2022');
})