import React, {Suspense} from 'react';
import BaContext from 'context/baContext';

const WithActivity = ({baId, children}: any) => (<BaContext.Provider value={{baId}}>
    <Suspense fallback={<div>Loading</div> }>{children}</Suspense>
</BaContext.Provider>
)

export default WithActivity
