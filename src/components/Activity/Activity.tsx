import React, {useCallback} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import useConfigurations from 'hooks/useConfigurations';
import useResponse from 'hooks/useResponse';
import useTabs from 'hooks/useTabs';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4, 4, 0, 4),
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
    entityType: string

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

    /**
     * extraValues
     */
    extraValues?:any

}

const Activity: React.FC<ActivityProps> = (props: ActivityProps) => {
    const {hRef} = props
    const classes: any = useStyles()
    const {getActivityConf} = useConfigurations()

    const configurations = getActivityConf(props) // activityCode can also be store in redux
    const {openNewTab, forOperation} = useTabs()

    //todo : change it
    // For the moment, Search is also an activity but we dont have hRef for it.
    // So we must not fetch on hRef, it's set with search_WORDTOSEARCH
    const hRefToFetch = hRef.slice(0,7) === 'search_' ? undefined : hRef
    useResponse(hRefToFetch)

    /*

    useEffect(() => {
        // For the moment, Search is also an activity but we dont have hRef for it.
        // So we must not fetch on hRef, it's set with search_WORDTOSEARCH
        if (hRef.slice(0,7) !== 'search_')
            aia.fetch(hRef)

    }, [aia, hRef, stopActivity, startActivity])

    */

    const SkeletonConf = configurations && configurations.skeleton
    const HeaderConf = configurations && configurations.header

    const onLaunchActivity = useCallback((operation: any, entityType: string) => {
        openNewTab(forOperation({
            entityType,
            mainEntityHRef: props.hRef,
            operation
        }))
    }, [openNewTab]
    )

    return (
        <div className={classes.root}>
            <div className="col-12">
                {HeaderConf && <HeaderConf {...props} onLaunchActivity={onLaunchActivity}/>}
            </div>
            <div className={classes.skeleton}>
                {SkeletonConf && <SkeletonConf {...props}/>}
            </div>
        </div>
    )
}

export default Activity;
