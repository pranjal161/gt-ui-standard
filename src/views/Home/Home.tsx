import { OpenInNewTabIcon, OpenInNewWindowIcon } from 'assets/svg';
import React from 'react';
import useDeskTickets from 'hooks/useDeskTickets';
import useTabs from 'hooks/useTabs';

const Home = () => {
    const {getAll} = useDeskTickets();
    const tickets = getAll();
    const {openNewTab, openNewTabInSecondaryWindow} = useTabs()

    const openTicketInNewTab = (tabId: string, subTitle: string) => {
        openNewTab({id:tabId, subTitle, activityProps:{ title:'Ticket N° '+tabId, entityType:'ticket', activityCode:'ticket_view', hRef:tabId, mainEntityHRef:tabId}})
    }

    const openTicketInNewWindow = (tabId: string, subTitle: string) => {
        openNewTabInSecondaryWindow({id:tabId, subTitle, activityProps:{ title:'Ticket N° '+tabId, entityType:'ticket', activityCode:'ticket_view', hRef:tabId, mainEntityHRef:tabId}})
    }

    return (<div data-testid="home-component" className="text-align-center">
        <h6>Home Component</h6>
        <p>List of tickets :</p>
        {tickets && tickets.map((ticket:any, index:number) => <h6 key={index}>{ticket.title} 
            <span
                onClick={() => openTicketInNewTab(ticket.id, ticket.title)}
                title="Open in new tab">
                <OpenInNewTabIcon />
            </span>
            <span
                onClick={() => openTicketInNewWindow(ticket.id, ticket.title)}
                title="Open in new window">
                <OpenInNewWindowIcon />
            </span>
        </h6>)}
    </div>);
}

export default Home;

