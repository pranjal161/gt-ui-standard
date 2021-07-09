import PanelSection, {PanelSectionItem} from 'components/PanelSection/PanelSection';
import ContentList from 'components/ContentList/ContentList';
import React from 'react';
import {useTranslation} from 'react-i18next';

const PreferredBankAccount = ({hRef}: any) => {
    const {t} = useTranslation()

    const items: PanelSectionItem[] = [
        {hRef, id: 'bank_account:account_details', styleType: ['text']},
        {hRef, id: 'bank_account:account_holder_name', styleType: ['text']},
        {hRef, id: 'bank_account:i_b_a_n', styleType: ['text']},
    ]

    return <PanelSection title={t('common:preferredBankAccountLabel')}
        content={<ContentList items={items} />}/>
}

export default React.memo(PreferredBankAccount)

