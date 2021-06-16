/* eslint-disable */
import {makeStyles} from '@material-ui/core/styles';
import baContext from 'context/baContext';
import useActivity from 'hooks/useActivity';
import useAia from 'hooks/useAia';
import useConfigurations from 'hooks/useConfigurations';
import React, {useContext, useEffect} from 'react';
import {useSelector} from 'react-redux';
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

    const classes: any = useStyles()
    const {getActivityConf} = useConfigurations()

    const configurations = getActivityConf({activityCode}) // activityCode can also be store in redux

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

    const ActivityConf = configurations.skeleton
    const HeaderConf = configurations.header

    return (
        <div className={classes.root}>
            <div className="col-12">
                <HeaderConf title={title}/>
            </div>
            <div className={classes.root}>
                <ActivityConf data={response} activityCode={activityCode}/>
            </div>
        </div>
    )
}

export default Activity;
