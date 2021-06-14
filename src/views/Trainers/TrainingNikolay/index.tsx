import React, { useState } from 'react';
import { addSecondaryTabByID } from '../../../store/reducers/secondaryTabsReducer';
import { addWindowTabByID } from '../../../store/reducers/newWindowReducer';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const TrainingNikolay = React.memo(() => {
    const history = useHistory();
    const [tabID, setTabId] = useState(0);
    let dispatch = useDispatch();
    const addTab = () => {
        setTabId((prevId) => prevId + 1);
        if(tabID % 2 === 0)
            dispatch(addWindowTabByID({tabId: tabID.toString(), tabType: 'ticket', displayTabLabel: 'TabButton '+tabID+' the quick brown fox jumps over the lazy dog'}));
        else
            dispatch(addWindowTabByID({tabId: tabID.toString(), tabType: 'ticket', displayTabLabel: 'TabButton '+tabID+' the quick brown fox jumps over the lazy dog', displayTabSmallLabel: 'the quick brown foz jumps over the lazy dog THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG'}));
    }

    const openSecondaryTab = () => {
        let secTabID = Math.round(Math.random() * 100);
        console.log('openSecondaryTab secTabID.current: '+secTabID);
        dispatch(addSecondaryTabByID({
            tabId: secTabID.toString()+'ind',
            tabType: 'ticket',
            displayTabLabel: 'TabButton '+secTabID+' the quick brown fox jumps over the lazy dog', 
            displayTabSmallLabel: 'the quick brown foz jumps over the lazy dog THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG'
        }));
        history.push('/viewTab');
    }

    return (
        <>
            <h1>Hello Nikolay</h1>
            <button onClick={addTab}>
                Press to open window.
            </button>
            <button onClick={openSecondaryTab}>
                Press to open secondary tabs.
            </button>
        </>
    )
})

TrainingNikolay.displayName = 'TrainingNikolay';
export default TrainingNikolay;