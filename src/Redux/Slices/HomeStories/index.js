import { createSlice } from "@reduxjs/toolkit";
// Actions
import { handleGetHomeStories as getStories } from "./handleGetStories";

const getHomeStoriesSlice = createSlice({
	name: "getHomeStories",
	initialState: {
		isLoading: false,
		data: {},
	},
	reducers: {},
	extraReducers: {
		[getStories.pending]: (state) => {
			state.isLoading = true;
		},
		[getStories.fulfilled]: (state, {payload}) => {
			state.isLoading = false;
            state.data = payload;
		},
		[getStories.rejected]: (state) => {
			state.isLoading = false;
            state.data = {};
		},
	},
});

export const {} = getHomeStoriesSlice.actions;
export default getHomeStoriesSlice.reducer;
