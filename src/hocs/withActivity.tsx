import BaContext from 'context/baContext';
import React from 'react';

const withActivity = (Component: any, hRef: string, restProps?:any) => (<BaContext.Provider value={{baId: hRef}}>
    <Component hRef={hRef} {...restProps}/>
</BaContext.Provider>
)

export default withActivity
