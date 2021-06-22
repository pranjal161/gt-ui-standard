import * as staticResources from 'assets/staticData/data';

import { render, screen } from '@testing-library/react'

import LabelInline from 'components/LabelInline/LabelInline';
import React from 'react'

test('renders the text component', () => {
    render(<LabelInline data={staticResources.resource} property="contract:product_identifier" />)
    const linkElement = screen.getByTestId('contract:product_identifier');
    expect(linkElement).toBeInTheDocument();
})

test('Test value', () => {
    render(<LabelInline data={staticResources.resource} property="contract:product_identifier" />)
    const linkElement = screen.getByTestId('contract:product_identifier');
    expect(linkElement).toContainHTML('PC_MLTRSK');
})
