import React, { useEffect, useState } from 'react';
import { getCamundaConfig } from '../../../configs/camundaConfig';
import useCamunda from '../../../hooks/useCamunda';
import { useSelector } from 'react-redux';

const TrainingNikolay = React.memo(() => {
    console.log('TrainingNikolay render:');
    const camundaConfig = getCamundaConfig();
    const { 
        getAvailableProcesses, 
        camundaSearch, 
        camundaGetProcessInstanceActivities,
        getCamundaProcessVariables,
        camundaSuspendProcessInstance,
        camundaCorrelateMessage,
        camundaGetHistoryProcessInstance,
        camundaValidateUnsolPayment,
        startCamundaProcessSetActiveGetVariables,
        camundaSetStepCompleteGetNextStep,
        camundaSetActiveProcessGetStepVariables
    } = useCamunda();
    const [contractId, setContractId ] = useState('');
    const [currentStartProcessId, setStartProcessId ] = useState('');
    const [currentStartProcessContractId, setStartProcessContractId ] = useState('');
    const [currentStartProcessKey, setStartProcessKey ] = useState('');
    const [currentSearchId, setSearchId ] = useState('');
    const camundaAvailableOperations = useSelector((state:any) => state.camunda.listAvailableOperations);
    const camundaStartedProcesses = useSelector((state:any) => state.camunda.startProcessByKey);
    const camundaSearches = useSelector((state:any) => state.camunda.searches);
    const camundaActiveStepProcess = useSelector((state:any) => state.camunda.activeStepProcess);
    const activeCamundaProcess = useSelector((state:any) => state.camunda.activeProcess);
    const camundaProcessActivities = useSelector((state:any) => state.camunda.processActivities);
    const camundaValidateUnsolPmnt = useSelector((state:any) => state.camunda.validateUnsolPmnt);
    
    let disableStartProcessButton = false;

    if(currentStartProcessKey !== '' &&
       currentStartProcessContractId !== '' &&
       camundaStartedProcesses[currentStartProcessKey][currentStartProcessContractId] &&
       camundaStartedProcesses[currentStartProcessKey][currentStartProcessContractId].status &&
       camundaStartedProcesses[currentStartProcessKey][currentStartProcessContractId].status === 'pending') {
        disableStartProcessButton = true;
    }
    else {
        disableStartProcessButton = false;
    }

    const camundaState = useSelector((state:any) => state.camunda);
    console.log('camundaState: ', camundaState);

    let disableSearchButton = false;
    if(currentSearchId !== '') {
        if(camundaSearches[currentSearchId] !== undefined) {
            if(camundaSearches[currentSearchId].status === 'pending') {
                disableSearchButton = true;
            }
            else {
                disableSearchButton = false;
            }
        }
    }
    
    useEffect(() => {
        if(!camundaAvailableOperations.response) {
            getAvailableProcesses();
        }
    }, []);

    const onNewOperClick = (event: React.MouseEvent<HTMLButtonElement>) => {

        let body = {
            businessKey: 'Unsolicited payment for contract '+contractId,
            variables: {
                'contract:identifier': {'value': contractId, 'type': 'string'}
            }
        }
        let prcId = camundaConfig.defaultCamundaUrl + camundaConfig.requestStartProcess.url(event.currentTarget.value) + JSON.stringify(body);
        setStartProcessId(prcId);
        if((camundaStartedProcesses[currentStartProcessId] !== undefined &&
           camundaStartedProcesses[currentStartProcessId].status !== 'pending') ||
           camundaStartedProcesses[currentStartProcessId] === undefined) {
            startCamundaProcessSetActiveGetVariables(event.currentTarget.value, body, contractId);
            setStartProcessContractId(contractId);
            setStartProcessKey(event.currentTarget.value);
        }
        else
            console.log('request start process already pending');
    }

    const handleContractId = (e:React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setContractId(e.target.value);
    }

    const handleCamundaSearch = () => {
        let body = {
            active: true
        }

        let currSearchId = JSON.stringify(body);
        setSearchId(currSearchId);
        if((camundaSearches[currSearchId] !== undefined &&
            camundaSearches[currSearchId].status !== 'pending') ||
            camundaSearches[currSearchId] === undefined) {
            camundaSearch(body);
        }
    }

    const handleSetActiveProcess = (event: React.MouseEvent<HTMLButtonElement>) => {
        setStartProcessContractId(event.currentTarget.name.substr(event.currentTarget.name.lastIndexOf(' ') + 1));
        camundaSetActiveProcessGetStepVariables(
            event.currentTarget.value,
            event.currentTarget.name,
            event.currentTarget.name.substr(event.currentTarget.name.lastIndexOf(' ') + 1),
            'unsolicited_payment_process');
    }

    const handleProcessActivitiesData = (event: React.MouseEvent<HTMLButtonElement>) => {
        camundaGetProcessInstanceActivities(event.currentTarget.value);
    }

    const handleProcessValidation = (event: React.MouseEvent<HTMLButtonElement>) => {
        camundaValidateUnsolPayment(event.currentTarget.value, currentStartProcessContractId, 'some_document_name.docx');
    }

    const handleProcessVariablesData = (event: React.MouseEvent<HTMLButtonElement>) => {
        getCamundaProcessVariables(event.currentTarget.value);
    }

    const handleProcessSuspend = (event: React.MouseEvent<HTMLButtonElement>) => {
        camundaSuspendProcessInstance(event.currentTarget.value);
    }

    const handleStepCompleted = (event: React.MouseEvent<HTMLButtonElement>) => {
        let body;
        if(camundaActiveStepProcess.status === 'complete' &&
           camundaActiveStepProcess.response.data[0].taskDefinitionKey === 'unsolicited_payment') {
            body = {
                'variables': {
                    'var_1_step_1': {
                        'value': 'step 1 value'
                    },
                },
                'withVariablesInReturn': true
            }
        }
        else {
            body = {};
        }

        camundaSetStepCompleteGetNextStep(event.currentTarget.value, body, activeCamundaProcess.id);
    }

    const handleSendMessage = (event: React.MouseEvent<HTMLButtonElement>) => {
        let body = {
            'messageName': 'document_received',
            'correlationKeys': {
                'contract:identifier': { 'value': activeCamundaProcess.contractId }
            },
            'processVariables': {
                'documentName': { 'value': 'some_document_name.docx' }
            }
        }

        camundaCorrelateMessage(event.currentTarget.value, body, 'document_received');
    }

    const handleGetProcessInstanceHistory = (event: React.MouseEvent<HTMLButtonElement>) => {
        camundaGetHistoryProcessInstance(event.currentTarget.value);
    }

    return (
        <>
            <h1>Hello Nikolay</h1>
            <div>
                {
                    camundaAvailableOperations.status === 'idle' ? 
                        null : 
                        camundaAvailableOperations.status === 'pending' ? 
                            'fetching data from camunda' :
                            camundaAvailableOperations.status === 'complete' ? 
                                camundaAvailableOperations.response.data.map((oper:any) => (<div key={oper.id}>
                                    <button disabled={disableStartProcessButton} value={oper.key} onClick={onNewOperClick}>{oper.name} : {oper.key}</button>
                                    {
                                        oper.key === 'unsolicited_payment_process' ? 
                                            <input value={contractId} onChange={handleContractId} placeholder="XXX000000" /> : 
                                            null
                                    }
                                </div>)) :
                                camundaAvailableOperations.status === 'error' ? 
                                    'error fetching data' :
                                    'unknown error'
                }
            </div>
            <div>
                <button 
                    onClick={handleCamundaSearch} 
                    disabled={disableStartProcessButton || disableSearchButton}>camunda search process</button>
                <div>
                    {
                        currentSearchId === '' ? 
                            'nothing loaded yet' : 
                            camundaSearches[currentSearchId].status === 'pending' ?
                                'loading search results' :
                                camundaSearches[currentSearchId].status === 'complete' ? 
                                    <>
                                        <div>Search returned {camundaSearches[currentSearchId].response.data.length} results</div>
                                        {
                                            camundaSearches[currentSearchId].response.data.map((searchRes:any) => (
                                                <div key={searchRes.id}>
                                                    {searchRes.businessKey}<span>&nbsp;&nbsp;&nbsp;</span>  
                                                    <button value={searchRes.id} name={searchRes.businessKey} onClick={handleSetActiveProcess}>
                                                        set active
                                                    </button>
                                                    <button value={searchRes.id} name={searchRes.businessKey} onClick={handleProcessActivitiesData}>
                                                        get activities
                                                    </button>
                                                    <button value={searchRes.id} name={searchRes.businessKey} onClick={handleProcessVariablesData}>
                                                        get variables
                                                    </button>
                                                    <button value={searchRes.id} name={searchRes.businessKey} onClick={handleProcessSuspend}>
                                                        suspend
                                                    </button>
                                                </div>
                                            ))
                                        }
                                    </> : 
                                    'error fetching search data'
                    }
                </div>
            </div>
            <div>
                <p>Step data for selected process</p>
                {
                    !activeCamundaProcess.id ?
                        <div>no active process available</div> :
                        <div>
                            <div>Id: {activeCamundaProcess.id}</div>
                            <div>Name: {activeCamundaProcess.name}</div>
                            <div>Contract Id: {activeCamundaProcess.contractId}</div>
                            <div>Process Key: {activeCamundaProcess.processKey}</div>
                        </div>
                }
                {
                    Object.keys(camundaActiveStepProcess).length === 0 ? 
                        <div>no step data available</div> : 
                        camundaActiveStepProcess.status === 'pending' ?
                            'fetching step data' : 
                            camundaActiveStepProcess.status === 'complete' &&
                            camundaActiveStepProcess.response.data.length > 0 ? 
                                <div>
                                    Step Name: {camundaActiveStepProcess.response.data[0].name}
                                    <button onClick={handleStepCompleted} value={camundaActiveStepProcess.response.data[0].id}>
                                        set step completed
                                    </button>
                                </div> : 
                                camundaActiveStepProcess.status &&
                                camundaActiveStepProcess.status === 'complete' &&
                                camundaActiveStepProcess.response.data.length === 0 &&
                                camundaValidateUnsolPmnt[activeCamundaProcess.id] === undefined ?
                                    <div>
                                        Begin validate task
                                        <button value={activeCamundaProcess.id} onClick={handleProcessValidation}>
                                            Validate
                                        </button>
                                    </div> : 
                                    camundaValidateUnsolPmnt[activeCamundaProcess.id].status === 'pending' ? 
                                        'Validating...' :
                                        camundaValidateUnsolPmnt[activeCamundaProcess.id].status === 'complete' ?
                                            'Validated' :
                                            'error has occured'
                }
                {
                    Object.keys(camundaProcessActivities).length === 0 ?
                        <div>no activities available</div> : 
                        camundaProcessActivities[activeCamundaProcess.id].status === 'pending' ?
                            'fetching activities' : 
                            camundaProcessActivities[activeCamundaProcess.id].status === 'complete' ?
                                <>
                                    {
                                        camundaProcessActivities[activeCamundaProcess.id].response.data.childActivityInstances.length &&
                                        camundaProcessActivities[activeCamundaProcess.id].response.data.childActivityInstances.length > 0 && 
                                        camundaProcessActivities[activeCamundaProcess.id].response.data.childActivityInstances[0].activityName === 'Document received' ? 
                                            <button value={activeCamundaProcess.id} onClick={handleSendMessage}>
                                                send document received message
                                            </button> :
                                            'no relevant messages left'
                                    }
                                </> :
                                'error'
                }
            </div>
            <div>
                Get history activity childActivityInstances
                <button value={activeCamundaProcess.id} onClick={handleGetProcessInstanceHistory}>
                    get process instance history
                </button>
            </div>
        </>
    )
})

TrainingNikolay.displayName = 'TrainingNikolay';
export default TrainingNikolay;