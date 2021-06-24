import PanelSection, { PanelSectionItem } from 'components/PanelSection/PanelSection';

import ContentList from '../components/ContentList';
import React from 'react';
import ScheduledPayment from './ScheduledPayment';
import useResponse from 'hooks/useResponse';

const ContractSideBar = ({ hRef }: any) => {
    const response = useResponse(hRef);
    const contractGeneralItems: PanelSectionItem[] = [
        { id: 'contract:number', styleType: ['text'] },
        { id: 'contract:product_identifier', styleType: ['text'] },
        { id: 'contract:product_type', styleType: ['text'] },
        { id: 'contract:status', styleType: ['text'] },
        { id: 'contract:start_date', styleType: ['date'] },
        { id: 'contract:currency_code', styleType: ['text'] }
    ];

    const ContractGeneralSection = ({ response }: any) => <PanelSection title={'Detail'}
        content={<ContentList items={contractGeneralItems} data={response && response.data} />} />
    ContractGeneralSection.displayName = 'ContractGeneralSection'

    return (
        <>
            {response &&
                <>
                    <ContractGeneralSection key={'general'} response={response} />
                    <PanelSection title={'Scheduled Payment'}
                        content={<ScheduledPayment key={'scheduledPayment'} contractResponse={response} />} />
                </>
            }
        </>
    )
}

export default ContractSideBar;