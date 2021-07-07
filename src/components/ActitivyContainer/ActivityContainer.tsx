import Activity, {ActivityDetailProps} from 'components/Activity/Activity';
import React, {useEffect, useState} from 'react';
import {getLink} from 'utils/functions';
import useActivity from 'hooks/useActivity';
import useAia from 'hooks/useAia';

/**
 * Wrap activity, manage the start and end activity for Redux
 * Do the POSt for mode === 'insert' || mode === 'update'
 * @param {ActivityProps} Activity props
 * @return {React.Component} Children activity content
 */
const ActivityContainer: React.FC<ActivityDetailProps> = ({
    hRef,
    mainEntityHRef,
    activityCode,
    entityType,
    mode,
    title,
    extraValues
}: ActivityDetailProps) => {
    const {post} = useAia();
    const {startActivity, stopActivity} = useActivity();
    const [activityHRef, setActivityHRef]: [any, any] = useState(undefined);

    const propsActivity: ActivityDetailProps = {
        hRef: activityHRef,
        entityType,
        mainEntityHRef,
        activityCode,
        title,
        mode,
        extraValues
    }

    useEffect(() => {
        startActivity(propsActivity);
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
        {activityHRef ? <Activity hRef={activityHRef} activityProps={propsActivity}/> :
            <div>Activity is loading ...</div>}
    </>)
}

export default React.memo(ActivityContainer);
