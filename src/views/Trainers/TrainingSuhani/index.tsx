import Activity from 'components/Activity/Activity';
import React from 'react';
import WithActivity from 'components/WithActivity';

const props: any = {
    hRef: 'http://20.33.40.147:13111/csc/insurance/contracts/ID-W4Fb6FHGA',
    mainEntityHRef: 'http://20.33.40.147:13111/csc/insurance/contracts/ID-W4Fb6FHGA',
    action: 'fetch',
    activityCode: 'unsolicited_payment',
    title: 'INV_UP/IUP00000828 : Mr S BAREME - In Force - Effective on 14/06/2021'
}

//Newhref = aia.POST(UPHref)

const TrainingSuhani = () => (
    <WithActivity {...props}> <Activity {...props}></Activity></WithActivity>
)

export default TrainingSuhani;
