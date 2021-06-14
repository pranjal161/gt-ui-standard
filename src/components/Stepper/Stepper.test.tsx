import * as Stepper from './Stepper.stories';

import { fireEvent, render } from '@testing-library/react';

import React from 'react'
import {composeStories} from '@storybook/testing-react';

const {Default, Just2Steps, OptionalStep } = composeStories(Stepper);

it('Expect Wizard to be rendered by default', () => {
    const { getByTestId } = render(<Default />);
    expect(getByTestId('wizard')).toBeInTheDocument()
});

it('Expect 2 Child Nodes to Render for Just2Steps', () => {
    const {getByTestId} = render(<Just2Steps />);
    expect(getByTestId('wizard').querySelector('div')?.childNodes.length).toBe(2)
});

it('Expect Optional Step will be visible on Option Button click', () => {
    const {getByTestId} = render(<OptionalStep />);
    const button: any = getByTestId('option-button').querySelector('button')
    fireEvent.click(button)
    const optional = getByTestId('optional-step');
    expect(optional).toBeInTheDocument()
});

