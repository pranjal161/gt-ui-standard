import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

export interface ContractViewProps {

    /**
     * Data coming from API response
     */
    data?: any

    /**
     * Code of the activity
     */
    activityCode: string
}

const useStyles = makeStyles(() => ({
    root: {

    },
}))

const ContractView: React.FC<ContractViewProps> = () => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            Contract detail
        </div>)
}

export default ContractView;
