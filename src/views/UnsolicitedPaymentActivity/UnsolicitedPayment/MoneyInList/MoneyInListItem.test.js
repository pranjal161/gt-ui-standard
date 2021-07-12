import '@testing-library/jest-dom/extend-expect'

import { fireEvent, render, screen } from '@testing-library/react'

import MoneyInListItem from './MoneyInListItem';

const onEdit = jest.fn();
const onDelete = jest.fn();
const columns = [
    { label: t('payment_method'), property: 'money_in:payment_type' },
    { label: t('amount'), property: 'operation:amount', type: 'currency' },
    { label: t('currency'), property: 'operation:currency_code' },
    { label: t('accounting_date'), property: 'operation:accounting_date', type: 'date' },
    { label: t('value_date'), property: 'operation:value_date', type: 'date' },
    { label: '', property: false }
];
const hRef = '';


test('Renders without error', () => {
    render(<MoneyInListItem hRef={hRef} columns={columns} onEdit={onEdit} onDelete={onDelete} />)
    expect(screen.getByTestId('money-item-container')).toBeTruthy()
})

// test('Function onEdit is called on click', () => {
//     render(<IconContainer onEdit={onEdit} onDelete={onDelete} />);

//     fireEvent.click(screen.getByTestId('edit-icon'));
//     expect(onEdit).toHaveBeenCalledTimes(1);
// });

// test('Function onDelete is called on click', () => {
//     render(<IconContainer onEdit={onEdit} onDelete={onDelete} />);

//     fireEvent.click(screen.getByTestId('delete-icon'));
//     expect(onDelete).toHaveBeenCalledTimes(1);
// });
