import { Meta, Story } from '@storybook/react';

import React from 'react';
import TopBar from './TopBar';

export default {
    title: 'Components/TopBar',
    component: TopBar,
} as Meta;

const Template: Story<{}> = () => <TopBar />;

export const Default = Template.bind({});
