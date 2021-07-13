import baContext from 'context/baContext';
import {useCallback, useContext} from 'react';
import {useDispatch} from 'react-redux';
import * as aiaReducer from 'store/reducers/aiaReducer';

const useSetDataToPatch = () => {

    const dispatch = useDispatch()
    const context = useContext(baContext)
    const baId: any = context.baId

    const setDataToPatch = useCallback(({hRef, property, value}: any) => {
        dispatch(aiaReducer.aiaStepSetInputDataToPatch({baId, hRef, property, dataToPatch: {value}}))
    }, [baId, dispatch])

    return {setDataToPatch}
}

export default useSetDataToPatch
