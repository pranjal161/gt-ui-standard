import React from 'react';
import useDeskTickets from 'hooks/useDeskTickets';

const Home = () => {
    const {getAll} = useDeskTickets()
    const tickets = getAll()

    return (<div data-testid="home-component" className="text-align-center">
        <h6>Home Component</h6>
        <p>List of tickets :</p>
        {tickets && tickets.map((ticket:any, index:number) => <h6 key={index}>{ticket.title}</h6>)}
    </div>);
}

export default Home;

