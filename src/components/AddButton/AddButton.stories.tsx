import AddButton, {AddButtonProps} from 'components/AddButton/AddButton';
import {Meta, Story} from '@storybook/react';
import React from 'react';

export default {
    title: 'Components/Common/Inputs/AddButton',
    component: AddButton,
} as Meta;

const Template: Story<AddButtonProps> = (args) => <AddButton {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    title: 'Add a fund',
    onClick : () => console.log('click')
};

export const Disable = Template.bind({});
Disable.args = {
    title: 'Add a fund',
    disabled : true,
    onClick : () => console.log('click')
};
