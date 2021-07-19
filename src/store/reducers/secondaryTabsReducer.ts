import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
    addWindowTabActionInt as addSecondaryTabActionInt,
    windowTabsObjsInt as secondaryTabsObjsInt,
    selectedWindowTabInt as selectedSecondaryTabInt
} from './newWindowReducer'

interface secondaryTabsInt {
    areSecondaryTabsOpened: boolean,
    selectedSecondaryTab: selectedSecondaryTabInt,
    secondaryTabsIDs: secondaryTabsObjsInt
}

const initialState: secondaryTabsInt = {
    areSecondaryTabsOpened: false,
    selectedSecondaryTab: {id: ''},
    secondaryTabsIDs: {}
};

const secondaryTabsSlice = createSlice({
    name: 'secondaryTabs',
    initialState,
    reducers: {
        openSecondaryTabs(state) {
            state.areSecondaryTabsOpened = true;
        },
        closeSecondaryTabs() {
            return initialState;
        },
        addSecondaryTabByID(state, action: PayloadAction<addSecondaryTabActionInt>) {
            if(!state.areSecondaryTabsOpened)
                state.areSecondaryTabsOpened = true;

            state.selectedSecondaryTab.id = action.payload.tabId;
            
            let secLabel: string | undefined;
            let contractURL: string | undefined;

            if(action.payload.displayTabSmallLabel) {
                secLabel = action.payload.displayTabSmallLabel
            }
            if(action.payload.displayTabSmallLabel) {
                contractURL = action.payload.href;
            }
            
            state.secondaryTabsIDs[action.payload.tabId] = { 
                title: action.payload.displayTabLabel,
                subTitle: secLabel,
                type: action.payload.tabType,
                href: contractURL,
                activityProps:action.payload.activityProps,
            };
        },
        removeSecondaryTabByID(state, action: PayloadAction<string>) {
            let newTabsIDs = {...state.secondaryTabsIDs};
            delete newTabsIDs[action.payload];
            let remainingTabIds = Object.keys(newTabsIDs);

            if(state.selectedSecondaryTab.id === action.payload) {
                if(remainingTabIds.length > 0) {
                    state.selectedSecondaryTab.id = remainingTabIds[0];
                    state.secondaryTabsIDs = newTabsIDs;
                }
                else {
                    state.selectedSecondaryTab.id = '';
                    state.secondaryTabsIDs = {};
                    state.areSecondaryTabsOpened = false;
                }
            }
            else {
                state.secondaryTabsIDs = newTabsIDs;
            }
        },
        setSelectedSecondaryTabByID(state, action: PayloadAction<string>) {
            state.selectedSecondaryTab.id = action.payload;
        },
    }
});

export default secondaryTabsSlice.reducer;
export const {
    openSecondaryTabs,
    closeSecondaryTabs,
    addSecondaryTabByID,
    removeSecondaryTabByID,
    setSelectedSecondaryTabByID,
} = secondaryTabsSlice.actions;
