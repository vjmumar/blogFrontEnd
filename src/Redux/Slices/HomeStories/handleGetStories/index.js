import { createAsyncThunk } from "@reduxjs/toolkit";
// Helpers
import { useAxios } from "../../../../Helpers";

export const handleGetHomeStories = createAsyncThunk(
	"getHomeStories",
	async (data, { fulfillWithValue, rejectWithValue, getState }) => {
		const { token } = await getState().signInStates;
		const { communicate } = useAxios(token);
		const result = await communicate("post", `/${data.type}`, data);
		if (result.data.status === "success") {
			return fulfillWithValue({
				stories: result?.data?.data?.stories,
				totalStories: result?.data?.data?.totalStories,
			});
		} else {
			return rejectWithValue(result.data.error);
		}
	}
);
