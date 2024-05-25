import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedOption: 1,
};

const navbarSlice = createSlice({
    name: 'navbar',
    initialState,
    reducers: {
        setSelectedOption(state, action) {
            state.selectedOption = action.payload;
        },
    },
});

export const { setSelectedOption } = navbarSlice.actions;

export default navbarSlice.reducer;
