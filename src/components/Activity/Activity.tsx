import { AddBoxIcon, DistributorIcon, PaymentIcon } from 'assets/svg';

import Button from 'components/Button/Button';
import React from 'react';
import Section from 'components/Section/Section';
import TitleBar from './TitleBar/TitleBar';

//export interface ActivityProps {}

/**
 * props to define and describe
 */
// prop1: any
//}

const Activity = () => (
    <>
        <div className="col-12">
            <TitleBar></TitleBar>
        </div>
        <div>
            Stepper
        </div>
        <div className="d-flex">
            <div className="col-8 p-1">
                <div className="col-12">
                    <Section title="General Information" icon={<PaymentIcon />} />
                </div>
                <div className="col-12">
                    <Section title="Payment" icon={<PaymentIcon />} actions={
                        <Button onClick={() => console.log('test button')} Icon={AddBoxIcon} title="Test Button" ></Button>} />
                </div>
                <div className="col-12">
                    <Section title="Distributor Management" icon={<DistributorIcon />} actions={
                        <Button onClick={() => console.log('test button')} Icon={AddBoxIcon} title="Test Button" ></Button>} />
                </div>

            </div>

            <div className="col-4">
                SideNav
            </div>
        </div>
    </>
)

export default Activity;
