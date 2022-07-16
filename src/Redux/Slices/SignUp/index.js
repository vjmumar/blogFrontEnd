import { createSlice } from "@reduxjs/toolkit";
// Actions
import { handleSignUp as signUp } from "./handleSignUp";

const signUpSlice = createSlice({
	name: "signUp",
	initialState: {
		isSignUp: false,
		isLoading: false,
	},
	reducers: {
		reset: (state) => {
			state.isSignUp = false;
		},
	},
	extraReducers: {
		[signUp.pending]: (state, { payload }) => {
			state.isLoading = true;
		},
		[signUp.fulfilled]: (state, { payload }) => {
			state.isLoading = false;
			state.isSignUp = true;
		},
		[signUp.rejected]: (state, { payload }) => {
			state.isLoading = false;
			state.isSignUp = false;
		},
	},
});

export const { reset } = signUpSlice.actions;
export default signUpSlice.reducer;
