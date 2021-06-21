import { DxcInput, DxcSelect } from '@dxc-technology/halstack-react';
import { Theme, makeStyles } from '@material-ui/core/styles';

import React from 'react';

// import DateInput from 'theme/components/material/DateInput/DateInput';
// import { getActivities } from 'utils/functions';
// import { useTranslation } from 'react-i18next';

export interface MoneyInFormProps {

    /**
     * BankAccountList
            */
    bankAccountList?: any

    /**
     * formData
            */
    formData: any

    /**
     * setFormData
            */
    setFormData: Function
}
const useStyles = makeStyles((theme: Theme) => ({
    container: {
        // padding: theme.spacing(2, 4),
    },
    formContainer: {

    },
    formRow: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}));

/**
 * EXPLAIN WHAT THE COMPONENT DOES
  * @param {MoneyInFormProps} props Props of the component.
   * @returns {React.component} Display the component.
    */
const MoneyInForm: React.FC<MoneyInFormProps> = (props: MoneyInFormProps) => {
    const classes = useStyles();
    // const { t } = useTranslation();

    const {
        bankAccountList,
        formData,
        setFormData
    } = props

    React.useEffect(() => {
        console.log(bankAccountList)
    }, [bankAccountList])

    React.useEffect(() => {
        console.log(formData)
    }, [])

    const onChange = (inputName: string) => (newValue: any) => {
        console.log(newValue);
        console.log(inputName);

        setFormData({ ...formData, [inputName]: newValue })
    };

    const optionsWithoutIcon = [
        {
            value: 1,
            label: 'Amazon'
        },
        {
            value: 2,
            label: 'Ebay'
        },
        {
            value: 3,
            label: 'Apple'
        }
    ];

    return (
        <div className={classes.container}>
            <div className={classes.formContainer}>
                <div className={classes.formRow}>
                    <DxcInput
                        label="Amount to pay"
                        value={formData.amount}
                        disabled={true}
                    />
                    <DxcInput
                        label="Payment Amount"
                        onChange={onChange('paymentAmount')}
                    />
                    <DxcSelect
                        options={optionsWithoutIcon}
                        onChange={onChange('currency')}
                        label="Currency"
                    />
                </div>
            </div>
        </div>
    )
}

export default MoneyInForm;