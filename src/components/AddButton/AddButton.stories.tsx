import { Meta } from '@storybook/react';
import React from 'react';
import AddButton from 'components/AddButton/AddButton';

export default {
    title: 'Example/AddButton',
    component: AddButton,
} as Meta;

export const Normal = () => <AddButton title="Add an item"/>
export const Disable = () => <AddButton title="Add an item" disabled/>
export const Clickable = () => <AddButton onClick={() => console.log('click') }/>
