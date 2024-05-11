// src/store/store.js

import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '@/lib/features/counter/counterSlice'; // Import your slice reducer
import navbarReducer from '@/lib/features/navbar/navbarSlice'; // Import your slice reducer
import userReducer from '@/lib/features/user/userSlice'; // Import your slice reducer

export const makeStore = () => {
    return configureStore({
        reducer: {
            counter: counterReducer,
            navbar: navbarReducer,
            user: userReducer,
            // Other reducers can be added here
        },
    });
};
