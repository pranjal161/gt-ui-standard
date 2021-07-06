import * as aiaReducer from 'store/reducers/aiaReducer';
import {createRef, useContext, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import baContext from 'context/baContext';

const useBindInputToStep = ({hRef, property, uniqueId}: any) => {
    const dispatch = useDispatch()
    const context = useContext(baContext)
    const baId: any = context.baId
    const ref: any = createRef()
    const currentStep = useSelector((state: any) => state.aia[baId] && state.aia[baId].steps.current)
    const errorMessage = useSelector((state: any) => state.aia[baId] &&
        state.aia[baId].steps &&
        state.aia[baId].steps[currentStep] &&
        state.aia[baId].steps[currentStep][hRef] &&
        state.aia[baId].steps[currentStep][hRef][property] &&
        state.aia[baId].steps[currentStep][hRef][property].status &&
        state.aia[baId].steps[currentStep][hRef][property].status.value === 'error' &&
        state.aia[baId].steps[currentStep][hRef][property].status.message)

    useEffect(() => {
        dispatch(aiaReducer.aiaStepAddInput({baId, hRef, property, uniqueId}))

        return () => {
            dispatch(aiaReducer.aiaStepRemoveInput({baId, hRef, property}))
        }
    }, [])

    return [ref, errorMessage]
}

export default useBindInputToStep;
