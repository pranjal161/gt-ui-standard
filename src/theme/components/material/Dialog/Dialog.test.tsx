import {fireEvent} from '@testing-library/react';
import * as DialogStories from './Dialog.stories'

import {render} from 'test/testUtils';

import React from 'react';
import {composeStories} from '@storybook/testing-react';

//👇 composeStories will process all information related to the component (e.g., args)
const {Default} = composeStories(DialogStories);

const title = 'Search a person'

it('renders Default, title displaying', () => {
    const {getByText} = render(<Default title={title}/>);
    expect(getByText(title)).toBeInTheDocument()
});

it('renders Default, content displaying', () => {
    const {getByText} = render(<Default title={title} content={'my content'}/>);
    expect(getByText('my content')).toBeInTheDocument()
});

it('renders Default, close icon button', () => {
    const {getByTestId} = render(<Default title={title} content={'my content'} onClose={() => {
        console.log('close')
    }}/>);
    expect(getByTestId('dialog-btn-close-icon')).toBeInTheDocument()
});

it('renders Default, close icon button Not displaying', () => {
    const {queryByTestId} = render(<Default title={title} content={'my content'}/>);
    expect(queryByTestId('dialog-btn-close-icon')).toBeNull()
});

it('renders Default, close icon button clicked', () => {
    const handleClick = jest.fn()

    const {getByTestId} = render(<Default title={title} content={'my content'} onClose={handleClick}/>);
    const button = getByTestId('dialog-btn-close-icon')
    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
});

it('renders Default, actions is displayed', () => {
    const {getByText} = render(<Default title={title} content={'my content'} actions={'action list'}/>);
    expect(getByText('action list')).toBeInTheDocument()
});

/*
it('renders Default, clicked', () => {
    const handleClick = jest.fn()
    const {getByText} = render(<Default onClick={handleClick}/>);
    const Dialog = getByText(title)

    fireEvent.click(Dialog)
    expect(handleClick).toHaveBeenCalledTimes(1)
});
*/
