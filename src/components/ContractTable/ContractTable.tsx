import {OpenInNewTabIcon, OpenInNewWindowIcon, PencilIcon} from 'assets/svg';
import React from 'react';
import Table from 'components/Table/Table';
import useAia from 'hooks/useAia';
import useTabs from 'hooks/useTabs';

/**
 * Display contract information in a Table
 * @param {props} props Contains information related to the contract
 * @returns {*} Return information of the contract in a Table
 */
const ContractTable = (props: any) => {
    const {openNewTab, forContract, forOperation} = useTabs()
    const {fetch} = useAia();

    const contractColumns = [
        {label: 'contract:number', property: 'contract:number'},
        {label: 'contract:status', property: 'contract:status'},
        {label: '_OWNER_NAME', property: ['person:display_id', 'organization:display_id']},
        {label: 'membership:display_id', property: 'membership:display_id'},
        {
            label: '_ACTIONS', actions: [
                {icon: <PencilIcon/>, method: (row: any) => launchUnsolPayment(row)},
                {icon: <OpenInNewTabIcon/>, method: (row: any) => openTicketInNewTab(row)},
                {icon: <OpenInNewWindowIcon/>, method: (row: any) => openTicketInNewWindow(row)}
            ]
        },
    ];

    const launchUnsolPayment = (row: any) => {

        const operationUrl = row.href + '/operations';
        fetch(operationUrl).then((operationRes: any) => {
            if (operationRes && operationRes.data._links && operationRes.data._links['item']) {
                const operationItem = operationRes.data._links['item'];
                const payment = operationItem.find((item: { name: string }) => item.name === 'unsolicited_payment');
                if (payment && payment.href) {
                    openNewTab(forOperation(
                        {
                            entityType: 'contract',
                            mainEntityHRef: row.href,
                            operation: payment
                        }
                    ));
                }
            }
        })
    }

    const openTicketInNewTab = (contractResponse: any) => {
        openNewTab(forContract(contractResponse))
    }

    const openTicketInNewWindow = (contractResponse: any) => {
        openNewTab(forContract(contractResponse))
    }

    return (
        <>
            <Table columnId={contractColumns} url={props.url} showPaginator={true}/>
        </>
    );
};

export default React.memo(ContractTable);
