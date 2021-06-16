import React from 'react';
import useDeskTickets from '../../hooks/useDeskTickets';

const SampleTicket = (props: {ticketId: string}) => {
    const { ticketId } = props;
    const { getOneShallow } = useDeskTickets();
    const selectedTicket = getOneShallow(ticketId);
    console.log('TicketSample render:')

    return (
        <>
            <div>
                Title: {selectedTicket.title}
            </div>
            <div>
                Client: {selectedTicket.client}
            </div>
            <div>
                Assigned To: {selectedTicket.assignedToDisplay}
            </div>
            <div>
                Deadline: {selectedTicket.deadline}
            </div>
            <div>
                Status: {selectedTicket.status}
            </div>
        </>
    );
}

export default SampleTicket;