import React from 'react';
import image from '_sb_mock_images/Stepper.png'

export interface StepperProps {

    /**
     * props to define and describe
     */
    currentStep?: any
}

const Stepper: React.FC<StepperProps> = () => (
    <div>
        <img src={image} alt={'mock'}/>
    </div>
)

export default Stepper;
