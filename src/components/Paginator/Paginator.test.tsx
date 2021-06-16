import * as Paginator from './Paginator.stories';

import React from 'react'
import {composeStories} from '@storybook/testing-react';
import { render } from '@testing-library/react';

const { Default } = composeStories(Paginator);

it('Expect Paginator to be rendered by default', () => {
    const { getByTestId } = render(<Default />);
    expect(getByTestId('paginator')).toBeInTheDocument()
});

it('Disabled Previous Button on Load', () => {
    const { getByTestId } = render(<Default />);
    const prevButton: any = getByTestId('paginator').getElementsByTagName('button')[1];
    expect(prevButton).toHaveClass('Mui-disabled');
});