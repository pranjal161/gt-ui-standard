import PanelSection, { PanelSectionItem } from 'components/PanelSection/PanelSection';
import ContentList from 'components/ContentList/ContentList';
import React from 'react';
import { useTranslation } from 'react-i18next';

const PreferredContact = ({ emailHref, phoneHref }: any) => {
    const {t} = useTranslation()
    const preferredPhone: PanelSectionItem[] = [
        { hRef:phoneHref, id: 'phone_address:phone_number', styleType: ['text'] }
    ]
    const preferredEmail: PanelSectionItem[] = [
        { hRef:emailHref, id: 'e_mail_address:text', styleType: ['text'] }
    ]

    return <PanelSection title={t('common:preferredContactLabel')}
        content={<><ContentList items={preferredPhone} />
            <ContentList items={preferredEmail} /></>
        } />
}

export default React.memo(PreferredContact)
