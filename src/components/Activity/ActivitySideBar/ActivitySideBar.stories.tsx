import ActivitySideBar, {ActivitySideBarProps} from 'components/Activity/ActivitySideBar/ActivitySideBar';
import {Meta, Story} from '@storybook/react';
import React from 'react';

export default {
    title: 'Components/ActivitySideBar',
    component: ActivitySideBar,
} as Meta;

const Template: Story<ActivitySideBarProps> = (args) => <ActivitySideBar {...args} />;

export const Default = Template.bind({});
Default.args = {
    open:true
};

