/* eslint-disable */
import {makeStyles} from '@material-ui/core/styles';
import {AddBoxIcon, DistributorIcon, PaymentIcon} from 'assets/svg';
import clsx from 'clsx';

import Button from 'components/Button/Button';
import React from 'react';
import Section from 'components/Section/Section';
import ExampleOfSideBar from 'stories/ExampleOfSideBar/ExampleOfSideBar';
import TitleBar from './TitleBar/TitleBar';

//export interface ActivityProps {}

/**
 * props to define and describe
 */
// prop1: any
//}

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4),
        backgroundColor: '#F2F5F7'
    },
    header: {
        display: 'flex',
        alignContent: 'center',
        justifyItems: 'left',
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(3),
        '& > *': {
            marginRight: theme.spacing(2)
        }
    },
    body: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        height: '100%'
    },
    bodyLeft: {
        flex: '1 1 auto',
        marginRight: theme.spacing(4)
    },
    bodyRight: {
        minWidth: '44px'
    },
    content: {
        '& > *': {
            marginBottom: theme.spacing(2)
        }
    },
    sidebar: {
        backgroundColor: theme.palette.background.paper
    }
}))

const Activity = () => {
    const classes: any = useStyles()

    return (
        <div className={classes.root}>
            <div className={classes.body}>
                <div className={classes.bodyLeft}>

                    <div className="col-12">
                        <TitleBar></TitleBar>
                    </div>
                    <div className={classes.header}>
                        <div>---------Date effect input-------</div>
                        <div>------------------------------------Stepper------------------------------------</div>
                    </div>

                    <div className={classes.content}>
                        <div className="col-12">
                            <Section title="General Information" icon={<PaymentIcon/>}/>
                        </div>
                        <div className="col-12">
                            <Section title="Payment" icon={<PaymentIcon/>} actions={
                                <Button onClick={() => console.log('test button')} Icon={AddBoxIcon}
                                        title="Test Button"></Button>}/>
                        </div>
                        <div className="col-12">
                            <Section title="Distributor Management" icon={<DistributorIcon/>} actions={
                                <div>
                                    <Button onClick={() => console.log('test button')} Icon={AddBoxIcon}
                                            title="Test Button"></Button>
                                    <Button onClick={() => console.log('test button')} Icon={AddBoxIcon}
                                            title="Test Button"></Button>
                                </div>}/>
                        </div>
                    </div>
                </div>
                <div className={clsx(classes.bodyRight, classes.sidebar)}>
                    <ExampleOfSideBar/>
                </div>
            </div>
        </div>
    )
}

export default Activity;
