import { createSlice } from '@reduxjs/toolkit'

const initialState = {};

const updateResponse = (newState:any, action:any) => {
    // eslint-disable-next-line array-callback-return
    Object.keys(action.store).map((baId: any) => {
        if (baId && baId[action.href]) {
            newState[baId][action.href] = {data:{...action.data}}
        }
        else {
            newState[action.baId][action.href] = {data:{...action.data}}
        }
    })
    
    return newState;
}

const AIASlice = createSlice({
    name: 'aia',
    initialState,
    reducers: {
        aiaBAStart(state: any = initialState, action) {
            state[action.payload.baId] = {}
        },
        aiaBAEnd(state: any, action:any) {
            delete state[action.payload.baId]
        },
        aiaGETPending(state) {
            return state
        },
        aiaGETError(state, action) {
            console.log('Error in BA_GET', action);
            
            return state;
        },
        aiaGETSuccess(state, action) {
            state = updateResponse(state, action.payload)
        },
        aiaPATCHPending(state) {
            return state;
        },
        aiaPATCHSuccess(state, action) {
            state = updateResponse(state, action);
        },
        aiaPATCHError(state, action) {
            console.log('Error in BA_PATCH', action);
            
            return state
        },
        aiaPOSTPending(state) {
            
            return state;
        },
        aiaPOSTSuccess(state) {
            
            return state;
        },
        aiaPOSTError(state, action) {
            console.log('Error in BA_POST', action);
            
            return state;
        },
        aiaREFRESHPending(state) {
            
            return state;
        },
        aiaREFRESHSuccess(state, action) {
            state = updateResponse(state, action)
        },
        aiaREFRESHError(state, action) {
            console.log('Error in BA_REFRESH', action);
            
            return state;
        },
        aiaDELETEPending(state) {
            
            return state;
        },
        aiaDELETESuccess(state: any, action: any) {
            let resources = state[action.baId] ? state[action.baId] : {};
            delete resources[action.href];
            state[action.baId] = resources;
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