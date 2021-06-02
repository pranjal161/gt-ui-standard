import {Meta, Story} from '@storybook/react';
import React from 'react';
import SideBar, {SideBarProps} from 'components/Activity/SideBar/SideBar';

export default {
    title: 'Components/Activity/SideBar',
    component: SideBar,
} as Meta;

const Template: Story<SideBarProps> = (args) => <SideBar {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    value: 0
};

export const ShowContract = Template.bind({});
Normal.args = {
    value: 2
};

export const ShowClient = Template.bind({});
ShowClient.args = {
    value: 2
};

export const OpenInNewWindow = Template.bind({});
OpenInNewWindow.args = {
    value: 2
};

export const OpenInNewTab = Template.bind({});
OpenInNewTab.args = {
    value: 2
};

export const Expand = Template.bind({});
Expand.args = {
    value: 2
};

export const Closed = Template.bind({});
Closed.args = {
    value:2
};
