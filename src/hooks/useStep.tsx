import * as aiaReducer from 'store/reducers/aiaReducer';
import {useCallback, useContext} from 'react';
import baContext from 'context/baContext';
import {useDispatch} from 'react-redux';

const useStep = () => {
    const dispatch = useDispatch()
    const context = useContext(baContext)
    const baId: any = context.baId

    const setFocusError = useCallback ( ({hRef, property, message}:any) => {
        dispatch(aiaReducer.aiaStepSetInputStatus({baId, hRef, property, status:{value:'error', message}}))
    },[baId, dispatch])

    const setCurentStep = useCallback ( (current:string) => {
        dispatch(aiaReducer.aiaStepSetCurrent({baId, current}))
    },[baId, dispatch])

    return {setFocusError,setCurentStep}
}

export default useStep;
