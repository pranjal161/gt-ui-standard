import React, { useState } from 'react';
import { addWindowTabByID, closeWindowTabs } from '../../../store/reducers/newWindowReducer';
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';

import NewWindow from '../../../components/NewWindow/NewWindow';

interface PropsType {
    isOk: boolean;
}

const NewElement = styled.div`
    color: ${(props:PropsType) => (props.isOk ? 'green' : 'red')};
`;

const TrainingNikolay = () => {
    const [tabID, setTabId] = useState(0);
    let isWindowOpen = useSelector((state:any) => state.newWindow.isNewWindowWithTabsOpened);
    let dispatch = useDispatch();
    const addTab = () => {
        setTabId((prevId) => prevId + 1);
        dispatch(addWindowTabByID({tabId: tabID.toString(), tabType: 'ticket', displayTabLabel: 'TabButton '+tabID}));
    }

    const onCloseTicketNewWindow = () => {
        dispatch(closeWindowTabs());
    }

    return (
        <>
            <h1>Hello Nikolay</h1>
            <button onClick={addTab}>
                Press to open window.
            </button>
            {
                isWindowOpen &&
                <NewWindow
                    windowMaximized={true}
                    passSetFocus={true}
                    onCloseCallback={onCloseTicketNewWindow}>
                    <NewElement isOk={tabID === 1}>
                        number of tabs is: {tabID}
                    </NewElement>
                </NewWindow>                
            }
        </>
    )
}

export default TrainingNikolay;
