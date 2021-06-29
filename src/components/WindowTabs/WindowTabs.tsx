import React, { useCallback } from 'react';
import { closeWindowTabs, removeWindowTabByID, setSelectedWindowTabByID } from 'store/reducers/newWindowReducer';
import { useDispatch, useSelector } from 'react-redux';

import ActivityContainer from 'components/ActitivyContainer/ActivityContainer';
import SampleTicket from '../SampleTicket/SampleTicket';
import Tab from 'components/Tabs/Tab/Tab';
import Tabs from 'components/Tabs/Tabs';
import WithActivity from 'components/WithActivity';

const SimpleComponent = React.memo((props: { tabId: string, href?: string, activityProps?: any }) => {
    const {tabId, href = undefined} = props;

    let component
    let mode
    switch (props.activityProps.entityType) {
        case 'ticket':
            component = <SampleTicket ticketId={tabId}/>
            break;
        case 'contract':
            mode = (props.activityProps.activityCode === 'contract_view') ? 'view': 'update'
            component = <WithActivity hRef={href+'_secondary'}><ActivityContainer mode={mode} {...{...props.activityProps, href}}/></WithActivity>
            break;
        case 'person':
            mode = (props.activityProps.activityCode === 'person_view') ? 'view': 'update'
            component = <WithActivity hRef={href+'_secondary'}><ActivityContainer mode={mode} {...{...props.activityProps, href}}/></WithActivity>

    }

    return (
        <>
            {component}
        </>
    );
})

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
                        title={windowTabsIDObject[tabId].title}
                        subTitle={windowTabsIDObject[tabId].subTitle}
                        icon={windowTabsIDObject[tabId].type}>
                        <SimpleComponent
                            key={tabId}
                            tabId={tabId}
                            href={windowTabsIDObject[tabId].href}
                            activityProps={windowTabsIDObject[tabId].activityProps}
                        />
                    </Tab>
                ))
            }
        </Tabs>
    );
});

WindowTabs.displayName = 'WindowTabs';
export default WindowTabs;
