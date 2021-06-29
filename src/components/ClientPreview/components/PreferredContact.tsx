import PanelSection, { PanelSectionItem } from 'components/PanelSection/PanelSection';

import ContentList from 'components/ContentList/ContentList';
import React from 'react';
import useResponse from 'hooks/useResponse';
import { useTranslation } from 'react-i18next';

const preferredPhone: PanelSectionItem[] = [
    { id: 'phone_address:phone_number', styleType: ['text'] }
]
const preferredEmail: PanelSectionItem[] = [
    { id: 'e_mail_address:text', styleType: ['text'] }
]
const PreferredContact = ({ emailHref, phoneHref }: any) => {
    const [emailResponse, loadingEmail] = useResponse(emailHref);
    const [phoneResponse, loading] = useResponse(phoneHref);
    const { t } = useTranslation()

    return <PanelSection title={t('common:preferredContactLabel')}
        content={<><ContentList items={preferredPhone} data={phoneResponse && phoneResponse.data} loading={loading} />
            <ContentList items={preferredEmail} data={emailResponse && emailResponse.data} loading={loadingEmail} /></>
        } />
}

export default React.memo(PreferredContact)
