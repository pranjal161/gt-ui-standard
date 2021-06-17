import {makeStyles} from '@material-ui/core/styles';
import baContext from 'context/baContext';
import useActivity from 'hooks/useActivity';
import useAia from 'hooks/useAia';
import useConfigurations from 'hooks/useConfigurations';
import useTabs from 'hooks/useTabs';
import React, {useContext, useEffect} from 'react';
import {useSelector} from 'react-redux';

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
     * hRef of the main entity
     */
    mainEntityHRef: string

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

const Activity: React.FC<ActivityProps> = (props: ActivityProps) => {
    const {action, hRef, title} = props
    const {startActivity, stopActivity} = useActivity()
    const aia: any = useAia()

    const context = useContext(baContext);
    const baId: string = context.baId ? context.baId : '';
    const response = useSelector((state: any) => state.aia[baId] && state.aia[baId][hRef]);

    const classes: any = useStyles()
    const {getActivityConf} = useConfigurations()

    const configurations = getActivityConf(props) // activityCode can also be store in redux

    const {openNewTab} = useTabs()
    console.log('response', response)
    console.log('Activity props', props)

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

    const SkeletonConf = configurations.skeleton
    const HeaderConf = configurations.header

    const onLaunchActivity = (operation: any) => {
        openNewTab({
            id: operation.href,
            type: 'contract_operation',
            hRef: operation.href,
            title: operation.title,
            subTitle: operation.title,
            activityProps:{
                activityCode : operation.name,
                hRef:operation.href,
                mainEntityHRef : props.hRef,
            }
        })
    }

    console.log('props', props)

    return (
        <div className={classes.root}>
            <div className="col-12">
                <HeaderConf title={title} {...props} onLaunchActivity={onLaunchActivity}/>
            </div>
            <div className={classes.root}>
                <SkeletonConf data={response} {...props}/>
            </div>
        </div>
    )
}

export default Activity;
