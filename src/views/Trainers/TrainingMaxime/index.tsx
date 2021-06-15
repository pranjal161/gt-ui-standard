import { Theme, makeStyles } from '@material-ui/core/styles';

import ContractDisplayHeader from 'components/ContractDisplayHeader/ContractDisplayHeader';
import React from 'react';
import { contractOperations } from 'assets/staticData/data';

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        width: '90%',
        margin: 'auto'
    },
}));

const TrainingMaxime = () => {
    const classes = useStyles();

    return (
        <>
            <h2>.</h2>
            <div className={classes.container}>
                <ContractDisplayHeader title={'Contract view'} response={contractOperations} />
            </div>

        </>
    )
}

export default TrainingMaxime;