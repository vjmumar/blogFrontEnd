import { createSlice } from "@reduxjs/toolkit";
// Actions
import { handleGetAuthenticatedUserStory as getUserStory } from "./handleGetStory";

const getAuthenticatedUserStorySlice = createSlice({
	name: "getAuthenticatedUserStory",
	initialState: {
		isLoading: false,
		story: {},
	},
	reducers: {
		reset: (state) => {
			state.story = {};
			state.isLoading = false;
		},
	},
	extraReducers: {
		[getUserStory.pending]: (state) => {
			state.isLoading = true;
		},
		[getUserStory.fulfilled]: (state, { payload }) => {
			state.isLoading = false;
			state.story = payload;
		},
		[getUserStory.rejected]: (state) => {
			state.isLoading = false;
			state.story = {};
		},
	},
});

export const { reset } = getAuthenticatedUserStorySlice.actions;
export default getAuthenticatedUserStorySlice.reducer;
