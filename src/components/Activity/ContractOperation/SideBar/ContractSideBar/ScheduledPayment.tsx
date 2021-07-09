import ContentList from 'components/ContentList/ContentList';
import { PanelSectionItem } from 'components/PanelSection/PanelSection';
import React from 'react';
import { getLink } from 'utils/functions';
import useResponse from 'hooks/useResponse';

//import { useTranslation } from 'react-i18next';

//todo : This code has to be changed to use useResponse to be reactive
const ScheduledPayment = (props:any) => {
    const {hRef} = props
    const [response] = useResponse(hRef)
    const contractResponse = response && response.data;
    const scheduledPaymentListUrl = contractResponse && getLink(contractResponse, 'contract:billing_list-scheduled_payment');
    const [scheduledPaymentListRes] = useResponse(scheduledPaymentListUrl);
    const item = scheduledPaymentListRes && scheduledPaymentListRes.data && scheduledPaymentListRes.data['_links'].item && scheduledPaymentListRes.data['_links'].item.href;
    const [scheduledPayment, loading]: any = useResponse(item);

    const Items: PanelSectionItem[] = [
        { id: 'billing:amount', styleType: ['currency'], hRef },
        { id: 'billing:payment_type', styleType: ['text'], hRef },
        { id: 'billing:frequency', styleType: ['text'], hRef },
        { id: 'billing:next_due_date', styleType: ['date'], hRef }
    ];

    return (
        <>
            {scheduledPayment && (
                <>
                    <ContentList items={Items} loading={loading}/>
                </>
            )}
        </>
    );
};

export default ScheduledPayment;
