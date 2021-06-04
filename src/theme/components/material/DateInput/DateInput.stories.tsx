import * as resource from 'assets/staticData/serverResponse';

import { Meta, Story } from '@storybook/react';

import DateInput from './DateInput';
import { InputProps } from 'hooks/useValidator';
import React from 'react';

export default {
    title: 'Components/Inputs/Date',
    component: DateInput,
} as Meta;

const Template: Story<InputProps> = (args) => <DateInput {...args} />;

export const Default = Template.bind({});
Default.args = {
    data: resource.response,
    propertyName: 'quote:contract_start_date'
};

export const Disabled = Template.bind({});
Disabled.args = {
    data: resource.response,
    propertyName: 'quote:start_date'
};