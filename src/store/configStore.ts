import { configureStore } from '@reduxjs/toolkit';
import { getFirebase } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import rootReducer from 'store/reducers';
import { useDispatch } from 'react-redux';

/**
 * The store that is currently used
 * @returns {*} The store that is currently used
 */
export default function configStore() {

    const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            thunk: {
                extraArgument: {
                    getFirebase,
                    getFirestore
                }
            }
        })
    });

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./reducers', () => {
            // eslint-disable-next-line global-require,@typescript-eslint/no-var-requires
            const nextRootReducer = require('store/reducers')
            store.replaceReducer(nextRootReducer)
        })
    }

    type AppDispatch = typeof store.dispatch;
    const useAppDispatch = () => useDispatch<AppDispatch>();

    return { store, useAppDispatch };
}
