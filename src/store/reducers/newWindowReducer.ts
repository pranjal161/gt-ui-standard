import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface addWindowTabActionInt {
    tabId: string,
    tabType: string,
    displayTabLabel: string,
    displayTabSmallLabel?: string,
    href?: string,
    activityProps?:any
}

export interface selectedWindowTabInt {
    id: string
}

export interface windowTabsObjsInt {
    [key: string]: {
        title: string,
        subTitle?: string,
        href?: string,
        type: string,
        activityProps?:any
    }
}

interface newWindowInt {
    isNewWindowWithTabsOpened: boolean,
    selectedWindowTab: selectedWindowTabInt,
    windowTabsIDs: windowTabsObjsInt
}

const initialState: newWindowInt = {
    isNewWindowWithTabsOpened: false,
    selectedWindowTab: {id: ''},
    windowTabsIDs: {}
};

const newWindowSlice = createSlice({
    name: 'newWindow',
    initialState,
    reducers: {
        openWindowTabs(state) {
            state.isNewWindowWithTabsOpened = true;
        },
        closeWindowTabs() {
            return initialState;
        },
        addWindowTabByID(state, action: PayloadAction<addWindowTabActionInt>) {
            if(!state.isNewWindowWithTabsOpened)
                state.isNewWindowWithTabsOpened = true;
            state.selectedWindowTab.id = action.payload.tabId;

            let secLabel: string | undefined;
            let URL: string | undefined;

            if(action.payload.displayTabSmallLabel) {
                secLabel = action.payload.displayTabSmallLabel
            }
            if(action.payload.displayTabSmallLabel) {
                URL = action.payload.href;
            }
            state.windowTabsIDs[action.payload.tabId] = { 
                title: action.payload.displayTabLabel,
                subTitle: secLabel,
                type: action.payload.tabType,
                href: URL,
                activityProps:action.payload.activityProps
            };
        },
        removeWindowTabByID(state, action: PayloadAction<string>) {
            let newTabsIDs = {...state.windowTabsIDs};
            delete newTabsIDs[action.payload];
            let remainingTabIds = Object.keys(newTabsIDs);

            if(state.selectedWindowTab.id === action.payload) {
                if(remainingTabIds.length > 0) {
                    state.selectedWindowTab.id = remainingTabIds[0];
                    state.windowTabsIDs = newTabsIDs;
                }
                else {
                    state.selectedWindowTab.id = '';
                    state.windowTabsIDs = {};
                    state.isNewWindowWithTabsOpened = false;
                }
            }
            else {
                state.windowTabsIDs = newTabsIDs;
            }
        },
        setSelectedWindowTabByID(state, action: PayloadAction<string>) {
            state.selectedWindowTab.id = action.payload;
        }
    }
});

export default newWindowSlice.reducer;
export const {
    openWindowTabs,
    closeWindowTabs,
    addWindowTabByID,
    removeWindowTabByID,
    setSelectedWindowTabByID
} = newWindowSlice.actions;
