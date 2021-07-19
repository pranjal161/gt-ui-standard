import {Meta, Story} from '@storybook/react';
import LabelInLine from 'components/LabelInline/LabelInline';
import React from 'react';
import {useLabelValueProps} from 'hooks/useLabelValue';

export default {
    title: 'Components/LabelInLine',
    component: LabelInLine,
    decorators: [(story) => <div style={{flex: '1 1 auto', height: '600px'}}>{story()}</div>],
} as Meta;

const Template: Story<useLabelValueProps> = (args) => <LabelInLine {...args} />;

export const Default = Template.bind({});
Default.args = {
    property:'contract:product_label',
    hRef:'NP_to_define',
    styleType:['text']
};

export const Number = Template.bind({});
Number.args = {
    property:'loan_account:total_amount_due',
    hRef:'NP_to_define',
    styleType:['number']
};

export const Currency = Template.bind({});
Currency.args = {
    property:'contract:amount',
    hRef:'NP_to_define',
    styleType:['currency']
};

export const Date = Template.bind({});
Date.args = {
    property:'contract:renewal_date',
    hRef:'NP_to_define',
    styleType:['dateLong']
};

export const Enum = Template.bind({});
Enum.args = {
    property:'contract:product_type',
    hRef:'NP_to_define',
    styleType:['text']
};
