/* eslint-disable */
import {makeStyles} from '@material-ui/core/styles';
import {AddBoxIcon, DistributorIcon, PaymentIcon} from 'assets/svg';
import clsx from 'clsx';

import Button from 'components/Button/Button';
import WithScroll from 'components/WithScroll/WithScroll';
import baContext from 'context/baContext';
import withActivity from 'hocs/withActivity';
import useActivity from 'hooks/useActivity';
import useAia from 'hooks/useAia';
import React, {useContext, useEffect, useRef, useState} from 'react';
import Section from 'components/Section/Section';
import {useSelector} from 'react-redux';
import ExampleOfSideBar from 'stories/ExampleOfSideBar/ExampleOfSideBar';
import {getLink} from 'utils/functions';
import TitleBar from './TitleBar/TitleBar';


const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
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
    content: ({contentRef}: any) => {
        const {offsetTop} = contentRef && contentRef.current || {offsetTop: ''}

        return {
            height: `calc(100vh - ${offsetTop}px - 100px)`, // Footer to remove
            overflowY: 'hidden',
            '& > * > div': {
                marginBottom: theme.spacing(2)
            }
        }
    },
    sidebar: ({sidebarRef}: any) => {
        const {offsetTop} = sidebarRef && sidebarRef.current || {offsetTop: ''}

        return {
            height: `calc(100vh - ${offsetTop}px - 100px)`, // Footer to remove
            backgroundColor: theme.palette.background.paper
        }
    }
}))


export interface ActivityProps {

    /**
     * code of the activity
     */
    activityCode: any

    /**
     * hRef of the activity to Post
     */
    hRef: string

    /**
     * API action type
     */
    action: string

    title?: string
}


const Activity:React.FC<ActivityProps> = ({activityCode, action, hRef, title}:ActivityProps) => {
    const {startActivity, stopActivity} = useActivity()
    const aia:any = useAia()

    const context = useContext(baContext);
    const baId: string = context.baId ? context.baId : '';
    const response = useSelector((state: any) => state.aia[baId] && state.aia[baId][hRef]);

    const contentRef = useRef(null)
    const sidebarRef = useRef(null)
    const classes: any = useStyles({contentRef, sidebarRef})

    console.log('response', response)

    useEffect(() => {
        startActivity();

        /**
         * Do the main call
         *
         */
        aia[action](hRef)

        return () => {
            stopActivity()
        }
    }, [])

    return (
        <div className={classes.root}>
            <div className="col-12">
                <TitleBar title={title}/>
            </div>
            <div className={classes.body}>
                <div className={classes.bodyLeft}>

                    <div className={classes.header}>
                        <div>---------Date effect input-------</div>
                        <div>------------------------------------Stepper------------------------------------</div>
                    </div>

                    <div ref={contentRef} className={classes.content}>
                        <WithScroll>
                            <div className="col-12">
                                <Section title="General Information" icon={<PaymentIcon/>}>
                                    TEST 1
                                    TEst 2
                                </Section>
                            </div>
                            <div className="col-12">
                                <Section title="Payment" icon={<PaymentIcon/>} actions={
                                    <Button onClick={() => console.log('test button')} Icon={AddBoxIcon}
                                            title="Test Button"/>}/>
                            </div>
                            <div className="col-12">
                                <Section title="Distributor Management 1" icon={<DistributorIcon/>} actions={
                                    <div>
                                        <Button onClick={() => console.log('test button')} Icon={AddBoxIcon}
                                                mode={'secondary'}
                                                title="Secondary"/>
                                        <Button onClick={() => console.log('test button')} Icon={AddBoxIcon}
                                                title="Test Button"/>
                                    </div>}/>
                            </div>
                            <div className="col-12">
                                <Section title="Distributor Management 2" icon={<DistributorIcon/>} actions={
                                    <div>
                                        <Button onClick={() => console.log('test button')} Icon={AddBoxIcon}
                                                mode={'secondary'}
                                                title="Secondary"/>
                                        <Button onClick={() => console.log('test button')} Icon={AddBoxIcon}
                                                title="Test Button"/>
                                    </div>}/>

                            </div>
                            <div className="col-12">
                                <Section title="Distributor Management 3" icon={<DistributorIcon/>} actions={
                                    <div>
                                        <Button onClick={() => console.log('test button')} Icon={AddBoxIcon}
                                                mode={'secondary'}
                                                title="Secondary"/>
                                        <Button onClick={() => console.log('test button')} Icon={AddBoxIcon}
                                                title="Test Button"/>
                                    </div>}/>
                            </div>
                            <div className="col-12">
                                <Section title="Distributor Management 4" icon={<DistributorIcon/>} actions={
                                    <div>
                                        <Button onClick={() => console.log('test button')} Icon={AddBoxIcon}
                                                mode={'secondary'}
                                                title="Secondary"/>
                                        <Button onClick={() => console.log('test button')} Icon={AddBoxIcon}
                                                title="Test Button"/>
                                    </div>}/>
                            </div>
                        </WithScroll>
                    </div>
                </div>
                <div ref={sidebarRef} className={clsx(classes.bodyRight, classes.sidebar)}>
                    <ExampleOfSideBar/>
                </div>
            </div>
        </div>
    )
}

export default Activity;
