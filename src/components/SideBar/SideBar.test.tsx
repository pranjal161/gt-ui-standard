import * as SideBarStories from './SideBar.stories'
import React from 'react';
import {composeStories} from '@storybook/testing-react';
import {render} from '@testing-library/react'

//👇 composeStories will process all information related to the component (e.g., args)
const {Default, Closed, Expand} = composeStories(SideBarStories);

it('renders Default', () => {
    const {getByText} = render(<Default/>);
    expect(getByText('nav')).toBeInTheDocument()
});

it('renders closed', () => {
    const {getByText} = render(<Closed/>);
    expect(getByText('nav')).toBeInTheDocument()
    expect(getByText('no header')).not.toBeInTheDocument()
    expect(getByText('content')).not.toBeInTheDocument()
});

it('renders open it', () => {
    const {getByText} = render(<Default open={true}/>);
    expect(getByText('nav')).toBeInTheDocument()
    expect(getByText('no header')).toBeInTheDocument()
    expect(getByText('content')).toBeInTheDocument()
});

it('renders open', () => {
    const {getByText} = render(<Expand/>);
    expect(getByText('nav')).toBeInTheDocument()
    expect(getByText('no header')).toBeInTheDocument()
    expect(getByText('content')).toBeInTheDocument()
});

it('renders open add header', () => {
    const {getByText} = render(<Expand header={<div>header</div>}/>);
    expect(getByText('header')).toBeInTheDocument()
});
