import React, { useEffect } from 'react';

import ContentList from 'components/ContentList/ContentList';
import { PanelSectionItem } from 'components/PanelSection/PanelSection';
import { getLink } from 'utils/functions';
import useAia from 'hooks/useAia';

//import { useTranslation } from 'react-i18next';

//todo : This code has to be changed to use useResponse to be reactive
const ScheduledPayment = (props: { contractResponse: any }) => {
    const contractResponse = props.contractResponse.data;
    const [scheduledPayment, setScheduledPayment] = React.useState<undefined | any>();
    const { fetch } = useAia();

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        if (contractResponse && getLink(contractResponse, 'contract:billing_list-scheduled_payment')) {
            const scheduledPaymentListUrl = getLink(contractResponse, 'contract:billing_list-scheduled_payment');
            fetch(scheduledPaymentListUrl).then((itemsList: any) => {
                if (itemsList && itemsList.data['_links'] && itemsList.data['_links'].item) {
                    fetch(itemsList.data['_links'].item.href).then((response: any) => {
                        setScheduledPayment(response.data)
                    });
                }
            });
        }
    };
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
                    <ContentList items={Items} data={scheduledPayment} />
                </>
            )}
        </>
    );
};

export default ScheduledPayment;
