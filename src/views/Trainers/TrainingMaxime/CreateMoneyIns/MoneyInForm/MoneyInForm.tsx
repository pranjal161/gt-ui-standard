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
            */
    setFormData: Function

    /**
    * payerURI
           */
    payerURI: string

    /**
    * isLoad
           */
    isLoad: boolean;

    /**
    * setIsLoad
           */
    setIsLoad: Function;

    /**
    * bankAccountList
           */
    bankAccountList: any;

    /**
    * setBankAccountList
           */
    setBankAccountList: Function;

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
}
const useStyles = makeStyles((theme: Theme) => ({
    formContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'column',
        padding: theme.spacing(0, 4),
    },
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
        // payerURI,
        isLoad,
        setIsLoad,
        bankAccountList,
        setBankAccountList,
        currencySelect,
        paymentTypeSelect,
        adminSelect
    } = props
    const [payerTitle, setPayerTitle]: [string, Function] = React.useState('');

    const getAccountList: Function = async () => {
        try {
            setIsLoad(true);
            const res: any = await fetch('http://20.33.40.147:13111/csc/insurance/persons/ID-wJsQC7FAZ');
            setPayerTitle(res.data._links.self.name);

            setFormData({...formData, 'money_in:payer_person': res.data._links.self.href})

            const accountPayer = await fetch(res.data._links['person:bank_account_list'].href);
            let accountList: any = [];
            console.log({ accountPayer })
            if (accountPayer.data._count === 0) {
                accountList = [...accountList, { value: '', label: 'No account available' }]
            }
            else if(accountPayer.data._count > 1) {
                accountPayer.data._links.item.map((item: any) => (
                    accountList.push({
                        value: item.href,
                        label: item.title
                    })
                ))
            }
            else if(accountPayer.data._count === 1){
                accountList.push({
                    value: accountPayer.data._links.item.href,
                    label: accountPayer.data._links.item.title
                })
            }
            console.log(accountList)
            setBankAccountList(accountList);
            setIsLoad(false);
        }
        catch (err: any) {
            setIsLoad(false);

            return err;
        }
    }

    React.useEffect(() => {
        if (!bankAccountList) {
            getAccountList();
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
                />
            </div>
        </>
    )
}

export default MoneyInForm;