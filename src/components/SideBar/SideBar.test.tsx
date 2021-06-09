import * as SideBarStories from './SideBar.stories'
import React from 'react';
import {composeStories} from '@storybook/testing-react';
import {render} from '@testing-library/react'

//👇 composeStories will process all information related to the component (e.g., args)
const {Default, Closed, Expand} = composeStories(SideBarStories);

it('renders Default', () => {
    const {getByText} = render(<Default/>);
    expect(getByText('Here the toolbar')).toBeInTheDocument()
});

it('renders closed', () => {
    const {getByText} = render(<Closed/>);
    expect(getByText('Here the toolbar')).toBeInTheDocument()
    expect(getByText('Here the header')).not.toBeInTheDocument()
    expect(getByText('Here the content')).not.toBeInTheDocument()
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
    expect(getByText('header')).toBeInTheDocument()
});
