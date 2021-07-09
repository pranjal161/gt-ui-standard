import * as aiaReducer from 'store/reducers/aiaReducer';
import {useCallback, useContext} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import baContext from 'context/baContext';
import {getStatusReport} from 'utils/functions';
import useAia from 'hooks/useAia';

const useStep = () => {
    const dispatch = useDispatch()
    const context = useContext(baContext)
    const baId: any = context.baId
    const {patch} = useAia()
    const currentStep = useSelector((state: any) => state.aia[baId] && state.aia[baId].steps.current)
    const stepRessources = useSelector((state: any) => state.aia[baId] &&
        state.aia[baId].steps &&
        state.aia[baId].steps[currentStep])

    const baIdRessources = useSelector((state: any) => state.aia[baId] &&
        state.aia[baId])

    const setStatus = useCallback(({hRef, property, status, message}: any) => {
        dispatch(aiaReducer.aiaStepSetInputStatus({baId, hRef, property, status: {value: status, message}}))
    }, [baId, dispatch])

    const setDataToPatch = useCallback(({hRef, property, value}: any) => {
        dispatch(aiaReducer.aiaStepSetInputDataToPatch({baId, hRef, property, dataToPatch: {value}}))
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
    const getMessages = useCallback(() => {
        const errors: any = []
        const warnings: any = []

        stepRessources && Object.entries(stepRessources)
            .forEach(([hRef, properties]: any) => Object.entries(properties)
                .forEach(([property, propertyStatus]: any) => {
                    const statusValue = propertyStatus.status.value
                    if (statusValue === 'error')
                        errors.push({hRef, property, propertyStatus})
                    if (statusValue === 'warn')
                        warnings.push({hRef, property, propertyStatus})
                }))

        return {errors, warnings}
    },[stepRessources])

    const getRessourceStatusReport = useCallback( (hRef: string) => {
        const response = baIdRessources && baIdRessources[hRef]

        return response && getStatusReport(response.data)
    },[baIdRessources])

    const getPropertyStatusReport = useCallback((statusReport: any, property: string) => {
        let result = undefined
        statusReport.messages && statusReport.messages.forEach((message: any) => {
            message.context.forEach((context: any) => {
                context.propertyNames.forEach((propertyName: any) => {
                    if (propertyName === property) {
                        result = message
                    }
                })
            })
        })

        return result
    },[])

    /**
     * We loop on all ressources used in the current step
     * For each ressources, we have to get its status_report from the baId.
     * We make a second loop on the properties we displayed and check if they are present in the status_report
     * if yes, we update their status with the severity getting from status_report
     * if no, we update their status with value = displayed
     * @return {boolean} indicates if the step can be validated or not
     */
    const canValidateStep = useCallback ( () => {
        let inputErrors:any = []

        //We loop on all ressources used in the current step
        stepRessources && Object.entries(stepRessources)
            .forEach(([hRef, boundInputs]: any) => {

                //For each ressources, we have to get its status_report from the baId.
                const statusReport = getRessourceStatusReport(hRef)

                //We make a second loop on the properties we displayed and check if they are present in the status_report
                statusReport && Object.entries(boundInputs)
                    .forEach(([property, propertyDetail]: any) => {
                        const status: any = getPropertyStatusReport(statusReport, property)

                        //if yes, we update their status with the severity getting from status_report
                        if (status) {
                            if (status.severity === 'error')
                                inputErrors.push(propertyDetail.status.inputId)

                            setStatus({
                                hRef,
                                property,
                                status: status.severity,
                                message: status.message
                            })
                        }
                        else {
                            //if no, we update their status with value = displayed
                            setStatus({
                                hRef,
                                property,
                                status: 'displayed',
                                message: ''
                            })
                        }
                    })
            })

        return inputErrors
    },[getRessourceStatusReport, getPropertyStatusReport, setStatus, stepRessources])

    /**
     * We loop on all ressources used in the current step
     * For each ressources, we have to find the property with values in dataToPatch
     * When we got all data, we do the patch it.
     * @return {void} indicates if the step can be validated or not
     */
    const validateStep = () => {

        //We loop on all ressources used in the current step
        stepRessources && Object.entries(stepRessources)
            .forEach(([hRef, boundInputs]: any) => {
                const payload:any = {}

                boundInputs && Object.entries(boundInputs)
                    .forEach(([property, propertyDetail]: any) => {
                        if (propertyDetail.dataToPatch)
                            payload[property] = propertyDetail.dataToPatch

                    })
                if (Object.values(payload).length > 0){
                    // Here the assume that the patchHref is the same as the hRef, otherwise we have to use getPatchHRef
                    // on response
                    const patchHRef = hRef
                    //This is a workaround, because can't loop  inside redux store to reset all dataToPatch
                    const newValues:any = {}
                    boundInputs && Object.entries(boundInputs)
                        .forEach(([property, propertyDetail]: any) => {
                            // eslint-disable-next-line no-unused-vars
                            const {dataToPatch, ...rest} = propertyDetail

                            newValues[property] = rest
                        })

                    patch(patchHRef, payload).then(
                        dispatch(aiaReducer.aiaStepClearDataToPatch({baId, hRef, newValues}))
                    )
                }
            })
    }

    /**
     * We loop on all hRef of the current step. we check is its consistent, if not, we loop on all status_report
     * messages and se set the status on the bound inputs.
     * @return {boolean} indicates if it's validated or not
     */
    //Todo : to finish
    const validate = () => {
        let result

        console.log('stepRessources', stepRessources)
        const {errors} = getMessages()
        result = errors.length === 0
        console.log('errors', errors)

        /*
                stepRessources && Object.entries(stepRessources)
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

    return {currentStep, canValidateStep, validate, getMessages, setStatus, setCurentStep, setDataToPatch, validateStep}
}

export default useStep;
