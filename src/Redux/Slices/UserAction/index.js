import { createSlice } from "@reduxjs/toolkit";
// Actions
import { handleActions as action } from "./handleActions";

const userActionSlice = createSlice({
	name: "userAction",
	initialState: {
		isLoading: false,
		isSuccessful: false,
	},
	reducers: {
		reset: (state) => {
			state.isLoading = false;
			state.isSuccessful = false;
		},
	},
	extraReducers: {
		[action.pending]: (state) => {
			state.isLoading = true;
		},
		[action.fulfilled]: (state) => {
			state.isLoading = false;
			state.isSuccessful = true;
		},
		[action.rejected]: (state) => {
			state.isLoading = false;
			state.isSuccessful = false;
		},
	},
});

export const { reset } = userActionSlice.actions;
export default userActionSlice.reducer;
