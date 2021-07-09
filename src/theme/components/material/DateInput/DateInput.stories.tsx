import * as resource from 'assets/staticData/serverResponse';

import { Meta, Story } from '@storybook/react';

import DateInput from './DateInput';
import React from 'react';

export default {
    title: 'Components/Inputs/Date',
    component: DateInput,
} as Meta;

const Template: Story<any> = (args) => <DateInput {...args} />;

export const Default = Template.bind({});
Default.args = {
    data: resource.response,
    property: 'quote:contract_start_date'
};

export const Disabled = Template.bind({});
Disabled.args = {
    data: resource.response,
    property: 'quote:start_date'
};