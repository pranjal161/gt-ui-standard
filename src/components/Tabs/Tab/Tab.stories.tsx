import {Meta, Story} from '@storybook/react';
import Tab, {TabProps} from 'components/Tabs/Tab/Tab';
import React from 'react';

export default {
    title: 'Components/Navigation/Tab',
    component: Tab,
} as Meta;

const Template: Story<TabProps> = (args) => <Tab {...args} />;

export const Normal = Template.bind({});
Normal.args = {
};

export const withTitleAndSubTitle = Template.bind({});
Normal.args = {
};

export const Activated = Template.bind({});
Activated.args = {
};

export const NotActivated = Template.bind({});
NotActivated.args = {
};
