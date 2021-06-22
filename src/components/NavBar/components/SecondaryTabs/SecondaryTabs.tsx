import { LeftChevronIcon, RightChevronIcon } from '../../../../assets/svg';
import React, { useCallback, useEffect, useRef } from 'react';
import { removeSecondaryTabByID, setSelectedSecondaryTabByID } from '../../../../store/reducers/secondaryTabsReducer';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { MemoTabButton } from '../../../Tabs/TabButton/TabButton';

const useStyles = makeStyles((theme) => ({
    tabsButtonsMainContainer: {
        width: '100%',
        margin: '0',
        padding: '0',
        zIndex: 51,
        position: 'relative'
    },
    tabsButtonsScrollContainer: {
        display: 'flex',
        flexWrap: 'nowrap',
        paddingBottom: '2px',
        overflow: 'hidden',
        scrollBehavior: 'smooth',

        '&::-webkit-scrollbar': {
            display: 'none'
        }
    },
    tabsButtonsScroller: {
        paddingTop: theme.spacing(0.75),
        height: '48px',
        opacity: '0.6',
        backgroundColor: 'white',
        verticalClign: 'middle',
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

const SecondaryTabs = () => {
    const classes = useStyles();
    const selectedTabObject = useSelector((state:any) => state.secondaryTabs.selectedSecondaryTab);
    const displayedTabsObject = useSelector((state:any) => state.secondaryTabs.secondaryTabsIDs);
    const dispatch = useDispatch();
    const displayedTabsArray = Object.keys(displayedTabsObject);
    const history = useHistory();
    const location = useLocation();
    let displaySecTabs = true;
    const mainDivRef = useRef<HTMLDivElement>(null);
    const scrollDivRef = useRef<HTMLDivElement>(null);
    const scrollLeftArrowRef = useRef<HTMLDivElement>(null);
    const scrollRightArrowRef = useRef<HTMLDivElement>(null);

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

    const scrollHandler = (scrollOffset:number) => {
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

    /**
     * handles show and hide of side scrolling arrows
     * @returns {void} uses references
     */
    function reAdjust(): void {
        let containerWidth = mainDivRef.current?.clientWidth;
        let scrollWidth = scrollDivRef.current?.scrollWidth;
        let scrollLeft = scrollDivRef.current?.scrollLeft;

        if(scrollWidth && containerWidth) {
            if(scrollWidth > containerWidth) {
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
        reAdjust();
    }, [displayedTabsArray.length]);

    useEffect(() => {
        window.addEventListener('resize', reAdjust);

        return () => {
            window.removeEventListener('resize', reAdjust);
        }
    }, []);

    return (
        <>
            {
                displaySecTabs &&
                <div
                    className={classes.tabsButtonsMainContainer}
                    ref={mainDivRef}>
                    <div
                        className={classes.tabsButtonsScrollContainer}
                        ref={scrollDivRef}>
                        <div
                            className={classes.tabsButtonsScroller+' '+classes.tabsButtonsScrollerLeft}
                            onClick={() => scrollHandler(-20)}
                            ref={scrollLeftArrowRef}>
                            <LeftChevronIcon />
                        </div>
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
                        <div
                            className={classes.tabsButtonsScroller+' '+classes.tabsButtonsScrollerRight}
                            onClick={() => scrollHandler(20)}
                            ref={scrollRightArrowRef}>
                            <RightChevronIcon />
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default SecondaryTabs;