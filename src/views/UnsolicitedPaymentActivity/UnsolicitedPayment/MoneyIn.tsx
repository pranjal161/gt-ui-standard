import { AddBoxIcon, PaymentIcon } from 'assets/svg';
import { Theme, makeStyles } from '@material-ui/core/styles';

import { APIConfig } from 'configs/apiConfig';
import { ActivityProps } from 'components/Activity/Activity';
import Button from 'theme/components/material/Button/Button';
import DialogActivityStep from 'components/DialogActivityStep/DialogActivityStep';
import MoneyInDialog from './MoneyInDialog/MoneyInDialog';
import MoneyInList from './MoneyInList/MoneyInList';
import React from 'react';
import Section from 'components/Section/Section';
import { getLink } from 'utils/functions';
import useActivity from 'hooks/useActivity';
import useAia from 'hooks/useAia';
import useResponse from 'hooks/useResponse';
import useSetDataToPatch from 'hooks/useSetDataToPatch';

const useStyles = makeStyles((theme: Theme) => ({
    avoidMovement: {
        padding: theme.spacing(2),
    }
}));

/**
 * The component renders the money in part of the unsolicited payment
  * @param {MoneyInProps} props Props of the component.
  * @description Please don't forget to save the money in at the end of the unsolicited payment process
   * @returns {React.component} Display the component.
    */
const MoneyIn: React.FC<ActivityProps> = (props: { hRef: string }) => {
    const { hRef } = props
    const { activityProps } = useActivity()
    const { mainEntityHRef } = activityProps
    const classes = useStyles();
    const { post, patch } = useAia();
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const [isEdit, setIsEdit] = React.useState<boolean>(false);
    const [response] = useResponse(hRef);
    const { setDataToPost } = useSetDataToPatch();
    const unsolicitedPaymentHref: string = getLink(response && response.data, 'self');
    const payerURI: string = getLink(response && response.data, 'premium:addressee_person');
    const amountUP: number = response?.data['operation:amount'];
    const contractHRef: string = mainEntityHRef

    const [moneyInHRef, setMoneyInHRef] = React.useState<string>('');
    const [moneyInDisplay, setMoneyInDisplay] = React.useState<string>('');

    const onClose = React.useCallback((name = 'default') => {
        if (name === 'UPPatch') {
            patch(hRef, { 'cscaia:money_in': moneyInHRef });
            setDataToPost({ hRef: hRef, property: 'money_in', postHref: moneyInHRef + '/save', payload: {}, step: 'unsolicited_payment'});
        }
        setIsOpen(false);
        setIsEdit(false);
    }, [hRef, moneyInHRef, patch])

    const onEdit = (hRef: string) => {
        setIsEdit(true);
        setMoneyInHRef(hRef);
        setIsOpen(true);
    }

    const onCreate = async () => {
        const moneyInCollection = APIConfig().defaultHostUrl + 'financials/money_ins';
        const res = await post(moneyInCollection, { 'operation:contract': contractHRef });
        setMoneyInHRef(getLink(res.data, 'self'));

        setIsOpen(true);
    }

    const onDelete = async (hRef: string) => {
        await post(hRef + '/cancel', {});
        await patch(unsolicitedPaymentHref, { 'cscaia:money_in': '' })
        setMoneyInHRef('');
        setMoneyInDisplay('');
    }
    React.useEffect(() => {
        if (response && response.data._links['cscaia:money_in']) {
            setMoneyInDisplay(response.data._links['cscaia:money_in'].href)
        }
    }, [response])

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
                    <MoneyInList moneyInHref={moneyInDisplay} onEdit={onEdit} onDelete={onDelete} />

                    {
                        isOpen ?
                            <DialogActivityStep code={'up_create_money_in'}>
                                <MoneyInDialog onClose={onClose} hRef={moneyInHRef} isEdit={isEdit} payerURI={payerURI} amountUP={amountUP} />
                            </DialogActivityStep>
                            :
                            <div className={classes.avoidMovement} />

                    }
                </>
            }
        </Section>

    )
}

export default React.memo(MoneyIn);

