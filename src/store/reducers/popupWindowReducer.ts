import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface addWindowTabActionInt {
    tabId: string,
    displayTabLabel: string
}

interface selectedWindowTabInt {
    id: string
}

interface windowTabsObjsInt {
    [key: string]: string
}

interface popupWindowInt {
    isPopupWindowWithTabsOpened: boolean,
    selectedWindowTab: selectedWindowTabInt,
    windowTabsIDs: windowTabsObjsInt
}

const initialState: popupWindowInt = {
    isPopupWindowWithTabsOpened: false,
    selectedWindowTab: {id: ''},
    windowTabsIDs: {}
};

const popupWindowSlice = createSlice({
    name: 'popupWindow',
    initialState,
    reducers: {
        openWindowTabs(state) {
            state.isPopupWindowWithTabsOpened = true;
        },
        closeWindowTabs() {
            return initialState;
        },
        addWindowTabByID(state, action: PayloadAction<addWindowTabActionInt>) {
            if(!state.isPopupWindowWithTabsOpened)
                state.isPopupWindowWithTabsOpened = true;
            state.selectedWindowTab.id = action.payload.tabId;
            state.windowTabsIDs[action.payload.tabId] = action.payload.displayTabLabel;
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
                    state.isPopupWindowWithTabsOpened = false;
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

export default popupWindowSlice.reducer;
export const {
    openWindowTabs,
    closeWindowTabs,
    addWindowTabByID,
    removeWindowTabByID,
    setSelectedWindowTabByID
} = popupWindowSlice.actions;