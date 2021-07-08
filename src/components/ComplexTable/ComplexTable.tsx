import { DxcCheckbox, DxcRadio, DxcTable } from '@dxc-technology/halstack-react';

import Paginator from 'components/Paginator/Paginator';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useResponse from 'hooks/useResponse';
import { useTranslation } from 'react-i18next';

export interface ComplexTableHeaderProps {
    title: string
}

export interface ComplexTableColumnItemProps {
    component?: any,
    valueKey: any,
    list?: boolean,
    hRefKey?: boolean
}

export interface ComplexTableRowItemProps {
    hRefKey: string,
    list?: string
}

export interface ComplexTableProps {
    headers: Array<ComplexTableHeaderProps>,
    columns: Array<ComplexTableColumnItemProps>,
    rowExtraData?: ComplexTableRowItemProps,
    hRef?: string,
    data?: any,
    selectionMode?: 'one' | 'multiple' | 'none',
    onSelectionSubmit?: Function,
    disabledRow?: Function,
    itemsPerPage?: number
}

const useStyles = makeStyles((theme) => ({
    tableCover: {
        width: '100%',
        '& table thead tr th': {
            backgroundColor: theme.palette.project.table.header.background,
            color: theme.palette.project.table.header.fontColor,
            padding: theme.spacing(2, 2)
        },
        '& tbody tr': {
            '&:hover': {
                backgroundColor: '#F7F7F7'
            },
            '&.selected': {
                backgroundColor: '#F2F5F7'
            },
            '& td': {
                padding: theme.spacing(1, 2),
                fontSize: '0.875rem',
                '& span':
                {
                    margin: '0 5px 0 0',
                    '& > span': {
                        padding: '0 !important'
                    }
                }
            }
        }
    },
    disabled: {
        '& td': {
            opacity: 0.5,
            cursorPointer: 'default',
            pointerEvents: 'none'
        }
    },
    loading: {
        animation: '$glow 1.5s ease-in-out infinite',
        borderTop: '1px solid #f0f9fb',
        background: '#eee',
        height: '21px',
        color: 'transparent',
        cursor: 'progress',
        display: 'inline-block',
        width: '100%'
    },
    '@keyframes glow': {
        '0%': {},
        '100%': {
            opacity: 1
        },
        '50%': {
            opacity: 0.5
        }
    },
}));

const SelectionOption = React.memo((props: { selectionMode: any, value: any, onClick: Function }) => (
    <>
        {props.selectionMode === 'one' &&
            <DxcRadio
                checked={props.value}
                onClick={props.onClick}
                margin="xxsmall"
            />
        }
        {props.selectionMode === 'multiple' &&
            <DxcCheckbox
                checked={props.value}
                margin="xxsmall"
                onChange={props.onClick}
            />
        }
    </>
))
SelectionOption.displayName = 'SelectionOption'

const ComplexTableRow = React.memo((props: { columns: Array<ComplexTableColumnItemProps>, row: any, rowExtraData: any, selectionMode: any, onClick: Function, selected: Boolean, data: any }) => {
    const hRef = props.rowExtraData.hRefKey && props.row[props.rowExtraData.hRefKey]
    const [rowResponse, loading] = useResponse(hRef);
    // const response = hRef ? rowResponse : props.row
    const classes: any = useStyles();

    const SelectionColumn = ({ value }: any) => <SelectionOption selectionMode={props.selectionMode} value={value}
        onClick={props.onClick} />

    return (
        <>
            <tr className={`${props.selected && 'selected'}`}>
                {loading ?
                    <td colSpan={props.columns.length}>
                        <div className={classes.loading}></div>
                    </td> :
                    <>{props.columns && props.columns.map((column: ComplexTableColumnItemProps, index: number) => {
                        const ColumnComponent = column.component;
                        const columnResponse = column.list ? { ...props.row, listName: props.rowExtraData.list } : column.hRefKey ? rowResponse : props.data;
                        const cellValue = ColumnComponent ?
                            <ColumnComponent
                                key={index}
                                property={column.valueKey}
                                response={props.data}
                                list={columnResponse}
                                icon={false} /> :
                            column.list ? columnResponse[column.valueKey] :
                                columnResponse.data[column.valueKey]
                        
                        return (
                            <td key={index}>
                                <div className="d-flex align-items-center">
                                    {index === 0 && <SelectionColumn value={props.selected} />}
                                    {cellValue}
                                </div>
                            </td>
                        )
                    })}</>}
            </tr>
        </>
    );
})
ComplexTableRow.displayName = 'ComplexTableRow'

/**
 * Display a Complex Table with Selection or Update option
 * @param {props} props Contains information related to the ComplexTableProps
 * @returns {*} Return the ComplexTable
 */
const ComplexTable = (props: ComplexTableProps) => {
    //Todo : rename to : {headers, columns, rowHRefKey, data, itemsPerPage}
    const { headers, columns, data, selectionMode = 'none', itemsPerPage = 10, rowExtraData = { hRefKey: undefined, list: undefined } } = props;
    const dataList = data && rowExtraData.list && data[rowExtraData.list] ? data[rowExtraData.list] : data;

    const classes: any = useStyles();
    const { t } = useTranslation();

    const [totalItems, setTotalItems] = React.useState(0);

    const getData = (href: string) => {
        console.log('href-->', href);
    }

    const [selectedRows, setSelectedRows] = React.useState<Array<any> | any>({});

    const onRadioClick = (id: any, row: any) => {
        setSelectedRows({ [id]: row });
    };

    const onCheckboxClick = (id: any, row: any) => {
        if (selectedRows[id]) {
            // eslint-disable-next-line no-unused-vars
            const { [id]: selectionToRemove, ...newSelectedRows } = selectedRows
            setSelectedRows(newSelectedRows)
        }
        else
            setSelectedRows({ ...selectedRows, [id]: row })
    };

    const handleOnRowClick = (id: any, row: any) => {
        if (selectionMode === 'one')
            onRadioClick(id, row)
        if (selectionMode === 'multiple')
            onCheckboxClick(id, row)
    }

    React.useEffect(() => {
        if (data) {
            setTotalItems(data.length);
        }
    }, [data])

    return (
        <div className={classes.tableCover}>
            <DxcTable>
                <thead>
                    <tr>
                        {headers && headers.map((items: ComplexTableHeaderProps, index: number) => <th
                            key={index}>{items.title}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {dataList && dataList.length > 0 ? <>
                        {dataList.map((row: any, index: number) => {
                            const isSelected = selectedRows[index]

                            return (
                                <ComplexTableRow
                                    key={index}
                                    selected={isSelected}
                                    rowExtraData={rowExtraData}
                                    row={row}
                                    data={data}
                                    columns={columns}
                                    selectionMode={selectionMode}
                                    onClick={() => handleOnRowClick(index, row)} />
                            )
                        })}
                    </> : <tr>
                        <td colSpan={headers && headers.length}>{t('_NO_RECORDS_FOUND')}</td>
                    </tr>}
                </tbody>
            </DxcTable>
            <div className="row">
                {selectionMode && selectionMode === 'multiple' && <div className="col-4 mt-2">
                    <p>Selected Length: ({Object.values(selectedRows).length})</p>
                </div>}
                {totalItems && totalItems > itemsPerPage &&
                    <div className={`${selectionMode && selectionMode === 'multiple' ? 'col-8' : 'col-12'}`}>
                        <Paginator totalItems={totalItems} itemsPerPage={itemsPerPage} data={data} handler={getData} />
                    </div>}
            </div>
        </div>
    );
};

export default React.memo(ComplexTable);
