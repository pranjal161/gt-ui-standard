import * as aiaReducer from 'store/reducers/aiaReducer';
import {useCallback, useContext} from 'react';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import baContext from 'context/baContext';
import useConfigurations from 'hooks/useConfigurations';
import {useTranslation} from 'react-i18next';

const useActivity = () => {
    const {getActivityConf} = useConfigurations()
    const dispatch = useDispatch()
    const context = useContext(baContext)
    const baId: any = context.baId
    const {t} = useTranslation()
    const activityProps = useSelector((state: any) => state.aia[baId] && state.aia[baId].props, shallowEqual)
    const configurations = activityProps && getActivityConf(activityProps.activityCode)

    const startActivity = useCallback((newActivityProps) => {
        dispatch(aiaReducer.aiaBAStart({baId, activityProps: newActivityProps}))
        const activityConf = getActivityConf(newActivityProps.activityCode)

        return activityConf.mode
    }, [dispatch, getActivityConf, baId])

    const stopActivity = useCallback(() => dispatch(aiaReducer.aiaBAEnd({baId})), [dispatch, baId])
    const updateActivityProps = useCallback((activityProps) => dispatch(aiaReducer.aiaBAUpdateProps({
        baId,
        activityProps
    })), [dispatch, baId])

    const getSteps = useCallback(() => (
        configurations && configurations.steps.map((step: any) => ({...step, label: t(step.label)}))) // We translate here the step labels
    , [t,configurations])

    return {
        startActivity,
        stopActivity,
        updateActivityProps,
        configurations,
        activityProps,
        getSteps
    }
}

export default useActivity;
