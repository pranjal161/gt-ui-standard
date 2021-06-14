import { removeSecondaryTabByID, setSelectedSecondaryTabByID } from '../../store/reducers/secondaryTabsReducer';

import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import { MemoTabButton } from '../Tabs/TabButton/TabButton';
import styled from 'styled-components';

const TabsButtonsContainer = styled.div`
    display: flex;
    flex-wrap: nowrap;
    z-index: 41;
    padding-bottom: 2px;
    line-height: 0.6;
`;

const SecondaryTabs = () => {
    const selectedTabObject = useSelector((state:any) => state.secondaryTabs.selectedSecondaryTab);
    const displayedTabsObject = useSelector((state:any) => state.secondaryTabs.secondaryTabsIDs);
    const dispatch = useDispatch();
    const displayedTabsArray = Object.keys(displayedTabsObject);
    const history = useHistory();
    const location = useLocation();
    let displaySecTabs = true;

    // if the user moves to a new page, make no tabs active
    useEffect(() => {
        if(location.pathname !== '/viewTab')
            dispatch(setSelectedSecondaryTabByID('empty string'));
    }, [location.pathname]);

    if(!selectedTabObject.id ||
       displayedTabsArray.length == 0)
        displaySecTabs = false;

    const changeSecTab = useCallback((tabId:string) => {
        dispatch(setSelectedSecondaryTabByID(tabId));
        // if the current page opened isn't viewTab, go to it.
        if(location.pathname !== '/viewTab')
            history.push('/viewTab');
    }, [dispatch, location.pathname]);

    const closeSecTab = useCallback((tabId:string) => {
        dispatch(removeSecondaryTabByID(tabId));
        // if this will close all opened tabs, go to home page
        if(displayedTabsArray.length === 1 &&
        location.pathname === '/viewTab') {
            history.push('/home');
        }
    }, [dispatch, displayedTabsArray.length]);

    return (
        <>
            {
                displaySecTabs &&
                <TabsButtonsContainer>
                    {
                        displayedTabsArray.map((tabId) => (
                            <MemoTabButton
                                activated={selectedTabObject.id === tabId}
                                tabId={tabId}
                                title={displayedTabsObject[tabId].title}
                                subTitle={displayedTabsObject[tabId].subTitle}
                                icon={displayedTabsObject[tabId].type}
                                onTabClick={changeSecTab}
                                onTabClose={closeSecTab}
                                key={tabId} />))
                    }
                </TabsButtonsContainer>
            }
        </>
    );
}

export default SecondaryTabs;