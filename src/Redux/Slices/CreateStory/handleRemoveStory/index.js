import { createAsyncThunk } from "@reduxjs/toolkit";
// Helpers
import { useAxios } from "../../../../Helpers";

export const handleRemoveStory = createAsyncThunk(
	"removeStory",
	async (data, { rejectWithValue, getState, fulfillWithValue }) => {
		const state = getState();
		const { communicate } = useAxios(state.signInStates.token);
		const result = await communicate("post", "/remove-story", data);
		if (result.data.status === "success") {
			return fulfillWithValue(`Remove Success`);
		} else {
			return rejectWithValue(result.data.error);
		}
	}
);

