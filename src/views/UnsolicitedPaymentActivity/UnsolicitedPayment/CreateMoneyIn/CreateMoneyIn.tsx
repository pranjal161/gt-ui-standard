import {Theme, makeStyles} from '@material-ui/core/styles';
import {APIConfig} from 'configs/apiConfig';
import ActionsModal from './ActionsModal/ActionsModal';
import Dialog from 'theme/components/material/Dialog/Dialog';
import MoneyInForm from './MoneyInForm/MoneyInForm';
import React from 'react';
import {getLink} from 'utils/functions';
import {scrollIntoView} from 'utils/system';
import useAia from 'hooks/useAia';
import useStep from 'hooks/useStep';
import {useTranslation} from 'react-i18next';

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
    const {t} = useTranslation();
    const {post, patch, fetch} = useAia();
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
    const {canValidateStep} = useStep()

    const addMoney = () => {
        const moneyInHref = getLink(moneyIn, 'self');
        patch(moneyInHref, formData).then(() => {
            // checking consistency & display error
            const inputErrors = canValidateStep()
            if (inputErrors.length === 0) {
                //Todo : NOt to do here, to be done in UP level
                patch(UPHref, {'cscaia:money_in': moneyInHref});
                onClose()
            }
            else {
                //We scroll to view the first error
                scrollIntoView(inputErrors[0])
            }
        })

    };

    const getMoneyInsProps: Function = async () => {
        try {
            const moneyInCollection = APIConfig().defaultHostUrl + 'financials/money_ins'
            const res = await post(moneyInCollection, {'operation:contract': contractURI});

            if (res && res.data && getLink(res.data, 'self')) {
                //We got the Href of the new ressource
                //Todo : to change
                fetch(getLink(res.data, 'self'));
            }

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
                actions={<ActionsModal onClose={onClose} addMoney={addMoney}/>}/>
        </div>
    )
}

export default CreateMoneyIn;
