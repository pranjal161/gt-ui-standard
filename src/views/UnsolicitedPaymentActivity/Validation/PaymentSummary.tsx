import LabelInBlock, { useStyles } from 'components/LabelInBlock/LabelInBlock';
import React, { useEffect, useState } from 'react';

import { getLink } from 'utils/functions';
import useResponse from 'hooks/useResponse';

const PaymentSummary = (props: { hRef: string }) => {
    const [response, loading] = useResponse(props.hRef)
    const [charge, setCalculatedCharge] = useState(0);
    const classes: any = useStyles();
    const payerHRef = response && getLink(response.data, 'premium:addressee_person');
    const [ payerResponse ] = useResponse(payerHRef);
    const organizationHref = response && getLink(response.data, 'premium:addressee_organization');
    const [ organizationResponse ] = useResponse(organizationHref);

    useEffect(() => {
        if (response && response.data) {
            const feesList = response.data['fees_override_list'];
            const totalCharge = feesList.reduce((a: any, b: any) => a + (b['fees_override:rate'] || 0), 0);
            setCalculatedCharge(totalCharge);
        }
    }, [response])

    const ChargeComponent = () => (<>
        <div className={classes.label}>Charge</div>
        <div className={classes.value}>{charge} %</div>
    </>)

    return (<>
        <div className="row">
            <div className="col-11 px-5">
                <div className="row px-4">
                    <div className="col-4 mt-4 mb-4">
                        <LabelInBlock property={'operation:signature_date'} hRef={props.hRef} response={response} loading={loading} />
                    </div>
                    <div className="col-4 mt-4 mb-4">
                        <LabelInBlock property={'operation:amount'} styleType={['decimal']} hRef={props.hRef} response={response} loading={loading} />
                    </div>
                    <div className="col-4 mt-4 mb-4">
                        <LabelInBlock property={'operation:currency_code'} hRef={props.hRef} response={response} loading={loading} />
                    </div>
                </div>
                <div className="row px-4">
                    <div className="col-4 mt-4 mb-4">
                        <LabelInBlock property={'operation:payment_source'} hRef={props.hRef} response={response} loading={loading} />
                    </div>
                    
                    <div className="col-4 mt-4 mb-4">
                        <LabelInBlock property={'operation:payment_source'} hRef={props.hRef} response={response} loading={loading} />
                    </div>

                    <div className="col-4 mt-4 mb-4">
                        {payerResponse &&
                            <LabelInBlock hRef={payerHRef} property={'person:display_id1'} response={payerResponse} loading={loading} context={'payer'} />}
                        {organizationResponse &&
                            <LabelInBlock hRef={organizationHref} property={'organization:display_id1'} response={organizationResponse} loading={loading} context={'payer'} />}
                    </div>
                </div>
                <div className="row px-4">
                    <div className={'col-4 mt-4 mb-4'}>
                        <ChargeComponent />
                    </div>
                    
                    <div className="col-4 mt-4 mb-4">
                        <LabelInBlock property={'operation:amount'} styleType={['decimal']} hRef={props.hRef} response={response} loading={loading} />
                    </div>
                </div>
            </div>
        </div>
    </>)

}

export default PaymentSummary;