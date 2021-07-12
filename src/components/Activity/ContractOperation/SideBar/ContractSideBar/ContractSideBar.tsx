import PanelSection, {PanelSectionItem} from 'components/PanelSection/PanelSection';
import ContentList from 'components/ContentList/ContentList';
import React from 'react';
import ScheduledPayment from './ScheduledPayment';
import useResponse from 'hooks/useResponse';
import {useTranslation} from 'react-i18next';

const ContractSideBar = ({hRef}: any) => {
    const [response, loading] = useResponse(hRef);
    const {t} = useTranslation()
    const contractGeneralItems: PanelSectionItem[] = [
        {hRef, id: 'contract:number', styleType: ['text'], response, loading},
        {hRef, id: 'contract:product_identifier', styleType: ['text'], response, loading},
        {hRef, id: 'contract:product_type', styleType: ['text'], response, loading},
        {hRef, id: 'contract:status', styleType: ['text'], response, loading},
        {hRef, id: 'contract:start_date', styleType: ['date'], response, loading},
        {hRef, id: 'contract:currency_code', styleType: ['text'], response, loading},
    ];

    const ContractGeneralSection = ({hRef}: any) => <PanelSection title={'Detail'}
        content={<ContentList items={contractGeneralItems}/>}/>
    ContractGeneralSection.displayName = 'ContractGeneralSection'

    return (
        <>
            {response &&
            <>
                <ContractGeneralSection key={'general'} hRef={hRef}/>
                <PanelSection title={t('common:scheduledPaymentLabel')}
                    content={<ScheduledPayment key={'scheduledPayment'} hRef={hRef}/>}/>
            </>
            }
        </>
    )
}

export default ContractSideBar;
