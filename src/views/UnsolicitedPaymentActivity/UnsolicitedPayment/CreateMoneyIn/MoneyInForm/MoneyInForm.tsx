import { Theme, makeStyles } from '@material-ui/core/styles';

import FormContent from './FormContent';
import React from 'react';
import useAia from 'hooks/useAia';

export interface MoneyInFormProps {

    /**
     * formData
     * @description Object where I feed the value of the Money In form
    */
    formData: any

    /**
     * setFormData
     * @description React setter for formData state
    */
    setFormData: Function

    /**
    * payerURI
    * @description href of the contract's owner to display his name
    */
    payerURI: string

    /**
    * bankAccountList
    * @description API properties formatted for dxc select
    */
    bankAccountList: any;

    /**
    * amountUP
    * @description The amount of the unsolicited Payment operation
    */
    amountUP: number

    /**
       * moneyInData
       * @description The response of new money in resource
       */
    moneyInData: any
}
const useStyles = makeStyles((theme: Theme) => ({
    formContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'column',
        padding: theme.spacing(0, 4),
    }
}));

/**
 * EXPLAIN WHAT THE COMPONENT DOES
  * @param {MoneyInFormProps} props Props of the component.
   * @returns {React.component} Display the component.
    */
const MoneyInForm: React.FC<MoneyInFormProps> = (props: MoneyInFormProps) => {
    const classes = useStyles();
    const { fetch } = useAia();

    const {
        formData,
        setFormData,
        payerURI,
        bankAccountList,
        amountUP,
        moneyInData
    } = props
    const [payerTitle, setPayerTitle]: [string, Function] = React.useState('');

    const getPayerName: Function = async () => {
        try {
            const res: any = await fetch(payerURI);
            setPayerTitle(res.data._links.self.name);
            setFormData({ ...formData, 'money_in:payer_person': res.data._links.self.href })
        }
        catch (err: any) {
            return err;
        }
    }

    React.useEffect(() => {
        if (!payerTitle) {
            getPayerName();
        }
    }, [])

    return (
        <>
            <div className={classes.formContainer}>
                <FormContent
                    formData={formData}
                    setFormData={setFormData}
                    bankAccountList={bankAccountList}
                    moneyInData={moneyInData}
                    payerTitle={payerTitle}
                    amountUP={amountUP}
                />
            </div>
        </>
    )
}

export default MoneyInForm;