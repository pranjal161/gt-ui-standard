import React, {Suspense} from 'react';
import BaContext from 'context/baContext';

const WithActivity = ({hRef, children}: any) => (<BaContext.Provider value={{baId: hRef}}>
    <Suspense fallback={<div>Loading</div> }>{children}</Suspense>
</BaContext.Provider>
)

export default WithActivity
