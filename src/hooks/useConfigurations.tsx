import {configs} from 'hooks/componentsConfigurations';
import {useCallback} from 'react';

const useConfigurations = () => {

    /**
     * return the Skeleton according of the activity
     * @param {object} props activityCode
     * @return {object} object with all Components to use for this activity code
     */
    const getActivityConf = useCallback ((activityCode:string) => configs.activities[activityCode],[])

    return {
        getActivityConf
    }
}

export default useConfigurations;
