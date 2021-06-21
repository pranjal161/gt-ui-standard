import { Theme, makeStyles } from '@material-ui/core/styles';

import ActionsModal from './ActionsModal/ActionsModal';
import Dialog from 'theme/components/material/Dialog/Dialog';
import MoneyInForm from './MoneyInForm/MoneyInForm';
import React from 'react';

// import useAia from 'hooks/useAia';

// import { getActivities } from 'utils/functions';
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
    const {
        open,
        onClose,
        // response,
    } = props

    const addMoney = () => {
        console.log('push')
    };

    const [formData, setFormData]: [any, Function] = React.useState({
        amount: 3000,
        paymentAmount: '',
        currency: '',
        paymentMethod: 'cheque',
        accountingDate: '',
        receiptDate: '',
        depositDate: '',
        valueDate: '',
        payer: {
            uri: 'href',
            label: 'un mec'
        },
        admin: '',
        depositAccount: {
            uri: 'href',
            label: 'un rib'
        }
    })

    // const [moneyIn, setMoneyIn]: [any, Function] = React.useState();
    // const payerURI: string = response.data._links['premium:addressee_person'].href;
    // const [bankAccountList, setBankAccountList]: [any, Function] = React.useState([]);

    // const { post, fetch} = useAia();
    // const { fetch} = useAia();

    // const getMoneyInsProps: Function = async() => {
    //     try{
    //         const res = await post('http://20.33.40.147:13111/csc/insurance/financials/money_ins', {});
    //         console.log(res);
    //         setMoneyIn(res);

    //         // to delete the request after its creation to avoid too many useless data storage in AIA
    //         const deleteNewRequest = await post(res.data._links['cscaia:cancel'].href, {});
    //         console.log(deleteNewRequest);
    //     }
    //     catch(err) {
    //         return err;
    //     }
    // }

    // const getAccountList: Function = async() => {
    //     try{
    //         const res = await fetch(payerURI);
    //         const accountList = await fetch(res.data._links['person:bank_account_list'].href);

    //         console.log(accountList);
    //         setBankAccountList(accountList);
    //         console.log(bankAccountList);
    //     }
    //     catch(err: any){
    //         return err;
    //     }
    // }

    // React.useEffect(() => {
    // getMoneyInsProps();
    // console.log(moneyIn);
    //     getAccountList();
    // }, [])
    // const { t } = useTranslation();

    // React.useEffect(() => {
    //     console.log(response);
    // }, [response])

    return (
        <div className={classes.container}>
            <Dialog
                open={open}
                fullWidth={false}
                content={<MoneyInForm
                    formData={formData} setFormData={setFormData} />
                }
                actions={<ActionsModal onClose={onClose} addMoney={addMoney} formData = {formData} />} />
        </div>
    )
}

export default CreateMoneyIns;