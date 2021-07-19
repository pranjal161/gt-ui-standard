import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import useLabelValue, {useLabelValueProps} from 'hooks/useLabelValue';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(0),
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        flex: '1 1 auto',
        width: '100%',
        height: theme.spacing(3),
    },
    label: {
        color: theme.palette.project.text.label,
        fontFamily: theme.typography.fontFamily,
        fontSize: 14,
        flex: 3,
        textAlign: 'left',
        width: '50%',
        overflowWrap: 'break-word',
    },
    value: {
        color: theme.palette.text.primary,
        fontFamily: theme.typography.fontFamily,
        flex: 4,
        fontSize: 14,
        textAlign: 'left',
        width: '50%',
        overflowWrap: 'break-word',
    },
}));

/**
 * Display a LabelInline
 * @param {props} props Contains information related to the LabelInline
 * @returns {*} Return the LabelInline
 */
const LabelInline: React.FC<useLabelValueProps> = (props: useLabelValueProps) => {
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

export default React.memo(LabelInline);
