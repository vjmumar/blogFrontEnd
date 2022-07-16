import { createSlice } from "@reduxjs/toolkit";
// Actions
import { handleSignIn as signIn } from "./handleSignIn";

export const signInSlice = createSlice({
	name: "signIn",
	initialState: {
		isSignIn: false,
		isLoading: false,
		userId: "",
		token: "",
		status: "",
	},
	reducers: {
		signOut: (state) => {
			state.isSignIn = false;
			state.userId = "";
			state.token = "";
			state.status = "";
		},
	},
	extraReducers: {
		[signIn.pending]: (state) => {
			state.isLoading = true;
		},
		[signIn.fulfilled]: (state, { payload }) => {
			const resultData = payload[0];
			state.isSignIn = true;
			state.token = resultData.token;
			state.userId = resultData.accountId;
			state.status = "sucess";
			state.isLoading = false;
		},
		[signIn.rejected]: (state, { payload }) => {
			state.isLoading = false;
			state.isSignIn = false;
			state.token = "";
			state.userId = "";
			state.status = payload;
		},
	},
});

export const { signOut } = signInSlice.actions;

export default signInSlice.reducer;
