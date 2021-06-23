import Header, {HeaderProps} from 'components/Activity/ContractOperation/Header/Header';
import {Meta, Story} from '@storybook/react';
import React from 'react';

export default {
    title: 'Components/Headers/For contract operations',
    component: Header,
} as Meta;

const Template: Story<HeaderProps> = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {
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
