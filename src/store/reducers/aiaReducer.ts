import { createSlice } from '@reduxjs/toolkit'

const initialState = {};

const updateResponse = (newState:any, action:any) => {
    // eslint-disable-next-line array-callback-return
    Object.keys(action.store).forEach((baId: any) => {
        if (baId && action.store[baId][action.href]) {
            newState[baId][action.href] = {data:{...action.data}}
        }
        else {
            newState[action.baId][action.href] = {data:{...action.data}}
        }
    })
    
    return newState;
}

const updateStatus = (newState:any, action:any, status : string) => {
    if(newState[action.payload.baId])
        newState[action.payload.baId].status[action.payload.href] = status

    return newState
}

const AIASlice = createSlice({
    name: 'aia',
    initialState,
    reducers: {
        aiaBAStart(state: any = initialState, action) {
            state[action.payload.baId] = {status:{}}

            return state
        },
        aiaBAEnd(state: any, action:any) {
            delete state[action.payload.baId]
        },
        aiaGETPending(state: any, action:any) {
            updateStatus(state, action, 'loading' )

            return state
        },
        aiaGETError(state: any, action: any) {
            console.log('Error in BA_GET', action);
            //todo : we have to store errors and display them.
            updateStatus(state, action, 'error' )

            return state;
        },
        aiaGETSuccess(state: any, action: any) {
            state = updateResponse(state, action.payload)
            updateStatus(state, action, 'success' )

            return state;
        },
        aiaGETSuccessCache(state) {

            return state
        },
        aiaPATCHPending(state, action) {
            updateStatus(state, action, 'pending' )

            return state;
        },
        aiaPATCHSuccess(state, action) {
            state = updateResponse(state, action.payload);
            updateStatus(state, action, 'success' )
        },
        aiaPATCHError(state, action) {
            console.log('Error in BA_PATCH', action);
            updateStatus(state, action, 'error')

            return state
        },
        aiaPOSTPending(state, action) {
            updateStatus(state, action, 'pending' )

            return state;
        },
        aiaPOSTSuccess(state, action) {
            updateStatus(state, action, 'success' )

            return state;
        },
        aiaPOSTError(state, action) {
            console.log('Error in BA_POST', action);
            updateStatus(state, action, 'error')

            return state;
        },
        aiaREFRESHPending(state, action) {
            updateStatus(state, action, 'pending' )

            return state;
        },
        aiaREFRESHSuccess(state, action) {
            state = updateResponse(state, action.payload)
            updateStatus(state, action, 'success' )

        },
        aiaREFRESHError(state, action) {
            console.log('Error in BA_REFRESH', action);
            updateStatus(state, action, 'error')

            return state;
        },
        aiaDELETEPending(state) {
            
            return state;
        },
        aiaDELETESuccess(state: any, action: any) {
            let resources = state[action.payload.baId] ? state[action.payload.baId] : {};
            delete resources[action.payload.href];
            state[action.payload.baId] = resources;
        },
        aiaDELETEError(state, action) {
            console.log('Error in BA_DELETE', action);
            
            return state;
        },
    }
});

export default AIASlice.reducer;
export const {
    aiaGETPending,
    aiaGETError,
    aiaGETSuccess,
    aiaGETSuccessCache,
    aiaPATCHPending,
    aiaPATCHSuccess,
    aiaPATCHError,
    aiaPOSTPending,
    aiaPOSTSuccess,
    aiaPOSTError,
    aiaREFRESHPending,
    aiaREFRESHSuccess,
    aiaREFRESHError,
    aiaDELETEPending,
    aiaDELETESuccess,
    aiaDELETEError,
    aiaBAStart,
    aiaBAEnd
} = AIASlice.actions;
