import React, { useEffect, useState } from 'react';

import Activity from 'components/Activity/Activity';
import WithActivity from 'components/WithActivity';
import { getLink } from 'utils/functions';
import useAia from 'hooks/useAia';

const UnsolicitedPaymentActivity = (props: { operationUrl: string; }) => {
    const { operationUrl } = props;
    const contractUrl = operationUrl.split('/').slice(0, 7).join('/');
    const { post } = useAia()
    const [UPUrl, setUrl] = useState();
    // const [title, setTitle] = useState<null | string>()
    const propsActivity: any = {
        hRef: UPUrl,
        mainEntityHRef: contractUrl,
        action: 'fetch',
        activityCode: 'unsolicited_payment',
        title: 'unsolicited_payment'
    }
    useEffect(() => {
        createUnsolPayment();
    }, [])

    const createUnsolPayment = () => {
        post(operationUrl, {}).then((res: any) => {
            if (res && res.data && getLink(res.data, 'self')) {
                setUrl(getLink(res.data, 'self'));
                // To ask API team to fix title of the
                // setTitle(getTitle(res.data))
            }
        });
    }

    return (
        <>
            {UPUrl &&
                <WithActivity {...propsActivity}> <Activity {...propsActivity}></Activity></WithActivity>}

        </>
    )

}

export default UnsolicitedPaymentActivity
