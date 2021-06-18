import React, { useEffect, useState } from 'react';

import { DxcTable } from '@dxc-technology/halstack-react';
import IconButton from 'theme/components/material/IconButton/IconButton';
import Paginator from 'components/Paginator/Paginator';
import { StyledHoverRow } from 'styles/global-style';
import { getDescriptionValue } from 'utils/functions';
import { globalTokens } from 'theme/standard/palette';
import makeStyles from '@material-ui/core/styles/makeStyles';
import useAia from 'hooks/useAia';
import { useTranslation } from 'react-i18next';

type Action = {
    icon: any
    method: Function,
}

type Column = {
    label: string,
    actions?: Array<Action>,
    property: Array<any>,
    type?: any
}

type SelectedRow = {
    index: number,
    person: any
}

interface TableProps {
    url: string,
    columnId: Array<any>
    showPaginator: Boolean,
    onChange?: Function,
    itemsByPage?: number
}

interface TableCellProps {
    rowKey?: any,
    row?: any,
    column: Column
}

const Table = ({ url, columnId, showPaginator, onChange, itemsByPage = 5 }: TableProps) => {
    const classes = useStyles();

    const [tableData, setTableData] = useState<undefined | any>();
    const { t } = useTranslation();
    const [totalItems, setTotalItems] = useState(0);
    const { fetch } = useAia();
    const [selectedRow, setSelectedRow] = React.useState<any>({});
    const [isSearching, setIsSearching] = React.useState<boolean>(false);

    useEffect(() => {
        (async () => {
            console.log({url});
            await getData(url);
        })();
    }, [url]);

    const getData = (link: string) => {
        setIsSearching(true);
        fetch(`${link}&_num=${itemsByPage}`).then((response: any) => {
            if (response && response.data['_links']['item']) {
                let result = JSON.parse(JSON.stringify(response));
                if (!Array.isArray(result.data['_links']['item'])) {
                    result.data['_links']['item'] = [result.data['_links']['item']];
                }
                const count = response?.data?._count;
                console.log({response})
                console.log({count})
                setTableData(result.data);
                // changeTotalItems(count === '500+' ? 500 : count);
                setTotalItems(count === '500+' ? 500 : count);
                // setshowPaginator(props.showPaginator);
            }
            else {
                setTableData({});
            }
            setIsSearching(false);
        });
    };
    
    const selectValue = (row: SelectedRow) => {
        if (onChange !== undefined) {
            console.log({row});
            setSelectedRow(row);
            onChange(row.person);
        }
    }

    const TableCell = ({ rowKey, row, column }: TableCellProps) => {

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
                            row['summary'][column?.property],
                            column?.property,
                            tableData,
                            column.type)
                    }
                </td>
            )
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
                                    isSearching &&
                                        <tr>
                                            <td colSpan={12}>{t('_SEARCH_IN_PROGRESS')}</td>
                                        </tr>
                                }
                                {
                                    !isSearching && tableData._links.item.map((row: any, index: number) => (
                                        <StyledHoverRow className={index === selectedRow.index ? classes.selectedRow : ''} key={'tr' + index} onClick={() => selectValue({index, person: row})}>
                                            {
                                                columnId.map((columnItem) => (
                                                    <TableCell row={row} column={columnItem} key={'tr' + columnItem.label + index} />
                                                ))
                                            }
                                        </StyledHoverRow>
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
    selectedRow: {
        '& > tr': {
            backgroundColor: globalTokens.__grey_5,
        }
    }
})

export default Table;
