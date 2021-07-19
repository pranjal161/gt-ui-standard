import PanelSection, {PanelSectionItem} from 'components/PanelSection/PanelSection';
import ContentList from 'components/ContentList/ContentList';
import useResponse from 'hooks/useResponse';
import React from 'react';
import {useTranslation} from 'react-i18next';

const GeneralInformation = ({hRef}: any) => {
    const [response, loading] = useResponse(hRef)
    const {t} = useTranslation()
    const items: PanelSectionItem[] = [
        {hRef, id: 'person:first_name', styleType: ['text'], response, loading},
        {hRef, id: 'person:last_name', styleType: ['text'], response, loading},
        {hRef, id: 'person:client_number', styleType: ['text'], response, loading},
        {hRef, id: 'person:birth_date', styleType: ['date'], response, loading},
        {hRef, id: 'person:age', styleType: ['age'], response, loading},
        {hRef, id: 'person:marital_status', styleType: ['text'], response, loading},
        {hRef, id: 'person:professional_status', styleType: ['text'], response, loading},
        {hRef, id: 'person_detail:country_code', styleType: ['text'], response, loading},
        {hRef, id: 'person:seniority__not_int_api', styleType: ['date'], response, loading},
        {hRef, id: 'person:sensitive_client', styleType: ['text'], response, loading},
        {hRef, id: 'person:status__not_int_api', styleType: ['text'], response, loading},
        {hRef, id: 'person:language', styleType: ['text'], response, loading},

    ]

    return <PanelSection title={t('common:personPreviewGeneralInformation')}
        content={<ContentList items={items}/>}/>
}

export default React.memo(GeneralInformation)
