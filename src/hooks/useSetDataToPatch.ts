import * as aiaReducer from 'store/reducers/aiaReducer';

import {useCallback, useContext} from 'react';

import baContext from 'context/baContext';
import {useDispatch} from 'react-redux';

const useSetDataToPatch = () => {

    const dispatch = useDispatch()
    const context = useContext(baContext)
    const baId: any = context.baId

    const setDataToPatch = useCallback(({hRef, property, value }: any) => {
        dispatch(aiaReducer.aiaStepSetInputDataToPatch({baId, hRef, property, dataToPatch: {value}}))
    }, [baId, dispatch]);

    const setDataToPost = useCallback(({hRef, postHref, payload={}, step=undefined, property}: any) => {
        dispatch(aiaReducer.aiaStepSetInputDataToPost({baId, property, hRef, postHref, payload, step}))
    }, [baId, dispatch])

    return {setDataToPatch, setDataToPost}
}

export default useSetDataToPatch
