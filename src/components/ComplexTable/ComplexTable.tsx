import { DxcCheckbox, DxcRadio, DxcTable } from '@dxc-technology/halstack-react';

import Paginator from 'components/Paginator/Paginator';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useResponse from 'hooks/useResponse';

export interface ComplexTableHeaderProps {
    title: string
}

export interface ComplexTableColumnItemProps {
    component?: any,
    valueKey: any,
}

export interface ComplexTableRowItemProps {
    hRefKey: string
}

export interface ComplexTableProps {
    tableHeader: Array<ComplexTableHeaderProps>,
    tableColumn: Array<ComplexTableColumnItemProps>,
    tableRow?: ComplexTableRowItemProps,
    hRef?: string,
    tableData?: any,
    selection?: 'one' | 'multiple' | undefined,
    onSelectionSubmit?: Function,
    disabledRow?: Function,
    showSelectionLength?: Boolean
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
                cursor: 'pointer',
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
    paginator: {
        '& div > div': {
            background: '#fff !important'
        }
    }
}));

const SelectionOption = (props: {selection: any, index: number, values: any, onClick: Function}) => (
    <>
        {props.selection && props.selection === 'one' &&
            <DxcRadio
                key={`radio_${props.index}`}
                checked={props.values === props.index}
                onClick={props.onClick}
                margin="xxsmall"
            />
        }
        {props.selection && props.selection === 'multiple' &&
            <DxcCheckbox
                key={`checkbox_${props.index}`}
                checked={props.values && props.values.includes(props.index)}
                margin="xxsmall"
                onChange={props.onClick}
            />
        }
    </>
);

const ComplexTableRow = (props: { hRef?: null | string, tableColumn: Array<ComplexTableColumnItemProps>, index: number, row: any, selection: any, onClick: Function, values: any, selected: Boolean}) => {
    const href = props.hRef ? props.hRef : undefined;
    console.log('href -->', props.index, href);
    const [rowResponse] = useResponse(href);
    // const rowResponse = { data: {}};

    const component = (component: React.FunctionComponent, value: any) => component(value);

    const selectionComponent = (index: number) => ((index === 0) && <SelectionOption selection={props.selection} values={props.values} index={props.index} onClick={() => props.onClick(props.row, props.index)} />);

    const response = props.hRef ? rowResponse && rowResponse['data'] : props.row;

    return (
        <>{response && <tr className={`${props.selected && 'selected'}`} key={props.index}>
            {props.tableColumn && props.tableColumn.map((column: ComplexTableColumnItemProps, inx: number) => (<td key={`column${props.index}${inx}`}><div className="d-flex align-items-center">
                {selectionComponent(inx)}
                {column.component ? component(column.component, { property: column.valueKey, response: response && response[column.valueKey] ? response : null, icon: false }) : response[column.valueKey] ? response[column.valueKey] : null}
            </div></td>))}
        </tr>}</>
    );
}

/**
 * Display a Complex Table with Selection or Update option
 * @param {props} props Contains information related to the ComplexTableProps
 * @returns {*} Return the ComplexTable
 */
const ComplexTable = (props: ComplexTableProps) => {
    const { tableHeader, tableRow, tableData } = props;
    const classes: any = useStyles();
    const itemsPerPage = 10;
    const [totalItems, setTotalItems] = React.useState(0);
    const hRefKey = tableRow && tableRow['hRefKey'];

    const getData = (href: string) => {
        console.log('href-->', href);
    }

    const [selectedRows, setSelectedRows] = React.useState<Array<any> | any>([]);
    const [checked, setChecked] = React.useState<any>([]);
    console.log(props);

    const onRadioClick = (items: any, index: number) => {
        console.log(index);
        const data = [];
        data.push(items);
        setSelectedRows(data);
        setChecked(index);
    };

    const onCheckboxClick = (items: any, index: number) => {
        if (checked && !checked.includes(index)) {
            setSelectedRows([...selectedRows, items]);
            setChecked([...checked, index]);
        }
        else {
            const data = selectedRows;
            data.splice(index, 1);
            setSelectedRows(data);
            const numIndex = checked.findIndex((num: number) => num === index);
            const inx = checked;
            inx.splice(numIndex, 1);
            setChecked([...checked, inx]);
        }
    };
    
    // const component = (component: React.FunctionComponent, value: any) => component(value);

    const entityClicked = (items: any, index: number) => (props.selection && props.selection === 'one' ? () => onRadioClick(items, index) : props.selection && props.selection === 'multiple' ? () => onCheckboxClick(items, index) : () => {
        console.log('empty') 
    })

    React.useEffect(() => {
        if (tableData && tableData && tableData.length > 0) {
            setTotalItems(tableData.length);
        }
    }, [tableData])

    return (
        <div className={classes.tableCover}>
            <DxcTable>
                <thead>
                    <tr>
                        {tableHeader && tableHeader.map((items: ComplexTableHeaderProps, index: number) => <th key={index}>
                            {items.title}
                        </th>)}
                    </tr>
                </thead>
                <tbody>
                    {props.tableColumn && tableData && tableData.map((items: any, index: number) => (<>
                        {/* {tableRow?.hRefKey ? */}
                        <ComplexTableRow selected={checked === index || checked.includes(index)} hRef={hRefKey && items[hRefKey]} row={items} index={index} tableColumn={props.tableColumn} selection={props.selection} values={props.selection ? checked : null} onClick={entityClicked(items, index)} />
                        {// <>
                            //     <tr className={checked === index || checked.includes(index) && 'selected'} key={index}>
                            //         {props.tableColumn && props.tableColumn.map((column: ComplexTableColumnItemProps, inx: number) => (<td key={`column${index}${inx}`}><div className="d-flex align-items-center">
                            //             {(inx === 0) && <SelectionOption selection={props.selection} values={props.selection ? checked : null} index={index} onClick={entityClicked(items, index)} />}
                            //             {column.component ? component(column.component, { property: column.valueKey, response: tableData ? tableData : 'null' }) : items[column.valueKey] ? items[column.valueKey] : 'null'}
                            //         </div>
                            //         </td>))}
                            //     </tr>
                            // </>
                        }
                    </>))}
                </tbody>
            </DxcTable>
            <div className="row">
                {props.showSelectionLength && <div className="col-4 mt-2">
                    <p>Selected Length: ({selectedRows.length})</p>
                </div>}
                {totalItems && totalItems > itemsPerPage && <div className={`${props.showSelectionLength ? 'col-8' : 'col-12'} ${classes.paginator}`}>
                    <Paginator totalItems={totalItems} itemsPerPage={itemsPerPage} data={tableData} handler={getData} />
                </div>}
            </div>
        </div>
    );
};

export default ComplexTable;