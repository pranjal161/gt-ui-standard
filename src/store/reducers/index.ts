import aiaReducer from './aiaReducer';
import authReducer from './authReducer';
import basketReducer from './basketReducer';
import camundaReducer from './camundaReducer';
import {combineReducers} from 'redux';
import {firebaseReducer} from 'react-redux-firebase';
import {firestoreReducer} from 'redux-firestore';
import newWindowReducer from './newWindowReducer';
import secondaryTabsReducer from './secondaryTabsReducer';
import ticketReducer from './ticketReducer';
import userReducer from './userReducer';

const reducers = combineReducers(
    {
        auth: authReducer,
        baskets: basketReducer,
        camunda: camundaReducer,
        firebase: firebaseReducer,
        firestore: firestoreReducer,
        newWindow: newWindowReducer,
        secondaryTabs: secondaryTabsReducer,
        tickets: ticketReducer,
        users: userReducer,
        aia: aiaReducer
    }
)

export default reducers
