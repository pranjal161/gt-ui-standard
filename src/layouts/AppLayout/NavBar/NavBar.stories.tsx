import {Meta, Story} from '@storybook/react';
import NavBar, {NavBarProps} from 'layouts/AppLayout/NavBar/NavBar';
import React from 'react';

export default {
    title: 'Components/Layout/App/NavBar',
    component: NavBar,
} as Meta;

const Template: Story<NavBarProps> = (args) => <NavBar {...args} />;

export const Default = Template.bind({});
Default.args = {
};

export const WithMainTabs = Template.bind({});
WithMainTabs.args = {
};

