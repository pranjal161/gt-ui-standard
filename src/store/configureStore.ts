import {applyMiddleware, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension';
import {getFirebase} from 'react-redux-firebase'
import {getFirestore} from 'redux-firestore';
import rootReducer from 'store/reducers'
import thunk from 'redux-thunk'

/**
 * The store that is currently used
 * @returns {*} The store that is currently used
 */
export default function configureStore() {
    const middleware = [thunk.withExtraArgument({getFirebase, getFirestore})]

    const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)))

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./reducers', () => {
            // eslint-disable-next-line global-require,@typescript-eslint/no-var-requires
            const nextRootReducer = require('store/reducers')
            store.replaceReducer(nextRootReducer)
        })
    }

    return store
}
