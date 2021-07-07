import { Theme, makeStyles } from '@material-ui/core/styles';
import { formatValue, getDescriptionFromOneOf, getLink, hasMethodInOptions } from 'utils/functions';

import { DxcTable } from '@dxc-technology/halstack-react';
import IconContainer from './IconContainer/IconContainer';
import React from 'react';
import useAia from 'hooks/useAia';
import useResponse from 'hooks/useResponse';
import { useTranslation } from 'react-i18next';

export interface MoneyInListProps {

    /**
         * moneyInHref
         * @description The money in href linked to the current unscolicited payment
              */
    moneyInHref: string

    /**
        * onEdit
        * @description Edit function for moneyIn
             */
    onEdit: Function

    /**
        * unsolicitedPaymentHref
        * @description The unsolicited payment HRef 
             */
    unsolicitedPaymentHref: string
}
const useStyles = makeStyles((theme: Theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(2)
    },
    itemTable: {
        textAlign: 'left',
    },
}));

/**
 * The component display a table that contains money in informations
  * @param {MoneyInListProps} props Props of the component.
   * @returns {React.component} Display the component.
    */
const MoneyInList: React.FC<MoneyInListProps> = (props: MoneyInListProps) => {
    const classes = useStyles();
    const { post, patch, fetch } = useAia();
    const {
        moneyInHref,
        onEdit,
        unsolicitedPaymentHref
    } = props

    const { t } = useTranslation();
    const [response] = useResponse(moneyInHref);

    const columns: any = [
        { label: t('payment_method'), property: 'money_in:payment_type' },
        { label: t('amount'), property: 'operation:amount', type: 'currency' },
        { label: t('currency'), property: 'operation:currency_code' },
        { label: t('accounting_date'), property: 'operation:accounting_date', type: 'date' },
        { label: t('value_date'), property: 'operation:value_date', type: 'date' },
        { label: '', property: false }
    ]

    const onDelete = async () => {
        await post(moneyInHref + '/cancel', {});
        await patch(unsolicitedPaymentHref, { 'cscaia:money_in': '' })
    }

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
        <div className={classes.container}>
            <DxcTable>
                <thead>
                    <tr>
                        {
                            columns.map((item: any, key: number) => (
                                <th className={classes.itemTable} key={key}>{item.label}</th>
                            ))
                        }
                    </tr>
                </thead>
                {
                    response &&
                    <tbody>
                        <tr>
                            {
                                columns.map((item: any, key: number) => (
                                    item.type && item.property ?
                                        <td className={classes.itemTable} key={key}>{formatValue(response.data[item.property], item.type)}</td> :
                                        item.property ?
                                            <td className={classes.itemTable} key={key}>{getDescriptionFromOneOf(response.data[item.property], item.property, response.data)}</td>
                                            :
                                            <td key={key}>
                                                <IconContainer onDelete={onDelete} onEdit={IsEditable(getLink(response.data, 'self')) ? () => onEdit(getLink(response.data, 'self')) : false} />
                                            </td>

                                ))
                            }
                        </tr>
                    </tbody>
                }
            </DxcTable>
        </div>
    )
}

export default MoneyInList;