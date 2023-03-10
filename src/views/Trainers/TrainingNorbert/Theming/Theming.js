/* eslint-disable */
import {Grid, Paper, TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {createStyles} from '@material-ui/styles';
import {DxcInput} from '@dxc-technology/halstack-react'
import {default as DXCButtons} from './CDK/Buttons/Buttons';
import {default as MatButtons} from './Mat/Buttons/Buttons';


import React from 'react'


const useStyles = makeStyles((theme) => createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            width: 500,
        },
        control: {
            padding: theme.spacing(2),
        },
    }),
);

const Container = ({children, title}) => {
    const classes = useStyles();
    return (
        <Grid item>
            <Paper className={classes.paper}>
                <h1>{title}</h1>
                {children}
            </Paper>
        </Grid>)
}

const Theming = () => {
    const label = 'Product NAME'
    const value = 'IND_ABC'
    const helperText = 'Some important text'

    return (
        <Grid container justify="center" spacing={2}>
            <Container title={'Material'}>
                <TextField label={label} value={value} helperText={helperText}></TextField>
                <MatButtons/>
            </Container>
            <Container title={'CDK'}>
                    <DxcInput
                        label={label}
                        assistiveText={helperText}
                        value={value}
                    />
                    {label}
                <DXCButtons/>

            </Container>
            <Container title={'Other'}>
                <span className={'caption'}>{label}</span>
                <br/>
                {label}
            </Container>
            zaeeza :{label}
        </Grid>)
}

export default Theming
