import * as aiaReducer from 'store/reducers/aiaReducer';
import baContext from 'context/baContext';
import {useCallback, useContext} from 'react';
import {useDispatch} from 'react-redux';

const useActivity = () => {
    const dispatch = useDispatch()
    const context = useContext(baContext)
    const baId: any = context.baId

    const startActivity = useCallback (() => dispatch(aiaReducer.aiaBAStart({baId})),[])
    const stopActivity = useCallback (() => dispatch(aiaReducer.aiaBAEnd({baId})),[])

    return {
        startActivity,
        stopActivity
    }
}

export default useActivity;
