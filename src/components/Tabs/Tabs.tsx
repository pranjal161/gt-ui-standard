import { LeftChevronIcon, RightChevronIcon } from '../../assets/svg';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { MemoTabButton } from './TabButton/TabButton';// TabButton,

import styled from 'styled-components';

const TabsMainContainer = styled.div`
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
`;

const TabsButtonsContainer = styled.div`
    display: flex;
    flex-wrap: nowrap;
    border-bottom: 2px solid #D9D9D9;
    overflow: hidden;
    scroll-behavior: smooth;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const TabsButtonsScroller = styled.div<{isLeft: boolean}>`
    padding-top: 12px;
    height: 48px;
    opacity: 0.6;
    background-color: white;
    vertical-align: middle;
    text-align: center;
    position: absolute;
    display: none;
    ${(props) => (props.isLeft ? 'left: 0;' : 'right: 0;')}
`;

export interface TabsProps {
    children: any,
    avoidChildRerender?: boolean,
    activeTabId?: string,
    onTabChange?: Function,
    onTabClose?: Function
}

/**
 * Displays content in tabbed view. Only one tab can be active at one time, and only its content would be visible.
 * Tabs hide the content with a simple css rule - display: "none". This means that tab content which is a React component is not rerendered, just hidden.
 * This way the state of each React component that is being displayed or hidden, is preserved during tab selection. 
 * Otherwise, on each tab reselect the tab content would revert to its initial state, losing all user made changes that were not saved.
 * Tabs can also be closed to be removed from the tabbed view, and can be dynamically added, without rerendering already added tabs and their content.
 * The component doesn't seem to increase memory usage much - the app starts with a memory use of about 17-18 MB, and opening a 4 tabs 
 * containing TicketView components causes an initial bump to about 50 MB, and this is about 1 minute later reduced to about 19-20 MB.
 * Re-renders are optimized to try to keep them to just what is necessary.
 * @constructor 
 * @example - how to use the component to render content, also see TicketTabs
 * <Tabs
 *      onTabClick={handleTabSelect}
 *      onTabClose={handleTabClose}>
 *      <Tab
 *          tabId="tab1"
 *          activated={true}
 *          title="Tab 1">
 *              <AnyReactComponent />
 *      </Tab>
 *      <Tab
 *          tabId="tab2"
 *          activated={false}
 *          title="Tab 2">
 *              <AnyReactComponent />
 *      </Tab>
 * </Tabs>
 * @param {any} children - the component Tab. Its props tabId, isActiveTab and tabLabel are used to render the Tab buttons, 
 * and props children - the tab content.
 * @param {string} [activeTabId = null] - the id of the active tab. The Tab component has a props named tabId, which must match the activeTabId.
 * While the default is null, it is set with a useState to the id of the first Tab component child of Tabs.
 * @param {Function} [onTabChange = null] - the function that handles what happens when the user clicks on a tab.
 * @param {Function} [onTabClose = null] - the function that handles what happens when the user closes a tab.
 */

const Tabs = (props: TabsProps) => {

    const {
        children, 
        avoidChildRerender = false, 
        activeTabId = null, 
        onTabChange = null, 
        onTabClose = null
    } = props;
    const [activeTab, setActiveTab] = useState(children ? children[0].props.tabId : null);
    const mainDivRef = useRef<HTMLDivElement>(null);
    const scrollDivRef = useRef<HTMLDivElement>(null);
    const scrollLeftArrowRef = useRef<HTMLDivElement>(null);
    const scrollRightArrowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(activeTabId)
            setActiveTab(activeTabId);
    }, [activeTabId]);

    useEffect(() => {
        console.log('Tabs children number changed:');
        let containerWidth = mainDivRef.current?.offsetWidth;
        let scrollWidth = scrollDivRef.current?.scrollWidth;
        console.log('Tabs children mainDivRef width: '+containerWidth);
        console.log('Tabs children scrollDivRef width: '+scrollWidth);
        if(scrollWidth && containerWidth) {
            if(scrollWidth > containerWidth) {
                let scrollLeft = scrollDivRef.current?.scrollLeft;
                console.log('Tabs children scrollDivRef scrollLeft: '+scrollLeft);
                if(scrollLeft !== undefined) {
                    console.log('Tabs children scrollLeft if: '+scrollLeft);
                    if(scrollWidth > (scrollLeft! + containerWidth + 10)) {
                        console.log('Tabs children display right arrow');
                        scrollRightArrowRef.current!.style.display = 'block';
                    }
                    if(scrollLeft > 10) {
                        console.log('Tabs children display left arrow');
                        scrollLeftArrowRef.current!.style.display = 'block';
                    }
                }
            }
        }
    }, [children.length]);

    /**
     * This function handles what happens when the user clicks on a tab. 
     * It uses the useCallback React hook to prevent the TabButton component from rendering with no need.
     * @function 
     * @name handleTabChange
     * @param {string} tabId - the id of the clicked tab
     * @returns {void} - if there is an onTabClick props function passed, it is called. If not, just calls the setActiveTab from useState.
     */
    const handleTabChange = useCallback((tabId: string) => {
        if(activeTabId && onTabChange)
            onTabChange(tabId);
        else
            setActiveTab(tabId);
    }, [onTabChange]);

    /**
     * This function handles what happens when the user closes a tab. 
     * It uses the useCallback React hook to prevent the TabButton component from rendering with no need.
     * @function 
     * @name handleTabClose
     * @param {string} tabId - the id of the tab to be closed
     * @returns {void} - if there is an onTabClose props function passed, it is called. If not, exit the function.
     */
    const handleTabClose = useCallback((tabId: string) => {
        if(activeTabId && onTabClose)
            onTabClose(tabId);
    }, [onTabClose]);

    const scrollHandler = (scrollOffset:number) => {
        console.log('Tabs scrollHandler called:');
        if(scrollDivRef.current) {
            scrollDivRef.current.scrollLeft += scrollOffset;
            console.log('Tabs scrollHandler change scrollLeft:');
            if(scrollDivRef.current.scrollLeft < 30) {
                scrollLeftArrowRef.current!.style.display = 'none';
            }
            if((scrollDivRef.current.scrollLeft + mainDivRef.current!.offsetWidth + 30) > scrollDivRef.current!.scrollWidth) {
                scrollRightArrowRef.current!.style.display = 'none';
            }
        }
    }

    console.log('Tabs render:');

    /**
     * The return (render for a React functional component) function handles the display of the component.
     * It uses a styled component to display the tab buttons as MemoTabButton React components.
     * It displays tab content in a div element, which is hidden for all tabIds that are not the active tab Id.
     * It uses children.map for the child component Tab to get the data it needs for renderz, and uses a key that is unique - 
     * the tabId props, to make use of the React optimization engine to avoid rerenders of a component more than what is necessary.
     */

    return (
        <TabsMainContainer
            ref={mainDivRef}>
            <TabsButtonsContainer
                ref={scrollDivRef}>
                <TabsButtonsScroller
                    onClick={() => scrollHandler(-20)}
                    isLeft={true}
                    ref={scrollLeftArrowRef}>
                    <LeftChevronIcon />
                </TabsButtonsScroller>
                {
                    children ?
                        children.map((child: any) => (
                            <MemoTabButton
                                key={child.props.tabId}
                                activated={child.props.tabId === activeTab}
                                tabId={child.props.tabId}
                                title={child.props.title ? child.props.title : 'Loading'}
                                subTitle={child.props.subTitle}
                                icon={child.props.icon}
                                onTabClick={handleTabChange}
                                onTabClose={handleTabClose}
                            />)
                        ) :
                        null
                }
                <TabsButtonsScroller
                    onClick={() => scrollHandler(20)}
                    isLeft={false}
                    ref={scrollRightArrowRef}>
                    <RightChevronIcon />
                </TabsButtonsScroller>
            </TabsButtonsContainer>
            {
                !children ?
                    'No tabbed content to display' :
                    avoidChildRerender ? 
                        children.map((child: any) => (
                            <div 
                                key={child.props.tabId} 
                                data-test="tab-content"
                                style={(child.props.tabId === activeTab) ? {display: 'block'} : {display: 'none'}}>
                                {child.props.children}
                            </div>
                        )) :
                        children.map((child: any) => (
                            (child.props.tabId === activeTab) ?
                                <div
                                    key={child.props.tabId} 
                                    data-test="tab-content">
                                    {child.props.children}
                                </div> :
                                null
                        ))
            }
        </TabsMainContainer>
    );
}

export default Tabs;