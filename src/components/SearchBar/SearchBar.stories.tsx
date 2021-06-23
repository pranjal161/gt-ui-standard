import { Meta, Story } from '@storybook/react';

import React from 'react';
import SearchBar from './SearchBar';

export default {
    title: 'Components/SearchBar',
    component: SearchBar,
} as Meta;

const Template: Story<{}> = () => <SearchBar />;

export const Default = Template.bind({});
