import { createSlice } from "@reduxjs/toolkit";
// Actions
import { handleGetMessage as getMsg } from "./handleGetMessage";

const selectedUserSlice = createSlice({
	name: "selectedUser",
	initialState: {
		image: "",
		firstName: "",
		lastName: "",
		totalMessages: 0,
		totalShowedMessages: 0,
		messages: [],
		isLoading: false,
	},
	reducers: {
		handleUpdateSelectedBasicInfo: (state, { payload }) => {
			state.image = payload.imageLink;
			state.firstName = payload.firstName;
			state.lastName = payload.lastName;
		},
	},
	extraReducers: {
		[getMsg.pending]: (state) => {
			state.isLoading = true;
		},
		[getMsg.fulfilled]: (state, { payload }) => {
			state.isLoading = false;
			state.image = payload.receiverImage;
			state.firstName = payload.receiverFirstName;
			state.lastName = payload.receiverLastName;
			state.messages = payload.messages;
			state.totalMessages = payload.totalMessages;
			state.totalShowedMessages = payload.totalShowedMessages;
		},
		[getMsg.rejected]: (state) => {
			state.isLoading = false;
			state.messages = [];
		},
	},
});

export const { handleUpdateSelectedBasicInfo } = selectedUserSlice.actions;
export default selectedUserSlice.reducer;
