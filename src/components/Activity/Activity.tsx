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
    const classes: any = useStyles()
    const {hRef} = props

    const {getActivityConf} = useConfigurations()
    const configurations = getActivityConf(props)

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
                {Header && <Header {...props} onLaunchActivity={onLaunchActivity}/>}
            </div>
            <div>
                {Structure && <Structure {...props}/>}
            </div>
        </div>
    )
}

export default React.memo(Activity);
