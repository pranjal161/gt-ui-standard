import { formatValue, getDescriptionFromOneOf, hasMethodInOptions } from 'utils/functions';

import IconContainer from './IconContainer/IconContainer';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useAia from 'hooks/useAia';

export interface MoneyInListItemProps {

    /**
         * moneyInHref
         * @description The money in href linked to the current unscolicited payment
              */         
    moneyInHref: string

    /**
        * item
        * @description Value of column
             */
    item: any

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

    /**
        * response
        * @description money in object
             */
    response: any
}
const useStyles = makeStyles(() => ({
    itemTable: {
        textAlign: 'left',
    },
}));

/**
 * The component display a table that contains money in informations
  * @param {MoneyInListItemProps} props Props of the component.
   * @returns {React.component} Display the component.
    */
const MoneyInListItem: React.FC<MoneyInListItemProps> = (props: MoneyInListItemProps) => {
    const classes = useStyles();
    const { fetch } = useAia();
    const {
        moneyInHref,
        item,
        onEdit,
        onDelete,
        response
    } = props

    const IsEditable: Function = async (href: string) => {
        const res: any = await fetch(href);
        if (hasMethodInOptions(res.data, 'PATCH')) {
            return true;
        }
        else {
            return false;
        }
    }

    return (
        <>

            {
                item.type && item.property ?
                    <td className={classes.itemTable} >{formatValue(response.data[item.property], item.type)}</td> :
                    item.property ?
                        <td className={classes.itemTable} >{getDescriptionFromOneOf(response.data[item.property], item.property, response.data)}</td>
                        :
                        <td >
                            <IconContainer onDelete={onDelete} onEdit={IsEditable(moneyInHref) ? () => onEdit(moneyInHref) : false} />
                        </td>
            }
        </>
    )
}

export default MoneyInListItem;