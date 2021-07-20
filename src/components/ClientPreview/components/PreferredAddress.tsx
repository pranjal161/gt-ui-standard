import PanelSection, {PanelSectionItem} from 'components/PanelSection/PanelSection';
import ContentList from 'components/ContentList/ContentList';
import useResponse from 'hooks/useResponse';
import React from 'react';
import {useTranslation} from 'react-i18next';

const PreferredAddress = ({hRef}: any) => {
    const [response, loading] = useResponse(hRef)
    const {t} = useTranslation()
    const items: PanelSectionItem[] = [
        {hRef, id: 'postal_address:display_id', styleType: ['text'], response, loading}
    ]
    
    return <PanelSection title={t('common:preferredAddressLabel')}
        content={<ContentList items={items}/>}/>
}

export default React.memo(PreferredAddress)
