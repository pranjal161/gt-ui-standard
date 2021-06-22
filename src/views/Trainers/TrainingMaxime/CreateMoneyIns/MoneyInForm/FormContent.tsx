import { DxcDate, DxcInput, DxcSelect, DxcSpinner } from '@dxc-technology/halstack-react';
import { Theme, makeStyles } from '@material-ui/core/styles';

import React from 'react';

// import { useTranslation } from 'react-i18next';
export interface FormContentProps {

    /**
     * formData
            */
    formData: any

    /**
     * setFormData
            */
    setFormData: Function

    /**
    * isLoad
           */
    isLoad: boolean;

    /**
    * bankAccountList
           */
    bankAccountList: any;

    /**
    * payerTitle
    * @description title of the payer to display a label
           */
     payerTitle: string

    /**
    * currencySelect : API properties formatted for dxc select
           */
    currencySelect: any

    /**
    * paymentTypeSelect : API properties formatted for dxc select
           */
    paymentTypeSelect: any

    /**
    * adminSelect : API properties formatted for dxc select
           */
    adminSelect: any
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
 * EXPLAIN WHAT THE COMPONENT DOES
  * @param {FormContentProps} props Props of the component.
   * @returns {React.component} Display the component.
    */
const FormContent: React.FC<FormContentProps> = (props: FormContentProps) => {
    const classes = useStyles();
    // const { t } = useTranslation();
    const {
        formData,
        setFormData,
        isLoad,
        bankAccountList,
        payerTitle,
        currencySelect,
        paymentTypeSelect,
        adminSelect
    } = props

    const onChange = (inputName: string, typeInput = 'string') => (newValue: any) => {
        if (typeInput === 'string') {
            setFormData({ ...formData, [inputName]: newValue })
        }
        else if (typeInput === 'number') {
            setFormData({ ...formData, [inputName]: +newValue })
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
                            <p className={classes.category1}>Money In</p>
                            <div className={classes.formRow}>
                                <DxcInput
                                    label="Amount to pay"
                                    value={formData.amount}
                                    disabled={true}
                                />
                                <DxcInput
                                    label="Payment Amount"
                                    onChange={onChange('operation:amount', 'number')}
                                />
                                <DxcSelect
                                    options={currencySelect}
                                    onChange={onChange('operation:currency_code')}
                                    label="Currency"
                                />
                            </div>
                            <div className={classes.formRow}>
                                <DxcSelect
                                    options={paymentTypeSelect}
                                    onChange={onChange('money_in:payment_type')}
                                    label="Payment Method"
                                />
                                <DxcDate
                                    label="Accounting Date"
                                    value={formData['operation:accounting_date']}
                                    placeholder
                                    format="yyyy-MM-dd"
                                    onChange={onBlur('operation:accounting_date')}
                                />
                                <DxcDate
                                    label="Receipt Date"
                                    value={formData['money_in:receipt_date']}
                                    placeholder
                                    format="yyyy-MM-dd"
                                    onChange={onBlur('money_in:receipt_date')}
                                />
                                {/* <DateInput propertyName="test" data={formData.receiptDate}/> */}
                            </div>
                            <div className={classes.formRow}>
                                <DxcDate
                                    label="Deposit Date"
                                    value={formData['money_in:deposit_date']}
                                    placeholder
                                    format="yyyy-MM-dd"
                                    onChange={onBlur('money_in:deposit_date')}
                                />
                                <DxcDate
                                    label="Value Date"
                                    value={formData['operation:value_date']}
                                    placeholder
                                    format="yyyy-MM-dd"
                                    onChange={onBlur('operation:value_date')}
                                />
                            </div>
                            <div className={classes.formRow}>
                                <DxcInput
                                    label="Payer"
                                    value={payerTitle}
                                    disabled={true}
                                />
                                <DxcSelect
                                    options={adminSelect}
                                    onChange={onChange('money_in_administrator')}
                                    label="Administrator"
                                />
                                <DxcSelect
                                    options={bankAccountList}
                                    onChange={onChange('money_in:deposit_bank_account')}
                                    label="Deposit Account"
                                />
                            </div>
                            <p className={classes.category2}>Payment type Details</p>
                            <div className={classes.formRow}>
                                {/* <DxcInput
                                    label="Cheque Number"
                                    required={true}
                                    onChange={onChange('chequeNumber')}
                                />
                                <DxcDate
                                    label="Signature Date"
                                    value={formData.signatureDate}
                                    placeholder
                                    required={true}
                                    format="yyyy-MM-dd"
                                    onBlur={onBlur('signatureDate')}
                                    onChange={onBlur('signatureDate')}
                                /> */}
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

/*
{
"money_in:deposit_bank_account": "http://20.33.40.147:13111/csc/insurance/persons/ID-wJsQC7FAZ/bank_accounts/ID-EIBbf31Fr",
"money_in:deposit_date": "2021-06-26",
"money_in:payer_person": "http://20.33.40.147:13111/csc/insurance/persons/ID-wJsQC7FAZ",
"money_in:payment_type": "check_deposit",
"money_in:receipt_date": "2021-06-24",
"money_in_administrator": "CAISSE",
"operation:amount": 3000,
"operation:contract": "http://20.33.40.147:13111/csc/insurance/contracts/ID-W4Fb6FH60",
"operation:currency_code": "eur",
"operation:value_date": "2021-06-29"
}
*/