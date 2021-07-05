import * as aiaReducer from 'store/reducers/aiaReducer';
import {useCallback, useContext} from 'react';
import baContext from 'context/baContext';
import {useDispatch, useSelector} from 'react-redux';
//import {getStatusReport, isResponseConsistent} from 'utils/functions';

const useStep = () => {
    const dispatch = useDispatch()
    const context = useContext(baContext)
    const baId: any = context.baId
    const currentStep = useSelector((state: any) => state.aia[baId] && state.aia[baId].steps.current)
    const stepRessource = useSelector((state: any) => state.aia[baId] &&
        state.aia[baId].steps &&
        state.aia[baId].steps[currentStep])

    const setStatus = useCallback(({hRef, property, status, message}: any) => {
        dispatch(aiaReducer.aiaStepSetInputStatus({baId, hRef, property, status: {value: status, message}}))
    }, [baId, dispatch])

    const setCurentStep = useCallback((current: string) => {
        dispatch(aiaReducer.aiaStepSetCurrent({baId, current}))
    }, [baId, dispatch])

    /**
     * This function return all messages returned by the API in the status-report related to the current step
     * based Only on input or bind items displayed
     * The messages are split into errors and warnings variables
     * @return {any} Return the message list
     */
    const getMessages = () => {
        const errors: any = []
        const warnings: any = []

        stepRessource && Object.entries(stepRessource)
            .forEach(([hRef, properties]: any) => Object.entries(properties)
                .forEach(([property, propertyStatus]: any) => {
                    const statusValue = propertyStatus.status.value
                    if (statusValue === 'error')
                        errors.push({hRef, property, propertyStatus})
                    if (statusValue === 'warn')
                        warnings.push({hRef, property, propertyStatus})
                }))

        return {errors, warnings}
    }

    /**
     * We loop on all hRef of the current step. we check is its consistent, if not, we loop on all status_report
     * messages and se set the status on the bound inputs.
     * @return {boolean} indicates if it's validated or not
     */
    const validate = () => {
        let result = true

        console.log('stepRessource', stepRessource)
        const {errors}= getMessages()
        result = errors.length === 0
        console.log('errors', errors)

        /*
                stepRessource && Object.entries(stepRessource)
                    .forEach(([hRef, response]: any) => {
                        if (!isResponseConsistent(response.data)) {
                            const statusReport = getStatusReport(response && response.data) || []

                            statusReport &&
                            statusReport.messages &&
                            statusReport.messages
                                .forEach(
                                    (message: any) => {
                                        message.context.forEach(
                                            (line: any) => (
                                                setStatus({
                                                    hRef,
                                                    property: line.propertyNames[0],
                                                    status: message.severity,
                                                    message:message.message})
                                            )
                                        )
                                    }
                                )
                            console.log('statusReport', statusReport)
                            result = false
                        }
                    })
        */

        return result
    }

    return {validate, getMessages, setStatus, setCurentStep}
}

export default useStep;
