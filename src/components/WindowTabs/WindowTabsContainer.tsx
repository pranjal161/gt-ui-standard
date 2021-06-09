import { useDispatch, useSelector } from 'react-redux';
import { NewWindowMemo } from '../NewWindow/NewWindow';
import React from 'react';
import WindowTabs from './WindowTabs';
import { closeWindowTabs } from '../../store/reducers/newWindowReducer';

const WindowTabsContainer = () => {
    let isWindowOpen = useSelector((state:any) => state.newWindow.isNewWindowWithTabsOpened);
    let dispatch = useDispatch();

    const onCloseTicketNewWindow = () => {
        dispatch(closeWindowTabs());
    }

    return(
        <>
            {
                isWindowOpen &&
                <NewWindowMemo
                    windowMaximized={true}
                    passSetFocus={true}
                    onCloseCallback={onCloseTicketNewWindow}>
                    <WindowTabs />
                </NewWindowMemo>
            }
        </>
    )
}

export default WindowTabsContainer;
export const WindowTabsContainerMemo = React.memo(WindowTabsContainer);