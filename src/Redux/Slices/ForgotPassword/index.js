import { createSlice } from "@reduxjs/toolkit";
// Actions
import { handleChangePassword as changePassword } from "./handleChangePassword";
import { handleRequest as request } from "./handleRequest";

export const forgotPasswordSlice = createSlice({
	name: "forgotPassword",
	initialState: {
		isLoading: false,
		isChange: false,
		isRequested: false,
	},
	reducers: {
		reset: (state) => {
			state.isLoading = false;
			state.isChange = false;
			state.isRequested = false;
		},
	},
	extraReducers: {
		// Verify
		[changePassword.pending]: (state) => {
			state.isLoading = true;
		},
		[changePassword.fulfilled]: (state) => {
			state.isChange = true;
			state.isLoading = false;
		},
		[changePassword.rejected]: (state) => {
			state.isChange = false;
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

export const { reset } = forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;
