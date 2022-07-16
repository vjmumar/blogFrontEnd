import { createAsyncThunk } from "@reduxjs/toolkit";
// Helpers
import { useAxios } from "../../../../Helpers";

export const handleGetRandomStories = createAsyncThunk(
	"getRandomStories",
	async (data, { fulfillWithValue, rejectWithValue, getState }) => {
		const { userId } = getState().signInStates;
		const { communicate } = useAxios();
		const result = await communicate("post", "/get-random-stories", { currentId: userId });
		if (result.data.status === "success") {
			return fulfillWithValue(result.data.data);
		} else {
			return rejectWithValue(result.data.error);
		}
	}
);
