import {makeStyles} from '@material-ui/core/styles';
import {AddBoxIcon, DistributorIcon, PaymentIcon} from 'assets/svg';
import clsx from 'clsx';
import Button from 'components/Button/Button';
import Section from 'components/Section/Section';
import WithScroll from 'components/WithScroll/WithScroll';
import useConfigurations from 'hooks/useConfigurations';
import React, {useCallback, useState} from 'react';

export interface ContractUpsertProps {

    /**
     * Data coming from API response
     */
    data?:any

    /**
     * Code of the activity
     */
    activityCode:string
}

const useStyles = makeStyles((theme) => ({
    root: {

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
    content: ({contentOffsetTop=''}: any) => ({
        height: `calc(100vh - ${contentOffsetTop}px - 100px)`, // Footer to remove
        overflowY: 'hidden',
        '& > * > div': {
            marginBottom: theme.spacing(2)
        }
    }),
    sidebar: ({sideBarOffsetTop=''}: any) => ({
        height: `calc(100vh - ${sideBarOffsetTop}px - 100px)`, // Footer to remove
        backgroundColor: theme.palette.background.paper
    })
}))

const ContractUpsert:React.FC<ContractUpsertProps> = ({activityCode}:ContractUpsertProps) => {
    const [contentOffsetTop, setContentOffsetTop] = useState()
    const [sideBarOffsetTop, setSideBarOffsetTop] = useState()
    const {getActivityConf} = useConfigurations()

    const classes: any = useStyles({contentOffsetTop, sideBarOffsetTop})

    const handleContentOffsetTop = useCallback((node) => {
        if (node !== null) {
            setContentOffsetTop(node.offsetTop);
        }
    }, []);

    const handleSideBarOffsetTop = useCallback((node) => {
        if (node !== null) {
            setSideBarOffsetTop(node.offsetTop);
        }
    }, []);

    const configurations = getActivityConf({activityCode})

    const SideBarConf = configurations.sidebar
    
    return (
        <div className={classes.body}>
            <div className={classes.bodyLeft}>

                <div className={classes.header}>
                    <div>---------Date effect input-------</div>
                    <div>------------------------------------Stepper------------------------------------</div>
                </div>

                <div ref={handleContentOffsetTop} className={classes.content}>
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
            <div ref={handleSideBarOffsetTop} className={clsx(classes.bodyRight, classes.sidebar)}>
                <SideBarConf/>
            </div>
        </div>
    );
}

export default ContractUpsert;
