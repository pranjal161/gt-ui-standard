import React, { useState } from 'react';
import { addWindowTabByID } from '../../../store/reducers/newWindowReducer';
import { useDispatch } from 'react-redux';

const TrainingNikolay = React.memo(() => {
    const [tabID, setTabId] = useState(0);
    let dispatch = useDispatch();
    const addTab = () => {
        setTabId((prevId) => prevId + 1);
        dispatch(addWindowTabByID({tabId: tabID.toString(), tabType: 'ticket', displayTabLabel: 'TabButton Qqg '+tabID}));
    }

    return (
        <>
            <h1>Hello Nikolay</h1>
            <button onClick={addTab}>
                Press to open window.
            </button>
        </>
    )
})

TrainingNikolay.displayName = 'TrainingNikolay';
export default TrainingNikolay;