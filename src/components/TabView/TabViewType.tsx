import ActivityContainer from 'components/ActitivyContainer/ActivityContainer';
import React from 'react';
import SampleTicket from '../SampleTicket/SampleTicket';
import WithActivity from 'components/WithActivity';

/**
 * Used to select a React component to display data based on its type.
 * Used only in TabView component for now.
 * So far only for ticket, contract and client
 * @constructor
 * @param {Object} props - the React props object
 * @param {string} props.tabId - The id of the object the user wants to fetch data for. Can be the Id of a ticket, href for contract, etc
 * @param {string} props.type - The type of object the user wants to display data for: ticket, contract and client, for now.
 */
const TabViewType = (props: { tabId: string, href?: string, activityProps?: any }) => {
    const {tabId, href = undefined} = props;
    //console.log('TabViewType render')

    let component
    let mode
    switch (props.activityProps.entityType) {
        case 'search':
            mode = 'search'
            component = <WithActivity hRef={href}> <ActivityContainer mode={mode} {...{...props.activityProps, href}}/> </WithActivity>
            break;
        case 'ticket':
            component = <SampleTicket ticketId={tabId}/>
            break;
        case 'contract':
            mode = (props.activityProps.activityCode === 'contract_view') ? 'view': 'update'
            component = <WithActivity hRef={href}> <ActivityContainer mode={mode} {...{...props.activityProps, href}}/></WithActivity>
            break;
        case 'person':
            mode = (props.activityProps.activityCode === 'person_view') ? 'view': 'update'
            component = <WithActivity hRef={href}> <ActivityContainer mode={mode} {...{...props.activityProps, href}}/> </WithActivity>

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
