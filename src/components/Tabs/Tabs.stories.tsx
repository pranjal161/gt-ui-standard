import {Meta, Story} from '@storybook/react';
import Tabs, {TabsProps} from 'components/Tabs/Tabs';
import React from 'react';

export default {
    title: 'Components/Navigation/Tabs',
    component: Tabs,
} as Meta;

const Template: Story<TabsProps> = (args) => <Tabs {...args} />;

export const Normal = Template.bind({});
Normal.args = {
};

export const NoTabs = Template.bind({});
NoTabs.args = {
};

export const FirstSelectedByDefault = Template.bind({});
FirstSelectedByDefault.args = {
};

export const SelectSecondTab = Template.bind({});
SelectSecondTab.args = {
};

export const CloseFirstTab = Template.bind({});
Normal.args = {
};

export const AddATabItsActivated = Template.bind({});
Normal.args = {
};

export const AddAnExistingTab = Template.bind({});
Normal.args = {
};
