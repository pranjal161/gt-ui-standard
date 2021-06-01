import { Meta } from '@storybook/react';
import React from 'react';
import Section from './Section';

export default {
    title: 'Components/Common/Surfaces/Section',
    component: Section,
} as Meta;

export const Normal = () => <Section/>
export const WithoutBack = () => <Section/>
export const WithRightTitle = () => <Section/>
