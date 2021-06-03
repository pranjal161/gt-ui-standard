import * as staticResources from 'utils/static/data';

import { render, screen } from '@testing-library/react'

import Label from './Label';
import React from 'react'

test('renders the text component', () => {
    render(<Label data={staticResources.resource} property="contract:product_identifier" />)
    const linkElement = screen.getByTestId('contract:product_identifier');
    expect(linkElement).toBeInTheDocument();
})

test('Test value', () => {
    render(<Label data={staticResources.resource} property="contract:product_identifier" />)
    const linkElement = screen.getByTestId('contract:product_identifier');
    expect(linkElement).toContainHTML('PC_MLTRSK');
})