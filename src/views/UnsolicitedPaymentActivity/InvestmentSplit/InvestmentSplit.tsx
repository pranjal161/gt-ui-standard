import { AddBoxIcon, PaymentIcon } from 'assets/svg';

import Button from 'components/Button/Button';
import {DxcSelect} from '@dxc-technology/halstack-react';
import React from 'react';
import Section from 'components/Section/Section';

export interface InvestmentSplitProps {

    /**
     * API response of API for the entity
     */
    response: any
}
const InvestmentSplit: React.FC<InvestmentSplitProps> = ({ response }: InvestmentSplitProps) => {
    const [isOpen, setOpen]: [boolean, Function] = React.useState(false);
    console.log(isOpen);
    // To be picked from API after property allocation_type is available, harcoded for now
    const allocationTypes = [{value: 'by_rate', label: 'Free allocation by rate'}]

    return (
        <div className="col-12 mb-4">
            <Section title="Investment Split" icon={<PaymentIcon />} >
                <DxcSelect
                    options={allocationTypes}
                    label="Allocation type"
                    value="by_rate"
                />
                <div style={{ float: 'right' }}>
                    <Button onClick={() => setOpen(true)} Icon={AddBoxIcon}
                        title="Management Selection" />
                </div>

            </Section>
        </div>
    )
}

export default InvestmentSplit;
