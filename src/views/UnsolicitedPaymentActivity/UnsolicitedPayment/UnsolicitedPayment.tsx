import { AddBoxIcon, DistributorIcon } from 'assets/svg';

import {ActivityProps} from 'components/Activity/Activity';
import Button from 'theme/components/material/Button/Button';
import DistributorsManagement from './DistributorsManagement/DistributorsManagement';
import DistributorsSearch from './DistributorsSearch/DistributorsSearch';
import GeneralInfo from './GeneralInfo';
import MoneyIn from './MoneyIn';
import React from 'react';
import Section from 'components/Section/Section';
import { useTranslation } from 'react-i18next';

const UnsolicitedPayment: React.FC<ActivityProps> = ({hRef}:any) => {
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = React.useState<boolean>(false);

    const validateDistributor = (obj: any) => {
        console.log({ obj });
        setIsVisible(false);
    }

    return (
        <>
            <div className="col-12 mb-4">
                <GeneralInfo hRef={hRef}/>
            </div>
            <div className="col-12 mb-4">
                <MoneyIn hRef={hRef}/>
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
                    <DistributorsManagement hRef={hRef} />
                    <DistributorsSearch open={isVisible} onValidate={(distributor: any) => validateDistributor({ distributor })} onCancel={() => setIsVisible(false)} />
                </Section>
            </div>
        </>
    )
}

export default React.memo(UnsolicitedPayment);
