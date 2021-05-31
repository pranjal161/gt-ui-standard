import { Meta } from '@storybook/react';
import React from 'react';
import TitleBar from './TitleBar';

export default {
    title: 'Example/TitleBar',
    component: TitleBar,
} as Meta;

export const WithBack = () => <TitleBar/>
export const WithoutBack = () => <TitleBar/>
export const WithRightTitle = () => <TitleBar/>
