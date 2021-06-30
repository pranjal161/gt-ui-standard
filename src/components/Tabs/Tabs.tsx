import { LeftChevronIcon, RightChevronIcon } from '../../assets/svg';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { MemoTabButton } from './TabButton/TabButton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    tabsMainContainer: {
        width: '100%',
        height: '100%',
        margin: '0',
        padding: '0'
    },
    tabsButtonsContainer: {
        display: 'flex',
        flexWrap: 'nowrap',
        borderBottom: '2px solid #D9D9D9',
        overflow: 'hidden',
        scrollBehavior: 'smooth',

        '&::-webkit-scrollbar': {
            display: 'none'
        }
    },
    tabsButtonsScroller: {
        paddingTop: '12px',
        height: '48px',
        opacity: '0.6',
        backgroundColor: 'white',
        verticalAlign: 'middle',
        textAlign: 'center',
        position: 'absolute',
        display: 'none'
    },
    tabsButtonsScrollerLeft: {
        left: '0'
    },
    tabsButtonsScrollerRight: {
        right: '0'
    }
}));

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

    const classes = useStyles();
    const [activeTab, setActiveTab] = useState(children ? children[0].props.tabId : null);
    const mainDivRef = useRef<HTMLDivElement>(null);
    const scrollDivRef = useRef<HTMLDivElement>(null);
    const scrollLeftArrowRef = useRef<HTMLDivElement>(null);
    const scrollRightArrowRef = useRef<HTMLDivElement>(null);

    /**
     * handles show and hide of side scrolling arrows
     * @returns {void} uses references
     */
    function reAdjust(): void {
        console.log('Tabs reAdjust:');
        let containerWidth = mainDivRef.current?.offsetWidth;
        let scrollWidth = scrollDivRef.current?.scrollWidth;

        if(scrollWidth && containerWidth) {
            if(scrollWidth > containerWidth) {
                let scrollLeft = scrollDivRef.current?.scrollLeft;
                if(scrollLeft !== undefined) {
                    if(scrollWidth > (scrollLeft! + containerWidth)) {
                        scrollRightArrowRef.current!.style.display = 'block';
                    }
                    else {
                        scrollRightArrowRef.current!.style.display = 'none';
                    }

                    if(scrollLeft > 0) {
                        scrollLeftArrowRef.current!.style.display = 'block';
                    }
                }
            }
            else {
                scrollLeftArrowRef.current!.style.display = 'none';
                scrollRightArrowRef.current!.style.display = 'none';
            }
        }
    }

    useEffect(() => {
        if(activeTabId)
            setActiveTab(activeTabId);
    }, [activeTabId]);

    // I use a timer for new window, as it cannot get a handle for the popup window easily
    useEffect(() => {
        const intervalId = setInterval(() => {
            reAdjust();
        }, 1000);

        return () => {
            clearInterval(intervalId);
        }
    }, []);

    useEffect(() => {
        reAdjust();
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

            if(scrollDivRef.current.scrollLeft + scrollOffset <= 0) {
                scrollLeftArrowRef.current!.style.display = 'none';
            }
            else {
                scrollLeftArrowRef.current!.style.display = 'block';
            }

            if((scrollDivRef.current.scrollLeft + mainDivRef.current!.offsetWidth + scrollOffset) >= scrollDivRef.current!.scrollWidth) {
                scrollRightArrowRef.current!.style.display = 'none';
            }
            else {
                scrollRightArrowRef.current!.style.display = 'block';
            }
        }
    }

    console.log('Tabs render:');

    /**
     * The return (render for a React functional component) function handles the display of the component.
     * It uses a makeStyles component to display the tab buttons as MemoTabButton React components.
     * It displays tab content in a div element, which is hidden for all tabIds that are not the active tab Id.
     * It uses children.map for the child component Tab to get the data it needs for renderz, and uses a key that is unique - 
     * the tabId props, to make use of the React optimization engine to avoid rerenders of a component more than what is necessary.
     */

    return (
        <div 
            className={classes.tabsMainContainer}
            ref={mainDivRef}>
            <div
                className={classes.tabsButtonsContainer}
                ref={scrollDivRef}>
                <div
                    className={classes.tabsButtonsScroller+' '+classes.tabsButtonsScrollerLeft}
                    onClick={() => scrollHandler(-20)}
                    ref={scrollLeftArrowRef}>
                    <LeftChevronIcon />
                </div>
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
                                onTabClose={(activeTabId && onTabClose) ? handleTabClose : undefined}
                            />)
                        ) :
                        null
                }
                <div
                    className={classes.tabsButtonsScroller+' '+classes.tabsButtonsScrollerRight}
                    onClick={() => scrollHandler(20)}
                    ref={scrollRightArrowRef}>
                    <RightChevronIcon />
                </div>
            </div>
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
        </div>
    );
}

export default Tabs;