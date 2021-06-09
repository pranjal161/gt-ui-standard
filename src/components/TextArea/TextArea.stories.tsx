import * as serverResponse from 'assets/staticData/serverResponse';

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
    propertyName: 'quote:description',
    onChangeMethod: () => console.log('change'),
    data: serverResponse.response
};

//Disable TextArea if present in Patch Schema of Response
export const Disabled = Template.bind({});
Disabled.args = {
    propertyName: 'quote:description',
    onChangeMethod: () => console.log('change'),
    data: serverResponse.disableResponse,
};

//Show Prefilled Value in TextArea
export const PrefilledTextarea = Template.bind({});
PrefilledTextarea.args = {
    propertyName: 'quote:description',
    onChangeMethod: () => console.log('change'),
    data: serverResponse.prefilled,
};

//Show Error when Max Character Limit exceeds
export const ErrorTextarea = Template.bind({});
ErrorTextarea.args = {
    propertyName: 'quote:description',
    onChangeMethod: () => console.log('change'),
    data: serverResponse.errorResponse,
};