import React, { useEffect, useState } from 'react';

import { DxcTable } from '@dxc-technology/halstack-react';
import IconButton from 'theme/components/material/IconButton/IconButton';
import Paginator from 'components/Paginator/Paginator';
import { StyledHoverRow } from 'styles/global-style';
import { getDescriptionValue } from 'utils/functions';
import useAia from 'hooks/useAia';
import { useTranslation } from 'react-i18next';

interface TableProps {
    url: string,
    columnId: Array<any>
    showPaginator: Boolean
}

const Table = (props: TableProps) => {
    const [tableData, setTableData] = useState<undefined | any>();
    const { t } = useTranslation();
    const [totalItems, changeTotalItems] = useState(0);
    const { fetch } = useAia();

    useEffect(() => {
        getData(props.url);
    }, [props.url]);

    const getData = (link: string) => {
        fetch(link).then((response: any) => {
            if (response && response.data['_links']['item']) {
                let result = JSON.parse(JSON.stringify(response));
                if (!Array.isArray(result.data['_links']['item'])) {
                    result.data['_links']['item'] = [result.data['_links']['item']];
                }
                const count = response && response.data && response.data._count;
                setTableData(result.data);
                changeTotalItems(count === '500+' ? 500 : count);
                // setshowPaginator(props.showPaginator);
            }
            else {
                setTableData({});
            }
        });
    };

    const TableCell = (props: { key: any; row?: any; column?: any; }) => {

        const { key, row, column } = props;
        if (column.label === '_ACTIONS') {
            return (
                <td key={key}>
                    <div className="d-inline-flex">
                        {column.actions.map((action: { method: any; icon: any }, index: number) => (
                            <span key={index}>
                                <IconButton color={'primary'}
                                    onClick={() => action.method(row)}>
                                    {action.icon}
                                </IconButton>
                            </span>
                        ))}
                    </div>
                </td>
            )
        }
        else if (typeof column.property === 'object') {
            return (
                <td key={key}>
                    {column.property.map((id: string) => row['summary'][id])}
                </td>
            )
        }
        else {
            return (
                <td key={key}>
                    {getDescriptionValue(
                        row['summary'][column.property],
                        column.property,
                        tableData,
                        column.type,
                    )}
                </td>
            )
        }

        return null;
    }

    return (
        <>
            {tableData && tableData._links && tableData._links.item && tableData._links.item.length > 0 ? (
                <>
                    <DxcTable>
                        <thead>
                            <tr>
                                {props.columnId.map((columnItem, index) => (
                                    <th key={columnItem.label + index}>{t(columnItem['label'])}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {tableData._links.item.map((row: any, index: number) => (
                                <StyledHoverRow key={'tr' + index}>
                                    {props.columnId.map((columnItem) => (
                                        <TableCell row={row} column={columnItem} key={'tr' + columnItem.label + index} />
                                    ))}
                                </StyledHoverRow>
                            ))}
                        </tbody>
                    </DxcTable>
                    {props.showPaginator && (
                        <Paginator totalItems={totalItems} itemsPerPage={5} data={tableData} handler={getData} />
                    )}
                    {/* {totalItems && (
                        <Paginator totalItems={totalItems} itemsPerPage={5} data={tableData} handler={getData} />
                    )} */}
                </>
            ) : (
                <DxcTable>
                    <tr>
                        {props.columnId.map((columnItem) => (
                            <th key={columnItem['label']}>
                                {t(columnItem['label'])}
                            </th>
                        ))}
                    </tr>
                    <tr>
                        <td colSpan={12}>{t('_NO_RECORDS_FOUND')}</td>
                    </tr>
                </DxcTable>
            )}
        </>
    );
};
export default Table;
