// src/store/store.js
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import counterReducer from '@/lib/redux/features/counter/counterSlice';
import navbarReducer from '@/lib/redux/features/navbar/navbarSlice';
import userReducer from '@/lib/redux/features/user/userSlice';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user'], // only user will be persisted
};

const rootReducer = combineReducers({
    // counter: counterReducer,
    navbar: navbarReducer,
    user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
    let store = configureStore({
        reducer: persistedReducer,
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [
                        FLUSH,
                        REHYDRATE,
                        PAUSE,
                        PERSIST,
                        PURGE,
                        REGISTER,
                    ],
                },
            }),
    });
    let persistor = persistStore(store);
    return { store, persistor };
};
