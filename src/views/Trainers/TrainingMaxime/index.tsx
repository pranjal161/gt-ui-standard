import { Theme, makeStyles } from '@material-ui/core/styles';

import Header from 'components/Activity/ContractView/Header/Header';
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
    const [activityUrl, onLaunchActivity]:[any, any] = React.useState({});

    return (
        <>
            <h2>.</h2>
            <div className={classes.container}>
                <Header title={'Contract number: PCMR000381'} response={contractOperations} onLaunchActivity={onLaunchActivity} hRef={''}/>
            </div>
            <h3>{activityUrl.hRef}</h3>
        </>
    )
}

export default TrainingMaxime;
