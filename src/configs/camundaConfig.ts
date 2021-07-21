const username = 'user2';
const password = 'bpmn_02';
const processKeyUnsolicitedPayment = 'unsolicited_payment_process';

export const getCamundaConfig = () => ({
    defaultHeader: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic '+window.btoa(username+':'+password),
        crossDomain: true
    },
    defaultCamundaUrl: 'http://54.195.26.237:8080/engine-rest/',

    /**
     * Get the list of processes that the camunda instance supports.
     * For now, only the unsolicited payment process is used
     * for more info - https://docs.camunda.org/manual/7.15/reference/rest/process-definition/get-query/
     */
    requestAvailableOperations: {
        method: 'GET',
        url: 'process-definition?latest=true&active=true',//process-definition?latest=true&active=true
        returnDataFormat: 'array'
    },

    /**
     * Initialize the camunda process by process key. The process key is retrieved from the requestAvailableOperations url.
     * for more info - https://docs.camunda.org/manual/7.15/reference/rest/process-definition/post-start-process-instance/
     */
    requestStartProcess: {
        method: 'POST',
        url: function(processKey: string|undefined) {
            return `process-definition/key/${processKey ? processKey : processKeyUnsolicitedPayment}/start`;
        },
        returnDataFormat: 'object'
    },

    /**
     * Search process for finding process instances. 
     * for more info - https://docs.camunda.org/manual/7.15/reference/rest/process-instance/post-query/
     */
    requestSearch: {
        method: 'POST',
        url: 'process-instance',
        returnDataFormat: 'array'
    },

    /**
     * For a process instance, find the variables it has stored so far. 
     * for more info - https://docs.camunda.org/manual/7.15/reference/rest/process-instance/variables/get-variables/
     */
    requestGetProcessVariables: {
        method: 'GET',
        url: function(processId: string) {
            return `process-instance/${processId}/variables`;
        },
        returnDataFormat: 'object'
    },

    /**
     * Get the current task (step) for a process instance.
     * for more info - https://docs.camunda.org/manual/7.15/reference/rest/task/get-query/
     */
    requestCurrentActiveStepByProcessId: {
        method: 'GET',
        url: function(processId: string) {
            return `task?processInstanceId=${processId}`;
        },
        returnDataFormat: 'array'
    },

    /**
     * Set the task (step) as complete.
     * After doing this, user should get current task (step) via requestCurrentActiveStepByProcessId to continue.
     * for more info - https://docs.camunda.org/manual/7.15/reference/rest/task/post-complete/
     */
    requestSetStepComplete: {
        method: 'POST',
        url: function(stepId: string) {
            return `task/${stepId}/complete`;
        },
        returnDataFormat: 'object'
    },

    /**
     * Suspend (set as inactive/cancel) a process instance. 
     * That way, when searching for active process instances, suspended ones won't be returned.
     * for more info - https://docs.camunda.org/manual/7.15/reference/rest/process-instance/put-activate-suspend-by-id/
     */
    requestSuspendProcessInstance: {
        method: 'PUT',
        url: function(processId: string) {
            return `process-instance/${processId}/suspended`;
        },
        returnDataFormat: 'none'
    },

    /**
     * Returns pending activities for a process instance. 
     * For unsolicited payment process, user should get them when active tasks (steps) returns an empty array,
     * because this doesn't necessarily mean that the process instance is completed. 
     * If there are pending tasks like childActivityInstances with activityType 'intermediateMessageCatch', 
     * a correlate message must be sent via requestCorrelateMessage. 
     * After this message is sent, the user can request the current task (step) for the process instance.
     * For unsolicited payment process, the final step after message send is validation.
     * After validation is set a complete, is the process instance completed. 
     * for more info - https://docs.camunda.org/manual/7.15/reference/rest/process-instance/get-activity-instances/
     */
    requestProcessInstanceActivities: {
        method: 'GET',
        url: function(processId: string) {
            return `process-instance/${processId}/activity-instances`;
        },
        returnDataFormat: 'object'
    },

    /**
     * Send a message with a correlation key.
     * For unsolicited payment process, this means sending a message with a correlation key equal to the 
     * contract Id of the payment (set as a string variable named 'contract:identifier'), 
     * with a file name string variable named 'documentName'
     * for more info - https://docs.camunda.org/manual/7.15/reference/rest/message/post-message/
     */
    requestCorrelateMessage: {
        method: 'POST',
        url: 'message',
        returnDataFormat: 'array'
    },

    /**
     * Request the history of the process instance.
     * If the process instance is complete, it will return a JSON object with a property { state: 'COMPLETED' }
     * for more info - https://docs.camunda.org/manual/7.15/reference/rest/history/process-instance/get-process-instance/
     */
    requestHistoryProcessInstance: {
        method: 'GET',
        url: function(processId: string) {
            return `history/process-instance/${processId}`;
        },
        returnDataFormat: 'object'
    }
});

export const CamundaConfig = getCamundaConfig;