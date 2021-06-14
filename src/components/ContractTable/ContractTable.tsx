import { EyeIcon } from 'assets/svg';
import React from 'react';
import Table from 'components/Table/Table';

// import { useHistory } from 'react-router';

/**
 * Display contract information in a Table
 * @param {props} props Contains information related to the contract
 * @returns {*} Return information of the contract in a Table
 */
const ContractTable = (props: any) => {

    const contractColumns = [
        { label: 'contract:number', property: 'contract:number' },
        { label: 'contract:status', property: 'contract:status' },
        { label: '_OWNER_NAME', property: ['person:display_id', 'organization:display_id'] },
        { label: 'membership:display_id', property: 'membership:display_id' },
        { label: '_ACTIONS', actions: [
            { icon: <EyeIcon />, method: (row: any) => goToContract(row) }] },
    ];

    const goToContract = (row: any) => {
        // const title = item.summary['contract:number'] + '/' + item.summary['contract:product_label']
        // openInNewTab(item.href, title, 'contract')
        console.log(row);
        // history.push('/viewTab')
    }

    return (
        <>
            <Table columnId={contractColumns} url={props.url} showPaginator={true} />
        </>
    );
};

export default React.memo(ContractTable);
