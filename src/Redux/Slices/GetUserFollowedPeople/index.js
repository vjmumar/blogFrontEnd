import { createSlice } from "@reduxjs/toolkit";
// Actions
import { handleGetUserFollowedPeople as getFollowedPeople} from "./handleGetUserFollowedPeople/index";

const getUserFollowedPeopleSlice = createSlice({
	name: "getUserFollowedPeople",
	initialState: {
		isLoading: false,
		followedPeople: [],
	},
	reducers: {
		reset: (state) => {
			state.isLoading = false;
			state.followedPeople = [];
		},
	},
	extraReducers: {
		[getFollowedPeople.pending]: (state) => {
			state.isLoading = true;
		},
		[getFollowedPeople.fulfilled]: (state, { payload }) => {
			state.isLoading = false;
			state.followedPeople = payload;
		},
		[getFollowedPeople.rejected]: (state) => {
			state.isLoading = false;
			state.followedPeople = [];
		},
	},
});

export const { reset } = getUserFollowedPeopleSlice.actions;
export default getUserFollowedPeopleSlice.reducer;
