import { OpenInNewTabIcon, OpenInNewWindowIcon } from 'assets/svg';

import React from 'react';

import { addSecondaryTabByID } from 'store/reducers/secondaryTabsReducer';
import { addWindowTabByID } from 'store/reducers/newWindowReducer';
import useDeskTickets from 'hooks/useDeskTickets';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Home = () => {
    const {getAll} = useDeskTickets();
    const tickets = getAll();
    let dispatch = useDispatch();
    const history = useHistory();

    const openTicketInNewTab = (tabId: string, subTitle: string) => {
        dispatch(addSecondaryTabByID({
            tabId: tabId, 
            tabType: 'ticket', 
            displayTabLabel: 'Ticket N° '+tabId,
            displayTabSmallLabel: subTitle
        }));
        history.push('/viewTab');
    }

    const openTicketInNewWindow = (tabId: string, subTitle: string) => {
        dispatch(addWindowTabByID({
            tabId: tabId, 
            tabType: 'ticket', 
            displayTabLabel: 'Ticket N° '+tabId,
            displayTabSmallLabel: subTitle
        }));
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

