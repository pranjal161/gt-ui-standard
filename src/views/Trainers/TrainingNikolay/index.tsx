import React, { useState } from 'react';
import { addWindowTabByID, closeWindowTabs } from '../../../store/reducers/newWindowReducer';
import { useDispatch, useSelector } from 'react-redux';

import NewWindow from '../../../components/NewWindow/NewWindow';
import TabButton from '../../../components/Tabs/TabButton/TabButton';

import styled from 'styled-components'

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
            <div>
                <TabButton 
                    activated={true} 
                    tabId="1"
                    title="activated long long long long long long long long long long long long" 
                    icon="ticket"
                    onTabClose={onCloseTicketNewWindow} />
                <TabButton 
                    activated={false} 
                    tabId="2"
                    title="not activated long long long long long long long long long long long long" 
                    subTitle="sub sub sub sub long long long long long long long long long long long long"
                    icon="contract"
                    onTabClose={onCloseTicketNewWindow} />
                <TabButton 
                    activated={false} 
                    tabId="3"
                    title="not activated" 
                    subTitle="sub sub sub sub"
                    icon="person"
                    onTabClose={onCloseTicketNewWindow} />
                <TabButton 
                    activated={true} 
                    tabId="4"
                    title="not activated" 
                    subTitle="sub sub sub sub"
                    icon="company"
                    onTabClose={onCloseTicketNewWindow} />
            </div>
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
