import { createAsyncThunk } from "@reduxjs/toolkit";
// Helpers
import { useAxios } from "../../../../Helpers";

export const handleGetNotification = createAsyncThunk(
	"getNotifcation",
	async (data, { fulfillWithValue, rejectWithValue, getState }) => {
		const { userId: accountId, token } = getState().signInStates;
		const { communicate } = useAxios(token);
		const result = await communicate("post", "/get-notification", {
			increment: data?.increment || 10,
			readAllNotifications: data?.readAllNotifications || false,
			accountId,
		});

		console.log('roar', result)
		if (result.data.status === "success") {
			return fulfillWithValue(result.data.data);
		} else {
			return rejectWithValue(result.data.error);
		}
	}
);
