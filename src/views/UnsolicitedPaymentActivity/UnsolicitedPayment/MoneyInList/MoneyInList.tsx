import { DxcTable } from '@dxc-technology/halstack-react';
import MoneyInListItem from './MoneyInListItem';
import React from 'react';
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
        * onDelete
        * @description Delete function for moneyIn
             */
    onDelete: Function
}

/**
 * The component display a table that contains money in informations
  * @param {MoneyInListProps} props Props of the component.
   * @returns {React.component} Display the component.
    */
const MoneyInList: React.FC<MoneyInListProps> = (props: MoneyInListProps) => {
    const {
        moneyInHref,
        onEdit,
        onDelete
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

    return (
        <div data-testid="money-list-container">
            <DxcTable>
                <thead>
                    <tr>
                        {
                            columns.map((item: any, key: number) => (
                                <th style={{ padding: 16 }} key={key}>{item.label}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        response &&
                        <MoneyInListItem hRef={moneyInHref} columns={columns} onEdit={onEdit} onDelete={onDelete} />
                        // Multiple MoneyIns are not integrate, still need to see one UP with multiple money in to know the architecture
                        // it will look like following :
                        // multiplesHRef &&
                        //     multiplesHRef.map((item: string, key: number) => (
                        //         <MoneyInListItem key={number} hRef={item} columns={columns} onEdit={onEdit} onDelete={onDelete} />
                        //     ))
                    }
                </tbody>
            </DxcTable>
        </div>
    )
}

export default React.memo(MoneyInList);
