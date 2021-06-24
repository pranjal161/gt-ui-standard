import { DxcDate, DxcInput, DxcSelect, DxcSpinner } from '@dxc-technology/halstack-react';
import { Theme, makeStyles } from '@material-ui/core/styles';

import React from 'react';
import { useTranslation } from 'react-i18next';

export interface FormContentProps {

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
    * isLoad
    * @description React state to know if content is on loading or loaded
    */
    isLoad: boolean;

    /**
    * bankAccountList
    * @description API properties formatted for dxc select
    */
    bankAccountList: any;

    /**
    * payerTitle
    * @description title of the payer to display a label
    */
    payerTitle: string

    /**
    * currencySelect
    * @description API properties formatted for dxc select
    */
    currencySelect: any

    /**
    * paymentTypeSelect
    * @description API properties formatted for dxc select
    */
    paymentTypeSelect: any

    /**
    * adminSelect
    * @description API properties formatted for dxc select
    */
    adminSelect: any

    /**
    * amountUP
    * @description The amount of the unsolicited Payment operation
    */
    amountUP: number
}
const useStyles = makeStyles((theme: Theme) => ({
    formRow: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: theme.spacing(4),
        '& > div': {
            marginRight: theme.spacing(4),
        },
        '& :last-child': {
            marginRight: theme.spacing(0),
        }
    },
    category1: {
        marginBottom: theme.spacing(4),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 600
    },
    category2: {
        marginBottom: theme.spacing(1),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 600
    },
    spinnerContainer: {
        padding: theme.spacing(2),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    }
}));

/**
 * The component renders a form for Money In case.
  * @param {FormContentProps} props Props of the component.
   * @returns {React.component} Display the component.
    */
const FormContent: React.FC<FormContentProps> = (props: FormContentProps) => {
    const classes = useStyles();
    const { t } = useTranslation();
    const {
        formData,
        setFormData,
        isLoad,
        bankAccountList,
        payerTitle,
        currencySelect,
        paymentTypeSelect,
        adminSelect,
        amountUP
    } = props

    const onChange = (inputName: string, typeInput = 'string') => (newValue: any) => {
        if (typeInput === 'string') {
            setFormData({ ...formData, [inputName]: newValue })
        }
        else if (typeInput === 'number') {
            setFormData({ ...formData, [inputName]: +newValue })
        }
        else{
            
            return;
        }

    };

    const onBlur = (inputName: string) => (stringValue: any) => {
        console.log(stringValue)
        console.log(inputName)
        setFormData({ ...formData, [inputName]: stringValue.stringValue })
    };

    return (
        <>
            {
                !isLoad ?
                    (
                        <>
                            <p className={classes.category1}>{t('money_in')}</p>
                            <div className={classes.formRow}>
                                <DxcInput
                                    label={t('amount_to_pay')}
                                    value={amountUP+''}
                                    disabled={true}
                                />
                                <DxcInput
                                    label={t('payment_amount')}
                                    onChange={onChange('operation:amount', 'number')}
                                />
                                <DxcSelect
                                    options={currencySelect}
                                    onChange={onChange('operation:currency_code')}
                                    label={t('currency')}
                                />
                            </div>
                            <div className={classes.formRow}>
                                <DxcSelect
                                    options={paymentTypeSelect}
                                    onChange={onChange('money_in:payment_type')}
                                    label={t('payment_method')}
                                />
                                <DxcDate
                                    label={t('accounting_date')}
                                    placeholder
                                    format="yyyy-MM-dd"
                                    disabled={true}
                                />
                                <DxcDate
                                    label={t('receipt_date')}
                                    value={formData['money_in:receipt_date']}
                                    placeholder
                                    format="yyyy-MM-dd"
                                    onChange={onBlur('money_in:receipt_date')}
                                />
                            </div>
                            <div className={classes.formRow}>
                                <DxcDate
                                    label={t('deposit_date')}
                                    value={formData['money_in:deposit_date']}
                                    placeholder
                                    format="yyyy-MM-dd"
                                    onChange={onBlur('money_in:deposit_date')}
                                />
                                <DxcDate
                                    label={t('value_date')}
                                    value={formData['operation:value_date']}
                                    placeholder
                                    format="yyyy-MM-dd"
                                    onChange={onBlur('operation:value_date')}
                                />
                            </div>
                            <div className={classes.formRow}>
                                <DxcInput
                                    label={t('payer')}
                                    value={payerTitle}
                                    disabled={true}
                                />
                                <DxcSelect
                                    options={adminSelect}
                                    onChange={onChange('money_in_administrator')}
                                    label={t('adminsitrator')}
                                />
                                <DxcSelect
                                    options={bankAccountList}
                                    onChange={onChange('money_in:deposit_bank_account')}
                                    label={t('deposit_account')}
                                />
                            </div>
                            <p className={classes.category2}>Payment type Details</p>
                            <div className={classes.formRow}>
                                <DxcInput
                                    label={t('cheque_number')}
                                    required={true}
                                    onChange={() => null}
                                />
                                <DxcDate
                                    label={t('signature_date')}
                                    placeholder
                                    required={true}
                                    format="yyyy-MM-dd"
                                    onChange={() => null}
                                />
                            </div>
                        </>
                    )
                    :
                    (
                        <div className={classes.spinnerContainer}>
                            <DxcSpinner />
                        </div>
                    )
            }
        </>
    )
}

export default FormContent;