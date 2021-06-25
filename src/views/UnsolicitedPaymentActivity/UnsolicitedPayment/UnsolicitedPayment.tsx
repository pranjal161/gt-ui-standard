import { AddBoxIcon, DistributorIcon, PaymentIcon } from 'assets/svg';

import Button from 'components/Button/Button';
import DistributorsManagement from './DistributorsManagement/DistributorsManagement';
import DistributorsSearch from './DistributorsSearch/DistributorsSearch';
import GeneralInfo from './GeneralInfo';
import MoneyIn from './MoneyIn';
import React from 'react';
import Section from 'components/Section/Section';
import { useTranslation } from 'react-i18next';

export interface UnsolicitedPaymentProps {

    /**
     * API response of API for the entity
     */
    response: any
}

const UnsolicitedPayment: React.FC<UnsolicitedPaymentProps> = ({ response }: UnsolicitedPaymentProps) => {
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = React.useState<boolean>(false);

    const validateDistributor = (obj: any) => {
        console.log({ obj });
        setIsVisible(false);
    }

    return (
        <>
            <div className="col-12 mb-4">
                <Section title="General Information" icon={<PaymentIcon />} >
                    <GeneralInfo response={response} />
                </Section>
            </div>
            <div className="col-12 mb-4">
                <MoneyIn response={response} />
            </div>
            <div className="col-12 mb-4">
                <Section title="Distributor Management" icon={<DistributorIcon />} actions={
                    <>
                        <Button onClick={() => setIsVisible(true)} Icon={AddBoxIcon}
                            title={t('add')} />
                    </>
                }>
                    <DistributorsManagement />
                    <DistributorsSearch open={isVisible} onValidate={(distributor: any) => validateDistributor({ distributor })} onCancel={() => setIsVisible(false)} />
                </Section>
            </div>
        </>
    )
}

export default UnsolicitedPayment;
