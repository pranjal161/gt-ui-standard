import DateInput from 'theme/components/material/DateInput/DateInput';
import EditPayer from './EditPayer/EditPayer';
import IconButton from 'theme/components/material/IconButton/IconButton';
import { PencilIcon } from 'assets/svg';
import React from 'react';
import SelectInput from 'components/SelectInput/SelectInput';
import TextField from 'components/TextField/TextField';
import { getLink } from 'utils/functions';
import useAia from 'hooks/useAia';
import useResponse from 'hooks/useResponse';

const GeneralInfo = ({ response }: any) => {

    const href = response && getLink(response.data, 'self');
    const [isVisible, setIsVisible] = React.useState(false);
    const payerLink = response && getLink(response.data, 'premium:addressee_person');
    const payerResponse = useResponse(payerLink);

    const { patch } = useAia();

    const patchValue = (value: any, id: string) => {
        const payload: any = {};
        payload[id] = value;
        patch(href, payload).then();
    }

    const patchPayer = async (person: any = {}) => {
        await patch(href, { 'premium:addressee_person': person.href });
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
            <div className="d-flex col-4 pt-3">
                {payerResponse &&
                    <>
                        <div className="col-9">
                            <TextField
                                data={payerResponse.data}
                                context={'payer'}
                                propertyName="person:display_id1"
                            ></TextField>
                        </div>
                        <div className="col-3 pt-3 p-0">
                            <IconButton color={'inherit'} onClick={() => setIsVisible(true)} size={'small'}>
                                <PencilIcon size={24} />
                            </IconButton>
                        </div>
                        <EditPayer
                            isVisible={isVisible}
                            setIsVisible={setIsVisible}
                            onChange={(person: any) => patchPayer(person)}
                        />
                    </>
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
