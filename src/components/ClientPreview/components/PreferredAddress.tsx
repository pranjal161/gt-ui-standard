import PanelSection, {PanelSectionItem} from 'components/PanelSection/PanelSection';

import ContentList from 'components/ContentList/ContentList';
import React from 'react';
import useResponse from 'hooks/useResponse';
import {useTranslation} from 'react-i18next';

const preferredAddress: PanelSectionItem[] = [
    {id: 'postal_address:display_id', styleType: ['text']}
]
const PreferredAddress = ({hRef}: any) => {
    const [response, loading] = useResponse(hRef)
    const {t} = useTranslation()

    return <PanelSection title={t('common:preferredAddressLabel')}
        content={<ContentList items={preferredAddress} data={response && response.data} loading={loading}/>}/>
}

export default React.memo(PreferredAddress)
