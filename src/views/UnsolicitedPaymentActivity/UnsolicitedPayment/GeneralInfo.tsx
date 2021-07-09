import {PaymentIcon, PencilIcon} from 'assets/svg';

import BindToStep from 'components/BindToStep/BindToStep';
import DateInput from 'theme/components/material/DateInput/DateInput';
import EditPayer from './EditPayer/EditPayer';
import IconButton from 'theme/components/material/IconButton/IconButton';
import React from 'react';
import Section from 'components/Section/Section';
import SelectInput from 'components/SelectInput/SelectInput';
import TextField from 'components/TextField/TextField';
import {getLink} from 'utils/functions';
import useAia from 'hooks/useAia';
import useResponse from 'hooks/useResponse';

const GeneralInfo = ({hRef}: any) => {
    const [response] = useResponse(hRef)
    const [isVisible, setIsVisible] = React.useState(false);
    const payerLink = response && getLink(response.data, 'premium:addressee_person');
    const [payerLoading] = useResponse(payerLink)

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
        <Section title="General Information" icon={<PaymentIcon/>}>
            <div className="p-3 row">
                <div className="col-4">
                    <TextField
                        hRef={hRef}
                        property="operation:amount"
                    />
                </div>
                <div className="col-4">
                    <SelectInput
                        hRef={hRef}
                        property="operation:currency_code"
                        onChange={(value: any) => patchValue(value, 'operation:currency_code')}
                    />
                </div>
                <div className="col-4">
                    <SelectInput
                        hRef={hRef}
                        property="operation:payment_source"
                        onChange={(value: any) => patchValue(value, 'operation:payment_source')}
                    />
                </div>
                <div className="d-flex col-4 pt-3">
                    <BindToStep hRef={hRef} property={'premium:addressee_person'}>
                        <div className="row">
                            <div className="col-9">
                                <TextField
                                    hRef={payerLink}
                                    loading={payerLoading}
                                    i18nOptions={{context: 'payer'}}
                                    property="person:display_id1"
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
                </div>
                <div className="col-4 pt-3">
                    <DateInput
                        hRef={hRef}
                        data={response.data}
                        property="operation:signature_date"
                        onChange={(value: any) => patchValue(value, 'operation:signature_date')}
                    />
                </div>
            </div>
        </Section>}
    </>
}
export default React.memo(GeneralInfo);
