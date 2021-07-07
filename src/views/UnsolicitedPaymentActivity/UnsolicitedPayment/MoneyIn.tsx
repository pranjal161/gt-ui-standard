import {AddBoxIcon, PaymentIcon} from 'assets/svg';
import {Theme, makeStyles} from '@material-ui/core/styles';
import ActivityStep from 'components/ActivityStep/ActivityStep';

import Button from 'components/Button/Button';
import CreateMoneyIn from './CreateMoneyIn/CreateMoneyIn';
import MoneyInResume from './MoneyInResume/MoneyInResume';
import React from 'react';
import Section from 'components/Section/Section';

export interface MoneyInProps {

    /**
     * API response of API for the entity
     */
    response: any
}

const useStyles = makeStyles((theme: Theme) => ({
    avoidMovement: {
        padding: theme.spacing(2),
    }
}));

const MoneyIn: React.FC<MoneyInProps> = ({response}: MoneyInProps) => {
    const classes = useStyles();
    const [isMoneyInOpen, setIsMoneyInOpen]: [boolean, Function] = React.useState(false);
    const onClose = () => {
        setIsMoneyInOpen(false);
    }

    return (
        <Section title="Payment" icon={<PaymentIcon/>} actions={
            <Button onClick={() => setIsMoneyInOpen(true)} Icon={AddBoxIcon}
                title="Collection"/>}>
            {
                response &&
                <>
                    <MoneyInResume responseUP={response}/>

                    {
                        isMoneyInOpen ? <ActivityStep code={'up_create_money_in'}>
                            <CreateMoneyIn open={isMoneyInOpen} onClose={onClose} response={response}/>
                        </ActivityStep>
                            :
                            <div className={classes.avoidMovement}/>

                    }
                </>
            }
        </Section>

    )
}

export default React.memo(MoneyIn);
