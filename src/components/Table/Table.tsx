/* eslint-disable @typescript-eslint/no-unused-vars */

import { ArrowDropDownIcon, ArrowDropUpIcon } from 'assets/svg';

import { DxcTable } from '@dxc-technology/halstack-react';
import IconButton from 'theme/components/material/IconButton/IconButton';
import Paginator from 'components/Paginator/Paginator';
import React from 'react';
import { getDescriptionValue } from 'utils/functions';
import { globalTokens } from 'theme/standard/palette';
import makeStyles from '@material-ui/core/styles/makeStyles';
import useResponse from 'hooks/useResponse';
import { useTranslation } from 'react-i18next';

export type Column = {

    /**
     * Name displayed in the <th></th> html element
     */
    label: string,

    /**
     * Array of icon & their callback for each row
     */
    actions?: Array<any>,

    /**
     * API Object property to display in the TableCell.
     */
    property?: Array<any> | string,

    /**
     * Data type.
     */
    type?: any
}

type SelectedRow = {
    index: number,
    person: any
}

export interface TableProps {

    /**
     * Url to fetch
     */
    url: string,

    /**
     * Objects array which contains each Column properties.
     */
    columnId: Array<Column>

    /**
     * State to define if the paginator has to be displayed or not
     */
    showPaginator?: Boolean,

    /**
     * Callback to receive and manipulate a selected row out of the component.
     */
    onRowSelected?: Function,

    /**
     * Number of row to display : 1 to 20.
     * If not provided, 20 items will be displayed.
     */
    itemsByPage?: number,
}

interface TableCellProps {

    /**
     * API Response.
     */
    tableData: any,

    /**
     * Row key from outside map function.
     */
    rowKey?: any,

    /**
     * Row object from outside map function.
     */
    row?: any,

    /**
     * Column object from column array feed to parent.
     */
    column: Column
}

interface SortingObjProps {
    property: string,
    orientation: string
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
                {column.property.map((id: string) => row['summary'][id] && row['summary'][id] +' ')}
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

const Table = ({url, columnId, showPaginator = false, onRowSelected, itemsByPage = 0}: TableProps) => {
    const classes = useStyles();

    const [hRef, setHRef]:[any, any] = React.useState()
    const [hoveredColumn, setHoveredColumn] = React.useState<string>('');
    const [sortingObj, setSortingObj] = React.useState<SortingObjProps>({property: '', orientation: 'ASC'});
    const [tableData, setTableData] = React.useState<undefined | any>();
    const { t } = useTranslation();
    const [totalItems, setTotalItems] = React.useState(0);
    const [selectedRow, setSelectedRow] = React.useState<any>({});
    const [response] = useResponse(hRef)

    React.useEffect(() => {
        setHRef(url);
    }, [url])

    React.useEffect(() => {

        if (response && response.data['_links']['item']) {
            let result = JSON.parse(JSON.stringify(response));
            if (!Array.isArray(result.data['_links']['item'])) {
                result.data['_links']['item'] = [result.data['_links']['item']];
            }
            const count = response?.data?._count;
            setTableData(result.data);
            setTotalItems(count === '500+' ? 500 : count);
        }
        else {
            setTableData({});
        }

    }, [response])

    const sortData = React.useCallback((data: any, sortObj: SortingObjProps) => {
        const obj = data;
        const sortedData = obj._links.item.sort((a: any, b: any) => {
            if (sortObj.orientation === 'ASC') {
                if (a.summary[sortObj.property] < b.summary[sortObj.property]) {
                    return -1;
                } if (b.summary[sortObj.property] < a.summary[sortObj.property]) {
                    return 1;
                }
            }
            else if (sortObj.orientation === 'DESC') {
                if (b.summary[sortObj.property] < a.summary[sortObj.property]) {
                    return -1;
                } if (a.summary[sortObj.property] < b.summary[sortObj.property]) {
                    return 1;
                }
            }
            
            return 0;
        });
        obj._links.item = sortedData;
        setTableData(obj);
    }, [sortingObj])

    React.useEffect(() => {
        if (tableData && tableData._links && tableData._links.item && tableData._links.item.length > 0 && (sortingObj.property !== '' || sortingObj.property !== undefined)) {
            sortData({...tableData}, sortingObj);
        }
    }, [sortingObj])

    const onPagination = (link: string) => {
        if (link.includes('_num=')) {
            link = link.slice(0, link.search('_num=') - 1);
        }

        const arrSubstr = link.split('/');

        if (arrSubstr[arrSubstr.length - 1].includes('?') || arrSubstr[arrSubstr.length - 1].includes('&')) {
            link += '&';
        }
        else {
            link += '?';
        }
        const newHRef = showPaginator && itemsByPage > 0 ? `${link}&_num=${itemsByPage}` : link
        setHRef(newHRef)
    }

    const selectValue = (row: SelectedRow) => {
        if (onRowSelected !== undefined) {
            setSelectedRow(row);
            onRowSelected(row.person);
        }
    }

    const setProperty = (val: any) => {
        let orientation = '';
        if (sortingObj.property !== val || sortingObj.orientation === 'DESC') {
            orientation = 'ASC';
        }
        else if (sortingObj.property === val || sortingObj.orientation === 'ASC') {
            orientation = 'DESC';
        }

        setSortingObj(typeof val === 'string' ? {property: val, orientation} : {property: '', orientation: 'ASC'});
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
                                            <th className={classes.columnHeader}
                                                onMouseEnter={() => setHoveredColumn(typeof columnItem.property === 'string' ? columnItem.property : '')}
                                                onClick={() => setProperty(columnItem.property)}
                                                key={columnItem.label + index}>

                                                <span className={classes.headerLabel}>
                                                    {t(columnItem['label'])}

                                                    <div className={hoveredColumn !== columnItem.property ? classes.notFocusedSort : ''}>
                                                        {
                                                            columnItem.label !== '_ACTIONS' && typeof columnItem.property === 'string' && (
                                                                <>
                                                                    {
                                                                        sortingObj.property !== columnItem.property && <ArrowDropUpIcon />
                                                                    }
                                                                    {
                                                                        sortingObj.orientation === 'ASC' && sortingObj.property === columnItem.property && <ArrowDropUpIcon />
                                                                    }
                                                                    {
                                                                        sortingObj.orientation === 'DESC' && columnItem.property === sortingObj.property && <ArrowDropDownIcon />
                                                                    }
                                                                </>
                                                            )
                                                        }
                                                    </div>
                                                    
                                                </span>
                                            </th>
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
                                <Paginator totalItems={totalItems} itemsPerPage={itemsByPage} data={tableData} handler={onPagination} />
                            )
                        }
                    </>
                ) : (
                    <DxcTable>
                        <thead>
                            <tr>
                                {
                                    columnId.map((columnItem) => (
                                        <th className={classes.columnHeader} key={columnItem['label']}>
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

    columnHeader: {
        backgroundColor: `${globalTokens.__grey_5} !important`,
        color: `${globalTokens.__grey_2} !important`,
        cursor: 'pointer !important'
    },

    selectedRow: {
        backgroundColor: `${globalTokens.__grey_6} !important`,
    },

    headerLabel: {
        display: 'flex',
        flexDirection: 'row',
    },

    notFocusedSort: {
        opacity: 0.5
    }
})

export default Table;
