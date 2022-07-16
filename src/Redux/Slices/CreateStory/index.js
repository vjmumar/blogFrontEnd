import { createSlice } from "@reduxjs/toolkit";
// Actions
import { handleCreateStory as create } from "./handleCreateStory";
import { handleEditStory as edit } from "./handleEditStory";
import { handleRemoveStory as remove } from "./handleRemoveStory";

const createStorySlice = createSlice({
	name: "createStory",
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
		// Create
		[create.pending]: (state) => {
			state.isLoading = true;
		},
		[create.fulfilled]: (state) => {
			state.isLoading = false;
			state.isSuccessful = true;
		},
		[create.rejected]: (state) => {
			state.isLoading = false;
		},
		// Edit
		[edit.pending]: (state) => {
			state.isLoading = true;
		},
		[edit.fulfilled]: (state) => {
			state.isLoading = false;
			state.isSuccessful = true;
		},
		[edit.rejected]: (state) => {
			state.isLoading = false;
		},
		// Remove
		[remove.pending]: (state) => {
			state.isLoading = true;
		},
		[remove.fulfilled]: (state) => {
			state.isLoading = false;
			state.isSuccessful = true;
		},
		[remove.rejected]: (state) => {
			state.isLoading = false;
		},
	},
});

export const { reset } = createStorySlice.actions;
export default createStorySlice.reducer;
