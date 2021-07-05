import React, {useEffect, useState} from 'react';
import Activity from 'components/Activity/Activity';
import {getLink} from 'utils/functions';
import useActivity from 'hooks/useActivity';
import useAia from 'hooks/useAia';

export interface ActivityContainerProps {

    /**
     * activityCode code of the activity to display/Execute
     */
    activityCode: string

    /**
     * hRef of operation, for launch activity it's the href to POST
     */
    hRef: string

    /**
     * mainEntityHRef it will be the contract, the person or not defined
     */
    mainEntityHRef?: string,

    /**
     * Mode of execution of the activity : view, insert, update
     */
    mode: string

    /**
     * Extra Values
     */
    extraValues?: any

    title?: string

    children?: any
}

const ActivityContainer: React.FC<ActivityContainerProps> = ({
    hRef,
    mainEntityHRef,
    activityCode,
    mode,
    title,
    children,
    extraValues
}: ActivityContainerProps) => {
    const {post} = useAia();
    const {startActivity, stopActivity} = useActivity();
    const [activityHRef, setActivityHRef]: [any, any] = useState(undefined);

    const propsActivity: any = {
        hRef: activityHRef,
        mainEntityHRef: mainEntityHRef,
        action: 'fetch',
        activityCode: activityCode,
        title: title,
        extraValues: extraValues
    }

    useEffect(() => {
        startActivity();
        if (mode === 'insert' || mode === 'update') {
            post(hRef, {}).then((res: any) => {
                if (res && res.data && getLink(res.data, 'self')) {
                    //We got the Href of the new ressource
                    setActivityHRef(getLink(res.data, 'self'));
                    // To ask API team to fix title of the
                    // setTitle(getTitle(res.data))
                }
            });

        }
        else if (mode === 'view' || mode === 'storybook') {
            //nothing to do the fetch will be done in the activity
            setActivityHRef(hRef)
        }
        else if (mode === 'search') {
            setActivityHRef(hRef)
        }

        return () => {
            stopActivity();
        }
    }, [hRef, mode, post, setActivityHRef])

    return (
        <>
            {activityHRef ? <Activity {...propsActivity}>{children}</Activity> : <div>Loading the activity</div>
            }
        </>)

}
export default React.memo(ActivityContainer);
