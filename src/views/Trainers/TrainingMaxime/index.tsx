import { Theme, makeStyles } from '@material-ui/core/styles';

import ContractDisplayHeader from 'components/ContractDisplayHeader/ContractDisplayHeader';
import React from 'react';
import { contractOperations, } from 'assets/staticData/data';

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        width: '90%',
        margin: 'auto'
    },
}));

const TrainingMaxime = () => {
    const classes = useStyles();

    const [activityUrl, setActivityUrl] = React.useState('');

    return (
        <>
            <h2>.</h2>
            <div className={classes.container}>
                <ContractDisplayHeader title={'Contract number: PCMR000381'} response={contractOperations} setActivityUrl={setActivityUrl}/>
            </div>
            <h3>{activityUrl}</h3>
        </>
    )
}

export default TrainingMaxime;