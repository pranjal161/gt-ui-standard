import * as TextAreaStories from './TextArea.stories'

import { fireEvent, render, screen } from '@testing-library/react'

import React from 'react'
import {composeStories} from '@storybook/testing-react';

const {Default, Disabled, PrefilledTextarea, ErrorTextarea} = composeStories(TextAreaStories);

it('renders Default TextArea, Textarea displaying', () => {
    const { getByRole } = render(<Default />);
    expect(getByRole('textbox')).toBeInTheDocument()
});

it('render Disabled TextArea', () => {
    const {getByRole} = render(<Disabled />);
    const textarea = getByRole('textbox')
    expect(textarea).toHaveAttribute('disabled');
});

it('render Prefilled TextArea', () => {
    render(<PrefilledTextarea />);
    expect(screen.getByDisplayValue('This is prefilled textarea'));
});

it('render Error on Blur TextArea', () => {
    const handleClick = jest.fn()
    const {getByRole, getByText} = render(<ErrorTextarea onChangeMethod={handleClick}/>);
    const textarea = getByRole('textbox')
    fireEvent.focusOut(textarea);
    const Label = getByText('description')
    expect(Label).toHaveClass('Mui-error');
});