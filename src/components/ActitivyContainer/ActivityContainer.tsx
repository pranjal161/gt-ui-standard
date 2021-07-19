import Activity, {ActivityDetailProps} from 'components/Activity/Activity';
import React, {useEffect, useState} from 'react';
import {getLink} from 'utils/functions';
import useActivity from 'hooks/useActivity';
import useAia from 'hooks/useAia';

export interface ActivityContainerProps {
    hRef?: string,

    activityProps: ActivityDetailProps
}

/**
 * Wrap activity, manage the start and end activity for Redux
 * Do the POSt for mode === 'insert' || mode === 'update'
 * @param {ActivityProps} Activity props
 * @return {React.Component} Children activity content
 */
const ActivityContainer: React.FC<ActivityContainerProps> = ({hRef, activityProps}: ActivityContainerProps) => {
    const {post} = useAia();
    const {startActivity, stopActivity, updateActivityProps} = useActivity();
    const [activityHRef, setActivityHRef]: [any, any] = useState(undefined);

    useEffect(() => {
        const mode = startActivity(activityProps);
        if (['create', 'update', 'upsert'].includes(mode)) {
            post(hRef, {}).then((res: any) => {
                if (res && res.data && getLink(res.data, 'self')) {
                    const newHRef = getLink(res.data, 'self')
                    //We got the Href of the new ressource
                    setActivityHRef(newHRef);
                    //We update the props in redux store
                    updateActivityProps({hRef : newHRef})
                }
            });
        }
        else if (['view', 'storybook', 'search'].includes(mode)) {
            //nothing to do the fetch will be done in the activity
            setActivityHRef(hRef)
        }

        return () => {
            stopActivity()
        }
    }, [hRef, post, setActivityHRef, startActivity, stopActivity])

    return (<>
        {activityHRef ? <Activity hRef={activityHRef}/> :
            <div>Activity is loading ...</div>}
    </>)
}

export default React.memo(ActivityContainer);
