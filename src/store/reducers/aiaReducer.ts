import {createSlice} from '@reduxjs/toolkit'

const initialState = {};

const updateResponse = (newState: any, action: any) => {
    // eslint-disable-next-line array-callback-return
    Object.keys(action.store).forEach((baId: any) => {
        if (baId && action.store[baId][action.href]) {
            newState[baId][action.href] = {data: {...action.data}}
        }
        else {
            newState[action.baId][action.href] = {data: {...action.data}}
        }
    })

    return newState;
}

const updateStatus = (newState: any, action: any, status: string) => {
    if (newState[action.payload.baId])
        newState[action.payload.baId].status[action.payload.href] = status

    return newState
}

const AIASlice = createSlice({
    name: 'aia',
    initialState,
    reducers: {
        aiaBAStart(state: any = initialState, action) {
            state[action.payload.baId] = {
                status: {},
                steps: {},
                props: action.payload.activityProps,
                current: undefined
            }

            return state
        },
        aiaBAEnd(state: any, action: any) {
            delete state[action.payload.baId]
        },
        aiaBAUpdateProps(state: any, action) {
            state[action.payload.baId].props = {...state[action.payload.baId].props, ...action.payload.activityProps}

            return state
        },
        aiaGETPending(state: any, action: any) {
            updateStatus(state, action, 'loading')

            return state
        },
        aiaGETError(state: any, action: any) {
            console.log('Error in BA_GET', action);
            //todo : we have to store errors and display them.
            updateStatus(state, action, 'error')

            return state;
        },
        aiaGETSuccess(state: any, action: any) {
            state = updateResponse(state, action.payload)
            updateStatus(state, action, 'success')

            return state;
        },
        aiaGETSuccessCache(state) {

            return state
        },
        aiaPATCHPending(state, action) {
            updateStatus(state, action, 'pending')

            return state;
        },
        aiaPATCHSuccess(state, action) {
            state = updateResponse(state, action.payload);
            updateStatus(state, action, 'success')
        },
        aiaPATCHError(state, action) {
            console.log('Error in BA_PATCH', action);
            updateStatus(state, action, 'error')

            return state
        },
        aiaPOSTPending(state, action) {
            updateStatus(state, action, 'pending')

            return state;
        },
        aiaPOSTSuccess(state, action) {
            updateStatus(state, action, 'success')

            return state;
        },
        aiaPOSTError(state, action) {
            console.log('Error in BA_POST', action);
            updateStatus(state, action, 'error')

            return state;
        },
        aiaREFRESHPending(state, action) {
            updateStatus(state, action, 'pending')

            return state;
        },
        aiaREFRESHSuccess(state, action) {
            state = updateResponse(state, action.payload)
            updateStatus(state, action, 'success')

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
            let resources = state[action.payload.baId] || {};
            delete resources[action.payload.href];
            state[action.payload.baId] = resources;
        },
        aiaDELETEError(state, action) {
            console.log('Error in BA_DELETE', action);

            return state;
        },
        aiaStepSetCurrent(state: any, action: any) {
            const {baId, current} = action.payload

            state[baId].steps.current = current

            return state;
        },
        aiaStepAddInput(state: any, action: any) {
            const {baId, hRef, property, step, inputId} = action.payload

            if (!state[baId].steps[step])
                state[baId].steps[step] = {}

            if (!state[baId].steps[step][hRef])
                state[baId].steps[step][hRef] = {}

            if (!state[baId].steps[step][hRef][property])
                state[baId].steps[step][hRef][property] = {status: {}}

            state[baId].steps[step][hRef][property].status = {value: 'displayed', inputId}

            return state;
        },
        aiaStepRemoveInput(state: any, action: any) {
            const {baId, hRef, property, step} = action.payload

            //This test is important, because if we close a Tab, the state[baId] doesn't exist any more
            if (state[baId] && state[baId].steps) {
                if (!state[baId].steps[step])
                    state[baId].steps[step] = {}

                if (!state[baId].steps[step][hRef])
                    state[baId].steps[step][hRef] = {}

                delete state[baId].steps[step][hRef][property]
            }
            
            return state;
        },
        aiaStepSetInputStatus(state
                                      :
                                      any, action
                                      :
                                      any
        ) {
            const {baId, hRef, property, status} = action.payload
            const currentStep = state[baId].steps.current

            if (!state[baId].steps[currentStep])
                state[baId].steps[currentStep] = {}

            if (!state[baId].steps[currentStep][hRef])
                state[baId].steps[currentStep][hRef] = {}

            state[baId].steps[currentStep][hRef][property].status.value = status.value
            state[baId].steps[currentStep][hRef][property].status.message = status.message

            return state;
        }
        ,

    }
})
;

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
    aiaBAEnd,
    aiaBAUpdateProps,
    aiaStepSetCurrent,
    aiaStepAddInput,
    aiaStepRemoveInput,
    aiaStepSetInputStatus
} = AIASlice.actions;
