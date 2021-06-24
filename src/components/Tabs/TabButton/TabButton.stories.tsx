import { Meta, Story } from '@storybook/react';
import TabButton, { TabButtonProps } from 'components/Tabs/TabButton/TabButton';
import React from 'react';

export default {
    title: 'Components/TabButton',
    component: TabButton,
} as Meta;

const Template: Story<TabButtonProps> = (args) => <TabButton {...args} />;

export const Default = Template.bind({});
Default.args = {
    activated: true,
    tabId: '1',
    title: 'Normal Title',
    onTabClose: undefined
};

const onCloseEmpty = (props: any) => {
    console.log(props);
};

export const withTitleAndSubTitle = Template.bind({});
withTitleAndSubTitle.args = {
    ...Default.args,
    subTitle: 'Normal Subtitle'
};

export const Activated = Template.bind({});
Activated.args = {
    ...Default.args,
    icon: 'ticket',
    onTabClose: onCloseEmpty
};

export const NotActivated = Template.bind({});
NotActivated.args = {
    ...Activated.args,
    activated: false
};

export const ActivatedWithSubTitle = Template.bind({});
ActivatedWithSubTitle.args = {
    ...withTitleAndSubTitle.args,
    icon: 'ticket',
    onTabClose: onCloseEmpty
};

export const NotActivatedWithSubTitle = Template.bind({});
NotActivatedWithSubTitle.args = {
    ...ActivatedWithSubTitle.args,
    activated: false
};

export const ActivatedWithLongTitles = Template.bind({});
ActivatedWithLongTitles.args = {
    ...withTitleAndSubTitle.args,
    icon: 'ticket',
    title: 'The quick brown fox jumps over the lazy dog The quick brown fox jumps over the lazy dog',
    subTitle: 'The quick brown fox jumps over the lazy dog The quick brown fox jumps over the lazy dog',
    onTabClose: onCloseEmpty
};

export const NotActivatedWithLongTitles = Template.bind({});
NotActivatedWithLongTitles.args = {
    ...ActivatedWithLongTitles.args,
    activated: false
};
