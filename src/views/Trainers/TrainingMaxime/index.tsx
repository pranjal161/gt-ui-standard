import { Theme, makeStyles } from '@material-ui/core/styles';

import Header from 'components/Activity/ContractView/Header/Header';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        width: '90%',
        margin: 'auto'
    },
}));

const TrainingMaxime = () => {
    const classes = useStyles();
    const [activityUrl, onLaunchActivity]:[any, any] = React.useState({});
    const [isOpen, setIsOpen]:[boolean, Function] = React.useState(false);

    return (
        <>
            <h2>.</h2>
            <div className={classes.container}>
                <Header title={'Contract number: PCMR000381'} hRef={ 'http://20.33.40.147:13111/csc/insurance/contracts/ID-W4Fb6FHtW'} onLaunchActivity={onLaunchActivity}/>
            </div>
            <h3>{activityUrl.hRef}</h3>

            <button onClick={()=>{setIsOpen(true)}}>click</button>
        </>
    )
}

export default TrainingMaxime;
