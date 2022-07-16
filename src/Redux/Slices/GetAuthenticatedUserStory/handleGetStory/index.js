import { createAsyncThunk } from "@reduxjs/toolkit";
// Helpers
import { useAxios } from "../../../../Helpers";

export const handleGetAuthenticatedUserStory = createAsyncThunk(
	"getAuthenticatedUserStory",
	async (data, { rejectWithValue, fulfillWithValue, getState }) => {
		if (data) {
			const state = getState();
			const { communicate } = useAxios(state.signInStates.token);
			const result = await communicate("post", "/get-story", data);
			if (result.data.status === "success") {
				return fulfillWithValue(result.data.data);
			} else {
				return rejectWithValue(result.data.error);
			}
		}
	}
);
