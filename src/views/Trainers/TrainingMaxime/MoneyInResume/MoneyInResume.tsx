import { Theme, makeStyles } from '@material-ui/core/styles';

import { DxcTable } from '@dxc-technology/halstack-react';
import IconContainer from './IconContainer/IconContainer';
import React from 'react';
import useAia from 'hooks/useAia';
import { useTranslation } from 'react-i18next';

export interface MoneyInResumeProps {

    /**
         * responseUP
         * @description The unsolictied payment API response when it is created
              */
    responseUP: any
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
 * EXPLAIN WHAT THE COMPONENT DOES
  * @param {MoneyInResumeProps} props Props of the component.
   * @returns {React.component} Display the component.
    */
const MoneyInResume: React.FC<MoneyInResumeProps> = (props: MoneyInResumeProps) => {
    const classes = useStyles();
    const { fetch, post, patch } = useAia();
    const {
        responseUP
    } = props

    const { t } = useTranslation();
    const [myTable, setMyTable] = React.useState<any>(false);

    const columns: any = [
        { label: t('payment_method'), property: 'money_in:payment_type' },
        { label: t('amount'), property: 'operation:amount' },
        { label: t('currency'), property: 'operation:currency_code' },
        { label: t('accounting_date'), property: 'operation:accounting_date' },
        { label: t('value_date'), property: 'operation:value_date' },
        { label: '', property: false }
    ]

    const getMoneyIn = async (url: string) => {
        const res = await fetch(url);
        console.log({ res });
        setMyTable(res);

    }

    React.useEffect(() => {
        if (responseUP.data._links['cscaia:money_in']) {
            getMoneyIn(responseUP.data._links['cscaia:money_in'].href);
        }

    }, [responseUP])

    const onDelete = async () => {
        console.log('delete');
        const deleteMoneyIn = await post(responseUP.data._links['cscaia:money_in'].href + '/cancel', {});
        const deleteMoneyInUP = await patch(responseUP.data._links.self.href, { 'cscaia:money_in': '' })
        console.log(deleteMoneyIn);
        console.log(deleteMoneyInUP)
    }

    const onEdit = () => {
        console.log('edit')
    }

    return (
        <div className={classes.container}>
            <DxcTable>
                <tr>
                    {
                        columns.map((item: any, key: number) => (
                            <th className={classes.itemTable} key={key}>{item.label}</th>
                        ))
                    }
                </tr>
                {
                    myTable && responseUP.data._links['cscaia:money_in'] &&
                    <tr>
                        {
                            columns.map((item: any, key: number) => (
                                item.property ?

                                    <td className={classes.itemTable} key={key}>{myTable.data[item.property]}</td>

                                    :
                                    <td key={key}>
                                        <IconContainer onDelete={onDelete} onEdit={onEdit} />
                                    </td>

                            ))
                        }
                    </tr>
                }
            </DxcTable>
        </div>
    )
}

export default MoneyInResume;