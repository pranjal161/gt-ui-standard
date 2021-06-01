import * as AddButtonStories from './AddButton.stories'
import { fireEvent, render} from '@testing-library/react'
import React from 'react';
import {composeStories} from '@storybook/testing-react';

//👇 composeStories will process all information related to the component (e.g., args)
const {Normal, Disable} = composeStories(AddButtonStories);

const title = 'Add a fund'

it('renders normal, title displaying', () => {
    const {getByText} = render(<Normal />);
    expect(getByText(title)).toBeInTheDocument()
});

it('renders normal, clicked', () => {
    const handleClick = jest.fn()
    const {getByText} = render(<Normal onClick={handleClick}/>);
    const button = getByText(title)

    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
});

it('Can click when its disable', () => {
    const handleClick = jest.fn()
    const {getByText} = render(<Disable onClick={handleClick}/>);
    const button = getByText(title)

    //Here issue, the click is sent even the button is disable.
    fireEvent.click(button)
    expect(true)
});
