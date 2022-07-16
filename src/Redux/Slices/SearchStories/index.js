import { createSlice } from "@reduxjs/toolkit";
// Actions
import { handleSearchStories as search } from "./handleSearch";

const searchStoriesSlice = createSlice({
	name: "searchStories",
	initialState: {
		isLoading: false,
		search: {},
	},
	reducers: {
		reset: (state) => {
			state.isLoading = false;
			state.search = {};
		},
	},
	extraReducers: {
		[search.pending]: (state) => {
			state.isLoading = true;
		},
		[search.fulfilled]: (state, { payload }) => {
			state.isLoading = false;
			state.search = payload;
		},
		[search.rejected]: (state) => {
			state.isLoading = false;
			state.search = {};
		},
	},
});

export const { reset } = searchStoriesSlice.actions;
export default searchStoriesSlice.reducer;
