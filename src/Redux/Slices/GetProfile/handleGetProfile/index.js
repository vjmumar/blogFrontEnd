import { createAsyncThunk } from "@reduxjs/toolkit";
// Axios
import { useAxios } from "../../../../Helpers";

export const handleGetProfile = createAsyncThunk(
	"getProfile",
	async (data, { getState, rejectWithValue, fulfillWithValue }) => {
		const { userId } = getState().signInStates;
		const { communicate } = useAxios();
		const result = await communicate("post", "/get-user-profile", {
			id: data?.profileId,
			currentUser: userId,
		});
		if (result.data.status === "success") {
			return fulfillWithValue(result?.data?.data);
		} else {
			return rejectWithValue(result?.data?.error);
		}
	}
);
