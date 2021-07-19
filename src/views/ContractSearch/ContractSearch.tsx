import {DxcAlert, DxcButton, DxcInput} from '@dxc-technology/halstack-react';
import React, {useState} from 'react';

import {APIConfig} from 'configs/apiConfig';
import ContractTable from 'components/ContractTable/ContractTable';
import {useTranslation} from 'react-i18next';
import withActivity from 'hocs/withActivity';

export let urlContract: string = APIConfig().defaultHostUrl + 'contracts?_num=5';
export const PureContractSearch = ({searchString}: any) => {
    const {t} = useTranslation();
    const makeUrl = (contractNumber:any) => APIConfig().defaultHostUrl + 'contracts?contract:number=' + contractNumber + '&_num=5'

    const [contractNumber, setContractNumber]: [any, any] = useState(searchString);
    const [searchURL, setSearchURL]: [any, any] = useState(makeUrl(contractNumber))

    const searchContract = () => {
        setSearchURL(makeUrl(contractNumber ))
    };

    const onContractNumberChange = (updatedValue: string) => {
        setContractNumber(updatedValue.toUpperCase());
    };

    return (
        <>
            <div className="d-flex flex-nowrap">
                <div className="flex-grow-1 col-9 p-0">
                    <div className="align-center">
                        <DxcInput
                            label={t('contract:number')}
                            value={contractNumber}
                            onChange={onContractNumberChange}
                            margin="medium"
                        />
                        <DxcButton
                            mode="primary"
                            label={t('_CONTRACT_SEARCH')}
                            onClick={searchContract}
                            margin="medium"
                            size="large"
                        />
                    </div>
                    <div className="align-center">
                        <DxcAlert
                            type="info"
                            mode="inline"
                            inlineText={t('_PAGINATOR_WARNING')}
                            margin="xxsmall"
                        />
                    </div>
                    {searchURL &&
                    <ContractTable url={searchURL}/>
                    }
                </div>

            </div>
        </>
    );
}

export default () => withActivity(PureContractSearch, urlContract);
