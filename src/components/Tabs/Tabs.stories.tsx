import { Meta, Story } from '@storybook/react';
import Tabs, { TabsProps } from 'components/Tabs/Tabs';

import React from 'react';
import Tab from 'components/Tabs/Tab/Tab'

export default {
    title: 'Components/Navigation/Tabs',
    component: Tabs,
} as Meta;

const Template: Story<TabsProps> = (args) => <Tabs {...args}>
    <Tab tabId="1" title="Tab 1"><div>This is content one.</div></Tab>
    <Tab tabId="2" title="Tab 2"><div>This is content two.</div></Tab>
</Tabs>;

const TemplateNoTabs: Story<TabsProps> = (args) => <Tabs {...args} />

export const Default = Template.bind({});

export const NoTabs = TemplateNoTabs.bind({});
NoTabs.args = {
    children: null
};

export const FirstSelectedByDefault = Template.bind({});
FirstSelectedByDefault.args = {
};

export const SelectSecondTab = Template.bind({});
SelectSecondTab.args = {
    activeTabId: '2'
};