import { DxcDate, DxcInput } from '@dxc-technology/halstack-react';
import { Theme, makeStyles } from '@material-ui/core/styles';

import DateInput from 'theme/components/material/DateInput/DateInput';
import DepositAccountInput from './Inputs/DepositAccountInput';
import PayerInput from './Inputs/PayerInput';
import React from 'react';
import SelectInput from 'components/SelectInput/SelectInput';
import TextField from 'components/TextField/TextField';
import { useTranslation } from 'react-i18next';

export interface DialogContentProps {

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

    /**
       * moneyInData
       * @description The response of new money in resource
       */
    moneyInData: any

    /**
       * depositAccountURI
       * @description href of the deposit account to display his value
       */
    depositAccountURI: string

    hRef: string
}
const useStyles = makeStyles((theme: Theme) => ({
    formContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'column',
        padding: theme.spacing(0, 4),
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
    }
}));

/**
 * The component renders a form for Money In case.
  * @param {FormContentProps} props Props of the component.
   * @returns {React.component} Display the component.
    */
const DialogContent: React.FC<DialogContentProps> = (props: DialogContentProps) => {
    const classes = useStyles();
    const { t } = useTranslation();

    const {
        payerURI,
        amountUP,
        moneyInData,
        depositAccountURI,
        hRef
    } = props

    return (
        <>
            <div className={classes.formContainer}>
                {
                    moneyInData &&
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
                                    property="operation:amount"
                                    type="number"
                                    hRef={hRef}
                                />
                            </div>
                            <div className="col-4">
                                <SelectInput
                                    hRef={hRef}
                                    property="operation:currency_code"
                                />
                            </div>
                            <div className="col-4 mt-4">
                                <SelectInput
                                    hRef={hRef}
                                    property="money_in:payment_type"
                                />
                            </div>
                            <div className="col-4 mt-4">
                                <DateInput
                                    hRef={hRef}
                                    property="operation:accounting_date"
                                />
                            </div>
                            <div className="col-4 mt-4">
                                <DateInput
                                    hRef={hRef}
                                    property="money_in:receipt_date"
                                />
                            </div>
                            <div className="col-4 mt-4">
                                <DateInput
                                    hRef={hRef} 
                                    property="money_in:deposit_date"
                                />
                            </div>
                            <div className="col-4 mt-4">
                                <DateInput
                                    hRef={hRef}
                                    property="operation:value_date"
                                />
                            </div>
                        </div>
                        <div className="w-100 row">
                            <PayerInput href={payerURI} />
                            <div className="col-4 mt-4">
                                <SelectInput
                                    hRef={hRef}
                                    property="money_in_administrator"
                                />
                            </div>
                            <DepositAccountInput href={depositAccountURI}/>
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
                }
            </div>
        </>
    )
}

export default DialogContent;
