import * as SelectInputStories from './SelectInput.stories';

import React from 'react'
import {composeStories} from '@storybook/testing-react';
import { render } from '@testing-library/react'

const {Default, Disabled } = composeStories(SelectInputStories);

it('renders Default Select', () => {
    const { getByRole } = render(<Default />);
    expect(getByRole('button')).toBeInTheDocument()
});

it('render Disabled Select', () => {
    const {getByRole} = render(<Disabled />);
    const dropDown = getByRole('button');
    expect(dropDown).toHaveClass('Mui-disabled');
});
