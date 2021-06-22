import React, { useEffect, useState } from 'react';
import { APIActions } from '../../utils/functions';

const SampleContract = (props: {contractURL: string}) => {
    const { contractURL } = props;
    const [contractData, setData] = useState<undefined | any>();

    useEffect(() => {
        getData(contractURL);
    }, [contractURL]);

    const getData = (contractURL: string) => {
        APIActions.get(contractURL).then((contractRes) => {
            setData(contractRes.data);
        })
    }

    return (
        <>
            {
                contractData ?
                    <div>
                        <div>
                            Contract Number: {contractData['contract:number']}
                        </div>
                        <div>
                            Product Label: {contractData['contract:product_label']}
                        </div>
                        <div>
                            Currency: {contractData['contract:currency_code']}
                        </div>
                        <div>
                            Signature Date: {contractData['contract:signature_date']}
                        </div>
                        <div>
                            Renewal Date: {contractData['contract:renewal_date']}
                        </div>
                        <div>
                            Start Date: {contractData['contract:start_date']}
                        </div>
                        <div>
                            Status: {contractData['contract:status']}
                        </div>
                        <div>
                            Status Motive: {contractData['contract:status_motive']}
                        </div>
                        <div>
                            Status Date: {contractData['contract:status_date']}
                        </div>
                    </div> :
                    'Loading...'
            }
        </>
    )
}

export default SampleContract;