// lib/features/counter/counterSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	value: 0,
};

const counterSlice = createSlice({
	name: "counter",
	initialState,
	reducers: {
		increment(state, action) {
			if (action.payload) {
				state.value += action.payload;
			} else {
				state.value += 1;
			}
		},
		decrement(state, action) {
			state.value -= 1;
		},
		// Optionally, you can define other actions here
	},
});

export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;
