import PanelSection, {PanelSectionItem} from 'components/PanelSection/PanelSection';
import ContentList from 'components/ContentList/ContentList';
import React from 'react';
import ScheduledPayment from './ScheduledPayment';
import useResponse from 'hooks/useResponse';
import {useTranslation} from 'react-i18next';

const ContractSideBar = ({hRef}: any) => {
    const [response] = useResponse(hRef);
    const {t} = useTranslation()
    const contractGeneralItems: PanelSectionItem[] = [
        {hRef, id: 'contract:number', styleType: ['text']},
        {hRef, id: 'contract:product_identifier', styleType: ['text']},
        {hRef, id: 'contract:product_type', styleType: ['text']},
        {hRef, id: 'contract:status', styleType: ['text']},
        {hRef, id: 'contract:start_date', styleType: ['date']},
        {hRef, id: 'contract:currency_code', styleType: ['text']}
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
