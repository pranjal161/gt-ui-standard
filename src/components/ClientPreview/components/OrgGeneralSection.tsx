import PanelSection, {PanelSectionItem} from 'components/PanelSection/PanelSection';

import ContentList from 'components/ContentList/ContentList';
import React from 'react';
import useResponse from 'hooks/useResponse';

const OrgGeneralItems: PanelSectionItem[] = [
    {id: 'organization:legal_name', styleType: ['text']},
    {id: 'organization:client_number', styleType: ['text']},
    {id: 'organization:language', styleType: ['text']}
]

const OrgGeneralSection = ({hRef}: any) => {
    const [response, loading] = useResponse(hRef)

    return <PanelSection title={'Detail'}
        content={<ContentList items={OrgGeneralItems} data={response && response.data} loading={loading}/>}/>
}

export default React.memo(OrgGeneralSection)
