import { AddBoxIcon, DistributorIcon } from 'assets/svg';

import {ActivityProps} from 'components/Activity/Activity';
import BindToStep from 'components/BindToStep/BindToStep';
import Button from 'theme/components/material/Button/Button';
import DistributorsManagement from './DistributorsManagement/DistributorsManagement';
import DistributorsSearch from './DistributorsSearch/DistributorsSearch';
import GeneralInfo from './GeneralInfo';
import MoneyIn from './MoneyIn';
import React from 'react';
import Section from 'components/Section/Section';
import useAia from 'hooks/useAia';
import useResponse from 'hooks/useResponse';
import { useTranslation } from 'react-i18next';

const UnsolicitedPayment: React.FC<ActivityProps> = (props: { hRef:string }) => {
    const { hRef } = props;
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = React.useState<boolean>(false);
    const [response] = useResponse(hRef);
    const { patch } = useAia();

    const validateDistributor = (obj: any) => {
        const allDistributor = JSON.parse(JSON.stringify(response.data['distributor_list']));
        const distributorPayload = { distributor: obj.distributor.distributor.href, rate: obj.distributor.rate, role: 'othr' }
        const payload = [...allDistributor, distributorPayload]
        patch(props.hRef, {'distributor_list': payload }).then();
        setIsVisible(false);
    }

    return (
        <>
            <div className="col-12 mb-4">
                <GeneralInfo hRef={hRef}/>
            </div>
            <div className="col-12 mb-4">
                <BindToStep hRef={hRef} property={'cscaia:money_in'}>
                    <MoneyIn hRef={hRef}/>
                </BindToStep>
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
