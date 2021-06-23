import { Theme, makeStyles } from '@material-ui/core/styles';

import FormContent from './FormContent';
import React from 'react';
import useAia from 'hooks/useAia';

// import { useTranslation } from 'react-i18next';
export interface MoneyInFormProps {
    
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
    * payerURI
    * @description href of the contract's owner to display his name
    */
    payerURI: string

    /**
    * isLoad
    * @description React state to know if content is on loading or loaded
    */
    isLoad: boolean;

    /**
    * setIsLoad
    * @description React setter for isLoad state
    */
    setIsLoad: Function;

    /**
    * bankAccountList
    * @description API properties formatted for dxc select
    */
    bankAccountList: any;

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
    formContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'column',
        padding: theme.spacing(0, 4),
    }
}));

/**
 * EXPLAIN WHAT THE COMPONENT DOES
  * @param {MoneyInFormProps} props Props of the component.
   * @returns {React.component} Display the component.
    */
const MoneyInForm: React.FC<MoneyInFormProps> = (props: MoneyInFormProps) => {
    const classes = useStyles();
    const { fetch } = useAia();
    // const { t } = useTranslation();

    const {
        formData,
        setFormData,
        payerURI,
        isLoad,
        setIsLoad,
        bankAccountList,
        currencySelect,
        paymentTypeSelect,
        adminSelect,
        amountUP
    } = props
    const [payerTitle, setPayerTitle]: [string, Function] = React.useState('');

    const getPayerName: Function = async () => {
        try {
            setIsLoad(true);
            const res: any = await fetch(payerURI);
            setPayerTitle(res.data._links.self.name);
            setFormData({ ...formData, 'money_in:payer_person': res.data._links.self.href })

            setIsLoad(false);
        }
        catch (err: any) {
            setIsLoad(false);

            return err;
        }
    }

    React.useEffect(() => {
        if (!payerTitle) {
            getPayerName();
        }
    }, [])

    return (
        <>
            <div className={classes.formContainer}>
                <FormContent
                    formData={formData}
                    setFormData={setFormData}
                    isLoad={isLoad}
                    bankAccountList={bankAccountList}
                    payerTitle={payerTitle}
                    currencySelect={currencySelect}
                    paymentTypeSelect={paymentTypeSelect}
                    adminSelect={adminSelect}
                    amountUP={amountUP}
                />
            </div>
        </>
    )
}

export default MoneyInForm;