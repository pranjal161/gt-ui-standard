import * as aiaReducer from 'store/reducers/aiaReducer';
import baContext from 'context/baContext';
import {useContext} from 'react';
import {useDispatch} from 'react-redux';

const useActivity = () => {
    const dispatch = useDispatch()
    const context = useContext(baContext)
    const baId: any = context.baId

    return {
        startActivity: () => {
            dispatch(aiaReducer.aiaBAStart({baId}))

            //return getActivityConfiguration({...params, baId})
        },
        stopActivity: () => dispatch(aiaReducer.aiaBAEnd({baId})),
    }
}

export default useActivity;
