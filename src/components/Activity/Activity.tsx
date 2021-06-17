import React, {useContext, useEffect} from 'react';
import baContext from 'context/baContext';
import {makeStyles} from '@material-ui/core/styles';
import useActivity from 'hooks/useActivity';
import useAia from 'hooks/useAia';
import useConfigurations from 'hooks/useConfigurations';
import {useSelector} from 'react-redux';
import useTabs from 'hooks/useTabs';
import {useTranslation} from 'react-i18next';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4,4,0,4),
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
     * Can be ticket, contract, person, claims,
     */
    entityType:string

    /**
     * hRef of the entity
     */
    hRef: string

    /**
     * title
     */
    title: string

    /**
     * hRef of the main entity
     */
    mainEntityHRef: string

}

const Activity: React.FC<ActivityProps> = (props: ActivityProps) => {
    const {hRef} = props
    const {startActivity, stopActivity} = useActivity()
    const aia: any = useAia()

    const {t} = useTranslation()

    const context = useContext(baContext);
    const baId: string = context.baId ? context.baId : '';
    const response = useSelector((state: any) => state.aia[baId] && state.aia[baId][hRef]);

    const classes: any = useStyles()
    const {getActivityConf} = useConfigurations()

    const configurations = getActivityConf(props) // activityCode can also be store in redux
    const {openNewTab} = useTabs()

    useEffect(() => {
        startActivity();

        /**
         * Main API call
         *
         */
        aia.fetch(hRef)

        return () => {
            stopActivity()
        }
    }, [])

    const SkeletonConf = configurations && configurations.skeleton
    const HeaderConf = configurations && configurations.header

    const onLaunchActivity = (operation: any, entityType:string) => {
        openNewTab({
            id: operation.href,
            subTitle: t('common:businessActivityLabel'),
            activityProps:{
                title:operation.title,
                entityType,
                activityCode : operation.name,
                hRef:operation.href,
                mainEntityHRef : props.hRef,
            }
        })
    }

    return (
        <div className={classes.root}>
            <div className="col-12">
                {HeaderConf && <HeaderConf {...props} onLaunchActivity={onLaunchActivity}/>}
            </div>
            <div className={classes.skeleton}>
                {SkeletonConf && <SkeletonConf data={response} {...props}/> }
            </div>
        </div>
    )
}

export default Activity;
