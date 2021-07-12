import { Theme, makeStyles } from '@material-ui/core/styles';
import { formatValue, getDescriptionFromOneOf, hasMethodInOptions } from 'utils/functions';

import IconContainer from './IconContainer/IconContainer';
import React from 'react';
import useResponse from 'hooks/useResponse';

export interface MoneyInListItemProps {

    /**
         * moneyInHref
         * @description The money in href linked to the current unscolicited payment
              */
    hRef: string

    /**
        * Columns
        * @description Object, list all property needed
             */
    columns: any

    /**
        * onEdit
        * @description Edit function for moneyIn
             */
    onEdit: Function

    /**
       * onDelete
       * @description Delete function for moneyIn
            */
    onDelete: Function
}

const useStyles = makeStyles((theme: Theme) => ({
    row: {
        padding: `${theme.spacing(2)}px !important`
    }
}));

/**
 * The component display a table that contains money in informations
  * @param {MoneyInListItemProps} props Props of the component.
   * @returns {React.component} Display the component.
    */
const MoneyInListItem: React.FC<MoneyInListItemProps> = (props: MoneyInListItemProps) => {
    const classes = useStyles();
    const {
        hRef,
        columns,
        onEdit,
        onDelete,
    } = props

    const [response] = useResponse(hRef);
    
    const IsEditable: Function = (res: any) => {
        if (hasMethodInOptions(res.data, 'PATCH')) {
            return true;
        }
        else {
            return false;
        }
    }

    return (
        <tr data-testid="money-item-container">

            {
                response &&
                columns.map((item: any, key: number) => (
                    item.type && item.property ?
                        <td className={classes.row} data-testid="test-content" key={key}>{formatValue(response.data[item.property], item.type)}</td> :
                        item.property ?
                            <td className={classes.row} key={key}>{getDescriptionFromOneOf(response.data[item.property], item.property, response.data)}</td>
                            :
                            <td key={key} className={classes.row}>
                                <IconContainer onDelete={() => onDelete(hRef)} onEdit={IsEditable(response) ? () => onEdit(hRef) : false} />
                            </td>
                ))
            }
        </tr>
    )
}

export default MoneyInListItem;

