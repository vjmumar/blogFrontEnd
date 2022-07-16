import { createSlice } from "@reduxjs/toolkit";
// Actions
import { handleGetProfile as profile } from "./handleGetProfile";

const getProfileSlice = createSlice({
	name: "getProfile",
	initialState: {
		isLoading: false,
		profile: {},
	},
	reducers: {
		reset: (state) => {
			state.isLoading = false;
			state.profile = {};
		},
	},
	extraReducers: {
		[profile.pending]: (state) => {
			state.isLoading = true;
		},
		[profile.fulfilled]: (state, { payload }) => {
			state.isLoading = false;
			state.profile = payload;
		},
		[profile.rejected]: (state) => {
			state.isLoading = false;
			state.profile = {};
		},
	},
});

export const { reset } = getProfileSlice.actions;
export default getProfileSlice.reducer;
