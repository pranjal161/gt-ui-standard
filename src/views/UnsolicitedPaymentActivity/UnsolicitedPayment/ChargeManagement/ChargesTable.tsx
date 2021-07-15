import ComplexTable from 'components/ComplexTable/ComplexTable';
import React from 'react';

const ChargesTable = (props: { poolhRef: string, data: any }) => {
    const { poolhRef } = props;
    const headers = [
        { title: 'Definition' },
        { title: 'Level' },
        { title: 'Threshold' },
        { title: 'Value' }
    ];
    const columns = [
        { valueKey: 'fees_override:administrator_type', list: true },
        { valueKey: 'fees_override:authorization_level', list: true },
        { valueKey: 'fees_override:minimum_rate', list: true, format: 'percent' },
        { valueKey: 'fees_override:rate', list: true, format: 'percent' }
    ];
    const rowExtraData = { hRefKey: 'product_component', list: 'fees_override_list' };
    const tableData = props.data['fees_override_list'].filter((item: any) => item['product_component'] === poolhRef);
    const tableResponse = {...props.data, fees_override_list: tableData }

    return (
        <>
            <ComplexTable
                columns={columns}
                rowExtraData={rowExtraData}
                headers={headers}
                data={tableResponse} />

        </>
    )
}

export default ChargesTable;