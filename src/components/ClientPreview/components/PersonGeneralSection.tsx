import PanelSection, {PanelSectionItem} from 'components/PanelSection/PanelSection';
import ContentList from 'components/ContentList/ContentList';
import useResponse from 'hooks/useResponse';
import React from 'react';

const PersonGeneralSection = ({hRef}: any) => {
    const [response, loading] = useResponse(hRef)
    const items: PanelSectionItem[] = [
        {hRef, id: 'person:gender', styleType: ['text'], response, loading},
        {hRef, id: 'person:first_name', styleType: ['text'], response, loading},
        {hRef, id: 'person:last_name', styleType: ['text'], response, loading},
        {hRef, id: 'person:birth_date', styleType: ['date'], response, loading},
        {hRef, id: 'person:age', styleType: ['age'], response, loading},
        {hRef, id: 'person:professional_status', styleType: ['text'], response, loading},
        {hRef, id: 'person:language', styleType: ['text'], response, loading},
    ]

    return <PanelSection title={'Detail'}
        content={<ContentList items={items}/>}/>
}

export default React.memo(PersonGeneralSection)
