import {Theme, createStyles, makeStyles} from '@material-ui/core/styles';
import {Button} from '@material-ui/core'
import React from 'react';

const useStyles = makeStyles((theme: Theme) => {
    console.log('theme', theme)

    return createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
    })
});

// eslint-disable-next-line require-jsdoc
export default function Buttons() {
    const classes = useStyles();
    console.log('classes, ', classes)
    
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
