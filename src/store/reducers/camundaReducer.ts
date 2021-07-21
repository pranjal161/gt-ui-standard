import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from '../../utils/axios';
import { getCamundaConfig } from '../../configs/camundaConfig';

const getCamundaStateProperty = (camundaOperation: string) => {
    let camundaProperty = {
        propertyName: 'empty',
    };
    switch (camundaOperation) {
        case 'GET_AVAILABLE_OPERATIONS':
            camundaProperty.propertyName = 'listAvailableOperations';
            break;
        case 'START_PROCESS':
            camundaProperty.propertyName = 'startProcessByKey';
            break;
        case 'GET_PROCESS_VARIABLES': 
            camundaProperty.propertyName = 'processVariables';
            break;
        case 'SEARCH_PROCESS': 
            camundaProperty.propertyName = 'searches';
            break;
        case 'GET_ACTIVE_STEP': 
            camundaProperty.propertyName = 'activeStepProcess';
            break;
        case 'SET_ACTIVE_PROCESS': 
            camundaProperty.propertyName = 'activeProcess';
            break;
        case 'SET_STEP_COMPLETE': 
            camundaProperty.propertyName = 'completedStepProcess';
            break;
        case 'SUSPEND_PROCESS_INSTANCE': 
            camundaProperty.propertyName = 'suspendedProcessInstances';
            break;
        case 'GET_PROCESS_INSTANCE_ACTIVITIES': 
            camundaProperty.propertyName = 'processActivities';
            break;
        case 'GET_PROCESS_INSTANCE_TASKS':
            camundaProperty.propertyName = 'processTasks';
            break;
        case 'CORRELATE_MESSAGE': 
            camundaProperty.propertyName = 'processMessages';
            break;
        case 'GET_HISTORY_PROCESS_INSTANCE': 
            camundaProperty.propertyName = 'historyProcesses';
            break;
        case 'VALIDATE_UNSOLICITED_PAYMENT': 
            camundaProperty.propertyName = 'validateUnsolPmnt';
            break;
    }

    return camundaProperty;
}

export const camundaGet = createAsyncThunk(
    'camunda/camundaGet',
    async (props: {url: string, header: any, camundaOperation: string, id?: string, subId?: string}) => {
        const { url, header, camundaOperation, id = null, subId = null } = props;
        const response = await axios.get(url, {
            headers: header
        });

        let returnGetObj:any = {
            url: url,
            status: 'complete',
            camundaOperation: camundaOperation,
            response: response,
        }

        if(id) {
            returnGetObj.id = id;
            if(subId)
                returnGetObj.subId = subId;
        }

        return returnGetObj;
    }
);

export const camundaPost = createAsyncThunk(
    'camunda/camundaPost',
    async (props: {url: string, body: any, header: any, camundaOperation: string, id?: string, subId?: string}) => {
        const { url, body, header, camundaOperation, id = null, subId = null } = props;
        const response = await axios.post(url, body, {
            headers: header
        });

        let returnPostObj:any = {
            url: url,
            status: 'complete',
            body: body,
            camundaOperation: camundaOperation,
            response: response,
        }

        if(id) {
            returnPostObj.id = id;
            if(subId)
                returnPostObj.subId = subId;
        }

        return returnPostObj;
    }
);

export const camundaPut = createAsyncThunk(
    'camunda/camundaPut',
    async (props: {url: string, body: any, header: any, camundaOperation: string, id?: string, subId?: string}) => {
        const { url, body, header, camundaOperation, id = null, subId = null } = props;
        const response = await axios.put(url, body, {
            headers: header
        });

        let returnPutObj:any = {
            url: url,
            status: 'complete',
            body: body,
            camundaOperation: camundaOperation,
            response: response,
        }

        if(id) {
            returnPutObj.id = id;
            if(subId)
                returnPutObj.subId = subId;
        }

        return returnPutObj;
    }
);

/**
 * validate Unsolicited payment process. 
 * This is a multi step process and requires a lot of consecutive async server calls.
 */

export const camundaValidateUnsolPmnt = createAsyncThunk(
    'camunda/camundaValidateUnsolPmnt',
    async (props: {processId: string, contractId: string, documentName: string }, { rejectWithValue }) => {
        const { processId, contractId, documentName } = props;
        const camundaConfig = getCamundaConfig();
        const camundaOperation = 'VALIDATE_UNSOLICITED_PAYMENT';
        let errorObject: any = {
            status: 'error',
            camundaOperation: camundaOperation,
            id: processId
        };

        /**
         * step 1: after the fetch next step returns an empty array for response.data, it should call this action.
         * The first step should be to check if there are pending activities.
         */
        const responseStep1 = await axios.get(camundaConfig.defaultCamundaUrl + camundaConfig.requestProcessInstanceActivities.url(processId), {
            headers: camundaConfig.defaultHeader
        });

        let isStep1_OK = false;
        if(responseStep1.status === 200 &&
           responseStep1.data &&
           responseStep1.data.childActivityInstances &&
           responseStep1.data.childActivityInstances.length > 0 &&
           responseStep1.data.childActivityInstances[0].activityId === 'document_received_event' &&
           responseStep1.data.childActivityInstances[0].activityType === 'intermediateMessageCatch') {
            isStep1_OK = true;
        }
        else {
            errorObject.step1Error = responseStep1;
        }

        /**
         * step 2: if there is a pending activity document_received_event, send a message with the file name for the contract Id to camunda.
         */
        let isStep2_OK = false;
        if(isStep1_OK) {
            let body = {
                'messageName': 'document_received',
                'correlationKeys': {
                    'contract:identifier': { 'value': contractId }
                },
                'processVariables': {
                    'documentName': { 'value': documentName }
                }
            };

            const responseStep2 = await axios.post(
                camundaConfig.defaultCamundaUrl + camundaConfig.requestCorrelateMessage.url, 
                body,
                {
                    headers: camundaConfig.defaultHeader
                }
            );

            if(responseStep2.status === 204) {
                isStep2_OK = true;
            }
            else {
                errorObject.step2Error = responseStep2;
            }
        }

        /**
         * step 3: if the message was sent successfully, check if a new task is available for the process.
         * Check just in case even if there wasn't a message sent, as it is possible for a network error to occur on the previous steps.
         */
        let isStep3_OK = false;
        let taskId = '';
        if(isStep2_OK ||
           (!isStep1_OK &&
            !isStep2_OK)) {
            const responseStep3 = await axios.get(
                camundaConfig.defaultCamundaUrl + camundaConfig.requestCurrentActiveStepByProcessId.url(processId), 
                {
                    headers: camundaConfig.defaultHeader
                }
            );

            if(responseStep3.status === 200 &&
               responseStep3.data.length > 0 &&
               responseStep3.data[0].name === 'Validation') {
                isStep3_OK = true;
                taskId = responseStep3.data[0].id;
            }
            else {
                errorObject.step3Error = responseStep3;
            }
        }

        /**
         * step 4: if the next task obtained is called Validation, set it as complete.
         */
        let isStep4_OK = false;
        if(isStep3_OK) {
            const responseStep4 = await axios.post(
                camundaConfig.defaultCamundaUrl + camundaConfig.requestSetStepComplete.url(taskId), 
                {},
                {
                    headers: camundaConfig.defaultHeader
                }
            );

            if(responseStep4.status === 204) {
                isStep4_OK = true;
            }
            else {
                errorObject.step4Error = responseStep4;
            }
        }

        /**
         * step 5: if the task Validation was set as complete, check process history
         * Check just in case even if there wasn't a previous step validate in this run of the action, as a 
         * network error could have occured previously.
         */
        let isStep5_OK = false;
        if(isStep4_OK ||
           (!isStep4_OK &&
            !isStep3_OK)) {
            const responseStep5 = await axios.get(
                camundaConfig.defaultCamundaUrl + camundaConfig.requestHistoryProcessInstance.url(processId), 
                {
                    headers: camundaConfig.defaultHeader
                }
            );

            if(responseStep5.status === 200 &&
               responseStep5.data.state === 'COMPLETED') {
                isStep5_OK = true;
            }
            else {
                errorObject.step5Error = responseStep5;
            }
        }

        if(isStep5_OK) {
            let ValidateUnsolPmnt: any = {
                status: 'complete',
                camundaOperation: camundaOperation,
                id: processId
            };

            return ValidateUnsolPmnt;
        }
        else {
            return rejectWithValue(errorObject);
        }
    }

);

interface initialStateInterface {
    [key: string] : any;
}

const initialState: initialStateInterface = {
    requestsGET: {},
    requestsPOST: {},
    listAvailableOperations: {status: 'idle'},
    startProcessByKey: {},
    processVariables: {},
    searches: {},
    activeStepProcess: {},
    completedStepProcess: {},
    suspendedProcessInstances: {},
    activeProcess: {},
    processActivities: {},
    processTasks: {},
    processMessages: {},
    historyProcesses: {},
    validateUnsolPmnt: {}
}

const camundaSlice = createSlice({
    name: 'camunda',
    initialState: initialState,
    reducers: {
        setActiveProcess(state: any = initialState, action: any) {
            state.activeProcess.id = action.payload.activeProcessId;
            state.activeProcess.name = action.payload.activeProcessName;
            state.activeProcess.contractId = action.payload.contractId;
            state.activeProcess.processKey = action.payload.processKey;
        },
        deleteActiveStep(state: any = initialState) {
            state.activeStepProcess = {};
        },
    },
    extraReducers: (builder) => {
        builder.addCase(camundaGet.pending, (state, action) => {
            let camundaProperty = getCamundaStateProperty(action.meta.arg.camundaOperation);

            if(camundaProperty.propertyName !== 'empty') {
                if(action.meta.arg.id) {
                    if(action.meta.arg.subId) {
                        state[camundaProperty.propertyName] = {
                            ...state[camundaProperty.propertyName],
                            [action.meta.arg.id]: {
                                ...state[camundaProperty.propertyName][action.meta.arg.id],
                                [action.meta.arg.subId]: {
                                    status: 'pending',
                                    url: action.meta.arg.url
                                }
                            }
                        }
                    }
                    else {
                        state[camundaProperty.propertyName] = {
                            ...state[camundaProperty.propertyName],
                            [action.meta.arg.id]: {
                                status: 'pending',
                                url: action.meta.arg.url
                            }
                        }
                    }

                }
                else {
                    state[camundaProperty.propertyName] = {
                        status: 'pending',
                        url: action.meta.arg.url
                    }
                }
            }
        })
        builder.addCase(camundaGet.fulfilled, (state, action) => {
            let camundaProperty = getCamundaStateProperty(action.payload.camundaOperation);
            
            if(camundaProperty.propertyName !== 'empty') {
                if(action.payload.id) {
                    if(action.payload.subId) {
                        state[camundaProperty.propertyName] = {
                            ...state[camundaProperty.propertyName],
                            [action.payload.id]: {
                                ...state[camundaProperty.propertyName][action.payload.id],
                                [action.payload.subId]: {
                                    status: 'complete',
                                    url: action.payload.url,
                                    response: action.payload.response
                                }
                            }
                        }
                    }
                    else {
                        state[camundaProperty.propertyName] = {
                            ...state[camundaProperty.propertyName],
                            [action.payload.id]: {
                                status: 'complete',
                                url: action.payload.url,
                                response: action.payload.response
                            }
                        }
                    }

                }
                else {
                    state[camundaProperty.propertyName] = {
                        status: 'complete',
                        url: action.payload.url,
                        response: action.payload.response
                    }
                }
            }
        })
        builder.addCase(camundaGet.rejected, (state, action) => {
            let camundaProperty = getCamundaStateProperty(action.meta.arg.camundaOperation);
            
            if(camundaProperty.propertyName !== 'empty') {
                if(action.meta.arg.id) {
                    if(action.meta.arg.subId) {
                        state[camundaProperty.propertyName] = {
                            ...state[camundaProperty.propertyName],
                            [action.meta.arg.id]: {
                                ...state[camundaProperty.propertyName][action.meta.arg.id],
                                [action.meta.arg.subId]: {
                                    status: 'error',
                                    url: action.meta.arg.url,
                                    error: action.error
                                }
                            }
                        }
                    }
                    else {
                        state[camundaProperty.propertyName] = {
                            ...state[camundaProperty.propertyName],
                            [action.meta.arg.id]: {
                                status: 'error',
                                url: action.meta.arg.url,
                                error: action.error
                            }
                        }
                    }
                }
                else {
                    state[camundaProperty.propertyName] = {
                        status: 'error',
                        url: action.meta.arg.url,
                        error: action.error
                    }
                }
            }
        })
        builder.addCase(camundaPost.pending, (state, action) => {
            let camundaProperty = getCamundaStateProperty(action.meta.arg.camundaOperation);

            if(camundaProperty.propertyName !== 'empty') {
                if(action.meta.arg.id) {
                    if(action.meta.arg.subId) {
                        state[camundaProperty.propertyName] = {
                            ...state[camundaProperty.propertyName],
                            [action.meta.arg.id]: {
                                ...state[camundaProperty.propertyName][action.meta.arg.id],
                                [action.meta.arg.subId]: {
                                    status: 'pending',
                                    url: action.meta.arg.url
                                }
                            }
                        }
                    }
                    else {
                        state[camundaProperty.propertyName] = {
                            ...state[camundaProperty.propertyName],
                            [action.meta.arg.id]: {
                                status: 'pending',
                                url: action.meta.arg.url
                            }
                        }
                    }
                }
                else {
                    state[camundaProperty.propertyName] = {
                        status: 'pending',
                        url: action.meta.arg.url
                    }
                }
            }
        })
        builder.addCase(camundaPost.fulfilled, (state, action) => {
            let camundaProperty = getCamundaStateProperty(action.payload.camundaOperation);
            
            if(camundaProperty.propertyName !== 'empty') {
                if(action.payload.id) {
                    if(action.payload.subId) {
                        state[camundaProperty.propertyName] = {
                            ...state[camundaProperty.propertyName],
                            [action.payload.id]: {
                                ...state[camundaProperty.propertyName][action.payload.id],
                                [action.payload.subId]: {
                                    status: 'complete',
                                    url: action.payload.url,
                                    response: action.payload.response
                                }
                            }
                        }
                    }
                    else {
                        state[camundaProperty.propertyName] = {
                            ...state[camundaProperty.propertyName],
                            [action.payload.id]: {
                                status: 'complete',
                                url: action.payload.url,
                                response: action.payload.response
                            }
                        }
                    }
                }
                else {
                    state[camundaProperty.propertyName] = {
                        status: 'complete',
                        url: action.payload.url,
                        response: action.payload.response
                    }
                }
            }
        })
        builder.addCase(camundaPost.rejected, (state, action) => {
            let camundaProperty = getCamundaStateProperty(action.meta.arg.camundaOperation);
            
            if(camundaProperty.propertyName !== 'empty') {
                if(action.meta.arg.id) {
                    if(action.meta.arg.subId) {
                        state[camundaProperty.propertyName] = {
                            ...state[camundaProperty.propertyName],
                            [action.meta.arg.id]: {
                                ...state[camundaProperty.propertyName][action.meta.arg.id],
                                [action.meta.arg.subId]: {
                                    status: 'error',
                                    url: action.meta.arg.url,
                                    error: action.error
                                }
                            }
                        }
                    }
                    else {
                        state[camundaProperty.propertyName] = {
                            ...state[camundaProperty.propertyName],
                            [action.meta.arg.id]: {
                                status: 'error',
                                url: action.meta.arg.url,
                                error: action.error
                            }
                        }
                    }
                }
                else {
                    state[camundaProperty.propertyName] = {
                        status: 'error',
                        url: action.meta.arg.url,
                        error: action.error
                    }
                }
            }
        })
        builder.addCase(camundaPut.pending, (state, action) => {
            let camundaProperty = getCamundaStateProperty(action.meta.arg.camundaOperation);

            if(camundaProperty.propertyName !== 'empty') {
                if(action.meta.arg.id) {
                    if(action.meta.arg.subId) {
                        state[camundaProperty.propertyName] = {
                            ...state[camundaProperty.propertyName],
                            [action.meta.arg.id]: {
                                ...state[camundaProperty.propertyName][action.meta.arg.id],
                                [action.meta.arg.subId]: {
                                    status: 'pending',
                                    url: action.meta.arg.url
                                }
                            }
                        }
                    }
                    else {
                        state[camundaProperty.propertyName] = {
                            ...state[camundaProperty.propertyName],
                            [action.meta.arg.id]: {
                                status: 'pending',
                                url: action.meta.arg.url
                            }
                        }
                    }
                }
                else {
                    state[camundaProperty.propertyName] = {
                        status: 'pending',
                        url: action.meta.arg.url
                    }
                }
            }
        })
        builder.addCase(camundaPut.fulfilled, (state, action) => {
            let camundaProperty = getCamundaStateProperty(action.payload.camundaOperation);
            
            if(camundaProperty.propertyName !== 'empty') {
                if(action.payload.id) {
                    if(action.payload.subId) {
                        state[camundaProperty.propertyName] = {
                            ...state[camundaProperty.propertyName],
                            [action.payload.id]: {
                                ...state[camundaProperty.propertyName][action.payload.id],
                                [action.payload.subId]: {
                                    status: 'complete',
                                    url: action.payload.url,
                                    response: action.payload.response
                                }
                            }
                        }
                    }
                    else {
                        state[camundaProperty.propertyName] = {
                            ...state[camundaProperty.propertyName],
                            [action.payload.id]: {
                                status: 'complete',
                                url: action.payload.url,
                                response: action.payload.response
                            }
                        }
                    }
                }
                else {
                    state[camundaProperty.propertyName] = {
                        status: 'complete',
                        url: action.payload.url,
                        response: action.payload.response
                    }
                }
            }
        })
        builder.addCase(camundaPut.rejected, (state, action) => {
            let camundaProperty = getCamundaStateProperty(action.meta.arg.camundaOperation);
            
            if(camundaProperty.propertyName !== 'empty') {
                if(action.meta.arg.id) {
                    if(action.meta.arg.subId) {
                        state[camundaProperty.propertyName] = {
                            ...state[camundaProperty.propertyName],
                            [action.meta.arg.id]: {
                                ...state[camundaProperty.propertyName][action.meta.arg.id],
                                [action.meta.arg.subId]: {
                                    status: 'error',
                                    url: action.meta.arg.url,
                                    error: action.error
                                }
                            }
                        }
                    }
                    else {
                        state[camundaProperty.propertyName] = {
                            ...state[camundaProperty.propertyName],
                            [action.meta.arg.id]: {
                                status: 'error',
                                url: action.meta.arg.url,
                                error: action.error
                            }
                        }
                    }
                }
                else {
                    state[camundaProperty.propertyName] = {
                        status: 'error',
                        url: action.meta.arg.url,
                        error: action.error
                    }
                }
            }
        })
        builder.addCase(camundaValidateUnsolPmnt.pending, (state, action) => {
            state.validateUnsolPmnt = {
                ...state.validateUnsolPmnt,
                [action.meta.arg.processId]: {
                    status: 'pending',
                }
            }            
        })
        builder.addCase(camundaValidateUnsolPmnt.fulfilled, (state, action) => {
            state.validateUnsolPmnt = {
                ...state.validateUnsolPmnt,
                [action.meta.arg.processId]: {
                    status: 'complete',
                }
            }            
        })
        builder.addCase(camundaValidateUnsolPmnt.rejected, (state, action) => {
            state.validateUnsolPmnt = {
                ...state.validateUnsolPmnt,
                [action.meta.arg.processId]: {
                    status: 'complete',
                    error: action.payload
                }
            }            
        })
    },
});

export default camundaSlice.reducer;

export const { setActiveProcess, deleteActiveStep } = camundaSlice.actions;