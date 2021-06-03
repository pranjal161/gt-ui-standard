import {Meta, Story} from '@storybook/react';
import TopBar, {TopBarProps} from 'layouts/AppLayout/TopBar/TopBar';
import React from 'react';

export default {
    title: 'Components/Layout/App/Topbar',
    component: TopBar,
} as Meta;

const Template: Story<TopBarProps> = (args) => <TopBar {...args} />;

export const Default = Template.bind({});
Default.args = {
};

export const WithActions = Template.bind({});
WithActions.args = {
};

export const WithSecondaryActions = Template.bind({});
WithActions.args = {
};
