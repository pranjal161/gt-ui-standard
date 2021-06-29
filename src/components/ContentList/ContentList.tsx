import LabelInline from 'components/LabelInline/LabelInline';
import React from 'react';

const ContentList = ({ items, data, loading }: any) => items.map(
    (item: any) => <LabelInline key={item.id}
        property={item.id}
        data={data}
        loading={loading}
        styleType={item.styleType}
    />)

export default ContentList;
