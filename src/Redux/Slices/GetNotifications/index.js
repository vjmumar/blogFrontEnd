import { createSlice } from "@reduxjs/toolkit";
// Actions
import { handleGetNotification as get } from "./handleGetNotification";

const getNotificationSlice = createSlice({
	name: "getNotification",
	initialState: {
		totalNotifications: 0,
		totalOfUnreadNotifications: 0,
		totalOFriendWhoHaveUnreadMessages: 0,
		notifications: [],
		isLoading: false,
	},
	reducers: {
		clearNotifications: (state) => {
			state.isLoading = false;
			state.totalNotifications = 0;
			state.totalOfUnreadNotifications = 0;
			state.notifications = [];
		},
	},
	extraReducers: {
		[get.pending]: (state) => {
			state.isLoading = true;
		},
		[get.fulfilled]: (state, { payload }) => {
			state.isLoading = false;
			state.totalNotifications = payload.totalNotifications;
			state.totalOfUnreadNotifications = payload.totalOfUnreadNotifications;
			state.notifications = payload.notifications;
			state.totalOFriendWhoHaveUnreadMessages = payload.totalOFriendWhoHaveUnreadMessages;
		},
		[get.rejected]: (state) => {
			state.isLoading = false;
			state.totalNotifications = 0;
			state.totalOfUnreadNotifications = 0;
			state.totalOFriendWhoHaveUnreadMessages = 0;
			state.notifications = [];
		},
	},
});

export const { clearNotifications } = getNotificationSlice.actions;
export default getNotificationSlice.reducer;
