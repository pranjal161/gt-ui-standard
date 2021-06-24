import { Meta, Story } from '@storybook/react';

import React from 'react';
import {WithReduxActivity} from 'utils/storyBooks';
import SearchBar from './SearchBar';

export default {
    title: 'Components/SearchBar',
    component: SearchBar,
    decorators: [(Story: any) => <WithReduxActivity><Story/></WithReduxActivity>]
} as Meta;

const Template: Story<{}> = () => <SearchBar />;

export const Default = Template.bind({});
