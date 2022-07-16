import { createSlice } from "@reduxjs/toolkit";
import { handleGetPubAndDraftStories as getUserStories } from "./handleGetStories";

const getPubAndDraftAndBookmarkedStoriesSlice = createSlice({
	name: "pubAndDraftStories",
	initialState: {
		isLoading: false,
		stories: [],
	},
	extraReducers: {
		[getUserStories.pending]: (state) => {
			state.isLoading = true;
		},
		[getUserStories.fulfilled]: (state, { payload }) => {
			state.isLoading = false;
			state.stories = payload;
		},
		[getUserStories.rejected]: (state) => {
			state.isLoading = false;
			state.stories = [];
		},
	},
});

export const {} =  getPubAndDraftAndBookmarkedStoriesSlice.actions;
export default  getPubAndDraftAndBookmarkedStoriesSlice.reducer;
