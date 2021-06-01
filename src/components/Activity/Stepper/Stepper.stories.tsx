import { Meta } from '@storybook/react';
import React from 'react';
import Stepper from 'components/Activity/Stepper/Stepper';

export default {
    title: 'Components/Activity/Stepper',
    component: Stepper,
} as Meta;

export const Normal = () => <Stepper currentStep={0}/>
export const SetToThe2Step = () => <Stepper currentStep={2}/>
export const SetToThe4Step = () => <Stepper currentStep={2}/>
export const Just2Steps = () => <Stepper currentStep={2}/>
export const BeginOfStepNav = () => <Stepper currentStep={2}/>
export const EndOfStepNav = () => <Stepper currentStep={2}/>
export const OpenStepperDetail = () => <Stepper currentStep={2}/>
