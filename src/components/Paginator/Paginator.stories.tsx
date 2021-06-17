import { Meta, Story } from '@storybook/react';
import Paginator, { PaginatorProps } from './Paginator';

import React from 'react';
import { contracts } from 'assets/staticData/serverResponse';

export default {
    title: 'Components/Activity/Paginator',
    component: Paginator,
} as Meta;

const Template: Story<PaginatorProps> = (args) => <Paginator {...args} />;

export const Default = Template.bind({});
Default.args = {
    totalItems: 500, 
    itemsPerPage: 10,
    data: contracts,
    handler: () => {
        console.log('Paginator'); 
    }
};