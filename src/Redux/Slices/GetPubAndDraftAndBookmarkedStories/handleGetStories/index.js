import { createAsyncThunk } from "@reduxjs/toolkit";
// Helper
import { useAxios } from "../../../../Helpers";

export const handleGetPubAndDraftStories = createAsyncThunk(
	"getPubAndDraft",
	async (data, { rejectWithValue, fulfillWithValue, getState }) => {
		if (!data.type) return;
		const { userId } = getState().signInStates;
		const { communicate } = useAxios();
		const result = await communicate("post", `/${data?.type}`, {
			increment: data.storyIncrement || data.increment,
			id: data?.id,
			currentId: userId || "",
			searched: data?.searched || "",
			sort: data?.sort || "latest",
		});

		if (result.data.status === "success") {
			return fulfillWithValue({
				stories: result.data.data[0]?.stories,
				totalStories: result.data.data[0]?.totalStories,
			});
		} else {
			return rejectWithValue(result.data.error);
		}
	}
);
