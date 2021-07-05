import { Theme, makeStyles } from '@material-ui/core/styles';
import { getLink, isResponseConsistent } from 'utils/functions';

import { APIConfig } from 'configs/apiConfig';
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
    } = props

    const payerURI: string = getLink(response, 'premium:addressee_person');
    const amountUP: number = response.data['operation:amount'] ?? '';
    const UPHref = getLink(response.data, 'self');
    const contractURI: string = (UPHref).split('/operations')[0]; // CUT THE USELESS PARTS OF THE URI

    const [bankAccountList, setBankAccountList]: [any, Function] = React.useState();
    const [moneyIn, setMoneyIn]: [any, Function] = React.useState();
    const [formData, setFormData]: [any, Function] = React.useState();

    const addMoney = async () => {
        const moneyInHref = getLink(moneyIn, 'self');
        const res = await patch(moneyInHref, formData);
        // checking consistency & display error
        if (res && res.data && isResponseConsistent(res.data)) {
            await patch(UPHref , { 'cscaia:money_in': moneyInHref });
            onClose();
        }
    };

    const getMoneyInsProps: Function = async () => {
        try {
            const moneyInCollection = APIConfig().defaultHostUrl + 'financials/money_ins'
            const res = await post(moneyInCollection, { 'operation:contract': contractURI });

            setMoneyIn(res.data);

            const getDeposit = res && getLink(res.data, 'money_in:deposit_bank_account') && await (fetch(getLink(res.data, 'money_in:deposit_bank_account')));
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
                maxWidth="md"
                fullWidth={false}
                title={t('money_in')}
                content={<MoneyInForm
                    formData={formData}
                    moneyInData={moneyIn}
                    setFormData={setFormData}
                    payerURI={payerURI}
                    bankAccountList={bankAccountList}
                    amountUP={amountUP}
                />
                }
                actions={<ActionsModal onClose={onClose} addMoney={addMoney} />} />
        </div>
    )
}

export default CreateMoneyIn;
