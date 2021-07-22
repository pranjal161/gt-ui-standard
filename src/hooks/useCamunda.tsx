import { 
    camundaGet, 
    camundaPost, 
    camundaPut, 
    camundaValidateUnsolPmnt, 
    deleteActiveStep, 
    setActiveProcess
} from '../store/reducers/camundaReducer';
import configStore from 'store/configStore';
import { getCamundaConfig } from '../configs/camundaConfig';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

const useCamunda = () => {
    const dispatch = useDispatch();
    const camundaConfig = getCamundaConfig();
    const { useAppDispatch } = configStore();
    const appDispatch = useAppDispatch();

    const getAvailableProcesses = useCallback(() => {
        dispatch(camundaGet({
            url: camundaConfig.defaultCamundaUrl + camundaConfig.requestAvailableOperations.url,
            header: camundaConfig.defaultHeader,
            camundaOperation: 'GET_AVAILABLE_OPERATIONS'
        }));
    }, [dispatch, camundaConfig]);

    const startCamundaProcess = useCallback((processKey: string, body: any, subId?: string) => {

        dispatch(camundaPost({
            url: camundaConfig.defaultCamundaUrl + camundaConfig.requestStartProcess.url(processKey),
            header: camundaConfig.defaultHeader,
            body: body,
            camundaOperation: 'START_PROCESS',
            id: processKey,
            subId: subId
        }));
    }, [dispatch, camundaConfig]);

    const startCamundaProcessSetActiveGetVariables = useCallback((processKey: string, body: any, contractId?: string) => {

        // step 1 - initiate process unsol payment
        // step 2 - using then(), get the returned created process and set as active process
        //        - in the same then(), get the active task (step), and the variables the process was initialized with
        appDispatch(camundaPost({
            url: camundaConfig.defaultCamundaUrl + camundaConfig.requestStartProcess.url(processKey),
            header: camundaConfig.defaultHeader,
            body: body,
            camundaOperation: 'START_PROCESS',
            id: processKey,
            subId: contractId
        })).then((res: any) => {
            let processId = res.payload.response.data.id;

            // set started process as active process
            dispatch(setActiveProcess({
                activeProcessId: processId,
                activeProcessName: res.payload.response.data.businessKey,
                contractId: contractId,
                processKey: processKey
            }));

            // get started process active task (step)
            dispatch(camundaGet({
                url: camundaConfig.defaultCamundaUrl + camundaConfig.requestCurrentActiveStepByProcessId.url(processId),
                header: camundaConfig.defaultHeader,
                camundaOperation: 'GET_ACTIVE_STEP'
            }));

            // get started process variables set at initialization
            dispatch(camundaGet({
                url: camundaConfig.defaultCamundaUrl + camundaConfig.requestGetProcessVariables.url(processId),
                header: camundaConfig.defaultHeader,
                camundaOperation: 'GET_PROCESS_VARIABLES',
                id: processId
            }));
        })
    }, [appDispatch, camundaConfig])

    const getCamundaProcessVariables = useCallback((processId: string) => {

        dispatch(camundaGet({
            url: camundaConfig.defaultCamundaUrl + camundaConfig.requestGetProcessVariables.url(processId),
            header: camundaConfig.defaultHeader,
            camundaOperation: 'GET_PROCESS_VARIABLES',
            id: processId
        }));
    }, [dispatch, camundaConfig]);

    const camundaSearch = useCallback((body: any) => {

        dispatch(camundaPost({
            url: camundaConfig.defaultCamundaUrl + camundaConfig.requestSearch.url,
            header: camundaConfig.defaultHeader,
            body: body,
            camundaOperation: 'SEARCH_PROCESS',
            id: JSON.stringify(body)
        }));
    }, [dispatch, camundaConfig]);

    const camundaGetActiveStepProcess = useCallback((processId: string) => {

        dispatch(camundaGet({
            url: camundaConfig.defaultCamundaUrl + camundaConfig.requestCurrentActiveStepByProcessId.url(processId),
            header: camundaConfig.defaultHeader,
            camundaOperation: 'GET_ACTIVE_STEP'
        }));
    }, [dispatch, camundaConfig]);

    const camundaSetActiveProcess = useCallback((processId: string, processName: string, contractId: string, processKey: string) => {

        dispatch(setActiveProcess({
            activeProcessId: processId,
            activeProcessName: processName,
            contractId: contractId,
            processKey: processKey
        }));
    }, [dispatch, camundaConfig]);

    const camundaSetStepComplete = useCallback((stepId: string, body: any, processId: string) => {

        dispatch(camundaPost({
            url: camundaConfig.defaultCamundaUrl + camundaConfig.requestSetStepComplete.url(stepId),
            header: camundaConfig.defaultHeader,
            body: body,
            camundaOperation: 'SET_STEP_COMPLETE',
            id: processId,
            subId: stepId
        }));
    }, [dispatch, camundaConfig]);

    const camundaSetStepCompleteGetNextStep = useCallback((stepId: string, body: any, processId: string) => {
        appDispatch(camundaPost({
            url: camundaConfig.defaultCamundaUrl + camundaConfig.requestSetStepComplete.url(stepId),
            header: camundaConfig.defaultHeader,
            body: body,
            camundaOperation: 'SET_STEP_COMPLETE',
            id: processId,
            subId: stepId
        })).then(() => {

            dispatch(camundaGet({
                url: camundaConfig.defaultCamundaUrl + camundaConfig.requestCurrentActiveStepByProcessId.url(processId),
                header: camundaConfig.defaultHeader,
                camundaOperation: 'GET_ACTIVE_STEP'
            }))
        })
    }, [dispatch, appDispatch, camundaConfig]);

    const camundaSuspendProcessInstance = useCallback((processid: string) => {

        dispatch(camundaPut({
            url: camundaConfig.defaultCamundaUrl + camundaConfig.requestSuspendProcessInstance.url(processid),
            header: camundaConfig.defaultHeader,
            body: {'suspended' : true},
            camundaOperation: 'SUSPEND_PROCESS_INSTANCE'
        }));
    }, [dispatch, camundaConfig]);

    const camundaGetProcessInstanceActivities = useCallback((processId: string) => {

        dispatch(camundaGet({
            url: camundaConfig.defaultCamundaUrl + camundaConfig.requestProcessInstanceActivities.url(processId),
            header: camundaConfig.defaultHeader,
            camundaOperation: 'GET_PROCESS_INSTANCE_ACTIVITIES',
            id: processId
        }));
    }, [dispatch, camundaConfig]);

    const camundaCorrelateMessage = useCallback((processId: string, body: any, messageName: string) => {

        dispatch(camundaPost({
            url: camundaConfig.defaultCamundaUrl + camundaConfig.requestCorrelateMessage.url,
            header: camundaConfig.defaultHeader,
            body: body,
            camundaOperation: 'CORRELATE_MESSAGE',
            id: processId,
            subId: messageName
        }));
    }, [dispatch, camundaConfig]);

    const camundaGetHistoryProcessInstance = useCallback((processId: string) => {

        dispatch(camundaGet({
            url: camundaConfig.defaultCamundaUrl + camundaConfig.requestHistoryProcessInstance.url(processId),
            header: camundaConfig.defaultHeader,
            camundaOperation: 'GET_HISTORY_PROCESS_INSTANCE',
            id: processId
        }));
    }, [dispatch, camundaConfig]);

    const camundaValidateUnsolPayment = useCallback((processId: string, contractId: string, documentName: string) => {

        appDispatch(camundaValidateUnsolPmnt({
            processId,
            contractId,
            documentName
        })).then((res: any) => {

            // if the process is validated, it is no longer active and remove active step
            if(res.payload &&
               res.payload.status === 'complete') {
                
                /*dispatch(setActiveProcess({
                    activeProcessId: undefined,
                    activeProcessName: undefined,
                    contractId: undefined,
                    processKey: undefined
                }));*/

                dispatch(deleteActiveStep());
            }
        });

    }, [dispatch, camundaConfig]);

    const camundaSetActiveProcessGetStepVariables = useCallback((processId: string, processName: string, contractId: string, processKey: string) => {
    
        dispatch(setActiveProcess({
            activeProcessId: processId,
            activeProcessName: processName,
            contractId: contractId,
            processKey: processKey
        }));

        dispatch(camundaGet({
            url: camundaConfig.defaultCamundaUrl + camundaConfig.requestCurrentActiveStepByProcessId.url(processId),
            header: camundaConfig.defaultHeader,
            camundaOperation: 'GET_ACTIVE_STEP'
        }));

        dispatch(camundaGet({
            url: camundaConfig.defaultCamundaUrl + camundaConfig.requestGetProcessVariables.url(processId),
            header: camundaConfig.defaultHeader,
            camundaOperation: 'GET_PROCESS_VARIABLES',
            id: processId
        }));

    }, [dispatch, camundaConfig])
    
    return { 
        getAvailableProcesses,
        startCamundaProcess,
        getCamundaProcessVariables,
        camundaSearch,
        camundaGetActiveStepProcess,
        camundaSetActiveProcess,
        camundaSetStepComplete,
        camundaSuspendProcessInstance,
        camundaGetProcessInstanceActivities,
        camundaCorrelateMessage,
        camundaGetHistoryProcessInstance,
        camundaValidateUnsolPayment,
        startCamundaProcessSetActiveGetVariables,
        camundaSetStepCompleteGetNextStep,
        camundaSetActiveProcessGetStepVariables
    };
}

export default useCamunda;