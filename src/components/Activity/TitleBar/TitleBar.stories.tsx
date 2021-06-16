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
    title:'Hello world',
    onBack: () => {
        console.log('onBack')
    }
};

export const WithoutBack = Template.bind({});
WithoutBack.args = {
    title:'Hello world',
    onBack: undefined
};

export const WithRightTitle = Template.bind({});
WithRightTitle.args = {
    title:'Hello world',
    onBack: () => {
        console.log('onBack')
    },
    rightTitle:'Right Title'
};
