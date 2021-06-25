/* eslint-disable */
import {makeStyles} from '@material-ui/core/styles';
import { OpenInNewTabIcon, OpenInNewWindowIcon } from 'assets/svg';
import React from 'react';
import useDeskTickets from 'hooks/useDeskTickets';
import useTabs from 'hooks/useTabs';

const useStyles = makeStyles((theme) => ({
    message: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent:'center',
        alignItems: 'center',
        fontSize:'48px',
        height: '300px'
    }}))

const Home = () => {
    const classes = useStyles()
    const {getAll} = useDeskTickets();
    const tickets = getAll();
    const {openNewTab, openNewTabInSecondaryWindow} = useTabs()

    const openTicketInNewTab = (tabId: string, subTitle: string) => {
        openNewTab({id:tabId, subTitle, activityProps:{ title:'Ticket N° '+tabId, entityType:'ticket', activityCode:'ticket_view', hRef:tabId, mainEntityHRef:tabId}})
    }

    const openTicketInNewWindow = (tabId: string, subTitle: string) => {
        openNewTabInSecondaryWindow({id:tabId, subTitle, activityProps:{ title:'Ticket N° '+tabId, entityType:'ticket', activityCode:'ticket_view', hRef:tabId, mainEntityHRef:tabId}})
    }

    /*
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
    */

    return <div className={classes.message}>Search a contract with the input in navbar, like : IUP% </div>
}

export default Home;

