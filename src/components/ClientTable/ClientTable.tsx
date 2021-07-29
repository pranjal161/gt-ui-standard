import {OpenInNewTabIcon, OpenInNewWindowIcon} from 'assets/svg';
import Table, { Column } from 'components/Table/Table';

import React from 'react';
import useTabs from 'hooks/useTabs';

/**
 * Display contract information in a Table
 * @param {props} props Contains information related to the contract
 * @returns {*} Return information of the contract in a Table
 */
const ClientTable = (props: any) => {
    const {openNewTab, openNewTabInSecondaryWindow, forPerson } = useTabs()

    const personColumns: Array<Column> = [
        {label: '_NAME', property: ['person:display_id1','organization:display_id1'] },
        {label: 'person:client_number', property: ['person:client_number', 'organization:client_number']},
        {label: 'person:birth_date', property: 'person:birth_date', type: 'date'},
        // to ask API team to add property for email & phone in summary
        {label: '_ADDRESS', property: ['postal_address:postal_code', 'postal_address:city_name']},
        {
            label: '_ACTIONS', actions: [
                {icon: <OpenInNewTabIcon/>, method: (row: any) => openTicketInNewTab(row)},
                {icon: <OpenInNewWindowIcon/>, method: (row: any) => openTicketInNewWindow(row)}
            ]
        },
    ];

    const openTicketInNewTab = (contract: any) => {
        openNewTab(forPerson({title:contract.title, hRef:contract.href}))
    }

    const openTicketInNewWindow = (contract: any) => {
        openNewTabInSecondaryWindow(forPerson({title:contract.title, hRef:contract.href}))
    }

    return (
        <>
            <Table columnId={personColumns} url={props.url} showPaginator={true} itemsByPage={5} />
        </>
    );
};

export default React.memo(ClientTable);
