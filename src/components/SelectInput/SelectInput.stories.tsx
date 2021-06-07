import * as contractResponse from 'assets/staticData/data';
import * as resource from 'assets/staticData/serverResponse';

import { Meta, Story } from '@storybook/react';

import { InputProps } from 'hooks/useValidator';
import React from 'react';
import SelectInput from './SelectInput';

export default {
    title: 'Components/Inputs/Select',
    component: SelectInput,
} as Meta;

const Template: Story<InputProps> = (args) => <SelectInput {...args} />;

export const Default = Template.bind({});
Default.args = {
    data: resource.response,
    propertyName: 'quote:status'
};

export const Disabled = Template.bind({});
Disabled.args = {
    data: contractResponse.resource,
    propertyName: 'contract:product_type'
};