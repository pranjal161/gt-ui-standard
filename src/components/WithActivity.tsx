import BaContext from 'context/baContext';
import React from 'react';

const WithActivity = ({hRef, children}: any) => (<BaContext.Provider value={{baId: hRef}}>
    {children}
</BaContext.Provider>
)

export default WithActivity
