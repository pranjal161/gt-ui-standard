import {useCallback, useContext} from 'react';
import baContext from 'context/baContext';
import {configs} from 'hooks/componentsConfigurations';

const useConfigurations = () => {
    const context = useContext(baContext)
    const baId: any = context.baId

    /**
     * return the Skeleton according of the activity
     * @param {object} props activityCode
     * @return {object} object with all Components to use for this activity code
     */
    const getActivityConf = useCallback ((props:{activityCode:string}) => configs.activities[props.activityCode],[])

    return {
        baId, getActivityConf
    }
}

export default useConfigurations;
