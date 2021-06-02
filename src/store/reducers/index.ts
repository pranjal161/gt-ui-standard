import apiReducer from './apiReducer';
import authReducer from './authReducer';
import basketReducer from './basketReducer';
import {combineReducers} from 'redux';
import {firebaseReducer} from 'react-redux-firebase';
import {firestoreReducer} from 'redux-firestore';
import newWindowReducer from './newWindowReducer'
import ticketReducer from './ticketReducer';
import userReducer from './userReducer';

const reducers = combineReducers(
    {
        auth: authReducer,
        baskets: basketReducer,
        firebase: firebaseReducer,
        firestore: firestoreReducer,
        newWindow: newWindowReducer,
        tickets: ticketReducer,
        users: userReducer,
        aia: apiReducer
    }
)

export default reducers
