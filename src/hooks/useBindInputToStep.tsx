import * as aiaReducer from 'store/reducers/aiaReducer';
import {createRef, useContext, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import baContext from 'context/baContext';
import stepContext from 'context/StepContext';

const useBindInputToStep = ({hRef, property}: any) => {
    const dispatch = useDispatch()
    const context = useContext(baContext)
    const baId: any = context.baId
    const ref:any = createRef()
    const stepContextValue :any = useContext(stepContext)
    const step = stepContextValue.step
    const onError = useSelector((state:any) => state[baId] &&
        state[baId].steps &&
        state[baId].steps[step] &&
        state[baId].steps[step][hRef] &&
        state[baId].steps[step][hRef][property] === 'error')

    useEffect(() => {
        const style = onError ? { borderStyle: 'solid', borderColor: 'red' } : {};
        if (ref.current)
            ref.current.style=style

    }, [ref, onError])

    useEffect(() => {
        dispatch(aiaReducer.aiaStepAddInput({baId, step, hRef, property}))

        return () => {
            dispatch(aiaReducer.aiaStepRemoveInput({baId, step, hRef, property}))
        }
    },[])

    return ref
}

export default useBindInputToStep;
