import {Theme, createStyles, makeStyles} from '@material-ui/core/styles';
import Button from 'theme/components/material/Button/Button';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
})
)

// eslint-disable-next-line require-jsdoc
export default function Buttons() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Button variant="contained" color="primary">
                Primary
            </Button>
            <Button variant="contained" color="secondary">
                Secondary
            </Button>
            <Button variant="text">
                Text button
            </Button>
        </div>
    );
}
