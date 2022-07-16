import { createAsyncThunk } from "@reduxjs/toolkit";
// Helpers
import { useAxios } from "../../../../Helpers";

export const handleEditStory = createAsyncThunk(
	"editStory",
	async (data, { rejectWithValue, getState, fulfillWithValue }) => {
		const state = getState();
		const { communicate } = useAxios(state.signInStates.token);
		const result = await communicate("post", "/edit-story", data);

		if (result.data.status === "success") {
			return fulfillWithValue(`${data.get("type").toUpperCase()} Success`);
		} else {
			return rejectWithValue(`${data.get("type").toUpperCase()} Failed`);
		}
	}
);
