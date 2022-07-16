import { createAsyncThunk } from "@reduxjs/toolkit";
// Axios
import { useAxios } from "../../../../Helpers";
// Get Random Stories Handler
import { handleGetRandomStories } from "../../GetRandomStories/handleGetRandomStories";

export const handleGetStoryWithAuthor = createAsyncThunk(
	"getStoryWithAuthor",
	async (data, { rejectWithValue, fulfillWithValue, getState, dispatch }) => {
		const { userId } = getState().signInStates;
		const { communicate } = useAxios();
		const result = await communicate("post", "/get-user-story-and-author", {
			...data,
			currentId: userId,
		});
		if (result.data.status === "success") {
			// Get Random Stories
			await dispatch(handleGetRandomStories()).unwrap();
			return fulfillWithValue(result?.data.data[0]);
		} else {
			return rejectWithValue(result?.data?.error);
		}
	}
);
