import BindToStep from 'components/BindToStep/BindToStep';
import DateInput from 'theme/components/material/DateInput/DateInput';
import EditPayer from './EditPayer/EditPayer';
import IconButton from 'theme/components/material/IconButton/IconButton';
import {PencilIcon} from 'assets/svg';
import React from 'react';
import SelectInput from 'components/SelectInput/SelectInput';
import TextField from 'components/TextField/TextField';
import {getLink} from 'utils/functions';
import useAia from 'hooks/useAia';
import useResponse from 'hooks/useResponse';

const GeneralInfo = ({hRef}: any) => {
    const [response] = useResponse(hRef)
    const [isVisible, setIsVisible] = React.useState(false);
    const payerLink = response && getLink(response.data, 'premium:addressee_person');
    const [payerResponse] = useResponse(payerLink)

    const {patch} = useAia();

    const patchValue = (value: any, id: string) => {
        const payload: any = {};
        payload[id] = value;
        patch(hRef, payload).then();
    }

    const patchPayer = async (person: any = {}) => {
        await patch(hRef, {'premium:addressee_person': person.href});
    }

    return <>{
        response &&
        <div className="p-3 row">
            <div className="col-4">
                <TextField
                    data={response.data}
                    hRef={hRef}
                    propertyName="operation:amount"
                    onBlurMethod={(value: any) => patchValue(value, 'operation:amount')}
                />
            </div>
            <div className="col-4">
                <SelectInput
                    hRef={hRef}
                    data={response.data}
                    propertyName="operation:currency_code"
                    onChangeMethod={(value: any) => patchValue(value, 'operation:currency_code')}
                />
            </div>
            <div className="col-4">
                <SelectInput
                    hRef={hRef}
                    data={response.data}
                    propertyName="operation:payment_source"
                    onChangeMethod={(value: any) => patchValue(value, 'operation:payment_source')}
                />
            </div>
            <div className="d-flex col-4 pt-3">
                {payerResponse &&
                <BindToStep hRef={hRef} property={'premium:addressee_person'}>
                    <div className="row">
                        <div className="col-9">
                            <TextField
                                hRef={hRef}
                                data={payerResponse.data}
                                context={'payer'}
                                propertyName="person:display_id1"
                            />
                        </div>
                        <div className="col-3 pt-3 ml-3">
                            <IconButton color={'inherit'} onClick={() => setIsVisible(true)} size={'small'}>
                                <PencilIcon size={24}/>
                            </IconButton>
                        </div>
                        <EditPayer
                            isVisible={isVisible}
                            setIsVisible={setIsVisible}
                            onChange={(person: any) => patchPayer(person)}
                        />
                    </div>
                </BindToStep>
                }
            </div>
            <div className="col-4 pt-3">
                <DateInput
                    hRef={hRef}
                    data={response.data}
                    propertyName="operation:signature_date"
                    onChangeMethod={(value: any) => patchValue(value, 'operation:signature_date')}
                />
            </div>
        </div>}
    </>
}
export default React.memo(GeneralInfo);
