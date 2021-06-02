import {Meta, Story} from '@storybook/react';
import Stepper, {StepperProps} from 'components/Activity/Stepper/Stepper';
import React from 'react';

export default {
    title: 'Components/Activity/Stepper',
    component: Stepper,
} as Meta;

const Template: Story<StepperProps> = (args) => <Stepper {...args} />;

export const Default = Template.bind({});
Default.args = {
    currentStep: 0
};

export const SetToThe2Step = Template.bind({});
SetToThe2Step.args = {
    currentStep: 0
};

export const SetToThe4Step = Template.bind({});
SetToThe4Step.args = {
    currentStep: 0
};

export const Just2Steps = Template.bind({});
Just2Steps.args = {
    currentStep: 0
};

export const BeginOfStepNav = Template.bind({});
BeginOfStepNav.args = {
    currentStep: 0
};

export const EndOfStepNav = Template.bind({});
EndOfStepNav.args = {
    currentStep: 0
};

export const OpenStepperDetail = Template.bind({});
OpenStepperDetail.args = {
    currentStep: 0
};
