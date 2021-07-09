import PanelSection, {PanelSectionItem} from 'components/PanelSection/PanelSection';

import ContentList from 'components/ContentList/ContentList';
import React from 'react';

const OrgGeneralSection = ({hRef}: any) => {

    const items: PanelSectionItem[] = [
        {hRef, id: 'organization:legal_name', styleType: ['text']},
        {hRef, id: 'organization:client_number', styleType: ['text']},
        {hRef, id: 'organization:language', styleType: ['text']}
    ]

    return <PanelSection title={'Detail'}
        content={<ContentList items={items} />}/>
}

export default React.memo(OrgGeneralSection)
