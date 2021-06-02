import {Meta, Story} from '@storybook/react';
import TabButton, {TabButtonProps} from 'components/Tabs/TabButton/TabButton';
import React from 'react';

export default {
    title: 'Components/Navigation/TabButton',
    component: TabButton,
} as Meta;

const Template: Story<TabButtonProps> = (args) => <TabButton {...args} />;

export const Default = Template.bind({});
Default.args = {
};

export const withTitleAndSubTitle = Template.bind({});
Default.args = {
};

export const Activated = Template.bind({});
Activated.args = {
};

export const NotActivated = Template.bind({});
NotActivated.args = {
};
