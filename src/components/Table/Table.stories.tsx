import {Meta, Story} from '@storybook/react';
import Table, {Column, TableProps} from 'components/Table/Table';

import React from 'react';

export default {
    title: 'Components/Table',
    component: Table,
} as Meta;

const columns: Array<Column> = [
    { label: 'Name', property: '', type: '', actions: [] },
    { label: 'Name', property: '', type: '', actions: [] },
    { label: 'Name', property: '', type: '', actions: [] },
    { label: 'Name', property: '', type: '', actions: [] }
];

const Template: Story<TableProps> = (args) => <Table {...args} />;

export const Default = Template.bind({});
Default.args = {
    url: '',
    columnId: columns,
};

export const WithPaginator = Template.bind({});
WithPaginator.args = {
    url: '',
    columnId: columns,
    showPaginator: true
};

export const ItemsByPage = Template.bind({});
ItemsByPage.args = {
    url: '',
    columnId: columns,
    showPaginator: true,
    itemsByPage: 10
};

export const SelectableRows = Template.bind({});
SelectableRows.args = {
    url: '',
    columnId: columns,
    showPaginator: true,
    onRowSelected: (val: any) => {
        alert(JSON.stringify(val));
    }
};
