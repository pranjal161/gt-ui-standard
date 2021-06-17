import {OpenInNewTabIcon, OpenInNewWindowIcon, PencilIcon} from 'assets/svg';
import useTabs from 'hooks/useTabs';

import React from 'react';
import Table from 'components/Table/Table';
import {addSecondaryTabByID} from 'store/reducers/secondaryTabsReducer';
import {addWindowTabByID} from 'store/reducers/newWindowReducer';
import useAia from 'hooks/useAia';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';

// import { useHistory } from 'react-router';

/**
 * Display contract information in a Table
 * @param {props} props Contains information related to the contract
 * @returns {*} Return information of the contract in a Table
 */
const ContractTable = (props: any) => {
    let dispatch = useDispatch();
    const {openNewTab} = useTabs()
    const history = useHistory();
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
                    dispatch(addSecondaryTabByID({
                        tabId: row.summary['contract:number'],
                        tabType: 'unsolicited_payment',
                        displayTabLabel: 'Unsolicited Payment',
                        displayTabSmallLabel: 'Contract N° ' + row.summary['contract:number'],
                        href: payment.href
                    }));
                    history.push('/viewTab');
                }
            }
        })
    }

    const openTicketInNewTab = (row: any) => {
        openNewTab({
            id: row.summary['contract:number'],
            title: '',
            subTitle: row.summary['contract:product_label'],
            hRef: row.href,
            type: 'contract_view',
            activityProps: {
                activityCode: 'contract_view',
                hRef: row.href, mainEntityHRef: row.href
            }
        })
        history.push('/viewTab');
    }

    const openTicketInNewWindow = (row: any) => {
        dispatch(addWindowTabByID({
            tabId: row.summary['contract:number'],
            tabType: 'contract_view',
            displayTabLabel: 'Contract N° ' + row.summary['contract:number'],
            displayTabSmallLabel: row.summary['contract:product_label'],
            href: row.href
        }));
    }

    return (
        <>
            <Table columnId={contractColumns} url={props.url} showPaginator={true}/>
        </>
    );
};

export default React.memo(ContractTable);
