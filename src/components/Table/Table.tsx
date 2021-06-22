import React, { useEffect, useState } from 'react';

import { DxcTable } from '@dxc-technology/halstack-react';
import IconButton from 'theme/components/material/IconButton/IconButton';
import Paginator from 'components/Paginator/Paginator';
import { debounce } from '@material-ui/core/utils';
import { getDescriptionValue } from 'utils/functions';
import { globalTokens } from 'theme/standard/palette';
import makeStyles from '@material-ui/core/styles/makeStyles';
import useAia from 'hooks/useAia';
import { useTranslation } from 'react-i18next';

export type Column = {
    label: string,
    actions?: Array<any>,
    property?: Array<any> | string,
    type?: any
}

type SelectedRow = {
    index: number,
    person: any
}

interface TableProps {

    /**
     * Url to fetch
     */
    url: string,

    /**
     * Objects array which contains each 
     */
    columnId: Array<Column>
    showPaginator: Boolean,
    onRowSelected?: Function,
    itemsByPage?: number,
}

interface TableCellProps {
    tableData: any,
    rowKey?: any,
    row?: any,
    column: Column
}

const TableCell = ({ tableData, rowKey, row, column }: TableCellProps) => {

    if (column.label === '_ACTIONS') {
        return (
            <td key={rowKey}>
                <div className="d-inline-flex">
                    {
                        column.actions && column.actions.map((action: { method: any; icon: any }, index: number) => (
                            <span key={index}>
                                <IconButton color={'primary'}
                                    onClick={() => action.method(row)}>
                                    {action.icon}
                                </IconButton>
                            </span>
                        ))
                    }
                </div>
            </td>
        )
    }
    else if (typeof column.property === 'object') {
        return (
            <td key={rowKey}>
                {column.property.map((id: string) => row['summary'][id])}
            </td>
        )
    }
    else {
        return (
            <td key={rowKey}>
                {
                    getDescriptionValue(
                        row['summary'][column.property && column.label !== '_ACTIONS' ? column.property : ''],
                        column.property ? column?.property : '',
                        tableData,
                        column.type)
                }
            </td>
        )
    }
}

const Table = ({url, columnId, showPaginator, onRowSelected, itemsByPage = 0}: TableProps) => {
    const classes = useStyles();

    const [tableData, setTableData] = useState<undefined | any>();
    const { t } = useTranslation();
    const [totalItems, setTotalItems] = useState(0);
    const { fetch } = useAia();
    const [selectedRow, setSelectedRow] = React.useState<any>({});

    const debouncedCallAPI = React.useCallback(
        debounce((apiURL: any) => getData(apiURL), 3000),
        []
    );

    useEffect(() => {
        debouncedCallAPI(url);
        console.log({url});
    }, [url]);

    const getData = (link: string) => {
        if (link.includes('_num')) {
            link = link.slice(0, link.search('&_num') + 1);
        }

        console.log({link});

        fetch(showPaginator && itemsByPage > 0 ? `${link}&_num=${itemsByPage}` : link).then((response: any) => {
            console.log({response});
            if (response && response.data['_links']['item']) {
                let result = JSON.parse(JSON.stringify(response));
                if (!Array.isArray(result.data['_links']['item'])) {
                    result.data['_links']['item'] = [result.data['_links']['item']];
                }
                const count = response?.data?._count;
                setTableData(result.data);
                setTotalItems(count === '500+' ? 500 : count);
                // setshowPaginator(props.showPaginator);
            }
            else {
                setTableData({});
            }
        });
    };
    
    const selectValue = (row: SelectedRow) => {
        if (onRowSelected !== undefined) {
            setSelectedRow(row);
            onRowSelected(row.person);
        }
    }

    return (
        <>
            {
                tableData && tableData._links && tableData._links.item && tableData._links.item.length > 0 ? (
                    <>
                        <DxcTable>
                            <thead>
                                <tr>
                                    {
                                        columnId.map((columnItem, index) => (
                                            <th key={columnItem.label + index}>{t(columnItem['label'])}</th>
                                        ))
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    tableData._links.item.map((row: any, index: number) => (
                                        <tr className={`${onRowSelected && index === selectedRow.index ? classes.selectedRow : ''} ${classes.row}`}
                                            key={'tr' + index}
                                            onClick={() => selectValue({index, person: row})}>
                                            {
                                                columnId.map((columnItem) => (
                                                    <TableCell tableData={tableData} row={row} column={columnItem} key={'tr' + columnItem.label + index} />
                                                ))
                                            }
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </DxcTable>
                        {
                            showPaginator && totalItems > 0 && (
                                <Paginator totalItems={totalItems} itemsPerPage={itemsByPage} data={tableData} handler={getData} />
                            )
                        }

                        {/* {totalItems && (
                            <Paginator totalItems={totalItems} itemsPerPage={5} data={tableData} handler={getData} />
                        )} */}
                    </>
                ) : (
                    <DxcTable>
                        <thead>
                            <tr>
                                {
                                    columnId.map((columnItem) => (
                                        <th key={columnItem['label']}>
                                            {t(columnItem['label'])}
                                        </th>
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={12}>{t('_NO_RECORDS_FOUND')}</td>
                            </tr>
                        </tbody>
                    </DxcTable>
                )
            }
        </>
    );
};

const useStyles = makeStyles({
    row: {
        '&:hover': {
            backgroundColor: '#F7F7F7',
            cursor: 'pointer',
        }
    },

    selectedRow: {
        backgroundColor: `${globalTokens.__grey_6} !important`,
    }
})

export default Table;
