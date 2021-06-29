import { DxcDate, DxcInput, DxcSelect, DxcSpinner } from '@dxc-technology/halstack-react';
import { Theme, makeStyles } from '@material-ui/core/styles';

import DateInput from 'theme/components/material/DateInput/DateInput';
import React from 'react';
import SelectInput from 'components/SelectInput/SelectInput';
import TextField from 'components/TextField/TextField';
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
    * amountUP
    * @description The amount of the unsolicited Payment operation
    */
    amountUP: number

    /**
    * data
    * @description The response of new money in resource
    */
    moneyInData: any
}
const useStyles = makeStyles((theme: Theme) => ({
    formRow: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: theme.spacing(4),
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
        moneyInData,
        amountUP
    } = props

    const onChange = (inputName: string, typeInput = 'string') => (newValue: any) => {
        if (typeInput === 'string') {
            setFormData({ ...formData, [inputName]: newValue })
        }
        else if (typeInput === 'number') {
            setFormData({ ...formData, [inputName]: +newValue })
        }
        else {

            return;
        }

    };

    return (
        <>
            {
                moneyInData && !isLoad ?
                    (
                        <>
                            <div className={classes.category1}>{t('money_in')}</div>
                            <div className="w-100 row">
                                <div className="col-4">
                                    <DxcInput
                                        label={t('amount_to_pay')}
                                        value={amountUP + ''}
                                        disabled={true}
                                    />
                                </div>
                                <div className="col-4">
                                    <TextField
                                        propertyName="operation:amount"
                                        type="number"
                                        data={moneyInData}
                                        onChangeMethod={onChange('operation:amount')}
                                    />
                                </div>
                                <div className="col-4">
                                    <SelectInput
                                        data={moneyInData}
                                        propertyName="operation:currency_code"
                                        onChangeMethod={onChange('amount_to_pay')}
                                    />
                                </div>
                                <div className="col-4 mt-4">
                                    <SelectInput
                                        data={moneyInData}
                                        propertyName="money_in:payment_type"
                                        onChangeMethod={onChange('money_in:payment_type')}
                                    />
                                </div>
                                <div className="col-4 mt-4">
                                    <DateInput
                                        propertyName="operation:accounting_date"
                                        data={moneyInData}
                                        onChangeMethod={onChange('operation:accounting_date')}
                                    />
                                </div>
                                <div className="col-4 mt-4">
                                    <DateInput
                                        propertyName="money_in:receipt_date"
                                        data={moneyInData}
                                        onChangeMethod={onChange('money_in:receipt_date')}
                                    />
                                </div>
                                <div className="col-4 mt-4">
                                    <DateInput
                                        propertyName="money_in:deposit_date"
                                        data={moneyInData}
                                        onChangeMethod={onChange('money_in:deposit_date')}
                                    />
                                </div>
                                <div className="col-4 mt-4">
                                    <DateInput
                                        propertyName="operation:value_date"
                                        data={moneyInData}
                                        onChangeMethod={onChange('operation:value_date')}
                                    />
                                </div>
                            </div>
                            <div className="w-100 row">
                                <div className="col-4 mt-4">
                                    <DxcInput
                                        label={t('payer')}
                                        value={payerTitle}
                                        disabled={true}
                                    />
                                </div>
                                <div className="col-4 mt-4">
                                    <SelectInput
                                        propertyName="money_in_administrator"
                                        data={moneyInData}
                                        onChangeMethod={onChange('money_in_administrator')}
                                    />
                                </div>
                                <div className="col-4 mt-4">
                                    <DxcSelect
                                        options={bankAccountList}
                                        onChange={onChange('money_in:deposit_bank_account')}
                                        label={t('deposit_account')}
                                        onChangeMethod={onChange('money_in:deposit_bank_account')}
                                    />
                                </div>
                            </div>
                            <div className={classes.category2 + ' mt-4'}>Payment type Details</div>
                            <div className="row w-100">
                                <div className="col-4">
                                    <DxcInput
                                        label={t('cheque_number')}
                                        required={true}
                                        onChange={() => null}
                                    />
                                </div>
                                <div className="col-4">
                                    <DxcDate
                                        label={t('signature_date')}
                                        placeholder
                                        required={true}
                                        format="yyyy-MM-dd"
                                        onChange={() => null}
                                    />
                                </div>
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