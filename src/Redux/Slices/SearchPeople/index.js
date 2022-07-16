import { createSlice } from "@reduxjs/toolkit";
// Actions
import { handleSearchPeople as search } from "./handleSearch";

const searchPeopleSlice = createSlice({
	name: "searchPeople",
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

export const { reset } = searchPeopleSlice.actions;
export default searchPeopleSlice.reducer;
