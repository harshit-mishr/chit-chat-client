'use client';
// StoreProvider.js
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { makeStore } from '@/lib/redux/store/store';
import { useRef } from 'react';
import { increment } from '@/lib/redux/features/counter/counterSlice'; //optional

export default function StoreProvider({ children }) {
    const storeRef = useRef();
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore();
        // Initialize the store with the initial state from Redux
        storeRef.current.store.dispatch(increment(5)); //optional
    }
    return (
        <Provider store={storeRef.current.store}>
            <PersistGate
                loading={<div>Loading initial store...</div>}
                persistor={storeRef.current.persistor}
            >
                {children}
            </PersistGate>
        </Provider>
    );
}
