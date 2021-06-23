import { Theme, makeStyles } from '@material-ui/core/styles';

import CreateMoneyIns from './CreateMoneyIns/CreateMoneyIns';
import Header from 'components/Activity/ContractView/Header/Header';
import React from 'react';
import useAia from 'hooks/useAia';

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        width: '90%',
        margin: 'auto',
        padding: theme.spacing(0)
    },
}));

const TrainingMaxime = () => {
    const classes = useStyles();
    const { fetch } = useAia();
    const [activityUrl, onLaunchActivity]: [any, any] = React.useState({});
    const [isOpen, setIsOpen]: [boolean, Function] = React.useState(false);
    const [response, setResponse]: [any, Function] = React.useState(false);

    const myUrlUP = 'http://20.33.40.147:13111/csc/insurance/contracts/ID-W4Fb6FH60/operations/unsolicited_payment/ID-mvQagAgc';

    const getMyUpInformations = async () => {
        try {
            const up_infos = await fetch(myUrlUP)
            setResponse(up_infos);
        }
        catch (err) {
            return err;
        }
    }

    React.useEffect(() => {
        getMyUpInformations();
    }, [])

    const onClose = () => {
        setIsOpen(false);
    }

    return (
        <>
            <h2>.</h2>
            <div className={classes.container}>
                <Header title={'Contract number: PCMR000381'} hRef={'http://20.33.40.147:13111/csc/insurance/contracts/ID-W4Fb6FHtW'} onLaunchActivity={onLaunchActivity}/>
            </div>
            <h3>{activityUrl.hRef}</h3>

            <button onClick={() => setIsOpen(!isOpen)}>click</button>

            {
                response &&
                    <CreateMoneyIns open={isOpen} onClose={onClose} response={response} />
            }

        </>
    )
}

export default TrainingMaxime;
