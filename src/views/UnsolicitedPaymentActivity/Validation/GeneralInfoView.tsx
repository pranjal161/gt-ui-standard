/* eslint-disable react/jsx-key */

import LabelInBlock from 'components/LabelInBlock/LabelInBlock';
import React from 'react';
import { getLink } from 'utils/functions';
import useActivity from 'hooks/useActivity';
import useResponse from 'hooks/useResponse';

const GeneralInfoView = (props: { hRef: string }) => {
    const { hRef } = props;
    const [response, loading] = useResponse(hRef)
    const payerHRef = response && getLink(response.data, 'premium:addressee_person');
    const [payerRes] = useResponse(payerHRef);
    const orgHref = response && getLink(response.data, 'premium:addressee_organization');
    const [orgRes] = useResponse(orgHref);
    const { activityProps } = useActivity()
    const { mainEntityHRef } = activityProps;
    const [contractRes] = useResponse(mainEntityHRef)

    return <>{
        response &&
        <div className="row">
            <div className="col-11 px-5">
                <div className="row px-4">
                    <div className="col-4 mt-4 mb-4">
                        <LabelInBlock hRef={mainEntityHRef} property={'contract:number'} response={contractRes}
                            loading={loading} />
                    </div>
                    <div className="col-4 mt-4 mb-4">
                        <LabelInBlock hRef={mainEntityHRef} property={'contract:status'} response={contractRes}
                            loading={loading} />
                    </div>
                    <div className="col-4 mt-4 mb-4">
                        <LabelInBlock hRef={mainEntityHRef} property={'contract:start_date'} response={contractRes}
                            loading={loading} />
                    </div>
                </div>
                <div className="row px-4">
                    <div className="col-4 mt-4 mb-4">
                        <LabelInBlock hRef={mainEntityHRef} property={'contract:product_identifier'} response={contractRes}
                            loading={loading} />
                    </div>
                    <div className="col-4 mt-4 mb-4">
                        {payerRes &&
                            <LabelInBlock hRef={payerHRef} property={'person:display_id1'} response={payerRes}
                                loading={loading} context={'payer'} />}
                        {orgRes &&
                            <LabelInBlock hRef={orgHref} property={'organization:display_id1'} response={orgRes}
                                loading={loading} context={'payer'} />}
                    </div>
                    <div className="col-4 mt-4 mb-4">
                        <LabelInBlock hRef={mainEntityHRef} property={'contract:currency_code'} response={contractRes}
                            loading={loading} />
                    </div>
                </div>
            </div>
        </div>}
    </>
}
export default GeneralInfoView;

