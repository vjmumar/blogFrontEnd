import { createAsyncThunk } from "@reduxjs/toolkit";
// Helper
import { useAxios } from "../../../../Helpers";

export const handleGetUserFriends = createAsyncThunk(
	"getUserFriends",
	async (data, { fulfillWithValue, rejectWithValue }) => {
		const { communicate } = useAxios();
		const result = await communicate("post", "/get-user-friends", {
			id: data.id,
			search: data?.search,
			isMessage: data.isMessage || false
		});
		if (result.data.status === "success") {
			return fulfillWithValue({
				friends: result.data.data[0].friends,
				totalFriends: result.data.data[0].totalFriends
			});
		} else {
			return rejectWithValue(result.data.error);
		}
	}
);
