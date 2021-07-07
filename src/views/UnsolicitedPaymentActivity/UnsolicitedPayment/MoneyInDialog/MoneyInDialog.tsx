import { Theme, makeStyles } from '@material-ui/core/styles';

import Dialog from 'theme/components/material/Dialog/Dialog';
import DialogActions from './DialogContent/DialogActions';
import DialogContent from './DialogContent/DialogContent';
import React from 'react';
import { getLink } from 'utils/functions';
import { scrollIntoView } from 'utils/system';
import useAia from 'hooks/useAia';
import useResponse from 'hooks/useResponse';
import useStep from 'hooks/useStep';
import { useTranslation } from 'react-i18next';

export interface MoneyInDialogProps {

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
        * hRef
        * @description  Href of the current editable unsolicitedPayment 
    */
    hRef: string;

    /**
        * isEdit
        * @description  Boolean to display value modify \\ add on the dialog buttton
    */
    isEdit: boolean;

    /**
        * payerURI
        * @description href of the contract's owner to display his name
   */
    payerURI: string

    /**
        * amountUP
        * @description The amount of the unsolicited Payment operation
    */
    amountUP: number
}

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        padding: theme.spacing(2, 4),
    }
}));

/**
 * The component renders a dialog that contains a form to create a money in.
    * @param {MoneyInDialogProps} props Props of the component.
    * @returns {React.component} Display the component.
    */
const MoneyInDialog: React.FC<MoneyInDialogProps> = (props: MoneyInDialogProps) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const { patch } = useAia();
    const { canValidateStep } = useStep();
    const {
        open,
        onClose,
        hRef,
        isEdit,
        payerURI,
        amountUP
    } = props

    const [formData, setFormData]: [any, Function] = React.useState({});
    const [response] = useResponse(hRef);

    const addMoney = async () => {
        const res = await patch(hRef, formData);
        const inputErrors = canValidateStep()
        console.log('inputErrors', inputErrors)

        if (inputErrors.length === 0) {
            onClose('UPPatch', res);
        }
        else {
            //We scroll to view the first error
            scrollIntoView(inputErrors[0])
        }
    };

    const getFormData: Function = () => {
        try {
            if (response) {
                const depositAccountURI = getLink(response.data, 'money_in:deposit_bank_account');
                setFormData({
                    ...formData,
                    'money_in:deposit_bank_account': depositAccountURI,
                    'operation:currency_code': response.data['operation:currency_code'],
                    'operation:amount': response.data['operation:amount'],
                    'money_in:payment_type': response.data['money_in:payment_type']
                });
            }

        }
        catch (err) {
            return err;
        }
    }

    React.useEffect(() => {
        if (response) {
            getFormData();
        }
    }, [response])

    return (
        <div className={classes.container}>
            <Dialog
                open={open}
                maxWidth="md"
                fullWidth={false}
                title={t('money_in')}
                content={<DialogContent
                    formData={response && formData}
                    moneyInData={response && response.data}
                    setFormData={setFormData}
                    payerURI={payerURI}
                    amountUP={amountUP}
                    depositAccountURI={getLink(response?.data, 'money_in:deposit_bank_account')}
                    hRef={hRef}
                />
                }
                actions={<DialogActions onClose={onClose} addMoney={addMoney} isEdit={isEdit} />} />
        </div>
    )
}

export default MoneyInDialog;
