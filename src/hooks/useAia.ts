/* eslint-disable react-hooks/exhaustive-deps */

import {
    deleteRequest as deleteAction,
    fetch as fetchAction,
    patch as patchAction,
    post as postAction
} from 'store/actions/aiaActions';
import {useCallback, useContext} from 'react';

import baContext from 'context/baContext';
import {useDispatch} from 'react-redux';

/**
 * get
 * @returns {*} Information for aia
 * We need to include parameter to pass headers 
 */
export default function useAia() {
  
    const dispatch: any = useDispatch();
    const context = useContext(baContext)
    const baId: string = context.baId ? context.baId: '';

    const fetch = useCallback(
        (url, params?) => dispatch(fetchAction(url, baId, params)),[]);
        
    const post = useCallback(
        (url, body, params?) => {
            const payload = body ? body: {};
            
            return dispatch(postAction(url, payload, baId, params))
        }, [])
        
    const patch = useCallback(
        (url, body, params?) => {
            const payload = body ? body: {};
            
            return dispatch(patchAction(url, payload, baId, params))
        }, [])

    const deleteRequest = useCallback(
        (url, params?) => dispatch(deleteAction(url, baId, params)), [])

    return {fetch, post, patch, deleteRequest}
}
