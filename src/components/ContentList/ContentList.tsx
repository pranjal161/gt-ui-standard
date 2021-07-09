import LabelInline from 'components/LabelInline/LabelInline';
import React from 'react';

export interface ContentListProps {

    /**
     * property list to display
     */
    items: any[],

    /**
     * API response data
     */
    data: any,

    /**
     * Status of API data
     */
    loading: boolean,

    /**
     * onClick callback
     */

    onClick: any
}

const ContentList = ({items, onClick}: any) => items.map(
    (item: any) => <LabelInline key={item.id}
        property={item.id}
        hRef={item.hRef}
        styleType={item.styleType}
        onClick={() => onClick(item)}
    />)

export default ContentList;
