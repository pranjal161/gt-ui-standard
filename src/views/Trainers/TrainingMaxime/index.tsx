import { Theme, makeStyles } from '@material-ui/core/styles';

import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        width: '90%',
        margin: 'auto',
        padding: theme.spacing(0)
    },
}));

const TrainingMaxime = () => {
    const classes = useStyles();
    
    return (
        <div className={classes.container} >
            <p>Hello Maxime</p>
        </div>
    )
}

export default TrainingMaxime;
