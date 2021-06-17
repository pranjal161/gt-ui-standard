import Header, { HeaderProps } from './Header';
import { Meta, Story } from '@storybook/react';

import React from 'react';
import { contractOperations, } from 'assets/staticData/data';

export default {
    title: 'Components/Activity/ContractHeaderBar',
    component: Header,
} as Meta;

const Template: Story<HeaderProps> = (args) => <Header {...args} />;

export const Default = Template.bind({});
const onLaunchActivity = () => null;
Default.args = {
    title: 'Contract number: ID12345678',
    response: contractOperations,
    onLaunchActivity: onLaunchActivity
};

export const WrongResponseProps = Template.bind({});
WrongResponseProps.args = {
    response: 'empty',
};
