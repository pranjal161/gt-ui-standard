import ContentList from 'components/ContentList/ContentList';
import { PanelSectionItem } from 'components/PanelSection/PanelSection';
import React from 'react';
import { getLink } from 'utils/functions';
import useResponse from 'hooks/useResponse';

//import { useTranslation } from 'react-i18next';

//todo : This code has to be changed to use useResponse to be reactive
const ScheduledPayment = (props: { contractResponse: any }) => {
    const contractResponse = props.contractResponse.data;
    const scheduledPaymentListUrl = contractResponse && getLink(contractResponse, 'contract:billing_list-scheduled_payment');
    const [scheduledPaymentListRes] = useResponse(scheduledPaymentListUrl);
    const item = scheduledPaymentListRes && scheduledPaymentListRes.data && scheduledPaymentListRes.data['_links'].item && scheduledPaymentListRes.data['_links'].item.href;
    const [scheduledPayment, loading]: any = useResponse(item);

    const Items: PanelSectionItem[] = [
        { id: 'billing:amount', styleType: ['currency'] },
        { id: 'billing:payment_type', styleType: ['text'] },
        { id: 'billing:frequency', styleType: ['text'] },
        { id: 'billing:next_due_date', styleType: ['date'] }
    ];

    return (
        <>
            {scheduledPayment && (
                <>
                    <ContentList items={Items} data={scheduledPayment.data} loading={loading}/>
                </>
            )}
        </>
    );
};

export default ScheduledPayment;
