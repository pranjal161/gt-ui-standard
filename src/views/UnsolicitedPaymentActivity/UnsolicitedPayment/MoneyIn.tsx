import { AddBoxIcon, PaymentIcon } from 'assets/svg';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { getLink, isResponseConsistent } from 'utils/functions';

import { APIConfig } from 'configs/apiConfig';
import ActivityStep from 'components/ActivityStep/ActivityStep';
import Button from 'theme/components/material/Button/Button';
import MoneyInDialog from './MoneyInDialog/MoneyInDialog';
import MoneyInList from './MoneyInList/MoneyInList';
import React from 'react';
import Section from 'components/Section/Section';
import useAia from 'hooks/useAia';
import useResponse from 'hooks/useResponse';

export interface MoneyInProps {

    /**
     * href of current unsolicited payment
     */
    activityHref: string
}

const useStyles = makeStyles((theme: Theme) => ({
    avoidMovement: {
        padding: theme.spacing(2),
    }
}));

const MoneyIn: React.FC<MoneyInProps> = ({ activityHref }: MoneyInProps) => {
    const classes = useStyles();
    const { post, patch } = useAia();
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const [isEdit, setIsEdit] = React.useState<boolean>(false);
    const [response] = useResponse(activityHref);

    const unsolicitedPaymentHref: string = getLink(response && response.data, 'self');
    const payerURI: string = getLink(response && response.data, 'premium:addressee_person');
    const amountUP: number = response?.data['operation:amount'];
    const contractURI: string = unsolicitedPaymentHref && (unsolicitedPaymentHref).split('/operations')[0]; // CUT THE USELESS PARTS OF THE

    const [moneyInHRef, setMoneyInHRef]: [any, Function] = React.useState();

    const onClose = async (name = 'default', response: any = false) => {
        if (name === 'UPPatch') {
            if (response && response.data && isResponseConsistent(response.data)) {
                await patch(activityHref, { 'cscaia:money_in': moneyInHRef });
            }
        }
        setIsOpen(false);
        setIsEdit(false);
    }

    const onEdit = () => {
        setIsEdit(true);
        setIsOpen(true);
    }

    const onCreate = async () => {
        const moneyInCollection = APIConfig().defaultHostUrl + 'financials/money_ins';
        const res = await post(moneyInCollection, { 'operation:contract': contractURI });
        setMoneyInHRef(getLink(res.data, 'self'));

        setIsOpen(true);
    }

    return (
        <Section title="Payment" icon={<PaymentIcon />} actions={
            <>
                <Button color="primary" onClick={() => onCreate()} endIcon={<AddBoxIcon />}>
                    Collection
                </Button>
            </>} >
            {
                response &&
                <>
                    <MoneyInList moneyInHref={getLink(response.data, 'cscaia:money_in')} onEdit={onEdit} unsolicitedPaymentHref={unsolicitedPaymentHref} />

                    {
                        isOpen ?
                            <ActivityStep code={'up_create_money_in'}>
                                <MoneyInDialog open={isOpen} onClose={onClose} href={moneyInHRef} isEdit={isEdit} payerURI={payerURI} amountUP={amountUP}/>
                            </ActivityStep>
                            :
                            <div className={classes.avoidMovement} />

                    }
                </>
            }
        </Section>

    )
}

export default MoneyIn;

