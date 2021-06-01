import AddButton, {AddButtonProps} from 'components/AddButton/AddButton';
import {Meta, Story} from '@storybook/react';
import React from 'react';

export default {
    title: 'Components/Inputs/AddButton',
    component: AddButton,
} as Meta;

const Template: Story<AddButtonProps> = (args) => <AddButton {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    title: 'Add a fund',
    withIcon : true,
    onClick : () => console.log('click')
};

export const Disable = Template.bind({});
Disable.args = {
    title: 'Add a fund',
    disabled : true,
    withIcon : true,
    onClick : () => console.log('click')
};

export const IconOnly = Template.bind({});
IconOnly.args = {
    withIcon : true,
    onClick : () => console.log('click')
};

export const SecondaryIconOnly = Template.bind({});
SecondaryIconOnly.args = {
    withIcon : true,
    mode: 'secondary'
};

export const TextIconOnly = Template.bind({});
TextIconOnly.args = {
    withIcon : true,
    mode: 'text'
};
