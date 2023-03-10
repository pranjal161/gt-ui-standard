import { HelpIcon, PaymentIcon, PencilIcon } from 'assets/svg';

import BindToStep from 'components/BindToStep/BindToStep';
import ChargeManagement from './ChargeManagement/ChargeManagement';
import DateInput from 'theme/components/material/DateInput/DateInput';
import Dialog from 'theme/components/material/Dialog/Dialog';
import EditPayer from './EditPayer/EditPayer';
import IconButton from 'theme/components/material/IconButton/IconButton';
import React from 'react';
import Section from 'components/Section/Section';
import SelectInput from 'components/SelectInput/SelectInput';
import TextField from 'components/TextField/TextField';
import { getLink } from 'utils/functions';
import useAia from 'hooks/useAia';
import useResponse from 'hooks/useResponse';
import { useTranslation } from 'react-i18next';

const GeneralInfo = (props: { hRef: string }) => {
    const { hRef } = props;
    const [response] = useResponse(hRef);
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = React.useState(false);
    const [chargesVisible, setChargesVisible] = React.useState(false);
    const payerLink = response && getLink(response.data, 'premium:addressee_person');
    const payerOrgLink = response && getLink(response.data, 'premium:addressee_organization');

    const { patch } = useAia();

    const patchPayer = async (person: any = {}) => {
        await patch(hRef, { 'premium:addressee_person': person.href });
    }

    return <>{
        response &&
        <Section title="General Information" icon={<PaymentIcon />}>
            <div className="p-3 row">
                <div className="col-4 d-flex">
                    <div className="row">
                        <div className="col-9">
                            <TextField
                                hRef={hRef}
                                property="operation:amount"
                                immediatePatch={true}
                            />
                        </div>
                        <div className="col-3 pt-3 ml-3">
                            <IconButton color={'inherit'} onClick={() => setChargesVisible(true)} size={'small'}>
                                <HelpIcon size={24} />
                            </IconButton>
                        </div>
                        <Dialog
                            icon={<HelpIcon size={30} />}
                            title={t('common:charge_management')}
                            content={<ChargeManagement hRef={hRef} />}
                            onClose={() => setChargesVisible(false)}
                            open={chargesVisible}
                            fullWidth={true}
                        />
                    </div>
                </div>
                <div className="col-4">
                    <SelectInput
                        hRef={hRef}
                        property="operation:currency_code"
                    />
                </div>
                <div className="col-4">
                    <SelectInput
                        hRef={hRef}
                        property="operation:payment_source"
                    />
                </div>
                {payerLink && <div className="d-flex col-4 pt-3">
                    <BindToStep hRef={hRef} property={'premium:addressee_person'}>
                        <div className="row">
                            <div className="col-9">
                                <TextField
                                    hRef={payerLink}
                                    i18nOptions={{ context: 'payer' }}
                                    property="person:display_id1"
                                />
                            </div>
                            <div className="col-3 pt-3 ml-3 px-1">
                                <IconButton color={'inherit'} onClick={() => setIsVisible(true)} size={'small'}>
                                    <PencilIcon size={24} />
                                </IconButton>
                            </div>
                            <EditPayer
                                isVisible={isVisible}
                                setIsVisible={setIsVisible}
                                onChange={(person: any) => patchPayer(person)}
                            />
                        </div>
                    </BindToStep>
                </div>}
                {payerOrgLink && <div className="d-flex col-4 pt-3">
                    <BindToStep hRef={hRef} property={'premium:addressee_organization'}>
                        <div className="row">
                            <div className="col-9">
                                <TextField
                                    hRef={payerOrgLink}
                                    i18nOptions={{ context: 'payer' }}
                                    property="organization:display_id1"
                                />
                            </div>
                            <div className="col-3 pt-3 ml-3">
                                <IconButton color={'inherit'} onClick={() => setIsVisible(true)} size={'small'}>
                                    <PencilIcon size={24} />
                                </IconButton>
                            </div>
                            {/* To add organization search for payer as organization: IMC00000585 */}
                            <EditPayer
                                isVisible={isVisible}
                                setIsVisible={setIsVisible}
                                onChange={(person: any) => patchPayer(person)}
                            />
                        </div>
                    </BindToStep>
                </div>}
                <div className="col-4 pt-3">
                    <DateInput
                        hRef={hRef}
                        property="operation:signature_date"
                        immediatePatch={true}
                    />
                </div>
            </div>
        </Section>}
    </>
}
export default React.memo(GeneralInfo);
