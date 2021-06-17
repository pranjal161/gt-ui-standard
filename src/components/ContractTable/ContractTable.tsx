import { EyeIcon, OpenInNewTabIcon, OpenInNewWindowIcon } from 'assets/svg';
import React from 'react';
import Table from 'components/Table/Table';
import { addSecondaryTabByID } from 'store/reducers/secondaryTabsReducer';
import { addWindowTabByID } from 'store/reducers/newWindowReducer';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// import { useHistory } from 'react-router';

/**
 * Display contract information in a Table
 * @param {props} props Contains information related to the contract
 * @returns {*} Return information of the contract in a Table
 */
const ContractTable = (props: any) => {
    let dispatch = useDispatch();
    const history = useHistory();

    const contractColumns = [
        { label: 'contract:number', property: 'contract:number' },
        { label: 'contract:status', property: 'contract:status' },
        { label: '_OWNER_NAME', property: ['person:display_id', 'organization:display_id'] },
        { label: 'membership:display_id', property: 'membership:display_id' },
        { label: '_ACTIONS', actions: [
            { icon: <EyeIcon />, method: (row: any) => goToContract(row) },
            { icon: <OpenInNewTabIcon />, method: (row: any) => openTicketInNewTab(row)},
            { icon: <OpenInNewWindowIcon />, method: (row: any) => openTicketInNewWindow(row)}
        ]},
    ];

    const goToContract = (row: any) => {
        // const title = item.summary['contract:number'] + '/' + item.summary['contract:product_label']
        // openInNewTab(item.href, title, 'contract')
        console.log(row);
        // history.push('/viewTab')
    }

    const openTicketInNewTab = (row: any) => {
        dispatch(addSecondaryTabByID({
            tabId: row.summary['contract:number'], 
            tabType: 'contract', 
            displayTabLabel: 'Contract N° '+row.summary['contract:number'],
            displayTabSmallLabel: row.summary['contract:product_label'],
            contractURL: row.href
        }));
        history.push('/viewTab');
    }

    const openTicketInNewWindow = (row: any) => {
        dispatch(addWindowTabByID({
            tabId: row.summary['contract:number'], 
            tabType: 'contract', 
            displayTabLabel: 'Contract N° '+row.summary['contract:number'],
            displayTabSmallLabel: row.summary['contract:product_label'],
            contractURL: row.href
        }));
    }

    return (
        <>
            <Table columnId={contractColumns} url={props.url} showPaginator={true} />
        </>
    );
};

export default React.memo(ContractTable);
