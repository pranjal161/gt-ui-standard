import {createContext, useContext} from 'react';

export const StepContext = createContext({})

export const useMyContext = () => useContext(StepContext)
