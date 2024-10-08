import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'
import logger from 'redux-logger'
import session from './session';


const rootReducer = combineReducers({
    session,
});


const persistConfig = {
    key: 'root',
    version: 1,
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    // Pass previously created persisted reducer
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => {
        const middleware = getDefaultMiddleware({
            // Pass in a custom `extra` argument to the thunk middleware
            thunk: {
                // extraArgument: { serviceLayer }
            },
            // Customize the built-in serializability dev check
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })/*.concat(customMiddleware, api.middleware)*/

        // Conditionally add another middleware in dev
        if (process.env.NODE_ENV !== 'production') {
            middleware.push(logger)
        }

        return middleware
    },
    // Turn off devtools in prod, or pass options in dev
    devTools:
        process.env.NODE_ENV === 'production'
            ? false
            : {
                // stateSanitizer: stateSanitizerForDevtools
            }
})

export default store;