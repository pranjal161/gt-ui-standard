import React, { useState } from 'react';
import { addWindowTabByID, closeWindowTabs } from '../../../store/reducers/popupWindowReducer';
import { useDispatch, useSelector } from 'react-redux';

import NewWindowPortal from '../../../components/NewWindowPortal/NewWindowPortal';

const TrainingNikolay = () => {
    const [tabID, setTabId] = useState(0);
    let isWindowOpen = useSelector((state:any) => state.popupWindow.isPopupWindowWithTabsOpened);
    let dispatch = useDispatch();
    const addTab = () => {
        setTabId((prevId) => prevId + 1);
        dispatch(addWindowTabByID({tabId: tabID.toString(), displayTabLabel: 'Tab '+tabID}));
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
                <NewWindowPortal
                    windowMaximized={true}
                    passSetFocus={true}
                    onCloseCallback={onCloseTicketNewWindow}>
                    <div>
                        number of tabs is: {tabID}
                    </div>
                </NewWindowPortal>                
            }
        </>
    )
}

export default TrainingNikolay;