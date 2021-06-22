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
    * payerTitle : Title of the current owner of the contract
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
                                    onChange={onChange('paymentAmount', 'number')}
                                />
                                <DxcSelect
                                    options={currencySelect}
                                    onChange={onChange('currency')}
                                    label="Currency"
                                />
                            </div>
                            <div className={classes.formRow}>
                                <DxcSelect
                                    options={paymentTypeSelect}
                                    onChange={onChange('paymentMethod')}
                                    label="Payment Method"
                                />
                                <DxcDate
                                    label="Accounting Date"
                                    value={formData.accountingDate}
                                    placeholder
                                    format="dd/MM/yyyy"
                                    onBlur={onBlur('accountingDate')}
                                    onChange={onBlur('accountingDate')}
                                />
                                <DxcDate
                                    label="Receipt Date"
                                    value={formData.receiptDate}
                                    placeholder
                                    format="dd/MM/yyyy"
                                    onBlur={onBlur('receiptDate')}
                                    onChange={onBlur('receiptDate')}
                                />
                                {/* <DateInput propertyName="test" data={formData.receiptDate}/> */}
                            </div>
                            <div className={classes.formRow}>
                                <DxcDate
                                    label="Deposit Date"
                                    value={formData.depositDate}
                                    placeholder
                                    format="dd/MM/yyyy"
                                    onBlur={onBlur('depositDate')}
                                    onChange={onBlur('depositDate')}
                                />
                                <DxcDate
                                    label="Value Date"
                                    value={formData.valueDate}
                                    placeholder
                                    format="dd/MM/yyyy"
                                    onBlur={onBlur('valueDate')}
                                    onChange={onBlur('valueDate')}
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
                                    onChange={onChange('admin')}
                                    label="Administrator"
                                />
                                <DxcSelect
                                    options={bankAccountList}
                                    onChange={onChange('depositAccount')}
                                    label="Deposit Account"
                                />
                            </div>
                            <p className={classes.category2}>Payment type Details</p>
                            <div className={classes.formRow}>
                                <DxcInput
                                    label="Cheque Number"
                                    required={true}
                                    onChange={onChange('chequeNumber')}
                                />
                                <DxcDate
                                    label="Signature Date"
                                    value={formData.signatureDate}
                                    placeholder
                                    required={true}
                                    format="dd/MM/yyyy"
                                    onBlur={onBlur('signatureDate')}
                                    onChange={onBlur('signatureDate')}
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