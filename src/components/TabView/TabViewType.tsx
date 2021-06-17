import ActivityContainer from 'components/ActitivyContainer/ActivityContainer';
import React from 'react';
import SampleTicket from '../SampleTicket/SampleTicket';

/**
 * Used to select a React component to display data based on its type.
 * Used only in TabView component for now.
 * So far only for ticket, contract and client
 * @constructor
 * @param {Object} props - the React props object
 * @param {string} props.tabId - The id of the object the user wants to fetch data for. Can be the Id of a ticket, href for contract, etc
 * @param {string} props.type - The type of object the user wants to display data for: ticket, contract and client, for now.
 */
const TabViewType = (props: { tabId: string, type: string, href?: string, activityProps?: any }) => {
    const {tabId, type, href = undefined} = props;
    console.log('TabViewType render')

    let component
    switch (type) {
        case 'ticket_View':
        case 'ticket_operation':
            component = <SampleTicket ticketId={tabId}/>
            break;
        case 'contract_view':
            component = <ActivityContainer mode={'view'} {...{...props.activityProps, href}}/>
            break;
        case 'contract_operation':
            component = <ActivityContainer mode={'update'} {...{...props.activityProps, href}}/>
            break;
        case 'person_view':
        case 'person_operation':
            break;

    }

    return (
        <>
            {component}
        </>
    );
}

export default TabViewType;

/**
 * Export a memoised version of the component to avoid unnecessary rerenders if no props are changed.
 */
export const MemoTabViewType = React.memo(TabViewType);
