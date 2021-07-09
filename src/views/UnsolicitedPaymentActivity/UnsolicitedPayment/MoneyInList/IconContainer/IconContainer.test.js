import '@testing-library/jest-dom/extend-expect'

import { fireEvent, render, screen } from '@testing-library/react'

import IconContainer from './IconContainer';

const onEdit = jest.fn();
const onDelete = jest.fn();


test('Renders without error', () => {
    render(<IconContainer onEdit={onEdit} onDelete={onDelete} />)
    expect(screen.getByTestId('icon-container')).toBeTruthy()
})

test('Function onEdit is called on click', () => {
    render(<IconContainer onEdit={onEdit} onDelete={onDelete} />);

    fireEvent.click(screen.getByTestId('edit-icon'));
    expect(onEdit).toHaveBeenCalledTimes(1);
});

test('Function onDelete is called on click', () => {
    render(<IconContainer onEdit={onEdit} onDelete={onDelete} />);

    fireEvent.click(screen.getByTestId('delete-icon'));
    expect(onDelete).toHaveBeenCalledTimes(1);
});
