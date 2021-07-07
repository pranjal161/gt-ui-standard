import * as aiaReducer from 'store/reducers/aiaReducer';
import {useCallback, useContext} from 'react';
import baContext from 'context/baContext';
import useConfigurations from 'hooks/useConfigurations';
import {useDispatch} from 'react-redux';

const useActivity = () => {
    const {getActivityConf} = useConfigurations()
    const dispatch = useDispatch()
    const context = useContext(baContext)
    const baId: any = context.baId

    const startActivity = useCallback (() => dispatch(aiaReducer.aiaBAStart({baId})),[dispatch, baId])
    const stopActivity = useCallback (() => dispatch(aiaReducer.aiaBAEnd({baId})),[dispatch, baId])
    const getSteps = useCallback((activityCode) => {
        const activityConf = getActivityConf(activityCode)
        if (activityConf)
            return activityConf.steps
    }, [getActivityConf])

    return {
        baId,
        startActivity,
        stopActivity,
        getSteps
    }
}

export default useActivity;
