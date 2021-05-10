import React from 'react';
import {ReactReduxFirebaseProvider} from 'react-redux-firebase';
import {createFirestoreInstance} from 'redux-firestore'
import firebase from 'firebase';
import {reactReduxFirebaseConfig} from 'configs/firebase';

const FirebaseProvider = (props:{children: any, dispatch: any} ) => (<ReactReduxFirebaseProvider
    firebase={firebase}
    config={reactReduxFirebaseConfig}
    dispatch={props.dispatch}
    createFirestoreInstance={createFirestoreInstance}>
    {props.children}
</ReactReduxFirebaseProvider>)

export default FirebaseProvider
