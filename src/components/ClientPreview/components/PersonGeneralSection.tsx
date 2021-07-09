import PanelSection, {PanelSectionItem} from 'components/PanelSection/PanelSection';
import ContentList from 'components/ContentList/ContentList';
import React from 'react';

const PersonGeneralSection = ({hRef}: any) => {
    const items: PanelSectionItem[] = [
        {hRef, id: 'person:gender', styleType: ['text']},
        {hRef, id: 'person:first_name', styleType: ['text']},
        {hRef, id: 'person:last_name', styleType: ['text']},
        {hRef, id: 'person:birth_date', styleType: ['date']},
        {hRef, id: 'person:age', styleType: ['number']},
        {hRef, id: 'person:professional_status', styleType: ['text']},
        {hRef, id: 'person:language', styleType: ['text']},
    ]

    return <PanelSection title={'Detail'}
        content={<ContentList items={items}/>}/>
}

export default React.memo(PersonGeneralSection)
