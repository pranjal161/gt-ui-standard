import { Meta, Story } from '@storybook/react';
import React from 'react';
import SelectInput, {SelectInputProps} from './SelectInput';

export default {
    title: 'Components/Inputs/Select',
    component: SelectInput,
} as Meta;

const Template: Story<SelectInputProps> = (args) => <SelectInput {...args} />;

const hRef = 'NP_to_define'

export const Default = Template.bind({});
Default.args = {
    hRef,
    property: 'quote:status'
};

export const Disabled = Template.bind({});
Disabled.args = {
    hRef,
    property: 'contract:product_type'
};
