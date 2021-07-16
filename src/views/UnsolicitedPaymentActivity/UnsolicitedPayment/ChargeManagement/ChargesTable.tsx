import ComplexTable from 'components/ComplexTable/ComplexTable';
import React from 'react';
import Typo from 'components/Typography/Typo';
import { formatValue } from 'utils/functions';

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
    const tableResponse = { ...props.data, fees_override_list: tableData };
    let total = 0;
    tableData && tableData.forEach((data: { [x: string]: number; }) => {
        total = total + data['fees_override:rate'];
    });

    return (
        <>
            <ComplexTable
                columns={columns}
                rowExtraData={rowExtraData}
                headers={headers}
                data={tableResponse}
                extraRow={<tr>
                    <td><Typo value="Total" variant={'secondaryBody'} /></td>
                    <td></td><td></td>
                    <td><Typo value={formatValue(total, 'percent')} variant={'secondaryBody'} /></td>
                </tr>} />
        </>
    )
}

export default ChargesTable;