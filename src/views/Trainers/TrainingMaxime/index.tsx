import { Theme, makeStyles } from '@material-ui/core/styles';

import Header from 'views/ContractVIew/Header/Header';
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

    const [activityUrl, setActivityUrl] = React.useState({
        href: '',
        name: '',
        contractHref: ''
    });

    const onLaunchActivity = (element: any) => {
        setActivityUrl(element)
    }

    return (
        <>
            <h2>.</h2>
            <div className={classes.container}>
                <Header title={'Contract number: PCMR000381'} response={contractOperations} onLaunchActivity={onLaunchActivity}/>
            </div>
            <h3>{activityUrl?.href}</h3>
            <h3>{activityUrl?.contractHref}</h3>
        </>
    )
}

export default TrainingMaxime;