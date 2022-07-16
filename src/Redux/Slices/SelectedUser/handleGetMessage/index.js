import { createAsyncThunk } from "@reduxjs/toolkit";
// Helper
import { useAxios } from "../../../../Helpers";

export const handleGetMessage = createAsyncThunk(
	"getMessage",
	async (data, { fulfillWithValue, rejectWithValue, getState }) => {
		const { userId } = getState().signInStates;
		const { communicate } = useAxios();
		const result = await communicate("post", "/get-message", {
			currentId: userId,
			id: data?.id,
			increment: data?.increment
		});
		if (result.data.status === "success") {
			return fulfillWithValue(result?.data?.data[0]);
		} else {
			return rejectWithValue(result.data.error);
		}
	}
);
