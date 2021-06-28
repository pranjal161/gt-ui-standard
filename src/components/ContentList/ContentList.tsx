import LabelInline from 'components/LabelInline/LabelInline';
import React from 'react';

const ContentList = ({ items, data }: any) => items.map(
    (item: any) => <LabelInline key={item.id}
        property={item.id}
        data={data}
        loading={!data}
        styleType={item.styleType}
    />)

export default ContentList;