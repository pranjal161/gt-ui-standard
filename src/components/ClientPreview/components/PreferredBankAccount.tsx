import PanelSection, {PanelSectionItem} from 'components/PanelSection/PanelSection';
import ContentList from 'components/ContentList/ContentList';
import React from 'react';
import useResponse from 'hooks/useResponse';
import {useTranslation} from 'react-i18next';

const preferredBankAccount: PanelSectionItem[] = [
    {id: 'bank_account:account_details', styleType: ['text']},
    {id: 'bank_account:account_holder_name', styleType: ['text']},
    {id: 'bank_account:i_b_a_n', styleType: ['text']},
]
const PreferredBankAccount = ({hRef}: any) => {
    const [response, loading] = useResponse(hRef)
    const {t} = useTranslation()

    return <PanelSection title={t('common:preferredBankAccountLabel')}
        content={<ContentList items={preferredBankAccount} data={response && response.data} loading={loading}/>}/>
}

export default React.memo(PreferredBankAccount)
