import React from 'react';
import SavingToolbar from 'components/SavingToolbar/SavingToolbar';

const UnsolicitedPayment = () => <div>Unsolicited payment</div>

interface ConfigurationParams {

    /**
     * Code of activity
     */
    activityCode?: string

}

export const getConfiguration = (activityCode: ConfigurationParams) => {
    let configuration = {}

    //Later, we can get the user context to choose with controller we will use.
    switch (activityCode) {
        case 'unsolicited_payment':
            configuration = {
                controller: UnsolicitedPayment,
                sidebar: {
                    props: SavingToolbar,
                    contents: <div>Content</div>
                }
            }

            return configuration
        case 'contract_view':
        case 'person_view':
        case 'ticket_view':
        default :
            return <div>No controller for {activityCode}</div>
    }
}
