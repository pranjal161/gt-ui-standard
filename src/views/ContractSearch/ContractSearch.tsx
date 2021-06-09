import { DxcAlert, DxcButton, DxcInput } from '@dxc-technology/halstack-react';
import React, { useEffect, useState } from 'react';

import { APIConfig } from 'configs/apiConfig';
import ContractTable from 'components/ContractTable/ContractTable';
import useActivity from 'hooks/useActivity';
import useAia from 'hooks/useAia';
import { useTranslation } from 'react-i18next';
import withActivity from 'hocs/withActivity';

export let urlContract: string = APIConfig.defaultHostUrl + 'contracts?_num=5';
const ContractSearch = () => {
    const { t } = useTranslation();
    // const initialURL = APIConfig.defaultHostUrl + 'contracts?_num=5';
    const { startActivity, stopActivity } = useActivity();
    const [url, setURL] = useState(urlContract);
    const [contractNumber, setContractNumber] = useState('');
    const [contractData, setContractData] = useState();
    const { fetch } = useAia();

    const onContractNumberChange = (updatedValue: string) => {
        setContractNumber(updatedValue.toUpperCase());
    };

    useEffect(() => {
        startActivity();

        return () => {
            stopActivity()
        };           
    }, [] );
    
    useEffect(() => {
        getData(url)
    }, [url]);

    const getData = (url: string) => {
        fetch(url).then((response: any) => {
            let result = JSON.parse(JSON.stringify(response.data));
            if (response && result['_links']['item']) {
                if (!Array.isArray(result['_links']['item'])) {
                    result['_links']['item'] = [result['_links']['item']]
                }
                setContractData(result);
            }
        });
    };

    const searchContract = () => {
        const searchURL = APIConfig.defaultHostUrl + 'contracts?contract:number=' + contractNumber + '&_num=5';
        setURL(searchURL);
    };

    const resetTable = () => {
        setURL(urlContract);
        setContractNumber('');
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
                        <div className="d-flex justify-content-center"></div>
                        <DxcButton
                            mode="primary"
                            label={t('_CONTRACT_SEARCH')}
                            onClick={searchContract}
                            margin="medium"
                            size="large"
                        />
                        <DxcButton mode="primary" label={t('_RESET')} onClick={resetTable} margin="medium"
                            size="large" />
                    </div>
                    <div className="align-center">
                        <DxcAlert
                            type="info"
                            mode="inline"
                            inlineText={t('_PAGINATOR_WARNING')}
                            margin="xxsmall"
                        />
                    </div>
                    {contractData &&
                        <ContractTable contractData={contractData} showPreview={true} />
                    }
                </div>

            </div>
        </>
    );
}

export default () => withActivity(ContractSearch, urlContract);
