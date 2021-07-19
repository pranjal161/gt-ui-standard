/* eslint-disable */
import ActivityStep from 'components/ActivityStep/ActivityStep';
import useStep from 'hooks/useStep';
import React, {useEffect, useState} from 'react';

//We have to store and set the previous step when the dialog is closed
const DialogActivityStep = ({code, children}:any) => {
    const { currentStep, setCurentStep } = useStep()
    const [previousStep] = useState(currentStep)

    useEffect(() => () => setCurentStep(previousStep), [])

    return (
        <ActivityStep code={code}>{children}</ActivityStep>
    );
}

export default DialogActivityStep;
