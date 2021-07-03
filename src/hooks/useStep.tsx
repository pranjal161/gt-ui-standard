import * as aiaReducer from 'store/reducers/aiaReducer';
import baContext from 'context/baContext';
import stepContext from 'context/StepContext';
import {useContext} from 'react';
import {useDispatch} from 'react-redux';

const useStep = () => {
    const dispatch = useDispatch()
    const context = useContext(baContext)
    const baId: any = context.baId
    const stepContextValue :any = useContext(stepContext)
    const step = stepContextValue.step

    const setFocusError = ({hRef, property}:any) => {
        dispatch(aiaReducer.aiaStepAddInput({baId, step, hRef, property}))

        return () => {
            dispatch(aiaReducer.aiaStepRemoveInput({baId, step, hRef, property}))
        }
    }

    return {setFocusError}
}

export default useStep;
