import React, {useCallback} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import useConfigurations from 'hooks/useConfigurations';
import useTabs from 'hooks/useTabs';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4, 4, 0, 4),
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#F2F5F7'
    }
}))

export interface ActivityProps {

    /**
     * hRef of the activity
     */
    hRef : string

    /**
     * hRef of the main entity of the activity, can be the contract or the person
     */
    activityProps: ActivityDetailProps
}

export interface ActivityDetailProps {

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
     * hRef of the main entity
     */
    mainEntityHRef: string

    /**
     * Mode of execution of the activity : view, create, update
     */
    mode?: string

    /**
     * extraValues
     */
    extraValues?:any

    /**
     * title
     */
    title: string
}

const Activity: React.FC<ActivityProps> = (props: ActivityProps) => {
    const {hRef, activityProps} = props
    const classes: any = useStyles()

    const {getActivityConf} = useConfigurations()
    const configurations = getActivityConf(activityProps.activityCode)

    const {openNewTab, forOperation} = useTabs()
    const onLaunchActivity = useCallback((operation: any, entityType: string) => {
        openNewTab(forOperation({
            entityType,
            mainEntityHRef: hRef,
            operation
        }))
    }, [openNewTab, forOperation, hRef])

    const Structure = configurations && configurations.structure
    const Header = configurations && configurations.header

    return (
        <div className={classes.root}>
            <div className="col-12">
                {Header && <Header hRef={hRef} activityProps={activityProps} onLaunchActivity={onLaunchActivity}/>}
            </div>
            <div>
                {Structure && <Structure hRef={hRef} activityProps={activityProps}/>}
            </div>
        </div>
    )
}

export default React.memo(Activity);
