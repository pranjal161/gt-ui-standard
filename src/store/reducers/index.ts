import authReducer from './authReducer';
import basketReducer from './basketReducer';
import {combineReducers} from 'redux';
import {firebaseReducer} from 'react-redux-firebase';
import {firestoreReducer} from 'redux-firestore';
import ticketReducer from './ticketReducer';
import userReducer from './userReducer';

const reducers = combineReducers(
    {
        auth: authReducer,
        baskets: basketReducer,
        firebase: firebaseReducer,
        firestore: firestoreReducer,
        tickets: ticketReducer,
        users: userReducer,
    }
)

export default reducers
