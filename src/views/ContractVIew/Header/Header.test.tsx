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
        const item = component.getByText('Create amendment');

        expect(item).not.toBeVisible();
        fireEvent.click(button);
        expect(item).toBeVisible();
        fireEvent.click(item);
        expect(item).not.toBeVisible();
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

        expect(component.getByText('Operation empty list')).not.toBeVisible();
        fireEvent.click(button);
        const item = component.getByText('Operation empty list');
        expect(item).toBeInTheDocument();
        fireEvent.click(item);
        expect(item).not.toBeVisible();
    });
})







