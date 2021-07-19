import * as staticStepper from 'assets/staticData/stepper';

import { Meta, Story } from '@storybook/react';
import Stepper, { StepperProps } from './Stepper';

import React from 'react';

export default {
    title: 'Components/Stepper',
    component: Stepper,
} as Meta;

const Template: Story<StepperProps> = (args) => <Stepper {...args} />;

export const Default = Template.bind({});
Default.args = {
    showStepsAtATime: 3,
    steps: staticStepper.steps
};

export const SetToTheStep2 = Template.bind({});
SetToTheStep2.args = {
    showStepsAtATime: 3,
    currentStep: 1,
    steps: staticStepper.onstepTwo
};

export const SetToTheStep4 = Template.bind({});
SetToTheStep4.args = {
    showStepsAtATime: 3,
    currentStep: 3,
    steps: staticStepper.onstepFour
};

export const Just2Steps = Template.bind({});
Just2Steps.args = {
    showStepsAtATime: 2,
    steps: staticStepper.justtwoStep
};

export const OptionalStep = Template.bind({});
OptionalStep.args = {
    showStepsAtATime: 3,
    currentStep: 2,
    steps: staticStepper.optionalStep
};
