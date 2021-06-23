import { Column } from 'components/Table/Table';
import { DeleteIcon } from 'assets/svg';
import React from 'react';

export const distributorColumns: Array<Column> = [
    { label: 'Distributor', property: 'title' },
    { label: 'Function', property: 'distributor_detail:job_description' },
    { label: 'Type', property: 'distributor_detail:agent_type' },
    { label: 'Rate', property: '' },
    { label: 'Start Date', property: '' },
    { label: 'End Date', property: ''},
    { label: '_ACTIONS', actions: [
        {
            icon: <DeleteIcon />, method: (row: any) => console.log({row})
        }
    ]}

]