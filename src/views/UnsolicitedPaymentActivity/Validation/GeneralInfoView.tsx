/* eslint-disable react/jsx-key */

import LabelInBlock from 'components/LabelInBlock/LabelInBlock';
import React from 'react';
import { getLink } from 'utils/functions';
import { makeStyles } from '@material-ui/core';
import useActivity from 'hooks/useActivity';
import useResponse from 'hooks/useResponse';

const useStyles = makeStyles((theme) => ({
    root: {
        marginLeft: theme.spacing(3),
        alignItems: 'start',
        height: '100%',
        width: '100%',
    },
    subSection: {},
    subSectionContent: {
        marginLeft: theme.spacing(2)
    }
}))

const GeneralInfoView = (props: { hRef: string }) => {
    const { hRef } = props;
    const classes = useStyles()
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
        <div className={classes.root}>
            <div className={classes.subSection}>
                <div className={classes.subSectionContent}>
                    <div className="d-flex mt-4 mb-4">
                        <LabelInBlock hRef={mainEntityHRef} property={'contract:number'} response={contractRes}
                            loading={loading} />
                        <LabelInBlock hRef={mainEntityHRef} property={'contract:status'} response={contractRes}
                            loading={loading} />
                        <LabelInBlock hRef={mainEntityHRef} property={'contract:start_date'} response={contractRes}
                            loading={loading} />
                    </div>

                    <div className="d-flex mt-4 mb-4">
                        <LabelInBlock hRef={mainEntityHRef} property={'contract:product_identifier'} response={contractRes}
                            loading={loading} />
                        {payerRes &&
                            <LabelInBlock hRef={payerHRef} property={'person:display_id1'} response={payerRes}
                                loading={loading} context={'payer'} />}
                        {orgRes &&
                            <LabelInBlock hRef={orgHref} property={'organization:display_id1'} response={orgRes}
                                loading={loading} context={'payer'} />}
                        <LabelInBlock hRef={mainEntityHRef} property={'contract:currency_code'} response={contractRes}
                            loading={loading} />
                    </div>
                </div>
            </div>
        </div>}
    </>
}
export default React.memo(GeneralInfoView);

