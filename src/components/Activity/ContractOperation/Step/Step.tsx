//On step mount we set the current step
import React, {useEffect, useState} from 'react';
import useStep from 'hooks/useStep';

export interface StepProps {

    /**
     * code of the step
     */
    code :string

    /**
     * children, content of th step
     */
    children: any
}

const Step = ({code, children}: any) => {
    //This is used to mount and set current step before the inputs are bind to the step
    const [isMounted, setIsMounted] = useState(false)
    const {setCurentStep} = useStep()

    useEffect(() => {
        setCurentStep(code)
        setIsMounted(true)
    }, [setIsMounted, setCurentStep, code])

    return isMounted ? children : <></>
}

export default React.memo(Step)
