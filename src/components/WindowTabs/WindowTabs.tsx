import React, { useCallback } from 'react';
import { closeWindowTabs, removeWindowTabByID, setSelectedWindowTabByID } from '../../store/reducers/newWindowReducer';
import { useDispatch, useSelector } from 'react-redux';

import Tab from '../../components/Tabs/Tab/Tab';
import Tabs from '../../components/Tabs/Tabs';

const SimpleComponent = React.memo((props: {id: string}) => {
    const { id } = props;

    return(
        <div>
            Tab content for tab ID: {id}
        </div>
    );
});

SimpleComponent.displayName = 'SimpleComponent';

const WindowTabs = React.memo((props: {setWindowFocus?: Function}) => {
    const { setWindowFocus = null } = props;
    let windowTabsIDObject = useSelector((state:any) => state.newWindow.windowTabsIDs);
    let selectedWindowTabID = useSelector((state:any) => state.newWindow.selectedWindowTab.id);
    let dispatch = useDispatch();
    let windowTabIDsArray = Object.keys(windowTabsIDObject);

    const closeWindowTab = useCallback((tabId: string) => {
        if(windowTabIDsArray.length === 1) {
            dispatch(closeWindowTabs());
        }
        dispatch(removeWindowTabByID(tabId));
    }, [windowTabIDsArray.length]);

    const handleTabSelect = useCallback((tabId: string) => {
        dispatch(setSelectedWindowTabByID(tabId));
    }, [dispatch]);

    if(setWindowFocus) {
        setWindowFocus();
    }

    return (
        <Tabs
            activeTabId={selectedWindowTabID}
            avoidChildRerender={true}
            onTabChange={handleTabSelect}
            onTabClose={closeWindowTab}>
            {
                windowTabIDsArray.map((tabId) => (
                    <Tab
                        key={tabId}
                        tabId={tabId}
                        activated = {selectedWindowTabID === tabId}
                        title={windowTabsIDObject[tabId].label}
                        subTitle="asdfasdf asdfrghtjhtyjkyu dsfgdfg"
                        icon={windowTabsIDObject[tabId].tabType}>
                        <SimpleComponent id={tabId} />
                    </Tab>
                ))
            }
        </Tabs>
    );
});

WindowTabs.displayName = 'WindowTabs';
export default WindowTabs;