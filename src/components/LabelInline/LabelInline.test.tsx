import { render, screen } from '@testing-library/react'
import LabelInline from 'components/LabelInline/LabelInline';
import React from 'react'

test('renders the text component', () => {
    render(<LabelInline hRef={'NP_to_define'} property="contract:product_identifier" />)
    const linkElement = screen.getByTestId('contract:product_identifier');
    expect(linkElement).toBeInTheDocument();
})

test('Test value', () => {
    render(<LabelInline hRef={'NP_to_define'} property="contract:product_identifier" />)
    const linkElement = screen.getByTestId('contract:product_identifier');
    expect(linkElement).toContainHTML('PC_MLTRSK');
})
