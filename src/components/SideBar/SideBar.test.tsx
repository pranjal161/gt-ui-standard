import * as SideBarStories from './SideBar.stories'
import React from 'react';
import {composeStories} from '@storybook/testing-react';
import {fireEvent} from '@testing-library/react';
import {render} from 'test/testUtils';

//👇 composeStories will process all information related to the component (e.g., args)
const {Default, Closed, Expand} = composeStories(SideBarStories);

it('renders Default', () => {
    const {getByText} = render(<Default/>);
    expect(getByText('Here the toolbar')).toBeInTheDocument()
});

it('renders closed', () => {
    const {getByText} = render(<Closed/>);
    expect(getByText('Here the toolbar')).toBeInTheDocument()
    expect(getByText('Here the header')).not.toBeVisible()
    expect(getByText('Here the content')).not.toBeVisible()
});

it('renders open it', () => {
    const {getByText} = render(<Default open={true}/>);
    expect(getByText('Here the toolbar')).toBeInTheDocument()
    expect(getByText('Here the header')).toBeInTheDocument()
    expect(getByText('Here the content')).toBeInTheDocument()
});

it('renders open', () => {
    const {getByText} = render(<Expand/>);
    expect(getByText('Here the toolbar')).toBeInTheDocument()
    expect(getByText('Here the header')).toBeInTheDocument()
    expect(getByText('Here the content')).toBeInTheDocument()
});

it('renders closed and open it', () => {
    const {getByText} = render(<Closed open={true}/>);
    expect(getByText('Here the header')).toBeInTheDocument()
});

it('click on toggle button', () => {
    const handleClick = jest.fn()
    const {getByTestId} = render(<Expand onToggle={handleClick}/>);

    const button = getByTestId('sidebarToggle')
    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)

});

it('click on Open in new window button', () => {
    const handleClick = jest.fn()
    const {getByTestId} = render(<Expand onOpenInNewWindow={handleClick}/>);

    const button = getByTestId('sidebarOpenInNewWindow')
    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
});

it('click on Open in new tab button', () => {
    const handleClickOpenInNewWindow = jest.fn()
    const handleClick = jest.fn()
    const {getByTestId} = render(<Expand onOpenInNewWindow={handleClick} onOpenInNewTab={handleClick}/>);

    const button = getByTestId('sidebarOpenInNewTab')
    fireEvent.click(button)
    expect(handleClickOpenInNewWindow).toHaveBeenCalledTimes(0)
    expect(handleClick).toHaveBeenCalledTimes(1)

});
