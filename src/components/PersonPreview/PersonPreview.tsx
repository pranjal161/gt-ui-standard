import PersonGeneralSection from 'components/PersonPreview/components/PersonGeneralSection';
import PreferredBankAccount from 'components/PersonPreview/components/PreferredBankAccount';
import React from 'react';
import useResponse from 'hooks/useResponse';

const PersonPreview = ({hRef}: any) => {
    const response = useResponse(hRef)
    const hRefBankAccount = response && response.data._links['person:preferred_bank_account'].href

    return (
        <>
            <PersonGeneralSection key={'general'} hRef={hRef}/>
            <PreferredBankAccount key={'preferred_bank'} hRef={hRefBankAccount}/>
        </>)
}

export default PersonPreview
