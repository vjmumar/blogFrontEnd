import { createSlice } from "@reduxjs/toolkit";
// Actions
import { handleVerify as verify } from "./handleVerify";
import { handleRequest as request } from "./handleRequest";

export const emailVerificationSlice = createSlice({
	name: "emailVerification",
	initialState: {
		isLoading: false,
		isVerify: false,
		isRequested: false,
	},
	reducers: {
		reset: (state) => {
			state.isLoading = false;
			state.isVerify = false;
			state.isRequested = false;
		},
	},
	extraReducers: {
		// Verify
		[verify.pending]: (state) => {
			state.isLoading = true;
		},
		[verify.fulfilled]: (state) => {
			state.isVerify = true;
			state.isLoading = false;
		},
		[verify.rejected]: (state) => {
			state.isVerify = false;
			state.isLoading = false;
		},
		// Request
		[request.pending]: (state) => {
			state.isLoading = true;
		},
		[request.fulfilled]: (state) => {
			state.isLoading = false;
			state.isRequested = true;
		},
		[request.rejected]: (state) => {
			state.isLoading = false;
			state.isRequested = false;
		},
	},
});

export const { reset } = emailVerificationSlice.actions;
export default emailVerificationSlice.reducer;
