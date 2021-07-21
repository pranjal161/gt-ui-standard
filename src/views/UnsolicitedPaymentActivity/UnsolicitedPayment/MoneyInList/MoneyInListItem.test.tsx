import '@testing-library/jest-dom/extend-expect'

import { render, screen } from '@testing-library/react';

import MoneyInListItem from './MoneyInListItem';
import React from 'react';
import { mockData } from 'assets/staticData/mockData';

// HERE DEFINE OUR PROPS 
const onEdit: Function = jest.fn();
const onDelete: Function = jest.fn();
const columns: any = [
    { label: '', property: 'money_in:payment_type' },
    { label: 'amount', property: 'operation:amount', type: 'currency' },
    { label: 'currency', property: 'operation:currency_code' },
    { label: 'accounting_date', property: 'operation:accounting_date', type: 'date' },
    { label: 'value_date', property: 'operation:value_date', type: 'date' },
    { label: '', property: false }
];
const hRef = 'http://20.33.40.147:13113/csc/insurance/financials/money_ins/ID-Yobyv9oLc';

// HERE MOCK THE RESPONSE YOU WANT (ADD THE RESPONSE mockData)
let mockUseResponse: any = {
    data: mockData[hRef]
}

// HERE MODIFY THE DEFAULT IMPORT IN THE COMPONENT TO SET YOUR OWN FUNCTION/HOOKS
jest.mock('hooks/useResponse', () => ({
    __esModule: true,
    default: () => [mockUseResponse]
}))

jest.mock('utils/functions', () => ({
    __esModule: true,
    formatValue: (value: string) => value,
    getDescriptionFromOneOf: (value: string) => value,
    hasMethodInOptions: () => true
}))

// HERE WRITE YOUR TESTS AS USUAL
describe('Renders without errors', () => {
    it('Display td and its content without errors', () => {

        render(<MoneyInListItem hRef={hRef} columns={columns} onEdit={onEdit} onDelete={onDelete} />)
        expect(screen.getByTestId('money_in:payment_type')).toHaveTextContent('check_deposit')
    })
    it('Display nothing if he does not have hRef in props', () => {
        mockUseResponse = null;
        render(<MoneyInListItem columns={columns} onEdit={onEdit} onDelete={onDelete} hRef={hRef} />)
        // Here use queryBy instead of getBy, because getBy throw an error if it found nothing
        expect(screen.queryByTestId('money_in:payment_type')).not.toBeInTheDocument();
    })
})