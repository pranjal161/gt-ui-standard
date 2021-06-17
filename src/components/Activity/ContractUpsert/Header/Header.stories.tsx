import {Meta, Story} from '@storybook/react';
import Header, {HeaderProps} from 'components/Activity/ContractUpsert/Header/Header';
import React from 'react';

export default {
    title: 'Components/Activity/Header',
    component: Header,
} as Meta;

const Template: Story<HeaderProps> = (args) => <Header {...args} />;

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
