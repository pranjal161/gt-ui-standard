import * as ContractHeaderBarStories from './Header.stories';

import { fireEvent, render, screen } from '@testing-library/react'

import React from 'react';
import { composeStories } from '@storybook/testing-react';

const { Default, WrongResponseProps } = composeStories(ContractHeaderBarStories);

describe('Renders Default', () => {
    it('title displaying', () => {
        const component = render(<Default />);
        expect(component.getByText('Contract number: ID12345678')).toBeInTheDocument();
    });

    it('Activities displaying', () => {
        const component = render(<Default />);
        const button = screen.getByTestId('button-activities');

        fireEvent.click(button);
        expect(component.getByText('Create amendment')).toBeInTheDocument();
    });
})

describe('Renders WrongResponseProps', () => {
    it('title displaying', () => {
        const component = render(<WrongResponseProps />);
        expect(component.getByText('Default title')).toBeInTheDocument();
    });

    it('Activities displaying', () => {
        const component = render(<WrongResponseProps />);
        const button = screen.getByTestId('button-activities');

        fireEvent.click(button);
        expect(component.getByText('Operation empty list')).toBeInTheDocument();
    });
})
