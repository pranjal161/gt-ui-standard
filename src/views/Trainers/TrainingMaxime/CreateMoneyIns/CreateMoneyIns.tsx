import { Theme, makeStyles } from '@material-ui/core/styles';

import ActionsModal from './ActionsModal/ActionsModal';
import Dialog from 'theme/components/material/Dialog/Dialog';
import MoneyInForm from './MoneyInForm/MoneyInForm';
import React from 'react';
import useAia from 'hooks/useAia';

// import { useTranslation } from 'react-i18next';
export interface CreateMoneyInsProps {

    /**
        * isOpen
    */
    open?: boolean;

    /**
        * onClose
    */
    onClose?: Function;

    /**
        * response
        * @description  Uncolicited Payment response on creation
    */
    response?: any;

}
const useStyles = makeStyles((theme: Theme) => ({
    container: {
        padding: theme.spacing(2, 4),
    }
}));

/**
 * EXPLAIN WHAT THE COMPONENT DOES
  * @param {CreateMoneyInsProps} props Props of the component.
   * @returns {React.component} Display the component.
    */
const CreateMoneyIns: React.FC<CreateMoneyInsProps> = (props: CreateMoneyInsProps) => {
    const classes = useStyles();
    const { post, patch } = useAia();
    const {
        open,
        onClose,
        response,
    } = props
    const payerURI: string = response.data._links['premium:addressee_person'].href;
    const contractURI: string = response.data._links.self.href;

    const [isLoad, setIsLoad]: [boolean, Function] = React.useState(false);
    const [bankAccountList, setBankAccountList]: [any, Function] = React.useState();
    const [moneyIn, setMoneyIn]: [any, Function] = React.useState();
    const [currencySelect, setCurrencySelect]: [any, Function] = React.useState();
    const [paymentTypeSelect, setPaymentTypeSelect]: [any, Function] = React.useState();
    const [adminSelect, setAdminSelect]: [any, Function] = React.useState();
    const [formData, setFormData]: [any, Function] = React.useState({
        amount: 3000,
        'operation:amount': '',
        'operation:currency_code': '',
        'money_in:payment_type': '',
        'operation:accounting_date': '', // DATE OF CREATION MONEY_IN CAN'T BE MODIFIED
        'money_in:receipt_date': '',
        'money_in:deposit_date': '',
        'operation:value_date': '',
        'money_in:payer_person': '',
        'money_in_administrator': '',
        'money_in:deposit_bank_account': '', // ISSUE I CAN'T MODIFY THE DEFAULT BANK ACCOUNT ...
        'operation:contract': contractURI.split('/operations')[0], // CUT /operations/unsolicited_payment/ID
        // chequeNumber: '',
        // signatureDate: ''
    });
    
    const addMoney = async () => {
        console.log('push');
        const res = await patch(moneyIn.data._links.self.href, formData);

        console.log(res)
    };

    React.useEffect(() => {
        console.log(formData)
    }, [formData])

    const getMoneyInsProps: Function = async () => {
        try {
            const res = await post('http://20.33.40.147:13111/csc/insurance/financials/money_ins', {});
            console.log(res);
            setMoneyIn(res);
            console.log(moneyIn)
            // Here I format the currencies list in option to feed the select.
            let currencyFormat: any = [];
            res.data._options.properties['operation:currency_code'].oneOf.map((item: any) => (
                currencyFormat.push({
                    value: item.enum[0],
                    label: item.title
                })
            ))
            setCurrencySelect(currencyFormat);
            console.log(currencyFormat);

            // Here I format the paymentType list in option to feed the select.
            let paymentTypeFormat: any = [];
            res.data._options.properties['money_in:payment_type'].oneOf.map((item: any) => (
                paymentTypeFormat.push({
                    value: item.enum[0],
                    label: item.title
                })
            ))
            setPaymentTypeSelect(paymentTypeFormat);
            console.log(paymentTypeFormat);

            // Here I format the administrator list in option to feed the select.
            let adminList: any = [];
            res.data._options.properties['money_in_administrator'].oneOf.map((item: any) => (
                adminList.push({
                    value: item.enum[0],
                    label: item.title
                })
            ))
            setAdminSelect(adminList);
            console.log(adminList);
        }
        catch (err) {
            return err;
        }
    }

    React.useEffect(() => {
        getMoneyInsProps();
    }, [])
    // const { t } = useTranslation();

    return (
        <div className={classes.container}>
            <Dialog
                open={open}
                fullWidth={false}
                title={isLoad ? null : 'Money In'}
                content={<MoneyInForm
                    formData={formData}
                    setFormData={setFormData}
                    payerURI={payerURI}
                    isLoad={isLoad}
                    setIsLoad={setIsLoad}
                    bankAccountList={bankAccountList}
                    setBankAccountList={setBankAccountList}
                    currencySelect={currencySelect}
                    paymentTypeSelect={paymentTypeSelect}
                    adminSelect={adminSelect}
                />
                }
                actions={isLoad ? null : <ActionsModal onClose={onClose} addMoney={addMoney} formData={formData} />} />
        </div>
    )
}

export default CreateMoneyIns;