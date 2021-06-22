import baContext from 'context/baContext';
import { useContext } from 'react';
import {configs} from 'hooks/componentsConfigurations';

const useConfigurations = () => {
    const context = useContext(baContext)
    const baId: any = context.baId

    /**
     * return the Skeleton according of the activity
     * @param {object} props activityCode
     * @return {object} object with all Components to use for this activity code
     */
    const getActivityConf = (props:{activityCode:string}) => configs[props.activityCode] && configs[props.activityCode].activity

    return {
        baId, getActivityConf
    }
}

export default useConfigurations;
