import stepContext from 'context/StepContext';
import * as aiaReducer from 'store/reducers/aiaReducer';
import baContext from 'context/baContext';
import {useContext, useEffect} from 'react';
import {useDispatch} from 'react-redux';

const useApiBinding = ({hRef, property}: any) => {
    const dispatch = useDispatch()
    const context = useContext(baContext)
    const baId: any = context.baId

    const stepContextValue :any = useContext(stepContext)
    const step = stepContextValue.step

    useEffect(() => {
        dispatch(aiaReducer.aiaStepAddInput({baId, step, hRef, property}))

        return () => {
            dispatch(aiaReducer.aiaStepRemoveInput({baId, step, hRef, property}))
        }
    },[])

}

export default useApiBinding;
