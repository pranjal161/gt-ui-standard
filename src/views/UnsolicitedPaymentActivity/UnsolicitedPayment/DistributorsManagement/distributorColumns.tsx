import { Column } from 'components/Table/Table';
import { DeleteIcon } from 'assets/svg';
import React from 'react';

export const distributorManagementColumns: Array<Column> = [
    { label: 'distributor', property: 'distributor_detail:identifier' },
    { label: 'function', property: 'distributor_detail:job_description' },
    { label: 'type', property: 'distributor_detail:agent_type' },
    { label: 'rate', property: '' },
    { label: 'start_date', property: '' },
    { label: 'end_date', property: ''},
    { label: '_ACTIONS', actions: [
        {
            icon: <DeleteIcon />, method: (row: any) => console.log({row})
        }
    ]}
];

export const distributorSearchColumns: Array<Column> = [
    { label: 'distributor', property: ['distributor_detail:identifier', 'person:display_id1'] },
    { label: 'function', property: 'distributor_detail:job_description' },
    { label: 'type', property: 'distributor_detail:agent_type' },
]