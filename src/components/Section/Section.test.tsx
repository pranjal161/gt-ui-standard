import * as SectionStories from './Section.stories'

import React from 'react';
import {composeStories} from '@storybook/testing-react';
import {render} from '@testing-library/react'

//👇 composeStories will process all information related to the component (e.g., args)
const {Default, WithIcon, WithActions } = composeStories(SectionStories);

it('renders title', () => {
    const {getByTestId} = render(<Default />);
    expect(getByTestId('section-root')).toBeInTheDocument()
});

it('renders title with icon', () => {
    const {getByTestId} = render(<WithIcon />);
    expect(getByTestId('icon-class')).toBeInTheDocument()
});

it('renders button on passing actions', () => {
    const {getByTestId} = render(<WithActions />);
    expect(getByTestId('actions')).toBeVisible()
    
});
