import * as aiaReducer from 'store/reducers/aiaReducer';
import {useCallback, useContext} from 'react';
import baContext from 'context/baContext';
import {useDispatch} from 'react-redux';

const useActivity = () => {
    const dispatch = useDispatch()
    const context = useContext(baContext)
    const baId: any = context.baId

    const startActivity = useCallback (() => dispatch(aiaReducer.aiaBAStart({baId})),[dispatch, baId])
    const stopActivity = useCallback (() => dispatch(aiaReducer.aiaBAEnd({baId})),[dispatch, baId])

    return {
        baId,
        startActivity,
        stopActivity
    }
}

export default useActivity;
