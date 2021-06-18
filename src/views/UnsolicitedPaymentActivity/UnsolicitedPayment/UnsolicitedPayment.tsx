import { AddBoxIcon, DistributorIcon, PaymentIcon } from 'assets/svg';

import Button from 'components/Button/Button';
import React from 'react';
import Section from 'components/Section/Section';

const UnsolicitedPayment = () => (
    <>
        <div className="col-12">
            <Section title="General Information" icon={<PaymentIcon />}>
                TEST 1
                TEst 2
            </Section>
        </div>
        <div className="col-12">
            <Section title="Payment" icon={<PaymentIcon />} actions={
                <Button onClick={() => console.log('test button')} Icon={AddBoxIcon}
                    title="Test Button" />} />
        </div>
        <div className="col-12">
            <Section title="Distributor Management" icon={<DistributorIcon />} actions={
                <>
                    <Button onClick={() => console.log('test button')} Icon={AddBoxIcon}
                        mode={'secondary'}
                        title="Secondary" />
                    <Button onClick={() => console.log('test button')} Icon={AddBoxIcon}
                        title="Test Button" />
                </>} />
        </div>
    </>
)

export default UnsolicitedPayment;