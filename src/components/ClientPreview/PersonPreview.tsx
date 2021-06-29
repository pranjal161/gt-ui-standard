import PersonGeneralSection from './components/PersonGeneralSection';
import PreferredAddress from './components/PreferredAddress';
import PreferredBankAccount from './components/PreferredBankAccount';
import PreferredContact from './components/PreferredContact';
import React from 'react';
import { getLink } from 'utils/functions';
import useResponse from 'hooks/useResponse';

const PersonPreview = ({hRef}: any) => {
    const [response] = useResponse(hRef)
    const hRefBankAccount = response && getLink(response.data, 'person:preferred_bank_account');
    const addressHref = response && getLink(response.data, 'person:preferred_postal_address');
    const phoneHref = response && getLink(response.data, 'person:preferred_telecom_address');
    const emailHref = response && getLink(response.data, 'person:preferred_electronic_address');

    return (
        <>
            <PersonGeneralSection key={'general'} hRef={hRef}/>
            <PreferredAddress key={'preferred_address'} hRef={addressHref}/>
            {phoneHref || emailHref && <PreferredContact key={'preferred_phone'} phoneHref={phoneHref} emailHref={emailHref}/>}
            {hRefBankAccount && <PreferredBankAccount key={'preferred_bank'} hRef={hRefBankAccount}/>}
        </>)
}

export default PersonPreview
