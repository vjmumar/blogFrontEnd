import { createSlice } from "@reduxjs/toolkit";
// Actions
import { handleGetComments as getComments } from "./handleGetComments";

const getCommentsSlice = createSlice({
	name: "getComments",
	initialState: {
		isLoading: false,
		comments: {},
	},
	reducers: {
		reset: (state) => {
			state.isLoading = false;
			state.comments = {};
		},
	},
	extraReducers: {
		[getComments.pending]: (state) => {
			state.isLoading = true;
		},
		[getComments.fulfilled]: (state, { payload }) => {
			state.isLoading = false;
			state.comments = payload;
		},
		[getComments.rejected]: (state) => {
			state.isLoading = false;
			state.comments = {};
		},
	},
});

export const { reset } = getCommentsSlice.actions;
export default getCommentsSlice.reducer;
