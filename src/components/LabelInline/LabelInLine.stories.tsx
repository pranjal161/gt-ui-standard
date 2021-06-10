import * as contractResponse from 'assets/staticData/data';
import LabelInLine, {LabelInlineProps} from 'components/LabelInline/LabelInline';
import {Meta, Story} from '@storybook/react';
import React from 'react';

export default {
    title: 'Components/LabelInLine',
    component: LabelInLine,
    decorators: [(story) => <div style={{flex: '1 1 auto', height: '600px'}}>{story()}</div>],
} as Meta;

const Template: Story<LabelInlineProps> = (args) => <LabelInLine {...args} />;

export const Default = Template.bind({});
Default.args = {
    property:'contract:product_label',
    data: contractResponse.resource,
    styleType:['text']
};

export const Number = Template.bind({});
Number.args = {
    property:'loan_account:total_amount_due',
    data: contractResponse.resource,
    styleType:['number']
};

export const Currency = Template.bind({});
Currency.args = {
    property:'contract:amount',
    data: contractResponse.resource,
    styleType:['currency']
};

export const Date = Template.bind({});
Date.args = {
    property:'contract:renewal_date',
    data: contractResponse.resource,
    styleType:['dateLong']
};

export const Enum = Template.bind({});
Enum.args = {
    property:'contract:product_type',
    data: contractResponse.resource,
    styleType:['text']
};
