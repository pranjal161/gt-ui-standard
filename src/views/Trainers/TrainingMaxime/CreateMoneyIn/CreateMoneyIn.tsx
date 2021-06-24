import { Theme, makeStyles } from '@material-ui/core/styles';

import ActionsModal from './ActionsModal/ActionsModal';
import Dialog from 'theme/components/material/Dialog/Dialog';
import MoneyInForm from './MoneyInForm/MoneyInForm';
import React from 'react';
import useAia from 'hooks/useAia';
import { useTranslation } from 'react-i18next';

export interface CreateMoneyInProps {

    /**
        * open
        * @description  React state to define if dialog is open.
    */
    open: boolean;

    /**
        * onClose
        * @description  Function to close the dialog.
    */
    onClose: Function;

    /**
        * response
        * @description  Uncolicited Payment response on creation.
    */
    response: any;

    /**
        * setMoneyUri
        * @description  React setter to retunr the URI String value of the Money in created.
    */
    setMoneyUri: Function;

}
const useStyles = makeStyles((theme: Theme) => ({
    container: {
        padding: theme.spacing(2, 4),
    }
}));

/**
 * The component renders a dialog that contains a form to create a money in.
    * @param {CreateMoneyInProps} props Props of the component.
    * @returns {React.component} Display the component.
    */
const CreateMoneyIn: React.FC<CreateMoneyInProps> = (props: CreateMoneyInProps) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const { post, patch, fetch } = useAia();
    const {
        open,
        onClose,
        response,
        setMoneyUri
    } = props

    const payerURI: string = response.data._links['premium:addressee_person'].href;
    const amountUP: number = response.data['operation:amount'];
    const contractURI: string = (response.data._links.self.href).split('/operations')[0]; // CUT THE USELESS PARTS OF THE URI

    const [isLoad, setIsLoad]: [boolean, Function] = React.useState(false);
    const [bankAccountList, setBankAccountList]: [any, Function] = React.useState();
    const [moneyIn, setMoneyIn]: [any, Function] = React.useState();
    const [currencySelect, setCurrencySelect]: [any, Function] = React.useState();
    const [paymentTypeSelect, setPaymentTypeSelect]: [any, Function] = React.useState();
    const [adminSelect, setAdminSelect]: [any, Function] = React.useState();
    const [formData, setFormData]: [any, Function] = React.useState({
        'operation:amount': '',
        'operation:currency_code': '',
        'money_in:payment_type': '',
        'money_in:receipt_date': '',
        'money_in:deposit_date': '', // NEED TO BE THE LATEST DATE TO AVOID SOME ISSUE
        'operation:value_date': '',
        'money_in:payer_person': '',
        'money_in_administrator': '', // DEFINE BY DEFAULT ON THE SYSTEM, BUT AVAILABLE IN THE SELECT ONLY ONE OPTION
        'money_in:deposit_bank_account': '' // DEFINE BY DEFAULT ON THE SYSTEM, BUT AVAILABLE IN THE SELECT ONLY ONE OPTION
    });

    const addMoney = async () => {
        console.log('push');
        const res = await patch(moneyIn.data._links.self.href, formData);

        console.log(res);
        setMoneyUri(res.data._links.self.href);
        onClose();
    };

    React.useEffect(() => {
        console.log(formData);
    }, [formData])

    const newList = (itemToMap: any) => {
        let newList: any = [];
        itemToMap.map((item: any) => (
            newList.push({
                value: item.enum[0],
                label: item.title
            })
        ));

        return newList;
    }

    const getMoneyInsProps: Function = async () => {
        try {
            const res = await post('http://20.33.40.147:13111/csc/insurance/financials/money_ins', { 'operation:contract': contractURI });

            setMoneyIn(res);
            setCurrencySelect(newList(res.data._options.properties['operation:currency_code'].oneOf));
            setPaymentTypeSelect(newList(res.data._options.properties['money_in:payment_type'].oneOf));
            setAdminSelect(newList(res.data._options.properties['money_in_administrator'].oneOf));

            const getDeposit = await (fetch(res.data._links['money_in:deposit_bank_account'].href));
            setBankAccountList([{
                value: getDeposit.data._links.self.href,
                label: getDeposit.data._links.self.name
            }]);
        }
        catch (err) {
            return err;
        }
    }

    React.useEffect(() => {
        getMoneyInsProps();
    }, [])

    return (
        <div className={classes.container}>
            <Dialog
                open={open}
                fullWidth={false}
                title={isLoad ? null : t('money_in')}
                content={<MoneyInForm
                    formData={formData}
                    setFormData={setFormData}
                    payerURI={payerURI}
                    isLoad={isLoad}
                    setIsLoad={setIsLoad}
                    bankAccountList={bankAccountList}
                    currencySelect={currencySelect}
                    paymentTypeSelect={paymentTypeSelect}
                    adminSelect={adminSelect}
                    amountUP={amountUP}
                />
                }
                actions={isLoad ? null : <ActionsModal onClose={onClose} addMoney={addMoney} formData={formData} />} />
        </div>
    )
}

export default CreateMoneyIn;