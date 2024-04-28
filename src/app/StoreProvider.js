"use client";
import { Provider } from "react-redux";
import { makeStore } from "@/lib/store/store";
import { useRef } from "react";
import { increment } from "@/lib/features/counter/counterSlice"; //optional

export default function StoreProvider({ children }) {
	const storeRef = useRef();
	if (!storeRef.current) {
		// Create the store instance the first time this renders
		storeRef.current = makeStore();
		// Initialize the store with the initial state from Redux
		storeRef.current.dispatch(increment(5)); //optional
	}
	return <Provider store={storeRef.current}>{children}</Provider>;
}
