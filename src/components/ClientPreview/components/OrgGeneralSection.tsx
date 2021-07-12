import PanelSection, {PanelSectionItem} from 'components/PanelSection/PanelSection';

import ContentList from 'components/ContentList/ContentList';
import useResponse from 'hooks/useResponse';
import React from 'react';

const OrgGeneralSection = ({hRef}: any) => {
    const [response, loading] = useResponse(hRef)

    const items: PanelSectionItem[] = [
        {hRef, id: 'organization:legal_name', styleType: ['text'], response, loading},
        {hRef, id: 'organization:client_number', styleType: ['text'], response, loading},
        {hRef, id: 'organization:language', styleType: ['text'], response, loading}
    ]

    return <PanelSection title={'Detail'}
        content={<ContentList items={items} />}/>
}

export default React.memo(OrgGeneralSection)
