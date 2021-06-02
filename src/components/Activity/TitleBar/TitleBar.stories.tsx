import {Meta, Story} from '@storybook/react';
import TitleBar, {TitleBarProps} from './TitleBar';
import React from 'react';

export default {
    title: 'Components/Activity/TitleBar',
    component: TitleBar,
} as Meta;

const Template: Story<TitleBarProps> = (args) => <TitleBar {...args} />;

export const WithBack = Template.bind({});
WithBack.args = {
};

export const WithoutBack = Template.bind({});
WithBack.args = {
};

export const WithRightTitle = Template.bind({});
WithBack.args = {
};
