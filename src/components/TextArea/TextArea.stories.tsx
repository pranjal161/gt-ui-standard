import { Meta, Story } from '@storybook/react';

import { InputProps } from 'hooks/useValidator';
import React from 'react';
import TextArea from './TextArea';

export default {
    title: 'Components/Inputs/TextArea',
    component: TextArea,
} as Meta;

const Template: Story<InputProps> = (args) => <TextArea {...args} />;

//Render TextArea if present in Response
export const Default = Template.bind({});
Default.args = {
    property: 'quote:description',
    onChange: () => console.log('change')
};

//Disable TextArea if present in Patch Schema of Response
export const Disabled = Template.bind({});
Disabled.args = {
    property: 'quote:description',
    onChange: () => console.log('change')
};

//Show Prefilled Value in TextArea
export const PrefilledTextarea = Template.bind({});
PrefilledTextarea.args = {
    property: 'quote:description',
    onChange: () => console.log('change')
};

//Show Error when Max Character Limit exceeds
export const ErrorTextarea = Template.bind({});
ErrorTextarea.args = {
    property: 'quote:description',
    onChange: () => console.log('change')
};