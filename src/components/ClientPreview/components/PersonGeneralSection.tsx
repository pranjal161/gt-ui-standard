import PanelSection, {PanelSectionItem} from 'components/PanelSection/PanelSection';
import ContentList from 'components/ContentList/ContentList';
import React from 'react';
import useResponse from 'hooks/useResponse';

const personGeneralItems: PanelSectionItem[] = [
    {id: 'person:gender', styleType: ['text']},
    {id: 'person:first_name', styleType: ['text']},
    {id: 'person:last_name', styleType: ['text']},
    {id: 'person:birth_date', styleType: ['date']},
    {id: 'person:age', styleType: ['number']},
    {id: 'person:professional_status', styleType: ['text']},
    {id: 'person:language', styleType: ['text']},
]

const PersonGeneralSection = ({hRef}: any) => {
    const [response, loading] = useResponse(hRef)

    return <PanelSection title={'Detail'}
        content={<ContentList items={personGeneralItems} data={response && response.data} loading={loading}/>}/>
}

export default React.memo(PersonGeneralSection)
