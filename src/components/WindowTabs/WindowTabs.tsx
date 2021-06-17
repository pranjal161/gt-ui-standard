import React, { useCallback } from 'react';
import { closeWindowTabs, removeWindowTabByID, setSelectedWindowTabByID } from '../../store/reducers/newWindowReducer';
import { useDispatch, useSelector } from 'react-redux';

import SampleContract from '../SampleContract/SampleContract';
import SampleTicket from '../SampleTicket/SampleTicket';
import Tab from '../../components/Tabs/Tab/Tab';
import Tabs from '../../components/Tabs/Tabs';

const SimpleComponent = React.memo((props: {tabId: string, type: string, contractURL?: string}) => {
    const { tabId, type, contractURL = undefined } = props;
    console.log('SimpleComponent render:');

    return(
        <div>
            {
                (type === 'ticket') ? 
                    <SampleTicket ticketId={tabId} /> : 
                    (type === 'contract') ? 
                        <SampleContract contractURL={contractURL!} /> : 
                        (type === 'client') ? 
                            <div>
                                Client view component for id={tabId}
                            </div> : 
                            <div>
                                No content defined for data type: {type}
                            </div>
            }
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
    console.log('WindowTabs windowTabsIDObject: ', windowTabsIDObject);

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
                        title={windowTabsIDObject[tabId].title}
                        subTitle={windowTabsIDObject[tabId].subTitle}
                        icon={windowTabsIDObject[tabId].type}>
                        <SimpleComponent 
                            tabId={tabId} 
                            type={windowTabsIDObject[tabId].type}
                            contractURL={windowTabsIDObject[tabId].contractURL} />
                    </Tab>
                ))
            }
        </Tabs>
    );
});

WindowTabs.displayName = 'WindowTabs';
export default WindowTabs;