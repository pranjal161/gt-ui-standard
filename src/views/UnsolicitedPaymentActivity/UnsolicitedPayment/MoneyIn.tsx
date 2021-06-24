import { AddBoxIcon, PaymentIcon } from 'assets/svg';
import { Theme, makeStyles } from '@material-ui/core/styles';

import Button from 'components/Button/Button';
import CreateMoneyIn from 'views/Trainers/TrainingMaxime/CreateMoneyIn/CreateMoneyIn';
import MoneyInResume from 'views/Trainers/TrainingMaxime/MoneyInResume/MoneyInResume';
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

const MoneyIn: React.FC<MoneyInProps> = ({ response }: MoneyInProps) => {
    const classes = useStyles();
    const [isMoneyInOpen, setIsMoneyInOpen]: [boolean, Function] = React.useState(false);
    const onClose = () => {
        setIsMoneyInOpen(false);
    }

    return (
        <Section title="Payment" icon={<PaymentIcon />} actions={
            <Button onClick={() => setIsMoneyInOpen(true)} Icon={AddBoxIcon}
                title="Collection" />} >
            {
                response &&
                <>
                    <MoneyInResume responseUP={response} />

                    {
                        isMoneyInOpen ?
                            <CreateMoneyIn open={isMoneyInOpen} onClose={onClose} response={response} />
                            :
                            <div className={classes.avoidMovement} />

                    }
                </>
            }
        </Section>

    )
}

export default MoneyIn;
