import * as aiaReducer from 'store/reducers/aiaReducer';
import {useContext, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import baContext from 'context/baContext';
import {uniqueId} from 'utils/system';

const useBindInputToStep = ({hRef, property}: any) => {
    const dispatch = useDispatch()
    const context = useContext(baContext)
    const baId: any = context.baId
    const [inputId] = useState(uniqueId(property))
    const currentStep = useSelector((state: any) => state.aia[baId] && state.aia[baId].steps.current)
    const status = useSelector((state: any) => state.aia[baId] &&
        state.aia[baId].steps &&
        state.aia[baId].steps[currentStep] &&
        state.aia[baId].steps[currentStep][hRef] &&
        state.aia[baId].steps[currentStep][hRef][property] &&
        state.aia[baId].steps[currentStep][hRef][property].status &&
        state.aia[baId].steps[currentStep][hRef][property].status.value)

    const statusMessage = useSelector((state: any) => status === 'error' &&
        state.aia[baId].steps[currentStep][hRef][property].status.message)

    useEffect(() => {
        dispatch(aiaReducer.aiaStepAddInput({baId, hRef, property, inputId}))

        return () => {
            dispatch(aiaReducer.aiaStepRemoveInput({baId, hRef, property}))
        }
    }, [])

    return {inputId, status, statusMessage}
}

export default useBindInputToStep;
