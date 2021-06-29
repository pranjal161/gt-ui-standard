import React, { useState } from 'react';

import axios from '../../../utils/axios';

const TrainingNikolay = React.memo(() => {
    console.log('TrainingNikolay render:');
    const [camundaData1, setCamundaData1] = useState([]);
    const camundaURL1 = 'http://54.195.26.237:8080/engine-rest/process-definition?latest=true&active=true';
    const camundaURL2 = 'http://54.195.26.237:8080/engine-rest/process-definition/key/unsolicited_payment_process/start';
    const [camundaData2, setCamundaData2] = useState({});
    const username = 'user2';
    const password = 'bpmn_02';

    const handleCamunda1 = () => {
        const promise = axios.get(camundaURL1, {
            headers: {
                'Authorization': 'Basic '+window.btoa(username+':'+password),
                'Content-Type': 'application/json'
            }
        });

        promise.then((response:any) => {
            console.log('response: ', response);
            console.log('response data: ', response.data);
            setCamundaData1(response.data);
        }).catch(
            (error: any) => {
                console.log('error handleCamunda: ', error);
            }
        )
        
    }

    const bodyCamundaRequest2 = {
        businessKey: 'Unsolicited payment for contract INV000825',
        modifications: {
            'contractId': {'value':'INV000825'}
        }
    }
    const handleCamunda2 = () => {
        const promise = axios.post(camundaURL2, bodyCamundaRequest2, {
            headers: {
                'Authorization': 'Basic '+window.btoa(username+':'+password),
                crossDomain: true
            }
        });

        promise.then((response:any) => {
            console.log('response: ', response);
            console.log('response data: ', response.data);
            setCamundaData2(response.data);
        }).catch(
            (error: any) => {
                console.log('error handleCamunda: ', error);
            }
        )
    }

    return (
        <>
            <h1>Hello Nikolay</h1>
            <div>
                <button onClick={handleCamunda1}>get camunda list available operations</button>
                <span>
                    {camundaData1.length > 0 ? 'fetched data' : 'nothing loaded yet'}
                </span>
            </div>
            <div>
                <button onClick={handleCamunda2}>camunda start unsolicited payments process</button>
                <span>
                    {Object.keys(camundaData2).length === 0 ? 'nothing loaded yet' : JSON.stringify(camundaData2)}
                </span>
            </div>
        </>
    )
})

TrainingNikolay.displayName = 'TrainingNikolay';
export default TrainingNikolay;