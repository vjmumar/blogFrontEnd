import { createAsyncThunk } from "@reduxjs/toolkit";
// Helper
import { useAxios } from "../../../../Helpers";

export const handleGetUserFollowedPeople = createAsyncThunk(
	"getUserFollowedPeople",
	async (data, { fulfillWithValue, rejectWithValue }) => {
		const { communicate } = useAxios();
		const result = await communicate("post", "/followed-peoples", {
			id: data.id,
			search: data?.search,
		});
		if (result.data.status === "success") {
			return fulfillWithValue(result.data.data[0].data);
		} else {
			return rejectWithValue(result.data.error);
		}
	}
);
