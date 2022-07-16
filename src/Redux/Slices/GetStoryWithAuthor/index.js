import { createSlice } from "@reduxjs/toolkit";
// Actions
import { handleGetStoryWithAuthor as result } from "./handleGetStoryWithAuthor";

const storyWithAuthorSlice = createSlice({
	name: "storyWithAuthor",
	initialState: {
		isLoading: false,
		data: {},
	},
	reducers: {
		reset: (state) => {
			state.isLoading = false;
			state.data = {};
		},
	},
	extraReducers: {
		[result.pending]: (state) => {
			state.isLoading = true;
		},
		[result.fulfilled]: (state, { payload }) => {
			state.isLoading = false;
			state.data = payload;
		},
		[result.rejected]: (state) => {
			state.isLoading = false;
			state.data = {};
		},
	},
});

export const { reset } = storyWithAuthorSlice.actions;
export default storyWithAuthorSlice.reducer;
