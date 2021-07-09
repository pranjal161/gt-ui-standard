import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import useLabelValue, {useLabelValueProps} from 'hooks/useLabelValue';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(0),
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'left',
        flexDirection: 'column',
        flex: '1 1 auto',
        width: '100%',
    },
    label: {
        color: theme.palette.project.text.label,
        fontFamily: theme.typography.fontFamily,
        fontSize: 14,
        flex: 3,
        textAlign: 'left',
        overflowWrap: 'break-word',
    },
    value: {
        color: theme.palette.text.primary,
        fontFamily: theme.typography.fontFamily,
        flex: 4,
        fontSize: 14,
        textAlign: 'left',
        overflowWrap: 'break-word',
    },
}));

/**
 * Display a Label and its value verticaly
 * @param {props} props Contains information related to the component
 * @returns {*} Return the label and its value
 */
const LabelInBlock: React.FC<useLabelValueProps> = (props: useLabelValueProps) => {
    const classes: any = useStyles();
    const {Label, Value} = useLabelValue(props)

    return (
        <div className={classes.root}>
            <div className={classes.label}>
                <Label/>
            </div>
            <div className={classes.value}>
                <Value/>
            </div>
        </div>
    );
};

export default React.memo(LabelInBlock);
