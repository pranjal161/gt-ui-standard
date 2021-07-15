import GeneralInformation
    from './GeneralInformation/GeneralInformation';
import React from 'react';

const PersonPreview = ({hRef}: any) => <>
    <GeneralInformation hRef={hRef} key={'GeneralInformation'}/>
</>

export default PersonPreview;
