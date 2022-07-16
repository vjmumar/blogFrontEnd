import { createAsyncThunk } from "@reduxjs/toolkit";
// Helper
import { useAxios } from "../../../../Helpers";
// Get Story With Author Thunk
import { handleGetStoryWithAuthor } from "../../GetStoryWithAuthor/handleGetStoryWithAuthor";

export const handleStoryActions = createAsyncThunk(
	"storyActions",
	async (data, { fulfillWithValue, rejectWithValue, getState, dispatch }) => {
		const { userId } = getState().signInStates;
		const { communicate } = useAxios();
		const result = await communicate("post", "/story-actions",{
			type: data.type,
			storyId: data.storyId,
			userId: userId,
			ownerId: data.ownerId
		});
		if (result.data.status === "success") {
			// If Success Update The Story With Author
			await dispatch(handleGetStoryWithAuthor({
				story: data.storyId,
				id: data.ownerId
			})).unwrap();
			return fulfillWithValue("");
		} else {
			return rejectWithValue("");
		}
	}
);
