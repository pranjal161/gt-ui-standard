import React, {useEffect, useState} from 'react';
import Activity, {ActivityProps} from 'components/Activity/Activity';
import {getLink} from 'utils/functions';
import useActivity from 'hooks/useActivity';
import useAia from 'hooks/useAia';

export interface ActivityContainerProps {

    /**
     * activityCode code of the activity to display/Execute
     */
    activityCode: string

    /**
     * Can be ticket, contract, person, claims,
     */
    entityType: string

    /**
     * hRef of operation, for launch activity it's the href to POST
     */
    hRef: string

    /**
     * mainEntityHRef it will be the contract, the person or not defined
     */
    mainEntityHRef: string,

    /**
     * Mode of execution of the activity : view, insert, update
     */
    mode: string

    /**
     * Extra Values
     */
    extraValues?: any

    /**
     * title
     */
    title: string
}

/**
 * Wrap activity, manage the start and end activity for Redux
 * Do the POSt for mode === 'insert' || mode === 'update'
 * @param {ActivityContainerProps} Activity props
 * @return {React.Component} Children activity content
 */
const ActivityContainer: React.FC<ActivityContainerProps> = ({
    hRef,
    mainEntityHRef,
    activityCode,
    entityType,
    mode,
    title,
    extraValues
}: ActivityContainerProps) => {
    const {post} = useAia();
    const {startActivity, stopActivity} = useActivity();
    const [activityHRef, setActivityHRef]: [any, any] = useState(undefined);

    const propsActivity: ActivityProps = {
        hRef: activityHRef,
        entityType,
        mainEntityHRef,
        activityCode,
        title,
        mode,
        extraValues
    }

    useEffect(() => {
        startActivity();
        if (['insert', 'update', 'upsert'].includes(mode)) {
            post(hRef, {}).then((res: any) => {
                if (res && res.data && getLink(res.data, 'self'))
                    //We got the Href of the new ressource
                    setActivityHRef(getLink(res.data, 'self'));

            });
        }
        else if (['view', 'storybook', 'search'].includes(mode)) {
            //nothing to do the fetch will be done in the activity
            setActivityHRef(hRef)
        }

        return () => {
            stopActivity()
        }
    }, [hRef, mode, post, setActivityHRef, startActivity, stopActivity])

    return (<>
        {activityHRef ? <Activity {...propsActivity}/> : <div>Activity is loading ...</div>}
    </>)

}
export default React.memo(ActivityContainer);
