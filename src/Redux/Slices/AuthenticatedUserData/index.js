import { createSlice } from "@reduxjs/toolkit";
import { handleGetAuthenticatedUserData as getUserData } from "./handleGetUserData";

const authenticatedUserDataSlice = createSlice({
	name: "authenticatedUserData",
	initialState: {
		isLoading: false,
		authenticatedUserData: [],
	},
	reducers: {},
	extraReducers: {
		[getUserData.pending]: (state) => {
			state.isLoading = true;
		},
		[getUserData.fulfilled]: (state, { payload }) => {
			state.isLoading = false;
			state.authenticatedUserData = payload;
		},
		[getUserData.rejected]: (state) => {
			state.isLoading = false;
			state.authenticatedUserData = [];
		},
	},
});

export const {} = authenticatedUserDataSlice.actions;
export default authenticatedUserDataSlice.reducer;
