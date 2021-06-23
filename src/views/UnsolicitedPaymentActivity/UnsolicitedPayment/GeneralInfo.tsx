import React, { useEffect, useState } from 'react';

import DateInput from 'theme/components/material/DateInput/DateInput';
import SelectInput from 'components/SelectInput/SelectInput';
import TextField from 'components/TextField/TextField';
import { getLink } from 'utils/functions';
import useAia from 'hooks/useAia';

const GeneralInfo = ({ response }: any) => {

    const href = response && getLink(response.data, 'self');
    const [personResponse, setPersonResponse] = useState();
    const { fetch, patch } = useAia();
    useEffect(() => {
        const payerLink = response && getLink(response.data, 'premium:addressee_person');
        fetch(payerLink).then((payerResponse: any) => {
            setPersonResponse(payerResponse.data)
        })
    }, [response]);
    
    const patchValue = (value: any, id: string) => {
        const payload:any = {};
        payload[id] = value;
        patch(href, payload).then();
    }

    return <>{
        response &&
        <div className="p-3 row">
            <div className="col-4">
                <TextField
                    data={response.data}
                    propertyName="operation:amount"
                    onBlurMethod={(value: any) => patchValue(value, 'operation:amount')}
                ></TextField>
            </div>
            <div className="col-4">
                <SelectInput
                    data={response.data}
                    propertyName="operation:currency_code"
                    onBlurMethod={(value: any) => patchValue(value, 'operation:currency_code')}
                ></SelectInput>
            </div>
            <div className="col-4">
                <SelectInput
                    data={response.data}
                    propertyName="operation:payment_source"
                    onBlurMethod={(value: any) => patchValue(value, 'operation:payment_source')}
                ></SelectInput>
            </div>
            <div className="col-4 pt-3">
                {personResponse &&
                    <TextField
                        data={personResponse}
                        propertyName="person:display_id1"
                    ></TextField>
                }
            </div>
            <div className="col-4 pt-3">
                <DateInput
                    data={response.data}
                    propertyName="operation:signature_date"
                    onChangeMethod={(value: any) => patchValue(value, 'operation:signature_date')}
                ></DateInput>
            </div>
        </div>}
    </>
}
export default GeneralInfo;