import * as HeaderStories from 'stories/Header.____stories';

import { Meta, Story } from '@storybook/react';
import { Page, PageProps } from './Page';

import React from 'react';

export default {
    title: '_SB/Page',
    component: Page,
} as Meta;

const Template: Story<PageProps> = (args) => <Page {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
    ...HeaderStories.LoggedIn.args,
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {
    ...HeaderStories.LoggedOut.args,
};
