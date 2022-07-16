import { createSlice, current } from "@reduxjs/toolkit";
// Actions
import { handleGetUserFriends as getFriends } from "./handleGetUserFriends/index";

const getUserFriendsSlice = createSlice({
	name: "getUserFriends",
	initialState: {
		isLoading: false,
		friends: [],
	},
	reducers: {
		reset: (state) => {
			state.isLoading = false;
			state.friends = [];
			state.totalFriends = 0;
		},
		updateFriendsPosition: (state, { payload }) => {
			// This Reducer is for messaging to swap the position
			// of latest receiver to first position
			const receiverPosition = state.friends.findIndex(
				(e) => e.accountId === payload.accountId
			);
			// Update Latest Message
			state.friends[receiverPosition].latestMessage = {
				...payload.latestMessage,
				dateCreated: new Date().toString(),
			};

			// Sort Friends
			state.friends = current(state.friends).sort((a, b) => {
				// Function That Return The Date Created
				const getDate = (date) => {
					return new Date(date.latestMessage.dateCreated);
				};

				// Here I am checking if all object have the latestMessage key
				// In there object if not return 0
				if (b.latestMessage && a.latestMessage) {
					return getDate(b) - getDate(a);
				} else if (b.latestMessage && !a.latestMessage) {
					return getDate(b) - 0;
				} else if (!b.latestMessage && a.latestMessage) {
					return 0 - getDate(a);
				}
			});
		},
	},
	extraReducers: {
		[getFriends.pending]: (state) => {
			state.isLoading = true;
		},
		[getFriends.fulfilled]: (state, { payload }) => {
			state.isLoading = false;
			state.friends = payload.friends;
			state.totalFriends = payload.totalFriends;
		},
		[getFriends.rejected]: (state) => {
			state.isLoading = false;
			state.friends = [];
			state.totalFriends = 0;
		},
	},
});

export const { reset, updateFriendsPosition } = getUserFriendsSlice.actions;
export default getUserFriendsSlice.reducer;
