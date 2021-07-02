import React from 'react';

export interface StepContextInterface {
    step?: string;
}

const StepContext = React.createContext<StepContextInterface>({});

export default StepContext
