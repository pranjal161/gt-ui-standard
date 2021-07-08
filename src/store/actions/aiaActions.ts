import * as aiaReducer from 'store/reducers/aiaReducer';

import {APIActions} from 'utils/functions';
import {APIConfig} from 'configs/apiConfig';

const modifiedHeaderTag = APIConfig().modifiedHeaderTag;

export const fetch = (href: string, baId: string, params?: Object) => (dispatch: any, getState: any) => {

    //Check if a call is pending, if yes, we have to return the futur object position

    if (getState().aia[baId] && getState().aia[baId].status[href] === 'loading') {

        // Will return always undefined, the promise code will be resolved with undefined.
        // The right solution is to be able to link the result as the first call promise
        return Promise.resolve(getState().aia[baId][href]);

    }

    //Search if we have already fetch this href
    if (getState().aia[baId] && getState().aia[baId][href]) {
        dispatch(aiaReducer.aiaGETSuccessCache())

        /*dispatch(aiaReducer.aiaGETSuccess(
            {
                data: getState().aia[baId][href].data,
                store:getState().aia,
                params: params,
                href,
                baId
            }
        ))*/

        return Promise.resolve(getState().aia[baId][href]);
    }
    else {
        dispatch(aiaReducer.aiaGETPending({href, baId}))

        const promise = APIActions.get(href, params);
        promise.then(
            (response: any) => {
                dispatch(aiaReducer.aiaGETSuccess(
                    {
                        data: response.data,
                        store: getState().aia,
                        params: params,
                        href,
                        baId
                    }
                ))
            })
            .catch((error: any) => {
                dispatch(aiaReducer.aiaGETError({
                    error,
                    href,
                    baId
                }))
            })

        return promise
    }
}

export const refresh = (href: string, baId: string, params?: Object) => (dispatch: any, getState: any) => {
    dispatch(aiaReducer.aiaREFRESHPending({href, baId}))

    const promise = APIActions.get(href, params);
    promise.then(
        (response: any) => {
            dispatch(aiaReducer.aiaREFRESHSuccess({
                data: response.data,
                store: getState().aia,
                params: params,
                href,
                baId
            }))
        })
        .catch((error: any) => {
            dispatch(aiaReducer.aiaREFRESHError({
                error,
                href,
                baId
            }))
        })

    return promise
}

export const post = (href: string, body: Object, baId: string, params?: Object) => (dispatch: any, getState: any) => {
    dispatch(aiaReducer.aiaPOSTPending({href, baId}));

    const promise = APIActions.post(href, body, params);
    promise.then((response: any) => {
        // case1: modified headers
        if (response && response.data && response.data.messages && response.data.messages.length > 0) {
            const messages = response.data.messages;
            const existingHrefs = getState().aia[baId];
            const modifiedArray: any = messages.find((message: any) => message.context === modifiedHeaderTag);
            if (modifiedArray) {
                processModifiedHeaders(modifiedArray.message, existingHrefs, baId, dispatch);
            }
        }
        // pick from the new resource created from location headers
        if (response && response.headers && response.headers.location) {
            let newResource = response.headers.location;
            dispatch(aiaReducer.aiaREFRESHSuccess({
                data: response.data,
                store: getState().aia,
                params: params,
                href: newResource,
                baId
            }))
        }
        dispatch(aiaReducer.aiaPOSTSuccess({href, baId}))
    })
        .catch((error: any) => {
            dispatch(aiaReducer.aiaPOSTError({
                error,
                href
            }))
        })

    return promise;
}

export const patch = (href: string, payload: Object, baId: string, params?: Object) => (dispatch: any, getState: any) => {

    dispatch(aiaReducer.aiaPATCHPending({href, baId}))
    const promise = APIActions.patch(href, payload, params);

    promise.then((response: any) => {
        // case1: modified headers recieved in response headers
        if (response && response.headers && response.headers[modifiedHeaderTag.toLowerCase()]) {
            const modifiedUrls = response.headers[modifiedHeaderTag.toLowerCase()]
            const existingHrefs = getState().aia[baId];
            processModifiedHeaders(modifiedUrls.split(','), existingHrefs, baId, dispatch);
        }
        // case2: When patch response is in form of messages, check modified headers & refresh url to get full response
        else if (response && response.data && response.data.messages && response.data.messages.length > 0) {
            refresh(href, 'refresh', baId);
            const messages = response.data.messages;
            const existingHrefs = getState().aia[baId];
            const modifiedArray: any = messages.find((message: any) => message.context === modifiedHeaderTag);
            if (modifiedArray) {
                processModifiedHeaders(modifiedArray.message, existingHrefs, baId, dispatch);
            }
        }
        dispatch(aiaReducer.aiaPATCHSuccess({
            data: response.data,
            store: getState().aia,
            params: params,
            href,
            baId
        }))
    })
        .catch((error: any) => {
            dispatch(aiaReducer.aiaPATCHError({
                error,
                href,
                baId
            }))
        })

    return promise;
}

export const deleteRequest = (href: string, baId: string, params?: Object) => (dispatch: any, getState: any) => {

    dispatch(aiaReducer.aiaDELETEPending())

    const promise = APIActions.delete(href, params);
    promise.then((response: any) => {

        if (response && response.data && response.data.messages && response.data.messages.length > 0) {
            const messages = response.data.messages;
            const existingHrefs = getState().aia[baId];
            const modifiedArray: any = messages.find((message: any) => message.context === modifiedHeaderTag);
            if (modifiedArray) {
                processModifiedHeaders(modifiedArray.message, existingHrefs, baId, dispatch);
            }
        }
        dispatch(aiaReducer.aiaDELETESuccess({
            data: response.data,
            href,
            baId
        }))
    })
        .catch((error: any) => {
            dispatch(aiaReducer.aiaDELETEError({
                error,
                href,
                baId
            }))
        })

    return promise;
}

// checks if any modified URI exists in store & refresh it
const processModifiedHeaders = (modifiedArray: Array<Object | string>, existingMap: Array<any>, baId: string, dispatch: any) => {
    const requestArray: Array<Object> = [];
    if (modifiedArray) {
        // eslint-disable-next-line array-callback-return
        modifiedArray.map((message: any) => {
            if (Object.keys(existingMap).includes(message)) {
                requestArray.push(dispatch(refresh(message, 'refresh', baId)));
            }
        })
        Promise.all(requestArray).then();
    }
}
