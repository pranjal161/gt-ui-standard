import { AddBoxIcon, DistributorIcon, PaymentIcon } from 'assets/svg';
import Button from 'theme/components/material/Button/Button';
import DistributorsManagement from './DistributorsManagement/DistributorsManagement';
import DistributorsSearch from './DistributorsSearch/DistributorsSearch';
import GeneralInfo from './GeneralInfo';
import MoneyIn from './MoneyIn';
import React from 'react';
import Section from 'components/Section/Section';
import { getLink } from 'utils/functions';
import useResponse from 'hooks/useResponse';
import { useTranslation } from 'react-i18next';

export interface UnsolicitedPaymentProps {

    /**
     * hRef of the activity
     */
    hRef : string
}

const UnsolicitedPayment: React.FC<UnsolicitedPaymentProps> = ({ hRef }: UnsolicitedPaymentProps) => {
    const [response] = useResponse(hRef)
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = React.useState<boolean>(false);

    const validateDistributor = (obj: any) => {
        console.log({ obj });
        setIsVisible(false);
    }

    const moneyInHRef = response && getLink(response?.data, 'self')

    return (
        <>
            <div className="col-12 mb-4">
                <Section title="General Information" icon={<PaymentIcon />} >
                    <GeneralInfo hRef={hRef} />
                </Section>
            </div>
            <div className="col-12 mb-4">
                <MoneyIn hRef={moneyInHRef}/>
            </div>
            <div className="col-12 mb-4">
                <Section title="Distributor Management" icon={<DistributorIcon />} actions={
                    <>
                        <Button
                            color="primary"
                            onClick={() => setIsVisible(true)}
                            endIcon={<AddBoxIcon />}>
                            {t('add')}
                        </Button>
                    </>
                }>
                    <DistributorsManagement />
                    <DistributorsSearch open={isVisible} onValidate={(distributor: any) => validateDistributor({ distributor })} onCancel={() => setIsVisible(false)} />
                </Section>
            </div>
        </>
    )
}

export default React.memo(UnsolicitedPayment);
