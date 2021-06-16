import React from 'react';
import SampleContract from '../SampleContract/SampleContract';
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
const TabViewType = (props: { tabId: string, type: string, contractURL?: string }) => {
    const { tabId, type, contractURL = undefined } = props;
    console.log('TabViewType render')

    return (
        <>
            {
                (type === 'ticket') ? 
                    <SampleTicket ticketId={tabId} /> : 
                    (type === 'contract') ? 
                        <SampleContract contractURL={contractURL!} /> : 
                        (type === 'client') ? 
                            <div>
                                Client view component for id={tabId}
                            </div> : 
                            <div>
                                No content defined for data type: {type}
                            </div>
            }
        </>
    );
}

export default TabViewType;

/**
 * Export a memoised version of the component to avoid unnecessary rerenders if no props are changed.
 */
export const MemoTabViewType = React.memo(TabViewType);