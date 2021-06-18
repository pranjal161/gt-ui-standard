import {makeStyles} from '@material-ui/core/styles';
import React from 'react';

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

const useStyles = makeStyles((theme) => ({
    root: {

    },
}))

const ContractView: React.FC<ContractViewProps> = (props: any) => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            Contract detail
        </div>)
}

export default ContractView;
