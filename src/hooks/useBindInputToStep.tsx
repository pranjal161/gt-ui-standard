import * as aiaReducer from 'store/reducers/aiaReducer';
import {createRef, useContext, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import baContext from 'context/baContext';

const useBindInputToStep = ({hRef, property}: any) => {
    const dispatch = useDispatch()
    const context = useContext(baContext)
    const baId: any = context.baId
    const ref: any = createRef()
    const currentStep = useSelector((state: any) => state.aia[baId] && state.aia[baId].steps.current)
    const onError = useSelector((state: any) => state.aia[baId] &&
        state.aia[baId].steps &&
        state.aia[baId].steps[currentStep] &&
        state.aia[baId].steps[currentStep][hRef] &&
        state.aia[baId].steps[currentStep][hRef][property] === 'error')

    console.log('currentStep', currentStep)

    useEffect(() => {
        if (ref.current)
            if (onError) {
                ref.current.style.borderStyle = onError ? 'solid' : 'none'
                ref.current.style.borderColor = onError ? 'red' : 'transparent'
            }
    }, [ref, onError])

    useEffect(() => {
        dispatch(aiaReducer.aiaStepAddInput({baId, hRef, property}))

        return () => {
            dispatch(aiaReducer.aiaStepRemoveInput({baId, hRef, property}))
        }
    }, [])

    return ref
}

export default useBindInputToStep;
